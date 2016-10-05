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
    define('__ROOT__', dirname(dirname(__FILE__)));
    $xml = simplexml_load_file(realpath(__ROOT__.'/_posts/.htposts'), null, LIBXML_NOCDATA) or die("Error: Cannot create object");
    $post = $xml->xpath('//post[@id="'.htmlspecialchars($_GET['id']).'"]')[0];
    if(!empty($post)){
	    foreach($post->children() as $node){
	    	unset($node[0]);
	    }
	    unset($post[0]);
	}
	$num = $xml['number'];
	for($x=$_GET['id'];$x<$num;$x++){
		$next_post = $xml->xpath('//post[@id="'.($x + 1).'"]')[0];
		$next_post['id'] = ($x);
	}
	$xml['number'] = $num - 1 ;
    $xml->asXml(realpath(__ROOT__.'/_posts/.htposts'));
    header("Location: index.php");
?>