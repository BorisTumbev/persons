
function reload_persons() {
	$.get('persons').done(function(data) {
		$('#persons').html(render_persons(data.persons));
		$('#persons-messages').html(render_messages(data.messages));
	}).fail(function(response) {
		var data = response.responseJSON;
		$('#persons-messages').html(render_messages(data.messages));
	});

}

function check_date() {
	$('.date').each(function(){
		// let yesterday = new Date(new Date().setDate(new Date().getDate()-1));
		let today = new Date();
		let dateTimeParts= $(this).text().split(/[- :]/); 
		dateTimeParts[1]--;
		
		let dateObject = new Date(...dateTimeParts); // our Date object
		let diff = (today - dateObject) / 3600000;
		if (diff > 552){
			$(this).attr('style', 'background-color: red !important');
		}
		else if (diff > 480){
			$(this).attr('style', 'background-color: yellow !important');
		}
		else {
			$(this).attr('style', 'background-color: green !important');
		}
	 });
}

function check_data_plates() {
	$('.data_plates').each(function(){
		let today = new Date();
		let dateTimeParts= $(this).text().split(/[- :]/); 
		dateTimeParts[1]--;
		
		let dateObject = new Date(...dateTimeParts); // our Date object
		let diff = (today - dateObject) / 3600000;
		if (diff > 2040){
			$(this).attr('style', 'background-color: red !important');
		}
		else if (diff > 1920){
			$(this).attr('style', 'background-color: yellow !important');
		}
		else {
			$(this).attr('style', 'background-color: green !important');
		}
	 });
}

function check_date2() {

	$('.date2').each(function(){
		let today = new Date();
		let dateTimeParts= $(this).text().split(/[- :]/); 
		dateTimeParts[1]--;
		
		let dateObject = new Date(...dateTimeParts); // our Date object
		let diff = (today - dateObject) / 3600000;
		if (diff > 43800){
			$(this).attr('style', 'background-color: yellow !important');
		}
		else {
			$(this).attr('style', 'background-color: green !important');
		}
	 });
}

$(document).ready(function() {
	
	reload_persons();

	$(document).on('click', 'a.persons-refresh', function() {
		// reload_persons();
		check_date();
		check_data_plates();
		check_date2();

		return false; // disables default browser behavior when a hyper-link is clicked.
	});

	$(document).on('click', 'a.person-add', function() {
		var new_person = { id: '', fname: '', lname: '',	date: '' };
		$('#person-edit').html(render_person_form(new_person));
		$('#person-messages').html('');
		return false;
	});

	$(document).on('click', 'a.person-edit', function() {
		var person_id = $(this).attr('data-person-id');
		$.get('persons/'+person_id).done(function(data) {
			$('#person-edit').html(render_person_form(data.person));	
			$('#person-messages').html(render_messages(data.messages));
		}).fail(function(response) {
			var data = response.responseJSON;
			$('#person-messages').html(render_messages(data.messages));
		});
		return false;
	});

	$(document).on('submit', '#person-edit > form', function() {
		var edited_person = $(this).serializeObject();
		$.postJSON('persons/' + edited_person.id, edited_person).done(function(data) {
			$('#person-edit').html('');
			$('#person-messages').html(render_messages(data.messages));
			reload_persons();
		}).fail(function(response) {
			var data = response.responseJSON;
			$('#person-messages').html(render_messages(data.messages));
		});
		return false;
	});

	$(document).on('click', 'a.person-delete', function() {
		var person_id = $(this).attr('data-person-id');
		$.delete('persons/' + person_id).done(function(data) {
			reload_persons();
			$('#person-messages').html(render_messages(data.messages));
		}).fail(function(response) {
			var data = response.responseJSON;
			$('#person-messages').html(render_messages(data.messages));
		});
		return false;
	});

});
