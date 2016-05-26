<?php

namespace skeleton\Repositories;

class ExampleRepository extends BaseRepository 
{
	/**
	 * Returns the name of the table used in this repository
	 * @return string The table name
	 *
	 * IMPORTANT: This method is used in BaseRepository, it must be implemented in every child
	 */
	public function getTableName() {
		return 'examples';
	}
}