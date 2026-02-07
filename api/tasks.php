<?php
session_start();
include 'db.php';

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}

$user_id = $_SESSION['user_id'];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $result = $conn->query("SELECT * FROM tasks WHERE user_id=$user_id");
    echo json_encode($result->fetch_all(MYSQLI_ASSOC));
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $task = $data['task'];

    $conn->query("INSERT INTO tasks(task, user_id) VALUES('$task', $user_id)");
    echo json_encode(["message" => "Task added"]);
}
?>
