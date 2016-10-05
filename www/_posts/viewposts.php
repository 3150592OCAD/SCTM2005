<?php
//	Valid Locations: com-sci, media
define('__ROOT__', dirname(dirname(__FILE__)));
function paste_post($post){
	echo '<article class="post">';
	echo '<header>';
	echo '<h1>' . $post->title . '</h1>';
	echo '<h2>' . $post->description . ' – ' . $post->date . '</h2>';
	echo '</header>';
	echo '<main>';
	echo $post->main;
	echo '</main>';
	echo '</article>';
}

function paste_recent($xml, $x){
	echo '<article class="post">';
	echo '<div>';
	echo '<header>';
	echo '<h3>' . $xml->post[$x]->title . '</h3>';
	echo '<h4>' . $xml->post[$x]->description . ' – ' . $xml->post[$x]->date . '</h4>';
	echo '</header>';
	echo '<main>';
	echo '<p>' . substr($xml->post[$x]->short,0,140) . '...</p>';
	echo '</main>';
	echo '<a href="../'.$xml->post[$x]->location.'/post.php?id='.$xml->post[$x]['id'].'" title=" visit post: '.$xml->post[$x]->title.'">Read More</a>';
	echo '</div>';
	if(!empty($xml->post[$x]->img['src'])){
		echo '<aside><img src="' . $xml->post[$x]->img['src'] . '" /></aside>';
	}
	echo '</article>';
}

function getposts($location) {
	$xml = simplexml_load_file(realpath(__ROOT__.'/_posts/.htposts'), null, LIBXML_NOCDATA) or die("Error: Cannot create object");
	foreach($xml->children() as $post) {
		if(strcmp($post->location, $location)===0) {
			paste_post($post);
		}
	}
	/*
	for($x=(int)$xml['number'];$x>0;$x--){
		if(strcmp($xml->post[$x]->location, $location)==0 && strcmp($xml->post[$x]->catagory, $catagory)==0){
			paste_recent($xml,$x);
		}
	}
	*/
}
function getposts_cat($location, $catagory) {
	$xml = simplexml_load_file(realpath(__ROOT__.'/_posts/.htposts'), null, LIBXML_NOCDATA) or die("Error: Cannot create object");
	foreach($xml->children() as $post) {
		if(strcmp($post->location, $location)===0 && strcmp($post->catagory, $catagory)===0) {
			paste_post($post);
		}
	}
	/*
	for($x=(int)$xml['number'];$x>0;$x--){
		if(strcmp($xml->post[$x]->location, $location)==0 && strcmp($xml->post[$x]->catagory, $catagory)==0){
			paste_recent($xml,$x);
		}
	}
	*/
}
function getrecentposts($location, $number){
	$xml=simplexml_load_file(realpath(__ROOT__.'/_posts/.htposts'), null, LIBXML_NOCDATA) or die("Error: Cannot create object");
	$fetched = 0;
	for($x=(int)$xml['number'];$x>0;$x--){
		if(strcmp($xml->post[$x]->location, $location)==0){
			paste_recent($xml,$x);
			if(++$fetched == $number){
				break;
			}
		}
	}
}
function getrecentposts_cat($location, $catagory, $number){
	$xml=simplexml_load_file(realpath(__ROOT__.'/_posts/.htposts'), null, LIBXML_NOCDATA) or die("Error: Cannot create object");
	$fetched = 0;
	for($x=(int)$xml['number'];$x>0;$x--){
		if(strcmp($xml->post[$x]->location, $location)==0 && strcmp($xml->post[$x]->catagory, $catagory)==0){
			paste_recent($xml,$x);
			if(++$fetched == $number){
				break;
			}
		}
	}
}

?>
