<?php
// api/plant.php
header('Content-Type: application/json');
require_once '../system/config.php';

// Nur GET erlaubt
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
    exit;
}

// Pflanze per Name abfragen (GET-Parameter: ?name=Thyme)
$name = trim($_GET['name'] ?? '');

if (!$name) {
    echo json_encode(["status" => "error", "message" => "No plant name provided"]);
    exit;
}

$stmt = $pdo->prepare("SELECT name, information, watering_guide, frequency_in_days, light_location FROM plants WHERE name = :name");
$stmt->execute([':name' => $name]);
$plant = $stmt->fetch(PDO::FETCH_ASSOC);

if ($plant) {
    echo json_encode(["status" => "success", "data" => $plant]);
} else {
    echo json_encode(["status" => "error", "message" => "Plant not found"]);
}
