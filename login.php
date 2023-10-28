<?php
// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$database = "your_database_name";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get user data from the login form
$email = $_POST['email'];
$password = $_POST['password'];

// Check user credentials
$sql = "SELECT * FROM users WHERE email='$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if (password_verify($password, $row['password'])) {
        echo "Login successful. Welcome, " . $row['username'] . "!";
    } else {
        echo "Incorrect password. Please try again.";
    }
} else {
    echo "User not found. Please sign up first.";
}

$conn->close();
?>
