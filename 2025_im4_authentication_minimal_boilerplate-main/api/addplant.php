<?php
// api/addplant.php
session_start();
header('Content-Type: application/json');

require_once '../system/config.php';

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "Not authenticated"]);
    exit;
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
    exit;
}

// Read and decode the JSON input
$input = json_decode(file_get_contents('php://input'), true);
$plantId = trim($input['id'] ?? ''); // JS sendet id unter "name"

if (!$plantId) {
    echo json_encode(["status" => "error", "message" => "No plant ID provided"]);
    exit;
}

$userId = $_SESSION['user_id'];

// Optional: check if plant already added by user
$check = $pdo->prepare("SELECT 1 FROM user_plants WHERE userid = :userid AND plantid = :plantid");
$check->execute([
    ':userid' => $userId,
    ':plantid' => $plantId
]);

if ($check->fetch()) {
    echo json_encode(["status" => "error", "message" => "Plant already added"]);
    exit;
}

// Insert new entry into user_plants
$insert = $pdo->prepare("INSERT INTO user_plants (userid, plantid) VALUES (:userid, :plantid)");
$insert->execute([
    ':userid' => $userId,
    ':plantid' => $plantId
]);

echo json_encode(["status" => true]);
