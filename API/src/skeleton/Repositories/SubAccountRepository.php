<?php

namespace skeleton\Repositories;

class SubAccountRepository extends BaseRepository 
{
	/**
	 * Returns the name of the table used in this repository
	 * @return string The table name
	 *
	 * IMPORTANT: This method is used in BaseRepository, it must be implemented in every child
	 */
	public function getTableName() {
		return 'subaccounts';
	}
	public function findAllSubAccounts($id) {
		return $this->db->fetchAll('SELECT * FROM '. $this->getTableName() . ' WHERE MasterAccounts_Id = ?', array($id));
	}

	public function findSubAccount($subaccId) {
		return $this->db->fetchAssoc('SELECT * FROM '. $this->getTableName() . ' WHERE  Id = ?', array($subaccId));
	}
}