<?php

$dbHost = "localhost";
$dbUser = "bedirhan";
$dbPassword = "Qweqwe123*";
$dbName = "todo";

$conn = new mysqli($dbHost, $dbUser, $dbPassword, $dbName);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

function listTasks($filter = null)
{
    global $conn;

    $stmt = $conn->prepare("SELECT * FROM tasks WHERE status=?");

    if ($stmt === false) {
        return false; 
    }

    $stmt->bind_param("s", $filter);

    $result = $stmt->execute();

    if ($result === false) {
        $stmt->close();
        return false;
    }

    $resultSet = $stmt->get_result();

    if ($resultSet->num_rows > 0) {
        
        echo "ID\tStatus\tTask\n";
        while ($row = $resultSet->fetch_assoc()) {
            echo "{$row['id']}\t{$row['status']}\t{$row['text']}\n";
        }
    } 
    else {
        echo "No tasks found.\n";
    }

    $stmt->close();
}

function addTask($text)
{
    global $conn;

    $stmt = $conn->prepare("INSERT INTO tasks (text) VALUES (?)");

    if ($stmt === false) {
        return false; 
    }

    $stmt->bind_param("s", $text);
    $result = $stmt->execute();
    $stmt->close();

    if ($result) {
        echo "Task added successfully.\n";
    } else {
        echo "Error adding task: "."\n";
    }
}

function removeTask($id)
{
    global $conn;

    $stmt = $conn->prepare("DELETE FROM tasks WHERE id =?");

    if ($stmt === false) {
        return false; 
    }

    $stmt->bind_param("i", $id);
    $result = $stmt->execute();
    $stmt->close();


    if ($result) {
        echo "Task removed successfully.\n";
    } else {
        echo "Error removing task: "."\n";
    }
}

function updateTask($id, $text)
{
    global $conn;

    $stmt = $conn->prepare("UPDATE tasks SET text=? WHERE id=?");

    if ($stmt === false) {
        return false; 
    }

    $stmt->bind_param("si", $text,$id);
    $result = $stmt->execute();
    $stmt->close();

    if ($result) {
        echo "Task updated successfully.\n";
    } else {
        echo "Error updating task: " . "\n";
    }
}


function markAsDone($id)
{
    global $conn;

    $stmt = $conn->prepare("UPDATE tasks SET status = 'done' WHERE id=?");

    if ($stmt === false) {
        return false; 
    }

    $stmt->bind_param("i", $id);
    $result = $stmt->execute();
    $stmt->close();

    if ($result) {
        echo "Task marked as done.\n";
    } else {
        echo "Error marking task as done: " . "\n";
    }
}

function markAsPending($id)
{
    global $conn;

    $stmt = $conn->prepare("UPDATE tasks SET status = 'pending' WHERE id=?");

    if ($stmt === false) {
        return false; 
    }

    $stmt->bind_param("i", $id);
    $result = $stmt->execute();
    $stmt->close();

    if ($result) {
        echo "Task marked as pending.\n";
    } else {
        echo "Error marking task as pending: " . "\n";
    }
}

if ($argc < 2) {
    echo "Usage: php todo.php [command] [arguments]\n";
    exit(1);
}

$command = $argv[1];

switch ($command) {

    case 'list':

        $filter = isset($argv[2]) ? $argv[2] : null;
        listTasks($filter);
        break;

    case 'add':

        $text = isset($argv[2]) ? $argv[2] : null;
        if ($text !== null) {
            addTask($text);
        } 
        else {
            echo "Usage: php todo.php add [text]\n";
        }
        break;

    case 'remove':

        $id = isset($argv[2]) ? $argv[2] : null;
        if ($id !== null) {
            removeTask($id);
        } 
        else {
            echo "Usage: php todo.php remove [id]\n";
        }
        break;

    case 'update':

        $id = isset($argv[2]) ? $argv[2] : null;
        $text = isset($argv[3]) ? $argv[3] : null;
        if ($id !== null && $text !== null) {
            updateTask($id, $text);
        } 
        else {
            echo "Usage: php todo.php update [id] [text]\n";
        }
        break;

    case 'done':

        $id = isset($argv[2]) ? $argv[2] : null;
        if ($id !== null) {
            markAsDone($id);
        } 
        else {
            echo "Usage: php todo.php done [id]\n";
        }
        break;

    case 'pending':

        $id = isset($argv[2]) ? $argv[2] : null;
        if ($id !== null) {
            markAsPending($id);
        } else {
            echo "Usage: php todo.php pending [id]\n";
        }
        break;

    case 'help':
        echo "Usage:\n";
        echo "  php todo.php list [--filter=(done,pending)]\n";
        echo "  php todo.php add [text]\n";
        echo "  php todo.php remove [id]\n";
        echo "  php todo.php update [id] [text]\n";
        echo "  php todo.php done [id]\n";
        echo "  php todo.php pending [id]\n";
        echo "  php todo.php help\n";
        break;
    default:
        echo "Invalid command. Type 'php todo.php help' for usage instructions.\n";
        break;
}

?>