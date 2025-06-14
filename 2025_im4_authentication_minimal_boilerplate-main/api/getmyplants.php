<?php
// api/getmyplants.php
session_start();
header('Content-Type: application/json');

require_once '../system/config.php';

// Check if user is logged in
if (!isset($_SESSION['user_id'])) {
    echo json_encode(["status" => "error", "message" => "Not authenticated"]);
    exit;
}

// Only allow GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
    exit;
}

$userId = $_SESSION['user_id'];

try {
    // Pflanzen mit letzter Gießzeit laden
    $stmt = $pdo->prepare("
        SELECT
            p.id,
            p.name,
            p.frequency_in_days,
            (
                SELECT MAX(wl.wateredat)
                FROM watering_log wl
                WHERE wl.userid = up.userid AND wl.plantid = up.plantid
            ) AS last_watered
        FROM user_plants up
        JOIN plants p ON p.id = up.plantid
        WHERE up.userid = :userid
    ");
    $stmt->execute([':userid' => $userId]);
    $plants = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "status" => "success",
        "data" => $plants
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Datenbankfehler: " . $e->getMessage()
    ]);
}
