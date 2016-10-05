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
?>
<html>
    <head lang="en-CA">
        <title>Com-Sci | Nic Hull</title>
        <meta name="description" content="files for intro to computer science" />
        <link rel='shortcut icon' href='../_img/favicon.ico' type='image/x-icon' />
        <link href="../_css/main.css" rel="stylesheet" type="text/css" />
    <!--<link href="https://fonts.googleapis.com/css?family=Nunito:300,400,700" rel="stylesheet" />-->
        <link href="https://fonts.googleapis.com/css?family=Lato:300,300i,400,400isubset=latin-ext" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Crimson+Text" rel="stylesheet" />
        <script type="text/javascript" src="../_js/jquery.min.js"></script>
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
        <a role="button" href="#recent" title="skip navigation" style="position:absolute;top:-106px;">skip navigation</a>
        <header class="main_header" id="banner" role="banner">
            <nav id="static-navbar" role="navigation">
                <ul>
                    <li><a href="assign1.php" title="Posts: Current Assignment" class="hidden-link"> Current</a></li>
                    <li><a href="recent.php" title="Posts: All Posts" class="hidden-link">Posts</a></li>
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
                        <p>This Site is a repository for Intro to Computer Science: SCTM-2005</p>
                        <div role="button" id="button-1" href="#">
                            <a href="#" id="button-1-link" title="toggle Use of Tabs">Use Tabs</a>
                        </div>
                    </div>
                </header>
                <nav id="dynamic-navbar" role="navigation">
                    <div id="navbar-container">
                        <ul>
                            <li><a id="d_link1" href="#recent" title="go to recent posts" class="hidden-link">Recent</a></li>
                            <li><a id="d_link2" href="#assign1" title="go to assignment 1 posts" class="hidden-link">Assign 1</a></li>
                            <li><a id="d_link3" href="#assign2" title="go to assignment 2 posts" class="hidden-link">Assign 2</a></li>
                            <li><a id="d_link4" href="#assign3" title="go to assignment 3 posts" class="hidden-link">Assign 3</a></li>
                            <li><a id="d_link5" href="#contact" title="go to contact information" class="hidden-link">Contact</a></li>
                        </ul>
                    </div>
                </nav>
                <section id="recent">
                    <h1>Recent Posts</h1>
                    <h2><a href="recent.php" title="view all posts">All Posts</a></h2>
                    <?php
                        if(!empty($_SESSION['UserID'])){
                            getrecentposts($local,3);
                        }
                    ?>
                </section>
                <section id="assign1">
                    <h1>Assignment 1</h1>
                    <h2><a href="assign1.php" title="view posts for first assignment">All First Assignment</a></h2>
                    <?php
                        if(!empty($_SESSION['UserID'])){
                            getrecentposts_cat($local, 'assign1', 3);
                        }
                    ?>
                </section>
                <section id="assign2">
                    <h1>Assignment 2</h1>
                    <h2><a href="assign2.php" title="view posts for second assignment">All Second Assignment</a></h2>
                    <?php
                        if(!empty($_SESSION['UserID'])){
                            getrecentposts_cat($local, 'assign2', 3);
                        }
                    ?>
                </section>
                <section id="assign3">
                    <h1>Assignment 3</h1>
                    <h2><a href="assign3.php" title="view posts for third assignment">All Third Assignment</a></h2>
                    <?php
                        if(!empty($_SESSION['UserID'])){
                            getrecentposts_cat($local, 'assign3', 3);
                        }
                    ?>
                </section>
                <section id="contact">
                    <h1>Contact Info</h1>
                    <address>
                    <h3>Email</h3>
                    <p><span id="email-address"><a class="hidden-link" href="mailto:3150592@student.ocadu.ca?Subject=Computer%20Science%20Website" target="_top">3150592@student.ocadu.ca</a></span></p>
                    <h3>Format</h3>
                    <p><span id="portfolio-site"><a class="hidden-link" href="https://nic-hull.format.com/" title="potfolio" target="blank">nic-hull.format.com</a></span></p>
                <!--<h3>Phone</h3>
                    <p><span id="phone-number">       </span></p>-->
                    </address>
                </section>
            </article>
        </main>
        <footer role=contentinfo>
            <p>&copy; Copyright Nic Hull</p>
        </footer>
    </body>
</html>