<?php

use FirebaseJWT\JWT;
use FirebaseJWT\Key;

/**
 * Responsible for handling /update endpoint.
 *
 * This class is responsible for updating the award status of given paper.
 *
 * @author John Rooksby
 * @author Szymon Jedrzychowski
 */
class Update extends Verify
{
    /**
     * Override the __construct method to match the requirements of the /update endpoint.
     *
     * @throws BadRequest           If request method is incorrect.
     * @throws ClientErrorException If token format is wrong, decoding of token threw an Exception
     *                              or issuer does not agree with the host.
     *                              Also thrown when incorrect parameters were used.
     */
    public function __construct()
    {
        // Connect to the database.
        $db = new Database("db/chiplay.sqlite");

        // Check if correct request method was used.
        $this->validateRequestMethod("POST");

        // Validate the JWT.
        parent::validateToken();

        // Validate the update parameters.
        $this->validateUpdateParams();

        // Initialise the SQL command and parameters and get the data from the database.
        $this->initialiseSQL();
        $db->executeSQL($this->getSQLCommand(), $this->getSQLParams());

        $this->setData(array(
            "length" => 0,
            "message" => "Success",
            "data" => null
        ));
    }

    /**
     * Check if correct parameters were used.
     *
     * @throws ClientErrorException If incorrect parameters were used.
     */
    private function validateUpdateParams()
    {
        if (!filter_has_var(INPUT_POST, 'award')) {
            throw new ClientErrorException("award parameter required", 400);
        }
        if (!filter_has_var(INPUT_POST, 'paper_id')) {
            throw new ClientErrorException("paper_id parameter required", 400);
        }

        $possibleAwards = ["true", "false"];
        if (!in_array(strtolower($_POST['award']), $possibleAwards)) {
            throw new ClientErrorException("invalid award value", 400);
        }
    }

    /**
     * Override parent method to get prepare SQL command and variables to update award status of paper.
     */
    protected function initialiseSQL()
    {
        // Create array mapping correct values to the database.
        $awardMap = ["true" => "true", "false" => null];

        // Get award from POST after passing it through $awardMap.
        $award = $awardMap[$_POST['award']];

        $sql = "UPDATE paper SET award = :award WHERE paper_id = :paper_id";
        $this->setSQLCommand($sql);
        $this->setSQLParams([
            'award' => $award,
            'paper_id' => $_POST['paper_id']
        ]);
    }
}
