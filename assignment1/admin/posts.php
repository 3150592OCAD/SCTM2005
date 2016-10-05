<?php
	if(empty($_SERVER["HTTPS"]) || $_SERVER["HTTPS"] !== "on"){
        header("Location: https://" . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"]);
        exit();
    }
    session_start();
    if(!isset($_SESSION['UserID'])){
        $_SESSION['returntopage'] = $_SERVER['REQUEST_URI'];
        header("Location: ../login.php");
        exit();
    } elseif(!strpos($_SESSION['UserID'], 'A')===0) {
        header("HTTP/1.1 403 Forbidden");
        exit();
    }
?>
<html>
<head>
	<title></title>
</head>
<body>
<?php
	define('__ROOT__', dirname(dirname(__FILE__)));
	$xml = simplexml_load_file(realpath(__ROOT__.'/_posts/.htposts'), null, LIBXML_NOCDATA) or die("Error: Cannot create object");
    $post = $xml->xpath('//post[@id="'.htmlspecialchars($_GET['id']).'"]')[0];
	echo '<article class="post">';
	echo '<header>';
	echo '<h1>Title: ' . $post->title . '</h1>';
	echo '<h2>Description:  ' . $post->description . ' – ' . $post->date . '</h2>';
	echo '</header>';
	echo '<main>';
	echo '<h3>Short: '.$post->short.'</h3>';
	echo $post->main;
	echo '</main>';
	echo '</article>';
?>
</body>
</html>