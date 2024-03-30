
<?php

// header("Access-Control-Allow-Origin: http://localhost:3000");
// header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: https://simple-todolist-app-123.netlify.app");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "todolistdb";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['action'])) {
    $action = $_GET['action'];

    switch ($action) {
        case 'putData':

            $data = json_decode(file_get_contents('php://input'), true);

            $text = $data['text'];
            $status = $data['status'];

            if ($text != '' && $status != '') {
                $sql = "insert into todolisttb (text, status) values ('$text', '$status')";

                $conn->query($sql);

                if ($conn->affected_rows > 0) {
                    echo json_encode(true);
                } else {
                    echo json_encode(false);
                }
            }

            $conn->close();
            break;

        case 'getData':

            $data = json_decode(file_get_contents('php://input'), true);

            if ($data == 'all') {
                $sql = "select*from todolisttb";             
            }
            if ($data == 'in progress' || $data == 'not started' || $data == 'done') {
                $sql = "select*from todolisttb where status = '$data'";
            }

            $result = $conn->query($sql);

            $dataStatus = [];
            while ($row = $result->fetch_assoc()) {
                $dataStatus[] = $row;
            }

            echo json_encode($dataStatus);
            $conn->close();
            break;

        case 'deleteData':

            $data = json_decode(file_get_contents('php://input'), true);

            $itemToDelete = $data;

            $sql = "delete from todolisttb where ID = '$itemToDelete'";
            $conn->query($sql);

            if ($conn->affected_rows > 0) {
                echo json_encode(true);
            } else {
                echo json_encode(false);
            }
            $conn->close();
            break;

        case 'editData':

            $data = json_decode(file_get_contents('php://input'), true);
            $ID = $data['ID'];
            $text = $data['text'];
            $status = $data['status'];

            $sql = "update todolisttb set text = '$text', status = '$status' where ID = '$ID'";
            $conn->query($sql);

            if ($conn->affected_rows > 0) {
                echo json_encode(true);
            } else {
                echo json_encode(false);
            }
            $conn->close();
            break;
    }
}
?>
