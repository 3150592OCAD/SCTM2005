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
    $local = 'media';
?>
<html>
    <head lang="en-CA">
        <title>Media | Nic Hull</title>
        <meta name="description" content="Blog for Time, Motion, Media (GRPH-2003-007)" />
        <link rel='shortcut icon' href='../_img/favicon.ico' type='image/x-icon' />
        <link href="../_css/main.css" rel="stylesheet" type="text/css" />
    <!--<link href="https://fonts.googleapis.com/css?family=Nunito:300,400,700" rel="stylesheet" />-->
        <link href="https://fonts.googleapis.com/css?family=Lato:300,300i,400,400isubset=latin-ext" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Crimson+Text" rel="stylesheet" />
        <script type="text/javascript" src="../_js/jquery.min.js"></script>
    <!--<script type="text/javascript" src="../_js/tabs.js"></script>-->
        <script type="text/javascript" src="../_js/main_scroll.js"></script>
        <script type="text/javascript" src="../_js/jquery.sticky.js"></script>
        <script>
            $(document).ready(function(){
                $("#dynamic-navbar").sticky({topSpacing:0, bgcolor:'#f9f9f9'});
            });
        </script>
        <script type="text/javascript" src="../_js/main_scroll.js"></script>
        <meta charset="utf-8">
    </head>
    <body>
        <header class = "main_header" id="banner" role="banner">
            <nav id="static-navbar" role="navigation">
                <ul>
                    <li><a href="assign1.php" title="Blog posts: Current Assignment" class="hidden-link"> Current</a></li>
                    <li><a href="recent.php" title="Blog posts: All" class="hidden-link">Blog</a></li>
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
        <main id="main" role="main">
            <article role="article">
                <header class="main_header" role="banner">
                    <div class="splash">
                        <h1>Welcome</h1>
                        <p>This Site contains a blog for<br />Time, Motion, Media: GRPH-2003-2007</p>
                        <div role="button" id="contact-button-1">
                            <a href="#contact" id="contact-button-1-link">contact</a>
                        </div>
                    </div>
                </header>
                <nav id="dynamic-navbar" role="navigation">
                    <div id="navbar-container">
                        <ul>
                            <li><a id="dyn-lnk1" href="#recent" title="goto about section" class="hidden-link">Recent</a></li>
                            <li><a id="dyn-lnk2" href="#assign1" title="goto portfolio section" class="hidden-link">Assign 1</a></li>
                            <li><a id="dyn-lnk3" href="#assign2" title="goto blog section" class="hidden-link">Assign 2</a></li>
                            <li><a id="dyn-lnk4" href="#assign3" title="goto social media section" class="hidden-link">Assign 3</a></li>
                            <li><a id="dyn-lnk5" href="#contact" title="contact me" class="hidden-link">Contact</a></li>
                        </ul>
                    </div>
                </nav>
                <section id="recent">
                	<h1>Recent Posts</h1>
                	<h2><a href="recent.php" title="view all posts">All Posts</a></h2>
                	<?php
                        if(!empty($_SESSION['UserID'])){
                            getrecentposts($local,2);
                        }
                	?>
                </section>
                <section id="assign1">
                	<h1>Assignment 1</h1>
                	<h2><a href="assign1.php" title="view posts for first assignment">All First Assignment</a></h2>
                	<?php
                        if(!empty($_SESSION['UserID'])){
                            getrecentposts_cat($local, 'assign1', 2);
                        }
                	?>
                </section>
                <section id="assign2">
                	<h1>Assignment 2</h1>
                	<h2><a href="assign2.php" title="view posts for second assignment">All Second Assignment</a></h2>
                	<?php
                        if(!empty($_SESSION['UserID'])){
                            getrecentposts_cat($local, 'assign2', 2);
                        }
                	?>
                </section>
                <section id="assign3">
	                <h1>Assignment 3</h1>
	                <h2><a href="assign3.php" title="view posts for third assignment">All Third Assignment</a></h2>
	                <?php
                        if(!empty($_SESSION['UserID'])){
                            getrecentposts_cat($local, 'assign3', 2);
                        }
	                ?>
                </section>
                <section id="contact">
                    <h1>Contact Info</h1>
                    <h3>Email</h3>
                    <p><span id="email-address">3150592@student.ocadu.ca</span></p>
                <!--<h3>Phone</h3>
                    <p><span id="phone-number">       </span></p>-->
                </section>
            </article>
        </main>
        <footer role=contentinfo>
            <p>&copy; Copyright Nic Hull</p>
        </footer>
    </body>
</html>