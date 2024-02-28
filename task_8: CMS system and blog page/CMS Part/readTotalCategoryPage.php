<?php
session_start();
require('categoryBody.php');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    $topicCreator = new categoryBody();
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
