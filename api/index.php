<?php
include 'config/autoloader.php';
include 'config/exceptionhandler.php';
include 'config/errorhandler.php';

spl_autoload_register("autoloader");
set_exception_handler('exceptionHandler');
set_error_handler('errorHandler');

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

if (!in_array($_SERVER['REQUEST_METHOD'], ['GET'])){
    http_response_code(405);
    $output['error'] = $_SERVER['REQUEST_METHOD'] . " method not allowed";
    die(json_encode($output));
}

$url = $_SERVER["REQUEST_URI"];
$url = parse_url($url);
$path = $url['path'];

switch ($path){
    case '/assessment/api/papers':
        $papers = new Papers();
        echo $papers->getData();
        break;
    case '/assessment/api/authors':
        $author = new Authors();
        echo $author->getData();
        break;
    default:
        $myArray['studentId'] = "w20020581";
        $myArray['studentName'] = "Szymon Jedrzychowski";
        $myArray['documentation'] = "http://unn-w20020581.newnumyspace.co.uk/assessment/api/documentation/";
        $myArray['module'] = "KF6012 Web Application Integration";
        $myArray['conference'] = "CHI PLAY '21: The Annual Symposium on Computer-Human Interaction in Play";
        echo json_encode($myArray);
        break;
}
