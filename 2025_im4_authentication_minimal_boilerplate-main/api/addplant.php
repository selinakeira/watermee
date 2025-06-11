<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
session_start();
require_once '../system/config.php';

try {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);

        // Debug-Ausgabe: Schreib empfangene Daten in eine Datei
        file_put_contents('debug_post.txt', print_r($data, true));

        $stmt = $pdo->prepare("INSERT INTO relationship (name, id) VALUES (:name, :user_id)");
        $stmt->execute([
            'name' => $data['name'],
            'user_id' => $_SESSION['user_id']
        ]);

        echo json_encode(['success' => true]);
        exit;
    }

    echo json_encode(['success' => false, 'message' => 'Nur POST erlaubt']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}
