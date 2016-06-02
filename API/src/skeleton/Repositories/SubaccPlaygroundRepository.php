<?php

namespace skeleton\Repositories;

class SubaccPlaygroundRepository extends BaseRepository 
{
	/**
	 * Returns the name of the table used in this repository
	 * @return string The table name
	 *
	 * IMPORTANT: This method is used in BaseRepository, it must be implemented in every child
	 */
	public function getTableName() {
		return 'playgrounds_has_subaccounts';
	}

	public function findVisitedPlayground($id, $subaccId){
		$playground = $this->db->fetchAssoc('SELECT ' . $this->getTableName() .'.* FROM '. $this->getTableName() . ' WHERE playgrounds_Id = ? AND subaccounts_Id = ? ', array($id, $subaccId));
		return $playground;
	}

	public function findallVisitedPlayground($subaccId){
		//SELECT playgrounds.Name FROM `favorite_parks_masteraccount` JOIN playgrounds ON playgrounds.Id = favorite_parks_masteraccount.Playgrounds_Id  WHERE MasterAccounts_Id=6
		$playground = $this->db->fetchAll('SELECT playgrounds.Name FROM '. $this->getTableName() . ' JOIN playgrounds ON playgrounds.Id = playgrounds_has_subaccounts.playgrounds_Id WHERE subaccounts_Id = ? ', array($subaccId));
		return $playground;
	}
	public function countvisitedplaygrounds($subaccId){
		//SELECT COUNT(*) as aantal FROM `playgrounds_has_subaccounts` WHERE subaccounts_Id = 18
		$playground = $this->db->fetchAssoc('SELECT COUNT(*) as aantal FROM '. $this->getTableName() . ' WHERE subaccounts_Id = ?', array($subaccId));
		return $playground;
	}
}