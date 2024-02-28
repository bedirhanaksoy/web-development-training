<?php

session_start();

class Login {
    private $api;

    public function __construct(){
        $this->api = new mysqli('localhost', 'bedirhan', 'Qweqwe123*', 'my_blog');

        if($this->api->connect_error){
            echo "Connection Failed";
        }
    }

    public function LoginUser($username, $email){
        $stmt = $this->api->prepare("SELECT user_id, username, email, is_admin, password FROM users WHERE username=? AND email=?");

        if ($stmt === false) {
            return false; 
        }

        $stmt->bind_param("ss", $username, $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $userCredentials=get_information_from_result($result);
        $stmt->close();

        return $userCredentials;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postData = file_get_contents('php://input');
    $data = json_decode($postData, true);

    if ($data !== null) {
        if (check_email($data['email']) && check_username($data['username'])) {

            $loginer = new Login();
            $result = $loginer->LoginUser($data['username'], $data['email']);

            // if email and username informations are correct, check for hashed passwords are same or not
            if ($result){
                if (password_verify($data['password'], $result['password']) && $result['is_admin']===1) {                  

                    $_SESSION['username'] = $result['username'];
                    $_SESSION['id'] = $result['user_id'];
                    $_SESSION['email'] = $result['email'];
                    $_SESSION['password'] = $result['password'];

                    echo json_encode(array('status' => 'success', 'id' => $_SESSION['id'], 'session_username' => $_SESSION['username'], 'session_email' => $_SESSION['email']));
                }
                else{
                    http_response_code(500);
                    echo json_encode(array('error' => $result['password']));   
                }
            }
            else {
                http_response_code(500);
                echo json_encode(array('error' => 'Wrong Credentials'));
            }
        } 
        else {
            http_response_code(403);
            echo json_encode(array('error' => 'Invalid email or username syntax'));
        }
    } 
    else {
        http_response_code(400);
        echo json_encode(array('error' => 'Invalid JSON'));
    }
}

function check_username($username){
    if(preg_match('/^(?!\s+$)[a-zA-Z0-9\s]{1,20}$/', $username)===1) { 
        return 1;
    }
    else return 0;
}

function check_email($email){
    if(filter_var($email, FILTER_VALIDATE_EMAIL) !== false){
        return 1;
    }
    else return 0;
}

function get_information_from_result($return){
    if ($return) {
        $user = array();
        $user = $return->fetch_assoc();
        return $user;

    } 
    else {
        return false;
    }
}

?>
