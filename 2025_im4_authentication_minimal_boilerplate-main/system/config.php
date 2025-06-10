<?php
// config.php
$host = 'lh6mg3.myd.infomaniak.com';  
$db   = 'lh6mg3_Pflanzen';  // Change to your DB name
$user = 'lh6mg3_selina';   // Change to your DB user
$pass = 'Selina12345.';       // Change to your DB pass if needed

try {
    $dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";
    $pdo = new PDO($dsn, $user, $pass);
    // Optional: Set error mode
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (Exception $e) {
    echo "Database connection error: " . $e->getMessage();
    exit;
}
?>