<?php
session_start();
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$username = $data['username'];
$password = $data['password'];

$result = $conn->query("SELECT * FROM users WHERE username='$username'");

if ($result->num_rows == 1) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user['password'])) {
        $_SESSION['user_id'] = $user['id'];
        echo json_encode(["message" => "Login successful"]);
    } else {
        echo json_encode(["error" => "Invalid password"]);
    }
} else {
    echo json_encode(["error" => "User not found"]);
}
?>
