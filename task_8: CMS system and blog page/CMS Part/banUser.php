<?php
session_start();
require('userBody.php');

if ($_SERVER['REQUEST_METHOD'] === 'PUT' && isset($_SESSION['id'])) {
    $postData = file_get_contents('php://input');
    $data = json_decode($postData, true);

    if ($data !== null) {
        if (check_if_user_id_exists($data['user_id'])) {

            $banStatusUpdater = new userBody();
            $result = $banStatusUpdater->banUser($data['user_id'], $data['ban_status']);

            if ($result) {
                echo json_encode(array('status' => 'success'));
            } 
            else {
                http_response_code(500);
                echo json_encode(array('error' => 'Failed to change ban status'));
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