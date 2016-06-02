<?php

namespace skeleton\Repositories;

class TaskRepository extends BaseRepository 
{
	/**
	 * Returns the name of the table used in this repository
	 * @return string The table name
	 *
	 * IMPORTANT: This method is used in BaseRepository, it must be implemented in every child
	 */
	public function getTableName() {
		return 'completed_tasks';
	}

	public function findCompleteTask($taskId, $playgroundId, $subaccId) {
		return $this->db->fetchAssoc('SELECT * FROM '. $this->getTableName() . ' WHERE Tasks_Id = ? AND Playgrounds_Id = ? AND SubAccounts_Id = ?', array($taskId, $playgroundId, $subaccId));
	}
	public function countcompletedtasks($subaccId){
		//SELECT COUNT(*) as aantal FROM `playgrounds_has_subaccounts` WHERE subaccounts_Id = 18
		$count = $this->db->fetchAssoc('SELECT COUNT(*) as aantal FROM '. $this->getTableName() . ' WHERE subaccounts_Id = ?', array($subaccId));
		return $count;
	}
}