<?php
// api/getplantbyid.php
header('Content-Type: application/json');
require_once '../system/config.php';

// Only allow GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
    exit;
}

$plantId = $_GET['id'] ?? null;
if (!$plantId || !is_numeric($plantId)) {
    echo json_encode(["status" => "error", "message" => "No valid plant ID provided"]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT * FROM plants WHERE id = :id");
    $stmt->execute([':id' => $plantId]);
    $plant = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($plant) {
        echo json_encode([
            "status" => "success",
            "data" => $plant
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "message" => "Plant not found"
        ]);
    }
} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Datenbankfehler: " . $e->getMessage()
    ]);
}
