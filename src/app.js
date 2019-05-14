import './sass/app.scss';
require('./bootstrap');

let socket = io();
let socketio = io.connect('http://localhost:3000');

$('.btn-schedule').click(function() {
	$('#schedule').submit();
});

// send message to server when click button
$('.btn-add-note').click(function(e) {
	e.preventDefault();
	var note = {};
	
	note.content = $('#content').val();
	note.kv = $('#area-name').val();
	note.user = $('#user-name').val();
	
	socket.emit("sent-note", note);
	$('#content').val('');
});

//show message when servern response
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

//Handle event when click button On/Off
$('.mbom').click(function() {
    var status = $(this).attr('data-status');
    var data = null;
    if (status == 'off') {
        data = 'on';
    } else {
        data = 'off';
    }

    $(this).attr('data-status', data);
    console.log(data);

    socket.emit('click_mbom', data);
});

socket.on('mbom-res', function(data) {
    console.log(data);
    if (data.status == 'on success') {
        $('.mbom').removeClass('off');
        $('.mbom').text('Bật');
    } else {
        $('.mbom').addClass('off');
        $('.mbom').text('Tắt');
    }
});

socket.on('show-info', function(data) {
    $('.doam').text(function() {
        $('.doam').text('');
        $('.doam').text(data.random);
    })
});
