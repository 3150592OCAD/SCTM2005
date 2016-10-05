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

	function test_input($in) {
          $in = trim($in);
          $in = stripslashes($in);
          $in = htmlspecialchars($in);
          return $in;
    }

    define('__ROOT__', dirname(dirname(__FILE__)));
    $xml = simplexml_load_file(realpath(__ROOT__.'/_posts/.htposts'), null, LIBXML_NOCDATA) or die("Error: Cannot create object");
    $post = $xml->xpath('//post[@id="'.htmlspecialchars($_GET['id']).'"]')[0];

	if (isset($_POST['submit'])) {
		$post->location = test_input($_POST['location']);
		$post->catagory = test_input($_POST['catagory']);
		$post->title = test_input($_POST['title']);
		$post->description = test_input($_POST['description']);
		$post->short = test_input($_POST['short']);
		$post->main = $_POST['main'];
		$xml->asXml(realpath(__ROOT__.'/_posts/.htposts'));
		header("Location: index.php");
	}
?>
<html>
<head>
	<script src="//tinymce.cachefly.net/4.0/tinymce.min.js"></script>
	<script>
	      tinymce.init({
	          selector: ".textarea",
	          plugins: [
	              "advlist autolink lists link image charmap print preview anchor",
	              "searchreplace visualblocks code fullscreen",
	              "insertdatetime media table contextmenu paste"
	          ],
	          toolbar: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image"
	      });
	</script>
</head>
<body>
	<h1>Admin Section</h1>
	<nav>
		<ul>
			<li><a href="index.php">posts</a></li>
			<li><a href="../com-sci/">view com-sci</a></li>
			<li><a href="../blog/">view media</a></li>
			<li><a href="../logout.php">logout</a></li>
		</ul>
	</nav>
	<form action='' method='post'>
		<p><label>Location</label><br />
		<input type='text' name='location' value='<?php if(isset($post->location)){ echo $post->location;}?>'></p>

		<p><label>Catagory</label><br />
		<input type='text' name='catagory' value='<?php if(isset($post->catagory)){ echo $post->catagory;}?>'></p>

		<p><label>Title</label><br />
		<input type='text' name='title' value='<?php if(isset($post->title)){ echo $post->title;}?>'></p>

		<p><label>Description</label><br />
		<textarea name='description' cols='60' rows='1'><?php if(isset($post->description)){ echo $post->description;}?></textarea></p>

		<p><label>Short</label><br />
		<textarea name='short' cols='100' rows='4'><?php if(isset($post->short)){ echo $post->short;}?></textarea></p>

		<p><label>Main</label><br />
		<textarea class="textarea" name='main' cols='60' rows='10'><?php if(isset($post->main)){ echo $post->main;}?></textarea></p>

		<p><input type='submit' name='submit' value='Submit'></p>

	</form>
</body>
</html>