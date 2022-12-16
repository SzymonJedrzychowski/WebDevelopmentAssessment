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
header("Access-Control-Allow-Headers: *");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if (!in_array($_SERVER['REQUEST_METHOD'], ['GET', 'POST'])) {
    $endpoint = new ClientError("Invalid method: " . $_SERVER['REQUEST_METHOD'], 405);
} else {
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
            case '/update':
            	$endpoint = new Update();
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
}
$response = $endpoint->getData();
echo json_encode($response);
