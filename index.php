<?php
include 'config/config.php';

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

if (!in_array($_SERVER['REQUEST_METHOD'], ['GET'])) {
    $endpoint = new ClientError("Invalid method: " . $_SERVER['REQUEST_METHOD'], 405);
} else {
    $url = $_SERVER["REQUEST_URI"];
    $url = parse_url($url);
    $path = str_replace("/year3/week5", "", $url['path']);

    switch ($path) {
        case '/':
            $endpoint = new Base();
            break;
        case '/films':
        case '/films/':
            $endpoint = new Films();
            break;
        case '/actors':
        case '/actors/':
            $endpoint = new Actors();
            break;
        default:
            $endpoint = new ClientError("Path not found: " . $path, 404);
            break;
    }
}

$response = $endpoint->getData();
echo json_encode($response);
