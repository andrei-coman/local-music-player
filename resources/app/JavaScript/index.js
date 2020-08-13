/**
 * Disable scroll with space key
 */
window.onkeydown = function(e) { 
	return !(e.keyCode == 32 && e.target == document.body);
};

/**
 * Formats time from seconds to mins:secs
 * @param {Number} seconds The time in seconds
 * @return {String}        The corresponding formated time
 */
function FormatTime(seconds){
	return (Math.floor(seconds / 60) < 10 ? "0" : "") + Math.floor(seconds / 60) + ":" + (seconds % 60 < 10 ? "0" : "") + seconds % 60;
}

/**
 * Instantiates a div
 * @param {String}  _className The div's class
 * @param {String}  _id        The div's id
 * @param {element} _parent    The div's parent in the page hierarchy
 * @return {element}           The instantiated div
 */
function CreateDiv(_className, _id, _parent){
	var newDiv = document.createElement("div");
	newDiv.className = _className;
	newDiv.id = _id;
	if(_parent != null) _parent.appendChild(newDiv);
	return newDiv;
}
/**
 * Instantiates an image
 * @param {String}  _className The img's class
 * @param {String}  _id        The img's id
 * @param {String}  _src       The img's path
 * @param {element} _parent    The img's parent in the page hierarchy
 * @return {element}           The instantiated img
 */
function CreateImg(_className, _id, _src, _parent){
	var newImg = document.createElement("img");
	newImg.className = _className;
	newImg.id = _id;
	newImg.src = _src;
	if(_parent != null) _parent.appendChild(newImg);
	return newImg;
}

/**
 * Adds a hover highlight to a button
 * @param {String} id   The button's id
 * @param {Number} high The max opacity
 * @param {Number} low  The min opacity
 */
function addButtonHighlight(id, high, low){
	$("#" + id).hover(function(){ElemId(id).style.opacity = high;},
			         	function(){ElemId(id).style.opacity = low;});
}

/**
 * Creates the menu button for the Artists page
 */
function InitArtistsButton(){
	var artistsButtonBackground = CreateDiv("PlaylistItemBackground", "ArtistsButtonBackground", ElemId("ArtistsButton"));
	var artistsIcon = CreateImg("", "ArtistsIcon", "img/artistsIcon.png", ElemId("ArtistsButton"));
	var artistsTextBox = CreateDiv("TextBox", "ArtistsTextBox", ElemId("ArtistsButton"));
	var artistsFileNameBox = CreateDiv("FileNameBox", "ArtistsFileNameBox", artistsTextBox);
	artistsFileNameBox.style.color = "#ffffff";
	var artistsFileNameBoxCell = CreateDiv("FileNameBoxCell", "ArtistsFileNameBoxCell", artistsFileNameBox);
	artistsFileNameBoxCell.innerHTML = "Artists";
	
	$("#ArtistsButton").hover(function(){artistsButtonBackground.style.opacity = 0.5;}, 
	                          function(){artistsButtonBackground.style.opacity = 0.0;});
	$("#ArtistsButton").click(function(){ChangeState(STATEARTISTS);});
}
/**
 * Creates the menu button for the User Playlists page
 */
function InitAdhocButton(){
	var adhocButtonBackground = CreateDiv("PlaylistItemBackground", "AdhocButtonBackground", ElemId("AdhocButton"));
	var adhocIcon = CreateImg("", "AdhocIcon", "img/disc.png", ElemId("AdhocButton"));
	var adhocTextBox = CreateDiv("TextBox", "AdhocTextBox", ElemId("AdhocButton"));
	var adhocFileNameBox = CreateDiv("FileNameBox", "AdhocFileNameBox", adhocTextBox);
	adhocFileNameBox.style.color = "#ffffff";
	var adhocFileNameBoxCell = CreateDiv("FileNameBoxCell", "AdhocFileNameBoxCell", adhocFileNameBox);
	adhocFileNameBoxCell.innerHTML = "Coming Soon";
	
	$("#AdhocButton").hover(function(){adhocButtonBackground.style.opacity = 0.5;}, 
	                        function(){adhocButtonBackground.style.opacity = 0.0;});
	$("#AdhocButton").click(function(){/*ChangeState(STATEARTISTS);*/});
}
/**
 * Creates the menu button for the Settings page
 */
function InitSettingsButton(){
	var settingsButtonBackground = CreateDiv("PlaylistItemBackground", "SettingsButtonBackground", ElemId("SettingsButton"));
	var settingsIcon = CreateImg("", "SettingsIcon", "img/settingsIcon.png", ElemId("SettingsButton"));
	var settingsTextBox = CreateDiv("TextBox", "SettingsTextBox", ElemId("SettingsButton"));
	var settingsFileNameBox = CreateDiv("FileNameBox", "SettingsFileNameBox", settingsTextBox);
	settingsFileNameBox.style.color = "#ffffff";
	var settingsFileNameBoxCell = CreateDiv("FileNameBoxCell", "SettingsFileNameBoxCell", settingsFileNameBox);
	settingsFileNameBoxCell.innerHTML = "Settings";
	
	$("#SettingsButton").hover(function(){settingsButtonBackground.style.opacity = 0.5;}, 
	                           function(){settingsButtonBackground.style.opacity = 0.0;});
	$("#SettingsButton").click(function(){
		ChangeState(STATESETTINGS);
	});
}

/**
 * Shuffle play a certain album from an artist
 * @param {String} artist The artist name
 * @param {String} album  The album name
 */
function ShufflePlay(artist, album){
	var ind = Math.floor(Math.random() * artistsP[artist].playlists[album].songs.length);
	initAudioTrack(ind, 1);
	if(shuffle == 0){
		shuffle = 1;
		ElemId("Shuffle0Button").style.display = "none";
		ElemId("Shuffle1Button").style.display = "block";
	}
	CreateRandom(ind);
	currentIndex = 0;
}

/**
 * Creates a playlist item (i.e. song in an album)
 * @param {Song} song    The song to be represented by the item
 * @param {Number} index The song's index in the displayed playlist
 */
function CreatePlaylistItem(song, index){
	var _id = "PlaylistItem" + index;
	var _playid = "PlayButtonSmall" + index;
	var _pauseid = "PauseButtonSmall" + index;
	
	var container = CreateDiv("PlaylistItem ", _id, ElemId("Playlist")); //the item's entire container
	container.dataset.divNo = index;
	var playlistItemBackground = CreateDiv("PlaylistItemBackground", "PlaylistItemBackground" + index, container); //the container's opacity-changing background
	var smallPlay = CreateImg("PlayButtonSmall", "PlayButtonSmall" + index, "img/play_small.png", container); //the small Play button of the item
	smallPlay.dataset.divNo = index;
	var smallPause = CreateImg("PauseButtonSmall", "PauseButtonSmall" + index, "img/pause_small.png", container); //the small Pause button of the item
	smallPause.dataset.divNo = index;
	
	var textBox = CreateDiv("TextBox", "TextBox" + index, container);
	var fileNameBox = CreateDiv("FileNameBox", "FileNameBox" + index, textBox);
	fileNameBox.color = COLOR_IDLE;
	var fileNameBoxCell = CreateDiv("FileNameBoxCell", "", fileNameBox); //the song's name
	fileNameBoxCell.innerHTML = song.title;
	var detailsBox = CreateDiv("DetailsBox", "DetailsBox" + index, textBox);
	var detailsBoxCell = CreateDiv("FileNameBoxCell", "", detailsBox); //the song's details
	detailsBoxCell.innerHTML = song.album + " &nbsp;&nbsp;&#8226;&nbsp;&nbsp; " + song.artist;
	var lengthBox = CreateDiv("LengthBox", "LengthBox" + index, textBox);
	var lengthBoxCell = CreateDiv("LengthBoxCell", "", lengthBox); //the song's length
	lengthBoxCell.innerHTML = FormatTime(song.length);
	
	$('#' + _id).hover(function(){playlistItemBackground.style.opacity = 0.5;}, 
	                   function(){playlistItemBackground.style.opacity = 0.0;});
	$('#' + _id).dblclick(function(){
		initAudioTrack(ElemId(_id).dataset.divNo, 1);
		if(shuffle){
			initAudioTrack(ElemId(_id).dataset.divNo, 1);
			CreateRandom(ElemId(_id).dataset.divNo);
			currentIndex = 0;
		}
	});
	$('#' + _playid).click(function(){
		if(audio.readyState == 0)
			initAudioTrack(ElemId(_playid).dataset.divNo, 1);
		else{
			if(currentState.equals(viewState)){
				if(playlist[currentIndex] != ElemId(_playid).dataset.divNo)
					initAudioTrack(ElemId(_playid).dataset.divNo, 1);
			}
			else
				initAudioTrack(ElemId(_playid).dataset.divNo, 1);
		}
		ElemId(_playid).style.display = "none";
		ElemId(_pauseid).style.display = "block";
		audio.play();
	});
	$('#' + _pauseid).click(function(){
		ElemId(_pauseid).style.display = "none";
		ElemId(_playid).style.display = "block";
		audio.pause();
	});
}
/**
 * Creates the playlist page corresponding to the current viewstate (for which state = STATEPLAYLIST)
 */
function CreatePagePlaylist(){
	//the page's gradient background
	ElemId("BackgroundPicture").src = "img/gradient2.png";
	ElemId("BackgroundPicture").style.opacity = 0.90;
	
	var playlistInfo = CreateDiv("", "PlaylistInfo", HTMLContent); //the left side of the page, containing info
	var playlistPic; //the album's picture
	if(viewState.album == "All tracks") playlistPic = CreateImg("", "PlaylistPic", "img/albums/all.jpg", playlistInfo);
	else playlistPic = CreateImg("", "PlaylistPic", "img/albums/" + viewState.artist + " - " + viewState.album + ".jpg", playlistInfo);
	
	var line = CreateImg("", "Line", "img/white.png", playlistInfo);
	var playlistName = CreateDiv("", "PlaylistName", playlistInfo); //the name of the album
	playlistName.innerHTML = viewState.album;
	var playlistArtist = CreateDiv("", "PlaylistArtist", playlistInfo); //the album artist
	playlistArtist.innerHTML = viewState.artist;
	var playlistLength = CreateDiv("", "PlaylistLength", playlistInfo); //the formated album length
	var TotalTime = 0.0;
	for(index = 0; index < artistsP[viewState.artist].playlists[viewState.album].songs.length; index++)
		TotalTime += artistsP[viewState.artist].playlists[viewState.album].songs[index].length;
	playlistLength.innerHTML = artistsP[viewState.artist].playlists[viewState.album].songs.length + " songs" + " &nbsp;&nbsp;&#8226;&nbsp;&nbsp; " + "Total time: " + FormatTime(TotalTime);
	
	var shufflePlayImg = CreateImg("", "ShufflePlayImg", "img/shuffleplay.png", playlistInfo); //shuffle play album button
	var shufflePlayText = CreateDiv("", "ShufflePlayText", playlistInfo);
	shufflePlayText.innerHTML = "SHUFFLE PLAY";
	$("#ShufflePlayImg").hover(function(){shufflePlayImg.style.opacity = 1.0;},
			                  	function(){shufflePlayImg.style.opacity = 0.7;});
	$("#ShufflePlayText").hover(function(){shufflePlayImg.style.opacity = 1.0;},
			                   	function(){shufflePlayImg.style.opacity = 0.7;});
	$("#ShufflePlayImg").click(function(){ShufflePlay(viewState.artist, viewState.album);});
	$("#ShufflePlayText").click(function(){ShufflePlay(viewState.artist, viewState.album);});
	
	$("#PlaylistArtist").click(function(){ChangeState(STATEALBUMS);});
	
	var pt = CreateDiv("", "Playlist", ElemId("HTMLContent"));
	var buffer = CreateDiv("", "Buffer", pt); //bnak space above all the items, has the same dimensions as any other item
	
	for(index = 0; index < artistsP[viewState.artist].playlists[viewState.album].songs.length; index++)
		CreatePlaylistItem(artistsP[viewState.artist].playlists[viewState.album].songs[index], index);
	
	if(currentState.equals(viewState)){ //if the currently displayed page is playing, add visual queues
		ElemId("FileNameBox" + playlist[currentIndex]).style.color = COLOR_PLAYING;
		if(audio.paused){
			ElemId("PlayButtonSmall" + playlist[currentIndex]).style.display = "block";
			ElemId("PauseButtonSmall" + playlist[currentIndex]).style.display = "none";
		}
		else{
			ElemId("PlayButtonSmall" + playlist[currentIndex]).style.display = "none";
			ElemId("PauseButtonSmall" + playlist[currentIndex]).style.display = "block";
		}
	}
}

/**
 * Creates an artist item (i.e. band in the Artists page)
 * Has the same general specifications as a Playlist Item
 * @param {Artist} artist The artist to be represented by the item
 * @param {Number} index  The artist's index in the list of artists
 */
function CreateArtistItem(artist, index){
	var _id = "ArtistItem" + index;
	
	var container = CreateDiv("PlaylistItem", _id, HTMLContent);
	container.dataset.divNo = index;
	var artistItemBackground = CreateDiv("PlaylistItemBackground", "ArtistItemBackground" + index, container);
	
	var textBox = CreateDiv("TextBox", "TextBox" + index, container);
	var fileNameBox = CreateDiv("FileNameBox", "FileNameBox" + index, textBox);
	fileNameBox.color = COLOR_IDLE;
	var fileNameBoxCell = CreateDiv("FileNameBoxCell", "", fileNameBox);
	fileNameBoxCell.innerHTML = artist.name;
	var detailsBox = CreateDiv("DetailsBox", "DetailsBox" + index, textBox);
	var detailsBoxCell = CreateDiv("FileNameBoxCell", "", detailsBox);
	
	$('#' + _id).hover(function(){artistItemBackground.style.opacity = 0.5;},
					   function(){artistItemBackground.style.opacity = 0.0;});
	
	if(artist.name == "Shuffle play all tracks!"){
		detailsBoxCell.innerHTML = artist.countS + " song" + (artist.countS == 1 ? "" : "s");
		$('#' + _id).click(function(){
			ShufflePlay("Shuffle play all tracks!", "All tracks");
		});
	}
	else{
		detailsBoxCell.innerHTML = (artist.countS / 2) + " song" + (artist.countS / 2 == 1 ? "" : "s") + " &nbsp;&nbsp;&#8226;&nbsp;&nbsp; " + (artist.countP - 1) + " album" + (artist.countP - 1 == 1 ? "" : "s");
		
		$('#' + _id).click(function(){
			viewState.artist = artist.name;
			ChangeState(STATEALBUMS);
		});
	}
}
/**
 * Creates the playlist page corresponding to the current viewstate (for which state = STATEARTISTS)
 */
function CreatePageArtists(){
	ElemId("BackgroundPicture").src = "";
	ElemId("BackgroundPicture").style.opacity = 1.0;

	var buffer = CreateDiv("", "Buffer", HTMLContent);
	
	var index = 0;
	for(const artist in artistsP){
		CreateArtistItem(artistsP[artist], index);
		index++;
	}
}

/**
 * Creates an album item (i.e. album in an artist's discography)
 * Has the same general specifications as a Playlist Item
 * @param {Playlist} playlist The album to be represented by the item
 * @param {Number}   index    The album's index in the list of albums
 */
function CreateAlbumItem(playlist, index){
	var _id = "AlbumItem" + index;
	
	var albumItem = CreateDiv("AlbumItem", "AlbumItem" + index, ElemId("AlbumItemContainer"));
	albumItem.dataset.divNo = index;
	var albumPic;
	if(playlist.name == "All tracks") albumPic = CreateImg("AlbumPic", "AlbumPic" + index, "img/albums/all.jpg", ElemId("AlbumItem" + index));
	else albumPic = CreateImg("AlbumPic", "AlbumPic" + index, "img/albums/" + viewState.artist + " - " + playlist.name + ".jpg", ElemId("AlbumItem" + index));
	var albumTitle = CreateDiv("AlbumTitle", "AlbumTitle" + index, ElemId("AlbumItem" + index));
	var albumTitleText = CreateDiv("AlbumTitleText", "AlbumTitleText" + index, ElemId("AlbumTitle" + index));
	albumTitleText.innerHTML = playlist.name;
	
	$('#' + _id).hover(function(){ElemId(_id).style.background = "rgba(255, 255, 255, 0.1)";}, 
	                   function(){ElemId(_id).style.background = "rgba(255, 255, 255, 0.0)";});
	$('#' + _id).click(function(){
		viewState.album = playlist.name;
		ChangeState(STATEPLAYLIST);
	});
}
/**
 * Creates the albums page corresponding to the current viewstate (for which state = STATEALBUMS)
 */
function CreatePageAlbums(){
	ElemId("BackgroundPicture").src = "";
	ElemId("BackgroundPicture").style.opacity = 1.0;
	
	var artistBigPic = CreateDiv("", "ArtistBigPic", HTMLContent);
	var artistBigPicInterior = CreateImg("", "ArtistBigPicInterior", "img/artists/" + viewState.artist + ".jpg", artistBigPic);
	$("#ArtistBigPicInterior").on('load', function(){ resize();});
	var artistName = CreateDiv("", "ArtistName", HTMLContent);
	var artistNameText = CreateDiv("", "ArtistNameText", artistName);
	artistNameText.innerHTML = viewState.artist;
	var line = CreateImg("", "Line", "img/white.png", HTMLContent);
	var albumItemContainer = CreateDiv("", "AlbumItemContainer", HTMLContent);
	
	var index = 0;
	for(const playlist in artistsP[viewState.artist].playlists){
		CreateAlbumItem(artistsP[viewState.artist].playlists[playlist], index);
		index++;
	}
}

/**
 * Creates the Settings page
 * Currently only contains a form for the music directory's path
 */
function CreatePageSettings(){
	var input = document.createElement("INPUT");
	input.type = "text";
	input.size = 40;
	input.placeholder = " Enter the path to your files! (ex: D:\\Music)"
	input.id = "input";
	input.style.position = "absolute";
	HTMLContent.appendChild(input);
	
	var submitButton = CreateDiv("", "SubmitButton", HTMLContent);
	var submitButtonBackground = CreateDiv("", "SubmitButtonBackground", ElemId("SubmitButton"));
	var submitTextBox = CreateDiv("TextBox", "SubmitTextBox", ElemId("SubmitButton"));
	var submitFileNameBox = CreateDiv("FileNameBox", "SubmitFileNameBox", submitTextBox);
	submitFileNameBox.style.color = "#ffffff";
	var submitFileNameBoxCell = CreateDiv("FileNameBoxCell", "SubmitFileNameBoxCell", submitFileNameBox);
	submitFileNameBoxCell.innerHTML = ">> Load Tracks";
	
	var blurImg = CreateDiv("", "BlurImg", document.getElementById("Body"));
	var loading = CreateImg("", "LoadingGif", "img/loading.gif", HTMLContent);
	
	$('#SubmitButton').hover(function(){submitButtonBackground.style.opacity = 0.7;}, 
   	                         function(){submitButtonBackground.style.opacity = 1.0;});
	$("#SubmitButton").click(async function(){
		var path = input.value;
		input.value = "";
		ElemId("BlurImg").style.display = "block"; //blur the background
		ElemId("LoadingGif").style.display = "block"; //add a gif of a duck for loading screen :)
		$('body').css("pointer-events", "none");
		
		//call a Visual C# script to retreive music files from directory
		const exec = require('child_process').exec;
		function execute(command, callback) {
			exec(command, (error, stdout, stderr) => { 
				callback(stdout); 
			});
		};
		execute("cd resources/app && start WindowsFormsApp2.exe \"" + path + "\"", async (output) => {
			setTimeout(function(){
				ElemId("BlurImg").style.display = "none";
				ElemId("LoadingGif").style.display = "none";
				$('body').css("pointer-events", "auto");
				window.location.reload(true);
			}, 2000);
		});
	});
}
/**
 * Clears the dynamic section of the page
 */
function DeletePage(){
	$("#HTMLContent").empty();
}

//Create the menu buttons
InitArtistsButton();
InitAdhocButton();
InitSettingsButton();

//Attempt to process the music files, catch any error
try{
	ProcessData();
}
catch(err){
	console.log(err);
	DeletePage();
}
initAudio();
ChangeState(STATEARTISTS);