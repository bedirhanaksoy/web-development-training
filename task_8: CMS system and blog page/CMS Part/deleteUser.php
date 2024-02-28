<?php
session_start();
require('userBody.php');

if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_SESSION['id'])) {
    $deleteData = file_get_contents('php://input');
    $data = json_decode($deleteData, true);

    if ($data !== null) {
        if (check_if_user_id_exists($data['user_id'])) {

            $userDeleter = new userBody();
            $result = $userDeleter->deleteUser($data['user_id']);

            if ($result) {
                echo json_encode(array('status' => 'success'));
            } 
            else {
                http_response_code(500);
                echo json_encode(array('error' => 'Failed to delete user'));
            }
        }
        else {
            http_response_code(403);
            echo json_encode(array('error' => 'Invalid user ID'));
        }
    } 
    else {
        http_response_code(400);
        echo json_encode(array('error' => 'Invalid JSON data'));
    }
}

function check_if_user_id_exists($user_id){
/*

*/
return 1;
}




?>