<?php
include 'config/config.php';

/**
 * index file that is responsible for managing endpoints.
 * 
 * Built upon the workshops material by:
 * @author John Rooksby
 * Modified by:
 * @author Szymon Jedrzychowski
 */

header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

$url = $_SERVER["REQUEST_URI"];
$url = parse_url($url);
$path = str_replace("/assessment/api", "", $url['path']);
try {
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
        case '/authenticate':
            $endpoint = new Authenticate();
            break;
        default:
            $endpoint = new ClientError("Path not found: " . $path, 404);
            break;
    }
} catch (ClientErrorException $e) {
    $endpoint = new ClientError($e->getMessage(), $e->getCode());
} catch (BadRequest $e) {
    $endpoint = new ClientError($e->getMessage(), $e->getCode());
}

$response = $endpoint->getData();
echo json_encode($response);
