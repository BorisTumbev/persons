// All these function render piece of HTML to plug into the DOM tree.
// The HTML can be plugged using $('#id').html(new_html);

function render_persons(persons) {
	var html = "<tr>"+
			"<th>ID</th>"+
			"<th>Име</th>"+
			"<th>Дата на Карта</th>"+
			"<th>Превозно средство(Тахограф)</th>"+
			"<th>Дата на Тахографа</th>"+
			"<th>Валидност на картата</th>"+
			"<th>Забележка</th>"+
			"<th></th>"+
		"</tr>";

	for(var i=0; i<persons.length; i++) {
		var p = persons[i];
		html += "<tr>" +
			"<td>" + p.id + "</td>" +
			"<td><a href='#' data-person-id='" + p.id + "' class='person-telephones'>" +
				html_escape(p.fname + " " + p.lname) +
			"</a></td>"+
			"<td class='date'>" + html_escape(p.date) + "</td>" +
			"<td>" + html_escape(p.plates) + "</td>" +
			"<td class='data_plates'>" + html_escape(p.data_plates) + "</td>" +
			"<td class='date2'>" + html_escape(p.date2) + "</td>" +
			"<td>" + html_escape(p.note) + "</td>" +
			"<td>" +
				"<a href='#' data-person-id='" + p.id + "' class='edit_icon person-edit'>Edit</a> " +
				"<a href='#' data-person-id='" + p.id + "' class='delete_icon person-delete'>Delete</a>" +
			"</td>" +
		"</tr>";
	}

	html = "<table class='grid'>"+html+"</table>";

	return html;
}

function render_person_form(person) {
	if(!person) return 'Empty person.';
	
	var html = '';
	var title = (person.id) ? 'Edit Person' : 'Add Person';
	
	html += "<h1>" + title + "</h1>";
	html += "<form action='#' method='post'>";
	html += "<p><label>ID</label><input name='id' value='" + html_escape(person.id) + "' readonly='readonly' /></p>";
	html += "<p><label>Име</label><input name='fname' value='" + html_escape(person.fname) + "'/></p>";
	html += "<p><label>Фамилия</label><input name='lname' value='" + html_escape(person.lname) + "'/></p>";
	html += "<p><label>Дата на Карта</label><input name='date' value='" + html_escape(person.date) + "'/></p>";
	html += "<p><label>Превозно средство(Тахограф)</label><input name='plates' value='" + html_escape(person.plates) + "'/></p>";
	html += "<p><label>Дата на Тахографа</label><input name='data_plates' value='" + html_escape(person.data_plates) + "'/></p>";
	html += "<p><label>Валидност на картата</label><input name='date2' value='" + html_escape(person.date2) + "'/></p>";
	html += "<p><label>Забележка</label><input class='note' name='note' value='" + html_escape(person.note) + "'/></p>";
	html += "<p><button>Запази</button></p>";
	html += "</form>";
	
	return html;
}


function render_messages(messages) {
	var html = '';
	if(messages) {	
		for(var i = 0; i < messages.length; i++) {
			var m = messages[i];
			var css = (m.type === 'error') ? 'error_icon' : 'info_icon';
			html += "<p class='" + css + "'>" + m.text + "</p>";
		}
	}
	return html;
}

	
function html_escape(val) {
	return (val+'')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/\'/g, '&apos;');
}

