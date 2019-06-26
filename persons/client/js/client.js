
function reload_persons() {
	$.get('persons').done(function(data) {
		$('#persons').html(render_persons(data.persons));
		$('#persons-messages').html(render_messages(data.messages));
	}).fail(function(response) {
		var data = response.responseJSON;
		$('#persons-messages').html(render_messages(data.messages));
	});

}

$(document).ready(function() {
	
	reload_persons();

	$(document).on('click', 'a.persons-refresh', function() {
		// reload_persons();
		$('.date').each(function(){
			
			var yesterday = new Date(new Date().setDate(new Date().getDate()-1));
			// var yesterday =(function(d){ d.setDate(d.getDate()-1); return d})(new Date)
			var today = new Date();

			let dateTimeParts= $(this).text().split(/[- :]/); 
			dateTimeParts[1]--;
			
			var dateObject = new Date(...dateTimeParts); // our Date object
			var diff = (today - dateObject) / 3600000;
			if (diff > 672){
				$(this).attr('style', 'background-color: red !important');
			}
			else {
				$(this).attr('style', 'background-color: green !important');
			}

		 });
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
