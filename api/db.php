<?php
$conn = new mysqli("localhost", "root", "", "task_manager");

if ($conn->connect_error) {
    die("DB Connection Failed");
}
?>
