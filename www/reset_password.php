
<?php
    if(empty($_SERVER["HTTPS"]) || $_SERVER["HTTPS"] !== "on"){
        header("Location: https://" . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"]);
        exit();
    }
    require_once('validate.php');
    session_start();
    if(isset($_POST['submit'])){
        $validated = validate($_POST['username'], $_POST['old_password']);
        if($validated){
            if(strcmp($_POST['new_password-1'],$_POST['new_password-2'])==0){
                $identity = $_SESSION['UserID'];
                $user= empty($_POST['new_username']) ? $_SESSION['username'] : test_input($_POST['new_username']);
                $new_hash = password_hash($_POST['new_password-1'], PASSWORD_DEFAULT, ['cost' => 12]);
                $reading = fopen('.htdata', 'r');
                $writing = fopen('.htdata.tmp', 'w+');
                $replaced = false;
                while (!feof($reading)) {
                  $line = fgets($reading);
                  if (stripos($line, $identity)===0) {
                    $line = $identity . ':' . $user . ':' . $new_hash ."\n";
                    $replaced = true;
                  }
                  fwrite($writing, $line);
                }
                fclose($reading); fclose($writing);
                if ($replaced) {
                    //rename('.htdata.tmp', '.htdata');
                    $from = fopen('.htdata.tmp', 'r');
                    $to = fopen('.htdata', 'w+');
                    stream_copy_to_stream($from, $to);
                    fclose($from); fclose($to);
                } else {
                    echo '<script>alert("password not reset");</script>';
                    //unlink('.htdata.tmp');
                }
                echo '<script>alert("'.$user.'")</script>';
                file_put_contents('.htdata.tmp', '');
                session_unset();
                session_destroy();
                header("Location: index.php");
                exit();
            } else {
                echo '<p style="margin: 2em auto;font-size:3em;text-align:center;">passwords not matching</p>';
            }
        } else {
            echo '<p style="margin: 2em auto;font-size:3em;text-align:center;">bad login</p>';
        }
    }
	//echo "<p>" . password_hash("1234",PASSWORD_DEFAULT, ['cost' => 12]) . "</p>";
?>
<html>
    <head>
    <title>reset password</title>
    <link href="_css/login.css" rel="stylesheet" type="text/css" />
    </head>
    <body>
        <a href="login.php" style="margin:0.5em;">back</a>
        <main>
        <?php 
            if(!is_writable('.htdata')){
                echo '<p>Cannot reset passwords at this time.</p>';
            }
        ?>
        <form id="set" action="<?php htmlspecialchars($_SERVER['PHP_SELF']);?>" method="post">
            Username:<br />
            <input tpye="text" id="username" name="username" /><br />
            <button id="set_username" type="button" name="set_username"
                onclick="document.getElementById('reset_username').setAttribute('style','display: block;');
                         document.getElementById('set_username').setAttribute('style','display: none');">Change Username</button><br />
            <div id="reset_username" style="display: none;">
                New Username:<br />
                <input type="text" id="new_username" name="new_username" /><br />
            </div>
            Old Password:<br />
            <input type="password" id="old_password" name="old_password" /><br >
            New Password:<br />
            <input type="password" id="new_password-1" name="new_password-1" /><br >
            Retype New Password:<br />
            <input type="password" id="new_password-2" name="new_password-2" /><br >
            <input type="submit" id="submit" name="submit" />
        </form>
        </main>
    </body>
</html>