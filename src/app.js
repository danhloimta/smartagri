import './sass/app.scss';
require('./bootstrap');

let socket = io();
let socketio = io.connect('http://localhost:3000');

$('.btn-schedule').click(function() {
	$('#schedule').submit();
});

$('.btn-add-note').click(function(e) {
	e.preventDefault();
	var note = {};
	
	note.content = $('#content').val();
	note.kv = $('#area-name').val();
	note.user = $('#user-name').val();
	
	socket.emit("sent-note", note);
	$('#content').val('');
});

socket.on('show-mess', function(data) {
	var mess = `<li>
		<img src="/assets/img/user/default.png" class="img-circle pull-left avatar">
		<p> 
			<a href="#" > ${data.user} </a>
			${data.created_at}
			<span class="timestamp"> ${data.content} </span>
		</p>
		</li>
	`;
	$('#list-mess').prepend(mess);
});