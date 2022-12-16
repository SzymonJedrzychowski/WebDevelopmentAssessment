<?php

use FirebaseJWT\JWT;
use FirebaseJWT\Key;

/** 
 * Update class responsible for updating the value of award status of papers.
 * 
 * Built upon the workshops material by:
 * @author John Rooksby
 * Modified by:
 * @author Szymon Jedrzychowski
 */
class Update extends Endpoint
{
    public function __construct()
    {
        $this->validateRequestMethod("POST");
        $this->validateToken();

        // Validate the update parameters
        $this->validateUpdateParams();

        $db = new Database("db/chiplay.sqlite");
        $this->initialiseSQL();
        $queryResult = $db->executeSQL($this->getSQLCommand(), $this->getSQLParams());

        $this->setData(array(
            "length" => 0,
            "message" => "Success",
            "data" => null
        ));
    }

    private function validateToken()
    {
        $key = SECRET;

        $allHeaders = getallheaders();
        $authorizationHeader = "";

        if (array_key_exists('Authorization', $allHeaders)) {
            $authorizationHeader = $allHeaders['Authorization'];
        } elseif (array_key_exists('authorization', $allHeaders)) {
            $authorizationHeader = $allHeaders['authorization'];
        }

        if (substr($authorizationHeader, 0, 7) != 'Bearer ') {
            throw new ClientErrorException("Bearer token required", 401);
        }

        $jwt = trim(substr($authorizationHeader, 7));

        try {
            $decoded = JWT::decode($jwt, new Key($key, 'HS256'));
        } catch (Exception $e) {
            throw new ClientErrorException($e->getMessage(), 401);
        }

        if ($decoded->iss != $_SERVER['HTTP_HOST']) {
            throw new ClientErrorException("invalid token issuer", 401);
        }
    }

    private function validateUpdateParams()
    {
        if (!filter_has_var(INPUT_POST, 'award')) {
            throw new ClientErrorException("award parameter required", 400);
        }
        if (!filter_has_var(INPUT_POST, 'paper_id')) {
            throw new ClientErrorException("paper_id parameter required", 400);
        }

        $awards = ["true", "false"];
        if (!in_array(strtolower($_POST['award']), $awards)) {
            throw new ClientErrorException("invalid award", 400);
        }
    }

    protected function initialiseSQL()
    {
        $awardIds = ["true" => "true", "false" => null];

        $awardId = $awardIds[$_POST['award']];

        $sql = "UPDATE paper SET award = :award WHERE paper_id = :paper_id";
        $this->setSQLCommand($sql);
        $this->setSQLParams(['award' => $awardId, 'paper_id' => $_POST['paper_id']]);
    }
}
