<?php
session_start();
require('../body/topicBody.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postData = file_get_contents('php://input');
    $data = json_decode($postData, true);

    if ($data !== null) {
        if(isTopicExists($data['topic_id'])){
            $commentReader = new topicBody();
            $result = $commentReader->getComments($data['topic_id']);

            if ($result) {
                echo json_encode(array('status' => 'success' , 'comments' => $result));
            } 
            else 
            {
                echo json_encode(array('status' => 'success' , 'comments' => -1));
            }
        }
    } 
    else{
        http_response_code(400);
        echo json_encode(array('error' => 'Invalid JSON data'));
    }
}

function isTopicExists($id){
    /*

    */
    return 1;
}

?>
