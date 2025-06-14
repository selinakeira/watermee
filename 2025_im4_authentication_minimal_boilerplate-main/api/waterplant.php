<?php
// api/waterplant.php
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
$plantId = trim($input['id'] ?? '');

if (!$plantId) {
    echo json_encode(["status" => "error", "message" => "No plant ID provided"]);
    exit;
}

$userId = $_SESSION['user_id'];

// Prüfen, ob Benutzer diese Pflanze hat
$check = $pdo->prepare("SELECT 1 FROM user_plants WHERE userid = :userid AND plantid = :plantid");
$check->execute([
    ':userid' => $userId,
    ':plantid' => $plantId
]);

if (!$check->fetch()) {
    echo json_encode(["status" => "error", "message" => "Plant not assigned to user"]);
    exit;
}

// Gießaktion speichern
$insert = $pdo->prepare("
    INSERT INTO watering_log (userid, plantid, wateredat)
    VALUES (:userid, :plantid, NOW())
");

$insert->execute([
    ':userid' => $userId,
    ':plantid' => $plantId
]);

echo json_encode(["status" => "success"]);
