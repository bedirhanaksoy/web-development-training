<?php
    session_start();
    
    if(isset($_SESSION['id'])){
        echo "<script>var users_id = ". $_SESSION['id'].";</script>";
    }
    else{
        echo "<script>var users_id = ". -1 .";</script>";
    }
?>

<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>my_blog</title>

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="../sources/main.js"></script>

  <link rel="stylesheet" href="../style/style.css">

</head>
<body>

<nav id="nav">
    <a id="my_blog">bedirhan</a>
    <a href="#" onclick="performLogout()" class="logout " >Logout</a>
  </nav>

<div class="content-box" id="content-bar">

</div>

<div class="page-box" id="page-bar">

</div>

<script>
</script>

<script>updateNavbarWithCategories();</script>

</body>
</html>