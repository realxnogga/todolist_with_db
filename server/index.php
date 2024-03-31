
<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

$conn = new mysqli("sql309.infinityfree.com", "if0_36263692", "8VXv3s3tQlQh", "if0_36263692_todolistdb");

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
            $date = $data['date'];

            if ($text != '' && $status != '') {
                $sql = "insert into todolisttb (text, status, date) values ('$text', '$status', '$date')";

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