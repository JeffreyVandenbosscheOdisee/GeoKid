<?php

namespace skeleton\Repositories;

class PlaygroundRepository extends BaseRepository
{
	/**
	 * Returns the name of the table used in this repository
	 * @return string The table name
	 *
	 * IMPORTANT: This method is used in BaseRepository, it must be implemented in every child
	 */
	public function getTableName() {
		return 'playgrounds';
	}

	/**
	 * [findAllPlaygrounds description]
	 * @return [type] [description]
	 */
	public function findAllPlaygrounds() {
		$playgrounds = $this->db->fetchAll('SELECT playgrounds.* from playgrounds');
        return $playgrounds;
	}

	/**
	 * [findSpecficPlayground description]
	 * @param  [type] $id [description]
	 * @return [type]     [description]
	 */
	public function findSpecficPlayground($id){
		$playground = $this->db->fetchAssoc('SELECT ' . $this->getTableName() .'.* FROM '. $this->getTableName() . ' WHERE '. $this->getTableName() .'.id = ?', array($id));
		$functions =  $this->findFunctionsSpecificPlayground($id);
		$tasks = $this->findTasksForPlayground($functions);
		$playground['functions'] = $functions;
		$playground['tasks'] = $tasks;
		return $playground;
	}

	/**
	 * [findFunctionsSpecificPlayground description]
	 * @param  [type] $id [description]
	 * @return [type]     [description]
	 */
	public function findFunctionsSpecificPlayground($id){
		$functions = $this->db->fetchAll('SELECT functions.Name as function FROM   functions_has_playgrounds JOIN functions ON functions.Id = functions_has_playgrounds.functions_id  WHERE  functions_has_playgrounds.playgrounds_Id = ?', array($id));
		$arrFunctions = [];
		foreach ($functions as $key => $val) {
			foreach ($val as $key1 => $value) {
				array_push($arrFunctions,$value);
			}		
		}
		return $arrFunctions;
	}
	/**
	 * [findTasksForPlayground description]
	 * @param  [type] $functions [description]
	 * @return [type]            [description]
	 *
	 * De invoer wordt niet geparameterized omdat dit eenmalige invoer was in de db en deze niet van buitenaf aanpasbaar is.
	 */
	public function findTasksForPlayground($functions){

		$comma_separated = '"'. implode('","', $functions). '"';
		$tasks = $this->db->fetchAll('SELECT * FROM tasks WHERE tag IN('. $comma_separated .') or tag is NULL ORDER BY rand() LIMIT 5');
		return $tasks;
	}

	
}