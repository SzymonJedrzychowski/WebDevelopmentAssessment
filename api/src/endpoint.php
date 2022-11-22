<?php

abstract class Endpoint
{
    private $sqlCommand;
    private $sqlParams;
    private $data;

    public function __construct()
    {
        try {
            $db = new Database("db/chiplay.sqlite");

            $this->initialiseSQL();

            $data = $db->executeSQL($this->sqlCommand, $this->sqlParams);

            $this->setData(array(
                "length" => count($data),
                "message" => "Success",
                "data" => $data
            ));
        } catch (BadRequest $e) {
            $this->setData($e->badRequestMessage());
        } catch (PDOException $e) {
            $error = new ClientError("Problem occured with database: " . $e->getMessage(), 500);
            $this->setData($error->getData());
        }
    }

    protected function initialiseSQL()
    {
        $this->setSQLCommand("");
        $this->setSQLParams([]);
    }

    protected function setData($array)
    {
        $this->data = $array;
    }

    protected function setSQLCommand($sqlCommand)
    {
        $this->sqlCommand = $sqlCommand;
    }

    protected function setSQLParams($params)
    {
        $this->sqlParams = $params;
    }

    public function getData()
    {
        return $this->data;
    }

    protected function getAvailableParams()
    {
        return [];
    }

    protected function checkAvailableParams($availableParams)
    {
        foreach ($_GET as $key => $value) {
            if (!in_array($key, $availableParams)) {
                throw new BadRequest("Invalid parameter " . $key);
            }
        }
    }
}
