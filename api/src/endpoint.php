<?php

/**
 * Endpoint class
 * 
 * Endpoint class is responsible for handling all endpoints of the api.
 * Other endpoints extend this class.
 * 
 * Base code written by
 * @author John Rooksby
 * Modified by
 * @author Szymon Jedrzychowski
 */

abstract class Endpoint
{
    private $sqlCommand;
    private $sqlParams;
    private $data;

    /**
     * During construction of the object, it connects to database,
     * creates and executes the sqlCommand and modifies the data array.
     */
    public function __construct()
    {
        try {
            // Connect to the database.
            $db = new Database("db/chiplay.sqlite");

            // Update $sqlCommand and $sqlParams.
            $this->initialiseSQL();

            // Execute the $sqlCommand.
            $data = $db->executeSQL($this->sqlCommand, $this->sqlParams);

            // Modify the data to array format.
            $this->setData(array(
                "length" => count($data),
                "message" => "Success",
                "data" => $data
            ));
        } catch (BadRequest $e) {
            // In case of BadRequest exception, set the data using badRequestMessage method.
            $this->setData($e->badRequestMessage());
        }
    }

    /**
     * Initialise the $sqlCommand and $sqlParams variables.
     */
    protected function initialiseSQL()
    {
        $this->setSQLCommand("");
        $this->setSQLParams([]);
    }

    /**
     * Setter method for $data.
     * 
     * @param array $array array with data in specified format 
     */
    protected function setData($array)
    {
        $this->data = $array;
    }

    /**
     * Setter method for $sqlCommand.
     * 
     * @param string $sqlCommand SQL command that is to be executed
     */
    protected function setSQLCommand($sqlCommand)
    {
        $this->sqlCommand = $sqlCommand;
    }

    /**
     * Setter method for $sqlParams.
     * 
     * @param array $params array of params for SQL command
     */
    protected function setSQLParams($params)
    {
        $this->sqlParams = $params;
    }

    /**
     * Getter method for $data.
     * 
     * @return array $data array with endpoint data
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * Return params that are available for specific endpoint.
     * 
     * @return array array of available params
     */
    protected function getAvailableParams()
    {
        return [];
    }

    /**
     * Check if correct params were provided for specific endpoint.
     * 
     * @throws BadRequest if incorrect param was provided
     */
    protected function checkAvailableParams($availableParams)
    {
        foreach ($_GET as $key => $value) {
            if (!in_array($key, $availableParams)) {
                throw new BadRequest("Invalid parameter " . $key);
            }
        }
    }
}
