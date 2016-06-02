<?php

namespace skeleton\Repositories;

class AchievementSubaccRepository extends BaseRepository 
{
	/**
	 * Returns the name of the table used in this repository
	 * @return string The table name
	 *
	 * IMPORTANT: This method is used in BaseRepository, it must be implemented in every child
	 */
	public function getTableName() {
		return 'achievements_has_subaccounts';
	}

	public function findsubAccAchievement($achievId, $subaccId){
		$achiev = $this->db->fetchAssoc('SELECT ' . $this->getTableName() .'.* FROM '. $this->getTableName() . ' WHERE Achievements_Id = ? AND 	SubAccounts_Id = ?', array($achievId, $subaccId));
		return $achiev;
	}

	public function findsubAccAchievements($subaccId){
		//SELECT * FROM `achievements_has_subaccounts` JOIN achievements ON achievements.Id = achievements_has_subaccounts.Achievements_Id WHERE SubAccounts_Id = 18
		$achiev = $this->db->fetchAll('SELECT achievements.Name, achievements.Id FROM ' . $this->getTableName() . ' JOIN achievements ON achievements.Id = ' . $this->getTableName() .'.Achievements_Id WHERE SubAccounts_Id = ?', array($subaccId));
		return $achiev;
	}
}