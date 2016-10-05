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
    } elseif(!(strpos($_SESSION['UserID'], 'C')===0 || strpos($_SESSION['UserID'], 'A')===0)) {
        header("HTTP/1.1 403 Forbidden");
        exit();
    }
    require_once('../_posts/viewposts.php');
    $local="com-sci";
    $xml = simplexml_load_file(realpath(__ROOT__.'/_posts/.htposts'), null, LIBXML_NOCDATA) or die("Error: Cannot create object");
    $post = $xml->xpath('//post[@id="'.htmlspecialchars($_GET['id']).'"]')[0];
    if($post->location != 'com-sci'){
        header("Location: index.php");
    }

?>
<html>
<head>
	<title><?php echo $post->title; ?> | com-sci | Nic Hull</title>
    <meta name="description" <?php echo 'content="'.$post->description.'"';?> />
    <link rel='shortcut icon' href='../_img/favicon.ico' type='image/x-icon' />
    <link href="../_css/post.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="../_js/prism.js"></script>
    <link href="../_css/prism.css" rel="stylesheet" type="text/css" />
    <meta charset="utf-8" />
</head>
<body>
    <header role="banner" id="banner">
        <nav id="static-navbar" role="navigation">
            <ul>
                <!-- <li><a <?php echo 'href="post.php?id='. htmlspecialchars($_GET['id']-1) .'"'; ?> title="Posts: Previous" class="hidden-link">Previous</a></li>
                <li><a <?php echo 'href="post.php?id='. htmlspecialchars($_GET['id']+1) .'"'; ?> title="Posts: Next" class="hidden-link">Next</a></li>-->
                <li><a href="index.php" title="Back to Main Page" class="hidden-link">Main</a></li>
                <?php 
                    if(!empty($_SESSION['UserID'])){
                        echo '<li id="login-out"><a href="../logout.php" title="log out" class="hidden-link">logout</a></li>';
                    } else {
                        echo '<li id="login-out"><a href="../login.php" title="log in" class="hidden-link">login</a></li>';
                    }
                ?>
            </ul>
        </nav>
        <div id="logo">
            <h1 class="wordmark"><a href="../" class="hidden-link">Nic Hull</a></h1>
        </div>
    </header>
    <?php
        paste_post($post);
    ?>
</body>
</html>