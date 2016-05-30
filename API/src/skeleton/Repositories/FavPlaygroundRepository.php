<?php

namespace skeleton\Repositories;

class FavPlaygroundRepository extends BaseRepository 
{
	/**
	 * Returns the name of the table used in this repository
	 * @return string The table name
	 *
	 * IMPORTANT: This method is used in BaseRepository, it must be implemented in every child
	 */
	public function getTableName() {
		return 'favorite_parks_masteraccount';
	}

	public function findVisitedPlayground($id, $masteraccId){
		$playground = $this->db->fetchAssoc('SELECT ' . $this->getTableName() .'.* FROM '. $this->getTableName() . ' WHERE Playgrounds_Id = ? AND 	MasterAccounts_Id=?', array($id, $masteraccId));
		return $playground;
	}

	public function findallVisitedPlayground($masteraccId){
		//SELECT playgrounds.Name FROM `favorite_parks_masteraccount` JOIN playgrounds ON playgrounds.Id = favorite_parks_masteraccount.Playgrounds_Id  WHERE MasterAccounts_Id=6
		$playground = $this->db->fetchAll('SELECT playgrounds.Name FROM '. $this->getTableName() . ' JOIN playgrounds ON playgrounds.Id = favorite_parks_masteraccount.Playgrounds_Id WHERE MasterAccounts_Id = ? ', array($masteraccId));
		return $playground;
	}
}