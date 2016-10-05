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
	<title>Recent | Media | Nic Hull</title>
	<meta name="description" content="blog posts for Time, Motion, Media" />
	<link rel='shortcut icon' href='../_img/favicon.ico' type='image/x-icon' />
    <script type="text/javascript" src="../_js/prism.js"></script>
    <link href="../_css/prism.css" rel="stylesheet" type="text/css" />
    <link href="../_css/postings.css" rel="stylesheet" type="text/css" />
	<meta charset="utf-8" />
</head>
<body>
	<header role="banner" id="banner">
        <nav id="static-navbar" role="navigation">
            <ul>
                <li><a href="assign1.php" title="Posts: First Assignment" class="hidden-link">First</a></li>
                <li><a href="index.php" title="Back to Main Page" class="hidden-link">Main</a></li>
            <!--<li id="contact-link"><a href="contact.html" title="contact me" class="hidden-link">Contact</a></li>-->
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
	<h1 id="title">All Posts</h1>
		<?php
			if(!empty($_SESSION['UserID'])){
				getposts('media');
			}
		?>
	</main>
</body>
</html>