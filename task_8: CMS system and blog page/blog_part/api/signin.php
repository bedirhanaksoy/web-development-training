<?php
class Create {
    private $api;

    public function __construct(){
        $this->api = new mysqli('localhost', 'bedirhan', 'Qweqwe123*', 'my_blog');

        if($this->api->connect_error){
            echo "Connection Failed";
        }
    }

    public function createUser($username, $email, $password, $signUpTime){
        $stmt = $this->api->prepare("INSERT INTO users (username, email, password, sign_up_date) VALUES (?, ?, ?, ?)");

        if ($stmt === false) {
            return false; 
        }

        $stmt->bind_param("ssss", $username, $email, $password, $signUpTime);
        $result = $stmt->execute();
        $stmt->close();

        return $result;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postData = file_get_contents('php://input');
    $data = json_decode($postData, true);

    if ($data !== null) {
        if (check_email($data['email']) && check_username($data['username'])) {
            // password hashing
            $hashed_pw = (string)password_hash($data['password'], PASSWORD_BCRYPT);

            $signUpTime = signUpTime();

            $creator = new Create();
            $result = $creator->createUser($data['username'], $data['email'], $hashed_pw, $signUpTime);

            if ($result) {
                echo json_encode(array('status' => 'success'));
            } 
            else {
                http_response_code(500);
                echo json_encode(array('error' => 'Failed to create user'));
            }
        } 
        else {
            http_response_code(403);
            echo json_encode(array('error' => 'Invalid email or username'));
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

function signUpTime(){
    return date('Y-m-d H:i:s');
}


?>
