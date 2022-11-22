<?php
include 'config/config.php';

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

if (!in_array($_SERVER['REQUEST_METHOD'], ['GET'])) {
    $endpoint = new ClientError("Incorrect request method: " . $_SERVER['REQUEST_METHOD'], 405);
} else {
    $url = $_SERVER["REQUEST_URI"];
    $url = parse_url($url);
    $path = str_replace("/assessment/api", "", $url['path']);
    switch ($path) {
        case '/':
            $endpoint = new Base();
            break;
        case '/authors/':
        case '/authors':
            $endpoint = new Authors();
            break;
        case '/papers/':
        case '/papers':
            $endpoint = new Papers();
            break;
        default:
            $endpoint = new ClientError("Path not found: " . $path, 404);
            break;
    }
}

$response = $endpoint->getData();
echo json_encode($response);
