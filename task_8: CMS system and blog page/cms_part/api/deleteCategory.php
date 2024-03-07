<?php
session_start();
require('../body/categoryBody.php');

if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_SESSION['id'])) {
    $deleteData = file_get_contents('php://input');
    $data = json_decode($deleteData, true);

    if ($data !== null) {
        if (check_if_category_id_exists($data['CategoryID'])) {

            $categoryDeleter = new categoryBody();
            $result = $categoryDeleter->deleteCategory($data['CategoryID']);

            if ($result) {
                echo json_encode(array('status' => 'success'));
            } 
            else {
                http_response_code(500);
                echo json_encode(array('error' => 'Failed to delete category'));
            }
        }
        else {
            http_response_code(403);
            echo json_encode(array('error' => 'Invalid category ID'));
        }
    } 
    else {
        http_response_code(400);
        echo json_encode(array('error' => 'Invalid JSON data'));
    }
}

function check_if_category_id_exists($category_id){
/*

*/
return 1;
}




?>