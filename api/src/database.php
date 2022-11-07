<?php

/**
 * Database method
 *
 * Function responsible for connecting to database and fetchin the data.
 * 
 * @author John Rooksby
 * @author Szymon Jedrzychowski
 */
class Database{
    private $dbConnection;

    /**
     * __construct method
     * 
     * Method responsible for preparing the name of the database.
     * 
     * @param string $dbName 
     */
    public function __construct($dbName){
        $dbName = str_replace("\\", DIRECTORY_SEPARATOR, $dbName);
        $this->setDbConnection($dbName);
    }

    /**
     * setDbConnection method
     * 
     * Method responsible for connecting to database.
     * 
     * @param string $dbName 
     */
    private function setDbConnection($dbName){
        $this->dbConnection = new PDO('sqlite:' . $dbName);
        $this->dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }

    /**
     * executeSQL method
     * 
     * Method responsible for executing the sql querry and fetching data.
     * 
     * @param string $sql Sql querry
     * @param array $params array of params for sql querry
     * 
     * @return array data fetched from database 
     */
    public function executeSQL($sql, $params = []){
        $stmt = $this->dbConnection->prepare($sql);
        $stmt->execute($params);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
