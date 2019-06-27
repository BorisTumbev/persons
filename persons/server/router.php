<?php

// Route URL paths
if($request->get('persons')) {
	$response->persons = $db->querybind_all('SELECT * FROM persons ORDER BY id');
}
else if($request->get('persons/[0-9]+')) {
	$person_id = (int) $request->segment(1);
	$response->person = $db->querybind_one('SELECT * FROM persons WHERE id = ?', [ $person_id ]);
	if(!$response->person) {
		$response->code(404);
		$response->error('404: Person Not Found.');
	}
}
else if($request->post('persons/[0-9]+') || $request->post('persons')) {
	$person_id = (int) $request->segment(1, 0);
	$person = $request->data;
	if($person) {	
		if(strlen($person->fname) < 1) $response->error('First Name is empty.');
		if(strlen($person->lname) < 1) $response->error('Last Name is empty.');
		// if(strlen($person->address) < 3) $response->error('Address is shorter then 3 characters.');
	}
	else {
		$response->error('No JSON data sent.');
	}
	
	if($response->hasErrors()) {
		$response->code(400);
		$response->error('400: Invalid input.');
	}
	else {
		if($person_id > 0) { // update existing
			$result = $db->querybind(
				'UPDATE persons SET fname=?, lname=?, date=?, date2=?, note=?, plates=?, data_plates=? WHERE id=?', 
				[$person->fname, $person->lname, $person->date, $person->date2, $person->note, $person->plates, $person->data_plates, $person_id]
			);
		} else { // insert new
			$result = $db->querybind(
				'INSERT INTO persons SET fname=?, lname=?, date=?, date2=?, note=?, plates=?, data_plates=?', 
				[$person->fname, $person->lname, $person->date, $person->date2, $person->note, $person->plates, $person->data_plates] 
			);
			$person_id = $db->insert_id;
		}
		
		$response->person = $db->querybind_one('SELECT * FROM persons WHERE id = ?', [$person_id]);
		$response->info('Person saved.');	
	}
}
else if($request->delete('persons/[0-9]+')) {
	$person_id = (int) $request->segment(1);
	$db->querybind('DELETE FROM persons WHERE id = ?', [$person_id] );
	$response->info("Person id=$person_id is deleted.");
}
else {
	$response->error('404: URL Not Found: /'.$request->path);
	$response->code(404);
}

// Outputs $response object as JSON to the client.
echo $response->render();