<?php

class function_bodies {
    private $api;

    public function __construct(){
        $this->api = new mysqli('localhost', 'bedirhan', 'Qweqwe123*', 'balloon');

        if($this->api->connect_error){
            echo "Connection Failed";
        }
    }

    public function getHighestScore() {
        try {
            $sql = "SELECT score FROM highest_score WHERE id=1";
            $result = $this->api->query($sql);

            if ($result && $result->num_rows > 0) {
                $row = $result->fetch_assoc();
                return $row['score'];
            } else {
                return 0; 
            }
        } catch (Exception $e) {
            echo "Error: " . $e->getMessage();
            return 0;
        }
    }

    public function setHighestScore($new_highest) {
        try {
            $sql = "UPDATE highest_score SET score = $new_highest WHERE id=1";
            $result = $this->api->query($sql);

            if ($result) {
                return true;
            } else {
                return false; 
            }
        } catch (Exception $e) {
            echo "Error: " . $e->getMessage();
            return false;
        }
    }
}

// Create an instance of the class
$body = new function_bodies();

// Handle POST requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (isset($_POST['setScoreQuery'])) {
        $newScore = $_POST['score'];
        $result = $body->setHighestScore($newScore);
        echo json_encode(['success' => $result]);
        exit;
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['getScoreQuery'])) {
        $highestScore = $body->getHighestScore();
        echo json_encode(['highestScore' => $highestScore]);
        exit;
    }
}
?>
