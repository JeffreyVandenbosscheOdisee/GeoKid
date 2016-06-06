<?php

namespace skeleton\Repositories;

class MasteraccountRepository extends BaseRepository
{
	/**
	 * Returns the name of the table used in this repository
	 * @return string The table name
	 *
	 * IMPORTANT: This method is used in BaseRepository, it must be implemented in every child
	 */
	public function getTableName() {
		return 'masteraccounts';
	}

	/**
	 * [findMasteraccount description]
	 * @param  [type] $email [description]
	 * @return [type]        [description]
	 */
	public function findMasteraccount($email) {
		return $this->db->fetchAssoc('SELECT * FROM '. $this->getTableName() . ' WHERE email = ?', array($email));
	}

	public function findMasteraccountOnId($id, $AuthKey) {
		return $this->db->fetchAssoc('SELECT * FROM '. $this->getTableName() . ' WHERE id = ? AND AuthKey = ?', array($id, $AuthKey));
	}

	public function findMasteraccountOnAuthKey($AuthKey) {
		return $this->db->fetchAssoc('SELECT * FROM '. $this->getTableName() . ' WHERE AuthKey = ?', array($AuthKey));
	}


}