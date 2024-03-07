<?php
session_start();
require('../body/userBody.php');

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_SESSION['id'])) {

    $userReader = new userBody();
    $result = $userReader->getPageNumber();

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
