<?php
session_start();
require('../body/topicBody.php');

if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_SESSION['id'])) {
    $postData = file_get_contents('php://input');
    $data = json_decode($postData, true);

    if ($data !== null) {
        if (check_if_topic_exists($data['TopicID'])) {

            $topicDeleter = new topicBody();
            $result = $topicDeleter->deleteTopic($data['TopicID']);

            if ($result) {
                echo json_encode(array('status' => 'success'));
            } 
            else {
                http_response_code(500);
                echo json_encode(array('error' => 'Failed to delete topic'));
            }
        }
        else {
            http_response_code(403);
            echo json_encode(array('error' => 'Invalid topic ID'));
        }
    } 
    else {
        http_response_code(400);
        echo json_encode(array('error' => 'Invalid JSON data'));
    }
}

function check_if_topic_exists($topicID){
/*

*/
return 1;
}


?>