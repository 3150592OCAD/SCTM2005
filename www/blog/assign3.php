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
} elseif(!(strpos($_SESSION['UserID'], 'B')===0 || strpos($_SESSION['UserID'], 'A')===0)) {
    header("HTTP/1.1 403 Forbidden");
    exit();
}
require_once('../_posts/viewposts.php');
?>
<html>
<head>
	<title>Assign 3 | Media | Nic Hull</title>
	<meta name="description" content="Blog for Time, Motion, Media (GRPH-2003-007)" />
	<link rel='shortcut icon' href='../_img/favicon.ico' type='image/x-icon' />
	<link href="../_css/postings.css" rel="stylesheet" type="text/css" />
	<meta charset="utf-8" />
</head>
<body>
	<header role="banner" id="banner">
        <nav id="static-navbar" role="navigation">
            <ul>
                <li><a href="assign2.php" title="Blog posts: Previous Assignment" class="hidden-link"> Previous</a></li>
                <li><a href="index.php" title="Back to Main Blog" class="hidden-link">Main</a></li>
            <!--<li id="top-blog-link"><a href="contact.html" title="contact me" class="hidden-link">Contact</a></li>-->
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
	<main>
	<h1 id="title">Second Assignment</h1>
	<h2>Assignment Description</h2>
		<?php
			if(!empty($_SESSION['UserID'])){
				getposts_cat('media', 'assign3');
			}
		?>
	</main>
</body>
</html>