<?php
    function validate($username,$password){
        $database = ".htdata";
        $database = file($database, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        $identity = 0;
        $hash = 'none';
        $found = false;
        foreach($database as $line){
            $data = explode(':',$line);
            if($data[1] == test_input($username)){
                $identity = $data[0];
                $user = $data[1];
                $hash = $data[2];
                $found = true;
                break;
            }
        }
        if($found == true){
            if(password_verify(test_input($password), $hash)){
                $_SESSION['username'] = $user;
                $_SESSION['UserID'] = $identity;
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    function test_input($in) {
          $in = trim($in);
          $in = stripslashes($in);
          $in = htmlspecialchars($in);
          return $in;
    }
?>