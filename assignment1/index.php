<?php
	session_start();
    $_SESSION['returntopage'] = $_SERVER['REQUEST_URI'];
?>
<html lang="en-CA">
    <head>
        <title>Nic Hull</title>
        <meta name="description" content="Ressource Page for my OCAD classes" />
        <meta charset="utf-8" />
        <link href="_css/login.css" rel="stylesheet" type="text/css" />
    </head>
    <body>
        <a href="sitemap.html" title="sitemap" style="position:absolute;float:right;text-align:right;width:100%;padding:0.5em;box-sizing:border-box;">site-map</a>
    	<ul>
        	<li><a href="blog/">Time, Motion, Media</a></li>
        	<li><a href="com-sci/">Computer Science</a></li>
        	<?php
        		if(!empty($_SESSION['UserID'])){
        			echo '<li><a href="logout.php">Log out</a></li>';
        		} else {
        			echo '<li><a href="login.php">Log in</a></li>';
        		}
        	?>
     	</ul>
    </body>
</html>