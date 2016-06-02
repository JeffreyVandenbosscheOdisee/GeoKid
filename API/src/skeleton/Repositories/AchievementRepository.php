<?php

namespace skeleton\Repositories;

class AchievementRepository extends BaseRepository 
{
	/**
	 * Returns the name of the table used in this repository
	 * @return string The table name
	 *
	 * IMPORTANT: This method is used in BaseRepository, it must be implemented in every child
	 */
	public function getTableName() {
		return 'achievements';
	}

	public function findAchievement($points, $type){
		$playground = $this->db->fetchAssoc('SELECT ' . $this->getTableName() .'.* FROM '. $this->getTableName() . ' WHERE Needed_points = ? AND Type = ?', array($points['aantal'], $type));
		return $playground;
	}
}