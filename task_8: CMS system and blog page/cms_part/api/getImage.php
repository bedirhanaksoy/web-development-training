<?php
session_start();
require('../body/userBody.php');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {            
        $pictureGetter = new userBody();
        $result = $pictureGetter->getProfilePicture($_SESSION['id']);

        if ($result) {
            echo json_encode(['status' => 'success', 'path' => $result]);
        } 
        else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to update profile picture.']);
        }
}
?>
