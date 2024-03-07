<?php
session_start();
require('../body/topicBody.php');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $topicCreator = new topicBody();
    $result = $topicCreator->getPageNumber();

    if ($result) {
        echo json_encode(array('status' => 'success' , 'pageNumber' => $result));
    } 
    else 
    {
        http_response_code(500);
        echo json_encode(array('error' => 'Failed to get page number'));
    }
}

?>
