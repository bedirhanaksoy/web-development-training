<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if(isset($_SESSION['password']) && isset($_SESSION['id']) && isset($_SESSION['username']) && isset($_SESSION['email'])){
        
        unset($_SESSION['password']);
        unset($_SESSION['id']);
        unset($_SESSION['username']);
        unset($_SESSION['email']);
        session_destroy();

        if(isset($_SESSION['password']) && isset($_SESSION['id']) && isset($_SESSION['username']) && isset($_SESSION['email'])){
            echo json_encode(array('status' => 'failed'));
        }
        echo json_encode(array('status' => 'success'));
    }
}
?>