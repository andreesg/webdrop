/* Data Channel tests - Send file */

var panel = document.getElementById('panel');
var status_msg = document.getElementById('status_msg');
var packets = document.getElementById('packets');
var channel = new DataChannel();
var sendfile = document.getElementById('sendfile');

channel.firebase = 'webrtc-experiment';

channel.onmessage = function(data) {
    console.log("new message");
    console.log(data);
};

channel.onopen = function () {
    sendfile.disabled = false;
    status_msg.innerHTML = "Connected!";
    $("#packets").show();
};

channel.onFileProgress = function (packets) {
	appendPanel(packets.remaining + ' packets remaining.');
    if (packets.sent) {
        appendPanel(packets.sent + ' packets sent.');
    }
    if (packets.received) {
        appendPanel(packets.received + ' packets received.');
    }
};

channel.onFileReceived = function (fileName) {
	status_msg.innerHTML = "File received!";
};

channel.onFileSent = function (file) {
    appendPanel(file.name + ' sent.');
};

sendfile.onchange = function () {
    console.log("changed");
    var file = this.files[0];
    channel.send(file);
};

channel.onerror = function(event) {
    console.log(event);
    status_msg.innerHTML = "Error!";
};

channel.onclose = function(event) {
    status_msg.innerHTML = "Ports dropped!";
};

function openChannel() {
	console.log("try to open channel");
	channel.open('webdrop');
    console.log(channel);
}

function connectChannel() {
    console.log("try to connect");
	channel.connect('webdrop');
    console.log(channel);
}

function sendText(text) {
	channel.send(text);
}

function appendPanel(data, parent) {
    var html = data;
    html += "<br>" + panel.innerHTML;
    panel.innerHTML = html;
}


