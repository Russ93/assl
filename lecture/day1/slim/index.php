<?php
require 'vendor/autoload.php';

$conn = new PDO('mysql:host=localhost;dbname=bloggah;port=8889', 'root', 'root');

$app = new \Slim\Slim();
$app->get('/', function() use ($conn){
	$sql = $conn->prepare('SELECT * FROM messages;');
	$sql-> execute();
	$result = $sql->fetchAll(PDO::FETCH_ASSOC);

	echo "
	<link href='//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css' rel='stylesheet'>
	<nav class='col-md-12'>
		<a href='./create'><button class='btn btn-info'>Create a New Post</button></a>
	</nav>
	<ul>";
	foreach ($result as $obj) {
		$id = $obj['id'];
		$header = $obj['header'];
		$message = $obj['message'];
		$posted = $obj['posted'];
		echo "
		<li class='col-md-2'>
			<h4>$header</h4>
			<time datetime='$posted'>$posted</time>
			<p>$message</p>
			<a href='./update/$id'>edit</a>
		</li>";
	}
	echo "
	</ul>
	";
});
$app->get('/update/:id', function($id) use ($conn){
	$stmt = $conn->prepare("select * from messages where id = :id");
	$stmt->bindParam(':id',$id);
	$stmt->execute();
	$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
	$header = $result[0]['header'];
	$message = $result[0]['message'];

	echo "
	<link href='//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css' rel='stylesheet'>
	<form action='/lecture/slim/change/$id' class='col-md-4' method='post'>
		<label>Header: </label><input type='text' class='form-control' name='header' value='$header' /><br />
		<label>Message: </label><textarea  class='form-control' name='message'>$message</textarea><br />
		<a href='/lecture/slim/remove/$id'>delete</a>
		<button class='btn btn-primary'>Submit</button>
	</form>
	";
});
$app->get('/create', function(){
	echo "
	<link href='//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css' rel='stylesheet'>
	<form action='./post' class='col-md-4' method='post'>
		<label>Header: </label><input type='text' class='form-control' name='header' /><br />
		<label>Message: </label><textarea class='form-control' name='message'></textarea><br />
		<button class='btn btn-primary'>Submit</button>
	</form>
	";
});

$app->get('/remove/:id', function($id) use ($conn, $app){
	$stmt = $conn->prepare("delete from messages where id = :id");
	$stmt->bindParam(':id',$id);
	$stmt->execute();
	$app->response->redirect('/lecture/slim/', 303);
});

$app->post('/change/:id', function($id) use ($conn, $app){
	$header = $app->request()->post('header');
	$message = $app->request()->post('message');
	$stmt = $conn->prepare("update messages set header = :header where id = :id; update messages set message = :message where id = :id; update messages set posted = now() where id = :id;");
	$stmt->bindParam(':header',$header);
	$stmt->bindParam(':message',$message);
	$stmt->bindParam(':id',$id);
	$stmt->execute();
	// $app->response->redirect('/lecture/slim/', 303);
	// header('Location: /');
});

$app->post('/post', function() use ($conn, $app){
	$header = $app->request()->post('header');
	$message = $app->request()->post('message');
	$stmt = $conn->prepare("insert into messages (header, message, posted) values(:header, :message, now());");
	$stmt->bindParam(':header',$header);
	$stmt->bindParam(':message',$message);
	$stmt->execute();
	$app->response->redirect('./', 303);
	// header('Location: /');
});
$app->run();

?>