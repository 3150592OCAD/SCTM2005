<?php
    session_start();
    if(empty($_SESSION['returntopage'])){
        $_SESSION['returntopage'] = 'https://' . $_SERVER["HTTP_HOST"] . '/~3150592/';
    }
    require_once('validate.php');
    if(isset($_POST['submit'])){
        $validated = validate($_POST['username'], $_POST['password']);
        if($validated){
            header("Location: " . $_SESSION['returntopage']);
        } else {
            header("HTTP/1.1 403 Forbidden");
            exit();
        }
    }
?>
<html lang="en-CA">
    <head>
        <title>Login | Nic Hull</title>
        <meta name="description" content="Login Page" />
        <meta charset="utf-8">
        <link href="_css/login.css" rel="stylesheet" type="text/css" />
    </head>
    <body>
        <a href="index.php" style="margin:0.5em;">back</a>
        <main>
        <?php
            if(isset($_SESSION['UserID'])){
                header("Location: " . $_SESSION['returntopage']);
                exit();
            } else {
                echo '<form id="login" action="' . htmlspecialchars($_SERVER['PHP_SELF']) . '" method="post">
                        Username:<br />
                        <input type="text" id="username" name="username" /><br />
                        Password:<br />
                        <input type="password" id="password" name="password" /><br />
                        <input type="submit" id="submit" name="submit" />
                      </form>';
            }
        ?>
        <a href="reset_password.php" title="Reset your current password">Reset Password</a>
        </main>
    </body>
</html>