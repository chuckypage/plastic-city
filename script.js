var interval = undefined;
$(document).ready(function () {
    interval = setInterval(getNext, 10000000); // milliseconds
    $('.console-forward').on('click', getNext);
    $('.console-back').on('click', getPrev);
});

function getNext() {
    var $curr = $('.slideshow img:visible'),
        $next = ($curr.next().length) ? $curr.next() : $('.slideshow img').first();

    transition($curr, $next);
}

function getPrev() {
    var $curr = $('.slideshow img:visible'),
        $next = ($curr.prev().length) ? $curr.prev() : $('.slideshow img').last();
    transition($curr, $next);
}

function transition($curr, $next) {
    clearInterval(interval);

    $next.css('z-index', 2).fadeIn('slow', function () {
        $curr.hide().css('z-index', 0);
        $next.css('z-index', 1);
    });
}

var currentAudio = 0;
var audioClasses = [ 'barbiehorse.mp3', 'powerbeauty.mp3', 'groove.m4a', 'beautiful.m4a', 'elevator.m4a', 'perfectbody.mp3'];
var songs = []

function prevAudio() {
	songs[currentAudio].pause();
	currentAudio -=1;
	if (currentAudio < 0) currentAudio = audioClasses.length -1;
	setAudio();
}

function nextAudio() {
	songs[currentAudio].pause();
	currentAudio += 1;
	if (currentAudio >= audioClasses.length) currentAudio = 0;
	setAudio();
}

function setAudio() {
		songs[currentAudio].play();


}

// generating audio elements for all songs
for (var i =0; i < audioClasses.length; ++i) {
	var currentSong = audioClasses[i]
	var audio = new Audio();
	audio.src= currentSong
	songs.push(audio)
}

setAudio();

$('.console-playback').click(function() {
	handlemessage({
	  sender: 'suhhh',
	  type: 'raw',
	  value: 8
	});
});
$('.console-playforward').click(function() {
	handlemessage({
	  sender: 'suhhh',
	  type: 'raw',
	  value: 10
	});
});

function handlemessage(data) {

	if (data.value == 0) {
		prevBg();

	} else if (data.value == 8) {
		prevAudio();
	} else if (data.value == 9) {
		prevAudio();
	} else if (data.value == 10) {
		nextAudio();
	} else if (data.value == 11) {
		nextAudio();
	} else if (data.value == 12) {
		nextAudio();
	}
}