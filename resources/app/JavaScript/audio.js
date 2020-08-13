const COLOR_PLAYING = "#ff0000";
const COLOR_IDLE = "#ffffff";
const MAX_PLAYLIST = 100000;

const playlist = []; //permutation of the current playlist
var currentIndex = 0; //current index in permutation
var loop = 0, shuffle = 0; //state variables
/**
 * Generate identity permutation
 */
function CreateNormal(){
	for(i = 0; i < MAX_PLAYLIST; i++)
		playlist[i] = i;
}
/**
 * Generate random permutation starting with an index
 * @param {Number} startIndex First index of the permutation
 */
function CreateRandom(startIndex){
	CreateNormal();
	[playlist[0], playlist[startIndex]] = [playlist[startIndex], playlist[0]];
	for(i = 1; i < artistsP[currentState.artist].playlists[currentState.album].songs.length; i++){
		rem = artistsP[currentState.artist].playlists[currentState.album].songs.length - i;
		j = i + Math.floor(Math.random() * MAX_PLAYLIST) % rem;
		[playlist[i], playlist[j]] = [playlist[j], playlist[i]];
	}
}

var audio = new Audio(); //audio variable

/**
 * play currently loaded audio file
 * handle visual queues
*/
function audioPlay(){
	audio.play();
	ElemId("PlayButton").style.display = "none";
	ElemId("PauseButton").style.display = "block";
	if(currentState.equals(viewState)){
		ElemId("PlayButtonSmall" + playlist[currentIndex]).style.display = "none";
		ElemId("PauseButtonSmall" + playlist[currentIndex]).style.display = "block";
	}
}
/**
 * pause currently loaded audio file
 * handle visual queues
*/
function audioPause(){
	audio.pause();
	ElemId("PlayButton").style.display = "block";
	ElemId("PauseButton").style.display = "none";
	if(currentState.equals(viewState)){
		ElemId("PlayButtonSmall" + playlist[currentIndex]).style.display = "block";
		ElemId("PauseButtonSmall" + playlist[currentIndex]).style.display = "none";
	}
}

/**
 * Initialize unconstrained playbar functionalities
 */
function initAudio(){
	//playbar auto-update
	audio.addEventListener("timeupdate", function(){
		var mins = Math.floor(audio.currentTime / 60).toString();
		var secs = Math.floor(audio.currentTime % 60).toString();
		if(mins != "NaN" && secs != "NaN") ElemId("CurrentTimeCell").innerHTML = mins + ":" + ("0" + secs).slice(-2);
		
		var mins = Math.floor(audio.duration / 60).toString();
		var secs = Math.floor(audio.duration % 60).toString();
		if(mins != "NaN" && secs != "NaN") ElemId("TotalTimeCell").innerHTML = mins + ":" + ("0" + secs).slice(-2);
		
		ElemId("Hp_range").style.width = ($(window).width() - window.screen.width * 20.0 / 100.0) * 63.0 / 100.0 * audio.currentTime / audio.duration + "px";
	});
	
	//continue to the next audio file in playlist when current audio ends
	audio.addEventListener("ended", function(){
		var newIndex;
		if(loop == 0){
			if(currentIndex == artistsP[currentState.artist].playlists[currentState.album].songs.length - 1){
				audioPause();
				return;
			}
			newIndex = (currentIndex + 1);
		}
		else if(loop == 1) newIndex = (currentIndex + 1) % artistsP[currentState.artist].playlists[currentState.album].songs.length;
		else if(loop == 2) newIndex = currentIndex;
		
		initAudioTrack(newIndex, 0);
	});
	
	//enable visual queues and functionalities for repeat/shuffle
	addButtonHighlight("Repeat0Button", 1.0, 0.7);
	addButtonHighlight("Repeat1Button", 1.0, 0.7);
	addButtonHighlight("Repeat2Button", 1.0, 0.7);
	addButtonHighlight("Shuffle0Button", 1.0, 0.7);
	addButtonHighlight("Shuffle1Button", 1.0, 0.7);
	$("#Repeat0Button").click(function(){
		ElemId("Repeat0Button").style.display = "none";
		ElemId("Repeat1Button").style.display = "block";
		loop = (loop + 1) % 3;
	});
	$("#Repeat1Button").click(function(){
		ElemId("Repeat1Button").style.display = "none";
		ElemId("Repeat2Button").style.display = "block";
		loop = (loop + 1) % 3;
	});
	$("#Repeat2Button").click(function(){
		ElemId("Repeat2Button").style.display = "none";
		ElemId("Repeat0Button").style.display = "block";
		loop = (loop + 1) % 3;
	});
	$("#Shuffle0Button").click(function(){
		shuffle = 1;
		ElemId("Shuffle0Button").style.display = "none";
		ElemId("Shuffle1Button").style.display = "block";
		CreateRandom(currentIndex);
		currentIndex = 0;
	});
	$("#Shuffle1Button").click(function(){
		shuffle = 0;
		ElemId("Shuffle1Button").style.display = "none";
		ElemId("Shuffle0Button").style.display = "block";
		currentIndex = playlist[currentIndex];
		CreateNormal();
	});
}

/**
 * Manually change audio progress-bar
 */
function changeCurrentTime(event){
	var left = ($(window).width() - window.screen.width * 20.0 / 100.0) * 18.5 / 100.0;
	var baseleft = window.screen.width * 20.0 / 100.0;
	var lgth = ($(window).width() - window.screen.width * 20.0 / 100.0) * 63.0 / 100.0;
	var newWidth = (event.clientX - left - baseleft) / lgth;
	audio.currentTime = audio.duration * newWidth;
	ElemId("Hp_range").style.width = lgth * newWidth + "px";
}

/**
 * Initialize constrained playbar functionalities
 */
var audioButtons = 0;
function initAudioButtons(){
	audioButtons = 1;
	
	addButtonHighlight("PlayButton", 1.0, 0.7);
	addButtonHighlight("PauseButton", 1.0, 0.7);
	addButtonHighlight("BackwardButton", 1.0, 0.7);
	addButtonHighlight("ForwardButton", 1.0, 0.7);
	
	$("#PlayButton").click(audioPlay);
	$("#PauseButton").click(audioPause);
	document.body.onkeyup = function(e){
		if(e.keyCode == 32){
			if(audio.paused) audioPlay();
			else audioPause();
		}
	}
	
	$("#ForwardButton").click(function(){
		audioPlay();
		audio.currentTime = audio.duration - 0.05;
	});
	$("#BackwardButton").click(function(){
		audio.currentTime = 0;
	});
	$("#BackwardButton").dblclick(function(){
		if(currentIndex == 0)	return;
		initAudioTrack(currentIndex - 1, 0);
	});
	
	$("#Hp_slide").click(function(event){changeCurrentTime(event);});
	$("#Hp_range").click(function(event){changeCurrentTime(event);});
}

/**
 * Initialize new audio tracks
 * @param	{Number}  index  The index of the new tracks
 * @param {Boolean} change States if the change comes from a user interaction or now
                           If change is 0, the index is the (virtual) index in the generated (random permutation) playlist
						   If change is 1, the index is the (real) index in the visible (identity permutation) playlist
 */
function initAudioTrack(index, change){
	if(!audioButtons) initAudioButtons(); //initialize constrained buttons
	
	audioPause();
	if(currentState.equals(viewState)) //if the old audio is visible, handle visual queues
		ElemId("FileNameBox" + playlist[currentIndex]).style.color = COLOR_IDLE;
	if(change){
		CreateNormal(); //create identity permutation
		if(viewState.state == STATEARTISTS){ //event triggered by "suffle play all button"
			currentState.state = STATEARTISTS;
			currentState.album = "All tracks";
			currentState.artist = "Shuffle play all tracks!";
		}
		else currentState = new stateClass(viewState);
	}
	
	//load song and check validity
	currentIndex = -(-index);
	audio.src = artistsP[currentState.artist].playlists[currentState.album].songs[playlist[index]].path;
	const fs = require('fs')
	if(!fs.existsSync(artistsP[currentState.artist].playlists[currentState.album].songs[playlist[index]].path)){
		alert("The file " + artistsP[currentState.artist].playlists[currentState.album].songs[playlist[index]].path + " doesn't exist.");
	}

	//change playbar redirect buttons
	$("#SongInfoPic").click(function(){
		viewState.artist = artistsP[currentState.artist].playlists[currentState.album].songs[playlist[index]].artist;
		viewState.album = artistsP[currentState.artist].playlists[currentState.album].songs[playlist[index]].album;
		ChangeState(STATEPLAYLIST);
	});
	$("#SongDetails").click(function(){
		viewState.artist = artistsP[currentState.artist].playlists[currentState.album].songs[playlist[index]].artist;
		ChangeState(STATEALBUMS);
	});
	
	audioPlay();
	//change visual queues
	if(currentState.equals(viewState))
		ElemId("FileNameBox" + playlist[currentIndex]).style.color = COLOR_PLAYING;
	ElemId("SongInfoPic").src = "img/albums/" + artistsP[currentState.artist].playlists[currentState.album].songs[playlist[index]].artist + " - " + artistsP[currentState.artist].playlists[currentState.album].songs[playlist[index]].album + ".jpg";
	ElemId("SongTitleText").innerHTML = artistsP[currentState.artist].playlists[currentState.album].songs[playlist[currentIndex]].title;
	ElemId("SongDetailsText").innerHTML = artistsP[currentState.artist].playlists[currentState.album].songs[playlist[currentIndex]].artist;
	document.title = ElemId("SongDetailsText").innerHTML + " - " + ElemId("SongTitleText").innerHTML;
}
