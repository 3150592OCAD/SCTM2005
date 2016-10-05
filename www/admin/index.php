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
	<title>admin</title>
	<style>
		table,tr,td,th{
			border:1px solid black;
			padding: 2px;
		}
		table{
			margin: 2em;
			width:80vw;
		}

	</style>
</head>
<body>
	<h1>Admin Section</h1>
	<nav>
		<ul>
			<li><a href="#">posts</a></li>
			<li><a href="../com-sci/">view com-sci</a></li>
			<li><a href="../blog/">view media</a></li>
			<li><a href="../logout.php">logout</a></li>
		</ul>
	</nav>
	<table>
		<tr>
			<th>Title</th>
			<th>Location</th>
			<th>Catagory</th>
			<th>Date</th>
			<th>Action</th>
		</tr>
		<?php
			define('__ROOT__', dirname(dirname(__FILE__)));
    		$xml = simplexml_load_file(realpath(__ROOT__.'/_posts/.htposts'), null, LIBXML_NOCDATA) or die("Error: Cannot create object");
			foreach($xml->children() as $post){
				echo '<tr>';
				echo '<td><a href="posts.php?id='.$post['id'].'">'.$post->title.'</a></td>';
				echo '<td>'.$post->location.'</td>';
				echo '<td>'.$post->catagory.'</td>';
				echo '<td>'.$post->date.'</td>';
				echo '<td><a href="edit_post.php?id='.$post['id'].'">edit</a> | <a href="remove_post.php?id='.$post['id'].'">delete</a></td>';
				echo '</tr>';
			}
		?>
	</table>
	<a href="add_post.php" title="new post">New Post</a>
</body>
</html>