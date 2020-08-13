//Note: there are so many constants in this script that hard-coding them was the best solution :)
//Opted for Js instead of CSS because it is easier to relate to other elements

/**
 * Get an element by id
 */
function ElemId(id){
	return document.getElementById(id);
}
/**
 * Get the dimension in pixels of a string in "#px" format
 */
function CropPX(str){
	return str.substring(0, str.length - 2);
}

var wWidth;
var wHeight;
var sHeight;
var sWidth;

const CRIT_RATIO = 1.0; //ratio for screen redimensioning

function LargeButtonStandard(id){
	ElemId(id).style.top = sHeight * 0.875 / 100.0 + "px";
	ElemId(id).style.height = sHeight * 3.5 / 100.0 + "px";
	ElemId(id).style.width = ElemId(id).style.height;
}
function SmallButtonStandard(id){
	ElemId(id).style.top = sHeight * 1.5 / 100.0 + "px";
	ElemId(id).style.height = sHeight * 2.0 / 100.0 + "px";
	ElemId(id).style.width = "auto";
}

/**
 * Resize all the elements in the playbar
 */
function ResizePlaybar(){
	ElemId("Playbar").style.height = sHeight * 8.75 / 100.0 + "px";
	ElemId("Playbar").style.top = (wHeight - CropPX(ElemId("Playbar").style.height)) + "px";

	ElemId("SongInfo").style.height = ElemId("Playbar").style.height;
			
	ElemId("SongTitle").style.height   = sHeight * 2.0 / 100.0 + "px";
	ElemId("SongDetails").style.height = sHeight * 2.0 / 100.0 + "px";
	ElemId("SongTitle").style.width    = sHeight * 25.0 / 100.0 + "px";
	ElemId("SongDetails").style.width  = sHeight * 25.0 / 100.0 + "px";
	ElemId("SongTitle").style.left     = sHeight * 8.0 / 100.0 + "px";
	ElemId("SongDetails").style.left   = sHeight * 8.0 / 100.0 + "px";
	ElemId("SongTitle").style.top      = sHeight * 2.4 / 100.0 + "px";
	ElemId("SongDetails").style.top    = sHeight * 4.6 / 100.0 + "px";
	
	ElemId("SongTitleText").style.height = ElemId("SongTitle").style.height;
	ElemId("SongTitleText").style.width = ElemId("SongTitle").style.width;
	
	ElemId("SongDetailsText").style.height = ElemId("SongDetails").style.height;
	ElemId("SongDetailsText").style.width = ElemId("SongDetails").style.width;
	
	ElemId("SongInfoPic").style.top = sHeight * 1.4 / 100.0 + "px";
	ElemId("SongInfoPic").style.left = ElemId("SongInfoPic").style.top;
	ElemId("SongInfoPic").style.height = CropPX(ElemId("SongInfo").style.height) - 2 * CropPX(ElemId("SongInfoPic").style.top) + "px";
	ElemId("SongInfoPic").style.width = ElemId("SongInfoPic").style.height;
	
	if(wHeight / wWidth > CRIT_RATIO){
		ElemId("SongInfo").style.width = ElemId("SongInfo").style.height;
		ElemId("SongTitleText").style.fontSize = 0;
		ElemId("SongDetailsText").style.fontSize = 0;
	}
	else{
		ElemId("SongInfo").style.width = sHeight * 35.5 / 100.0 + "px";
		ElemId("SongTitleText").style.fontSize = sHeight * 1.4 / 100.0 + "px";
		ElemId("SongDetailsText").style.fontSize = window.screen.height * 1.2 / 100.0 + "px";
	}
	
	ElemId("MusicPlayer").style.height = ElemId("Playbar").style.height;
	ElemId("MusicPlayer").style.width = (wWidth - CropPX(ElemId("SongInfo").style.width)) + "px";
	ElemId("MusicPlayer").style.left = ElemId("SongInfo").style.width;
	
	LargeButtonStandard("PlayButton");
	LargeButtonStandard("PauseButton");
	
	SmallButtonStandard("BackwardButton");
	SmallButtonStandard("ForwardButton");
	SmallButtonStandard("Repeat0Button");
	SmallButtonStandard("Repeat1Button");
	SmallButtonStandard("Repeat2Button");
	SmallButtonStandard("Shuffle0Button");
	SmallButtonStandard("Shuffle1Button");
	
	var playerCenter = CropPX(ElemId("MusicPlayer").style.width) * 50.0 / 100.0;
	ElemId("BackwardButton").style.left = playerCenter - sHeight * 6.0 / 100.0 + "px";
	ElemId("ForwardButton").style.left  = playerCenter + sHeight * 3.0 / 100.0 + "px";
	ElemId("Repeat0Button").style.left  = playerCenter + sHeight * 10.0 / 100.0 + "px";
	ElemId("Repeat1Button").style.left  = playerCenter + sHeight * 10.0 / 100.0 + "px";
	ElemId("Repeat2Button").style.left  = playerCenter + sHeight * 10.0 / 100.0 + "px";
	ElemId("Shuffle0Button").style.left = playerCenter - sHeight * 13.0 / 100.0 + "px";
	ElemId("Shuffle1Button").style.left = playerCenter - sHeight * 13.0 / 100.0 + "px";
	
	ElemId("Hp_slide").style.top    = window.screen.height * 6.125 / 100.0 + "px";
	ElemId("Hp_range").style.top    = window.screen.height * 6.125 / 100.0 + "px";
	ElemId("Hp_slide").style.height = window.screen.height * 0.4375 / 100.0 + "px";
	ElemId("Hp_range").style.height = window.screen.height * 0.4375 / 100.0 + "px";
	
	ElemId("Hp_slide").style.width  = (wWidth - CropPX(ElemId("SongInfo").style.width)) * 63.0 / 100.0 + "px";
	
	ElemId("Hp_slide").style.left   = (wWidth - CropPX(ElemId("SongInfo").style.width) - CropPX(ElemId("Hp_slide").style.width)) / 2.0 + "px";
	ElemId("Hp_range").style.left   = (wWidth - CropPX(ElemId("SongInfo").style.width) - CropPX(ElemId("Hp_slide").style.width)) / 2.0 + "px";
	
	ElemId("CurrentTime").style.fontSize = window.screen.height * 1.25 / 100.0 + "px";
	ElemId("TotalTime").style.fontSize   = window.screen.height * 1.25 / 100.0 + "px";
	ElemId("CurrentTime").style.top      = window.screen.height * 5.5 / 100.0 + "px";
	ElemId("TotalTime").style.top        = window.screen.height * 5.5 / 100.0 + "px";
	ElemId("CurrentTime").style.height   = window.screen.height * 1.75 / 100.0 + "px";
	ElemId("TotalTime").style.height     = window.screen.height * 1.75 / 100.0 + "px";
	ElemId("CurrentTime").style.width    = window.screen.height * 3.5 / 100.0 + "px";
	ElemId("TotalTime").style.width      = window.screen.height * 3.5 / 100.0 + "px";
	ElemId("CurrentTime").style.left     = (CropPX(ElemId("Hp_slide").style.left) - CropPX(ElemId("CurrentTime").style.width) - sHeight * 0.7 / 100.0) + "px";
	ElemId("TotalTime").style.left       = CropPX(ElemId("Hp_slide").style.width) -(-CropPX(ElemId("Hp_slide").style.left)) + sHeight * 0.7 / 100.0 + "px";
}
/**
 * Resize all the elements in the menu
 */
function ResizeMenu(){
	ElemId("Menu").style.height = (wHeight - CropPX(ElemId("Playbar").style.height)) + "px";
	if(wHeight / wWidth > CRIT_RATIO){
		ElemId("Menu").style.width = sHeight * 0.0 / 100.0 + "px";
		ElemId("Logo").style.width = sHeight * 0.0 / 100.0 + "px";
	}
	else{
		ElemId("Menu").style.width = sHeight * 21.0 / 100.0 + "px";
		ElemId("Logo").style.width = sHeight * 15.0 / 100.0 + "px";
		ElemId("Logo").style.left = sHeight * 3.0 / 100.0 + "px";
		ElemId("Logo").style.top = sHeight * 1.5 / 100.0 + "px";
	}
	
	ElemId("ArtistsButton").style.top = sHeight * 12.0 / 100.0 + "px";
	ElemId("ArtistsButton").style.width = ElemId("Menu").style.width;
	ElemId("ArtistsButton").style.height = sHeight * 4.0 / 100.0 + "px";
	ElemId("ArtistsButtonBackground").style.height = ElemId("ArtistsButton").style.height;
	ElemId("ArtistsButtonBackground").style.width = ElemId("ArtistsButton").style.width;
	ElemId("ArtistsIcon").style.height = sHeight * 1.5 / 100.0 + "px";
	ElemId("ArtistsIcon").style.top = sHeight * 1.3 / 100.0 + "px";
	ElemId("ArtistsIcon").style.left = sHeight * 1.3 / 100.0 + "px";
	ElemId("ArtistsTextBox").style.height = ElemId("ArtistsButton").style.height;
	ElemId("ArtistsTextBox").style.left = sHeight * 4.0 / 100.0 + "px";
	ElemId("ArtistsFileNameBox").style.height = ElemId("ArtistsButton").style.height;
	ElemId("ArtistsFileNameBox").style.width =  sHeight * 10.0 / 100.0 + "px";
	ElemId("ArtistsFileNameBox").style.fontSize = sHeight * 1.5 / 100.0 + "px";
	
	ElemId("AdhocButton").style.top = sHeight * 16.0 / 100.0 + "px";
	ElemId("AdhocButton").style.width = ElemId("Menu").style.width;
	ElemId("AdhocButton").style.height = sHeight * 4.0 / 100.0 + "px";
	ElemId("AdhocButtonBackground").style.height = ElemId("AdhocButton").style.height;
	ElemId("AdhocButtonBackground").style.width = ElemId("AdhocButton").style.width;
	ElemId("AdhocIcon").style.height = sHeight * 1.5 / 100.0 + "px";
	ElemId("AdhocIcon").style.top = sHeight * 1.3 / 100.0 + "px";
	ElemId("AdhocIcon").style.left = sHeight * 1.3 / 100.0 + "px";
	ElemId("AdhocTextBox").style.height = ElemId("AdhocButton").style.height;
	ElemId("AdhocTextBox").style.left = sHeight * 4.0 / 100.0 + "px";
	ElemId("AdhocFileNameBox").style.height = ElemId("AdhocButton").style.height;
	ElemId("AdhocFileNameBox").style.width =  sHeight * 10.0 / 100.0 + "px";
	ElemId("AdhocFileNameBox").style.fontSize = sHeight * 1.5 / 100.0 + "px";
	
	ElemId("SettingsButton").style.top = sHeight * 25.0 / 100.0 + "px";
	ElemId("SettingsButton").style.width = ElemId("Menu").style.width;
	ElemId("SettingsButton").style.height = sHeight * 4.0 / 100.0 + "px";
	ElemId("SettingsButtonBackground").style.height = ElemId("ArtistsButton").style.height;
	ElemId("SettingsButtonBackground").style.width = ElemId("ArtistsButton").style.width;
	ElemId("SettingsIcon").style.height = sHeight * 1.5 / 100.0 + "px";
	ElemId("SettingsIcon").style.top = sHeight * 1.3 / 100.0 + "px";
	ElemId("SettingsIcon").style.left = sHeight * 1.3 / 100.0 + "px";
	ElemId("SettingsTextBox").style.height = ElemId("ArtistsButton").style.height;
	ElemId("SettingsTextBox").style.left = sHeight * 4.0 / 100.0 + "px";
	ElemId("SettingsFileNameBox").style.height = ElemId("ArtistsButton").style.height;
	ElemId("SettingsFileNameBox").style.width =  sHeight * 10.0 / 100.0 + "px";
	ElemId("SettingsFileNameBox").style.fontSize = sHeight * 1.5 / 100.0 + "px";
}
/**
 * Resize all the elements in the header
 */
function ResizeHeader(){
	ElemId("Header").style.height = sHeight * 7.0 / 100.0 + "px";
	ElemId("Header").style.width = (wWidth - CropPX(ElemId("Menu").style.width)) + "px";
	ElemId("Header").style.left = ElemId("Menu").style.width;
	
	ElemId("NavBackward").style.height = sHeight * 3.5 / 100.0 + "px";
	ElemId("NavBackward").style.width = ElemId("NavBackward").style.height;
	ElemId("NavBackward").style.left = sHeight * 1.75 / 100.0 + "px";
	ElemId("NavBackward").style.top = sHeight * 1.75 / 100.0 + "px";
	ElemId("NavForward").style.height = ElemId("NavBackward").style.height;
	ElemId("NavForward").style.width = ElemId("NavBackward").style.height;
	ElemId("NavForward").style.left = sHeight * 6.5 / 100.0 + "px";
	ElemId("NavForward").style.top = ElemId("NavBackward").style.top;
}
/**
 * Resize all the elements in the playlist
 */
function ResizePlaylist(){
	ElemId("PlaylistName").style.fontFamily = "Tahoma, Geneva, sans-serif";
	ElemId("PlaylistArtist").style.fontFamily = "Tahoma, Geneva, sans-serif";
	
	ElemId("PlaylistName").style.fontSize = sHeight * 2.5 / 100.0 + "px";
	ElemId("PlaylistName").style.lineHeight = sHeight * 2.5 / 100.0 + "px";
	ElemId("PlaylistName").style.fontWeight = 500;
	
	ElemId("PlaylistArtist").style.fontSize = sHeight * 1.3 / 100.0 + "px";
	ElemId("PlaylistArtist").style.lineHeight = sHeight * 2.0 / 100.0 + "px";
	ElemId("PlaylistArtist").style.fontWeight = 300;
	
	ElemId("PlaylistLength").style.fontSize = sHeight * 1.3 / 100.0 + "px";
	ElemId("PlaylistLength").style.lineHeight = sHeight * 2.0 / 100.0 + "px";
	ElemId("PlaylistLength").style.fontWeight = 300;
	
	ElemId("ShufflePlayText").style.fontSize = sHeight * 1.4 / 100.0 + "px";
	ElemId("ShufflePlayText").style.lineHeight = sHeight * 2.0 / 100.0 + "px";
	ElemId("ShufflePlayText").style.fontWeight = 600;
	
	if(wHeight / wWidth > CRIT_RATIO){
		ElemId("PlaylistInfo").style.width = ElemId("HTMLContent").style.width;
		ElemId("PlaylistInfo").style.height = sHeight * 21.0 / 100.0 + "px";
		
		ElemId("Line").style.top = sHeight * 20.0 / 100.0 + "px";
		ElemId("Line").style.left = sHeight * 2.50 / 100.0 + "px";
		ElemId("Line").style.height = sHeight * 0.125 / 100.0 + "px";
		ElemId("Line").style.width = sWidth - 2 * CropPX(ElemId("Line").style.left) + "px";
		
		ElemId("PlaylistPic").style.top = sHeight * 2.50 / 100.0 + "px";
		ElemId("PlaylistPic").style.height = sHeight * 15.00 / 100.0 + "px";
		ElemId("PlaylistPic").style.left = sHeight * 2.50 / 100.0 + "px";
		ElemId("PlaylistPic").style.width = ElemId("PlaylistPic").style.height;
			
		ElemId("PlaylistName").style.left = sHeight * 20.0 / 100.0 + "px";
		ElemId("PlaylistName").style.top = sHeight * 4.0 / 100.0 + "px";
		ElemId("PlaylistName").style.width = CropPX(ElemId("PlaylistInfo").style.width) - CropPX(ElemId("PlaylistName").style.left) - sHeight * 2.0 / 100.0 + "px";
		ElemId("PlaylistName").style.textAlign = "left";
		
		ElemId("PlaylistArtist").style.left = sHeight * 20.0 / 100.0 + "px";
		ElemId("PlaylistArtist").style.top = CropPX(ElemId("PlaylistName").style.top) -(-ElemId("PlaylistName").offsetHeight) + sHeight * 0.50 / 100.0 + "px";
		ElemId("PlaylistArtist").style.width = CropPX(ElemId("PlaylistInfo").style.width) - CropPX(ElemId("PlaylistName").style.left) - sHeight * 2.0 / 100.0 + "px";
		ElemId("PlaylistArtist").style.height = sHeight * 2.5 / 100.0 + "px";
		ElemId("PlaylistArtist").style.textAlign = "left";
		
		ElemId("PlaylistLength").style.left = sHeight * 20.0 / 100.0 + "px";
		ElemId("PlaylistLength").style.top = CropPX(ElemId("PlaylistArtist").style.top) -(-ElemId("PlaylistArtist").offsetHeight) + sHeight * 0.50 / 100.0 + "px";
		ElemId("PlaylistLength").style.width = CropPX(ElemId("PlaylistInfo").style.width) - CropPX(ElemId("PlaylistName").style.left) - sHeight * 2.0 / 100.0 + "px";
		ElemId("PlaylistLength").style.height = sHeight * 2.5 / 100.0 + "px";
		ElemId("PlaylistLength").style.textAlign = "left";
	
		ElemId("ShufflePlayImg").style.display = "none";
		ElemId("ShufflePlayText").style.display = "none";
	
		ElemId("Playlist").style.left = 0 + "px";
		ElemId("Playlist").style.top = ElemId("PlaylistInfo").style.height;
		ElemId("Playlist").style.height = CropPX(ElemId("HTMLContent").style.height) - CropPX(ElemId("PlaylistInfo").style.height) + "px";
		ElemId("Playlist").style.width = ElemId("HTMLContent").style.width;
	}
	else{
		ElemId("PlaylistInfo").style.width = CropPX(ElemId("HTMLContent").style.width) * 33.0 / 100.0 + "px";
		ElemId("PlaylistInfo").style.height = ElemId("HTMLContent").style.height;
	
		ElemId("Line").style.width = 0 + "px";
	
		ElemId("PlaylistPic").style.top = sHeight * 5.00 / 100.0 + "px";
		if((CropPX(ElemId("PlaylistInfo").style.width) - sHeight * 27.00 / 100.0) / 2.0 >= sHeight * 4.00 / 100.0){
			ElemId("PlaylistPic").style.height = sHeight * 27.00 / 100.0 + "px";
			ElemId("PlaylistPic").style.width = ElemId("PlaylistPic").style.height;
			ElemId("PlaylistPic").style.left = (CropPX(ElemId("PlaylistInfo").style.width) - CropPX(ElemId("PlaylistPic").style.height)) / 2.0 + "px";
		}
		else{
			ElemId("PlaylistPic").style.left = sHeight * 4.00 / 100.0 + "px";
			ElemId("PlaylistPic").style.height = CropPX(ElemId("PlaylistInfo").style.width) - 2 * CropPX(ElemId("PlaylistPic").style.left) + "px";
			ElemId("PlaylistPic").style.width = ElemId("PlaylistPic").style.height;
		}
		ElemId("PlaylistName").style.left = ElemId("PlaylistPic").style.left;
		ElemId("PlaylistName").style.top = CropPX(ElemId("PlaylistPic").style.top) - (-CropPX(ElemId("PlaylistPic").style.height)) + sHeight * 2.00 / 100.0 + "px";
		ElemId("PlaylistName").style.width = ElemId("PlaylistPic").style.width;
		ElemId("PlaylistName").style.textAlign = "center";
		
		ElemId("PlaylistArtist").style.left = ElemId("PlaylistPic").style.left;
		ElemId("PlaylistArtist").style.top = CropPX(ElemId("PlaylistName").style.top) -(-ElemId("PlaylistName").offsetHeight) + sHeight * 0.50 / 100.0 + "px";
		ElemId("PlaylistArtist").style.width = ElemId("PlaylistPic").style.width;
		ElemId("PlaylistArtist").style.height = sHeight * 2.5 / 100.0 + "px";
		ElemId("PlaylistArtist").style.textAlign = "center";
		
		ElemId("PlaylistLength").style.left = ElemId("PlaylistPic").style.left;
		ElemId("PlaylistLength").style.top = CropPX(ElemId("PlaylistArtist").style.top) -(-ElemId("PlaylistArtist").offsetHeight) + sHeight * 5.00 / 100.0 + "px";
		ElemId("PlaylistLength").style.width = ElemId("PlaylistPic").style.width;
		ElemId("PlaylistLength").style.height = sHeight * 2.5 / 100.0 + "px";
		ElemId("PlaylistLength").style.textAlign = "center";
		
		
		ElemId("ShufflePlayImg").style.display = "block";
		ElemId("ShufflePlayImg").style.left = CropPX(ElemId("PlaylistInfo").style.width) / 2.0 - sHeight * 8.0 / 100.0 + "px";
		ElemId("ShufflePlayImg").style.top = CropPX(ElemId("PlaylistLength").style.top) -(-ElemId("PlaylistLength").offsetHeight) + sHeight * 1.00 / 100.0 + "px";
		ElemId("ShufflePlayImg").style.width = sHeight * 16.00 / 100.0 + "px";
		ElemId("ShufflePlayImg").style.height = sHeight * 4.0 / 100.0 + "px";
		
		ElemId("ShufflePlayText").style.display = "block";
		ElemId("ShufflePlayText").style.left = CropPX(ElemId("PlaylistInfo").style.width) / 2.0 - ElemId("ShufflePlayText").offsetWidth / 2.0 + "px";
		ElemId("ShufflePlayText").style.top = CropPX(ElemId("PlaylistLength").style.top) -(-ElemId("PlaylistLength").offsetHeight) + sHeight * 2.00 / 100.0 + "px";
		ElemId("ShufflePlayText").style.height = sHeight * 2.5 / 100.0 + "px";
		ElemId("ShufflePlayText").style.textAlign = "center";
		
		ElemId("Playlist").style.left = ElemId("PlaylistInfo").style.width;
		ElemId("Playlist").style.top = 0 + "px";
		ElemId("Playlist").style.height = ElemId("HTMLContent").style.height;
		ElemId("Playlist").style.width = CropPX(ElemId("HTMLContent").style.width) - CropPX(ElemId("PlaylistInfo").style.width) + "px";
	}
	
	ElemId("Buffer").style.height = sHeight * 5.0 / 100.0 + "px";
	ElemId("Buffer").style.width = CropPX(ElemId("Playlist").style.width) - sHeight * 5.00 / 100.0 + "px";
	
	var offset;
	
	if(wHeight / wWidth > CRIT_RATIO)
		offset = sHeight * 2.0 / 100.0;
	else
		offset = 0;
	
	var i;
	for(i = 0; i < artistsP[viewState.artist].playlists[viewState.album].songs.length; i++){
		ElemId("PlaylistItem" + i).style.height = ElemId("Buffer").style.height;
		ElemId("PlaylistItem" + i).style.width = ElemId("Buffer").style.width;
		ElemId("PlaylistItemBackground" + i).style.height = ElemId("Buffer").style.height;
		ElemId("PlaylistItemBackground" + i).style.width = ElemId("Buffer").style.width;
		
		ElemId("PlayButtonSmall" + i).style.height = sHeight * 1.5 / 100.0 + "px";
		ElemId("PlayButtonSmall" + i).style.top = sHeight * 0.8 / 100.0 + "px";
		ElemId("PlayButtonSmall" + i).style.left = offset + sHeight * 1.2 / 100.0 + "px";
		
		ElemId("PauseButtonSmall" + i).style.height = ElemId("PlayButtonSmall" + i).style.height;
		ElemId("PauseButtonSmall" + i).style.top = ElemId("PlayButtonSmall" + i).style.top;
		ElemId("PauseButtonSmall" + i).style.left = ElemId("PlayButtonSmall" + i).style.left;
		
		ElemId("TextBox" + i).style.height = ElemId("Buffer").style.height;
		ElemId("TextBox" + i).style.left = offset + sHeight * 5.0 / 100.0 + "px";
		
		ElemId("FileNameBox" + i).style.height = sHeight * 2.0 / 100.0 + "px";
		ElemId("FileNameBox" + i).style.width = CropPX(ElemId("Playlist").style.width) - sHeight * 17.00 / 100.0 + "px";
		ElemId("FileNameBox" + i).style.fontSize = sHeight * 1.5 / 100.0 + "px";
		ElemId("FileNameBox" + i).style.top = sHeight * 0.5 / 100.0 + "px";
		
		ElemId("DetailsBox" + i).style.height = ElemId("FileNameBox" + i).style.height;
		ElemId("DetailsBox" + i).style.width = CropPX(ElemId("Playlist").style.width) - sHeight * 17.00 / 100.0 + "px";
		ElemId("DetailsBox" + i).style.fontSize = sHeight * 1.4 / 100.0 + "px";
		ElemId("DetailsBox" + i).style.top = sHeight * 2.5 / 100.0 + "px";
		
		ElemId("LengthBox" + i).style.height = ElemId("FileNameBox" + i).style.height;
		ElemId("LengthBox" + i).style.width = sHeight * 6.00 / 100.0 + "px";
		ElemId("LengthBox" + i).style.fontSize = sHeight * 1.4 / 100.0 + "px";
		ElemId("LengthBox" + i).style.top = sHeight * 0.5 / 100.0 + "px";
		ElemId("LengthBox" + i).style.left = CropPX(ElemId("Playlist").style.width) - sHeight * 17.00 / 100.0 + "px";
	}
}
/**
 * Resize all the elements in the Artists page
 */
function ResizeArtists(){
	ElemId("Buffer").style.height = sHeight * 5.0 / 100.0 + "px";
	ElemId("Buffer").style.width = CropPX(ElemId("HTMLContent").style.width) - sHeight * 5.00 / 100.0 + "px";
	
	for(i = 0; i < artistsCount; i++){
		ElemId("ArtistItem" + i).style.height = CropPX(ElemId("Buffer").style.height) * (1 + 0.5 * (i == 0)) + "px";
		ElemId("ArtistItem" + i).style.width = ElemId("Buffer").style.width;
		ElemId("ArtistItemBackground" + i).style.height = CropPX(ElemId("Buffer").style.height) * (1 + 0.5 * (i == 0)) + "px";
		ElemId("ArtistItemBackground" + i).style.width = ElemId("Buffer").style.width;
		
		ElemId("TextBox" + i).style.height = ElemId("Buffer").style.height;
		ElemId("TextBox" + i).style.left = sHeight * 5.0 / 100.0 + "px";
		
		ElemId("FileNameBox" + i).style.height = sHeight * 2.0 / 100.0 + "px";
		ElemId("FileNameBox" + i).style.width = CropPX(ElemId("HTMLContent").style.width) - sHeight * 15.00 / 100.0 + "px";
		ElemId("FileNameBox" + i).style.fontSize = sHeight * 1.5 / 100.0 + "px";
		ElemId("FileNameBox" + i).style.top = sHeight * 0.5 / 100.0 + "px";
		
		ElemId("DetailsBox" + i).style.height = ElemId("FileNameBox" + i).style.height;
		ElemId("DetailsBox" + i).style.width = CropPX(ElemId("HTMLContent").style.width) - sHeight * 15.00 / 100.0 + "px";
		ElemId("DetailsBox" + i).style.fontSize = sHeight * 1.4 / 100.0 + "px";
		ElemId("DetailsBox" + i).style.top = sHeight * 2.5 / 100.0 + "px";
	}
	
}
/**
 * Resize all the elements in the discography of an artist
 */
function ResizeAlbums(){
	ElemId("ArtistBigPic").style.height = sHeight * 50.0 / 100.0 + "px";
	ElemId("ArtistBigPic").style.width = ElemId("HTMLContent").style.width;
	
	ElemId("Line").style.opacity = "0.0";
	
	if(wHeight / wWidth > CRIT_RATIO){
		ElemId("ArtistBigPicInterior").style.height = ElemId("HTMLContent").style.height;
		ElemId("ArtistBigPicInterior").style.width = "auto";
		ElemId("ArtistBigPicInterior").style.marginLeft = (CropPX(ElemId("HTMLContent").style.width) - ElemId("ArtistBigPicInterior").naturalWidth * CropPX(ElemId("HTMLContent").style.height) / ElemId("ArtistBigPicInterior").naturalHeight) / 2.0 + "px";
		
		ElemId("ArtistName").style.fontSize = 5.0 / 100 * sHeight + "px";
		ElemId("ArtistName").style.top = 17.0 / 100 * sHeight + "px";
		
		ElemId("Line").style.top = sHeight * 30.0 / 100.0 + "px";
		ElemId("Line").style.left = sHeight * 2.50 / 100.0 + "px";
		ElemId("Line").style.height = sHeight * 0.125 / 100.0 + "px";
		ElemId("Line").style.width = sWidth - 2 * CropPX(ElemId("Line").style.left) + "px";
	}
	else{
		ElemId("ArtistBigPicInterior").style.width = sWidth + "px";
		ElemId("ArtistBigPicInterior").style.height = "auto";
		ElemId("ArtistBigPicInterior").style.marginLeft = "0px";

		ElemId("ArtistName").style.fontSize = 7.0 / 100 * sHeight + "px";
		ElemId("ArtistName").style.top = 15.0 / 100 * sHeight + "px";

		ElemId("Line").style.top = sHeight * 30.0 / 100.0 + "px";
		ElemId("Line").style.left = sHeight * 2.50 / 100.0 + "px";
		ElemId("Line").style.height = sHeight * 0.125 / 100.0 + "px";
		ElemId("Line").style.width = CropPX(ElemId("HTMLContent").style.width) - 2 * CropPX(ElemId("Line").style.left) + "px";
	}
	
	ElemId("ArtistName").style.lineHeight = sHeight * 5.0 / 100.0 + "px";
	ElemId("ArtistName").style.height = 20.0 / 100 * sHeight + "px";
	ElemId("ArtistName").style.left = sHeight * 7.5 / 100.0 + "px";
	ElemId("ArtistName").style.fontWeight = 750;
	
	ElemId("AlbumItemContainer").style.top = sHeight * 35.0 / 100.0 + "px";
	ElemId("AlbumItemContainer").style.left = sHeight * 5.0 / 100.0 + "px";
	ElemId("AlbumItemContainer").style.height = sHeight * 40.0 / 100.0 + "px";
	ElemId("AlbumItemContainer").style.width = CropPX(ElemId("HTMLContent").style.width) - 2 * CropPX(ElemId("AlbumItemContainer").style.left) + "px";
	
	var i;
	for(i = 0; i < artistsP[viewState.artist].countP; i++){
		ElemId("AlbumItem" + i).style.height = sHeight * 38.0 / 100.0 + "px";
		ElemId("AlbumItem" + i).style.width = sHeight * 34.0 / 100.0 + "px";
		
		
		var num = Math.floor((CropPX(ElemId("AlbumItemContainer").style.width) - -sHeight * 2.0 / 100.0) / 
							 (CropPX(ElemId("AlbumItem" + i).style.width) - -sHeight * 2.0 / 100.0));
		var lin = Math.floor(i / num);
		var col = i % num;
		var mar = (CropPX(ElemId("AlbumItemContainer").style.width) - num * CropPX(ElemId("AlbumItem" + i).style.width) - (num - 1) * sHeight * 2.0 / 100.0) / 2.0;
		ElemId("AlbumItem" + i).style.left = mar + col * sHeight * 36.0 / 100.0 + "px";
		ElemId("AlbumItem" + i).style.top = sHeight * 2.0 / 100.0 + lin * sHeight * 40.0 / 100.0 + "px";
		
		ElemId("AlbumPic" + i).style.top = sHeight * 2.0 / 100.0 + "px";
		ElemId("AlbumPic" + i).style.left = sHeight * 2.0 / 100.0 + "px";
		ElemId("AlbumPic" + i).style.height = sHeight * 30.0 / 100.0 + "px";
		ElemId("AlbumPic" + i).style.width = sHeight * 30.0 / 100.0 + "px";
		
		ElemId("AlbumTitle" + i).style.top = sHeight * 33.0 / 100.0 + "px";
		ElemId("AlbumTitle" + i).style.left = sHeight * 2.0 / 100.0 + "px";
		ElemId("AlbumTitle" + i).style.height = sHeight * 3.0 / 100.0 + "px";
		ElemId("AlbumTitle" + i).style.width = CropPX(ElemId("AlbumItem" + i).style.width) - 2 * CropPX(ElemId("AlbumTitle" + i).style.left) + "px";
		
		ElemId("AlbumTitleText" + i).style.height = ElemId("AlbumTitle" + i).style.height;
		ElemId("AlbumTitleText" + i).style.width = ElemId("AlbumTitle" + i).style.width;
		ElemId("AlbumTitleText" + i).style.fontSize = sHeight * 1.5 / 100.0 + "px";
	}
}
/**
 * Resize all the elements in the Settings page
 */
function ResizeSettings(){
	ElemId("input").style.fontSize = sHeight * 1.5 / 100.0 + "px";
	ElemId("input").style.height = sHeight * 2.5 / 100.0 + "px";
	ElemId("input").style.top = sHeight * 3.0 / 100.0 + "px";
	ElemId("input").style.left = sHeight * 3.0 / 100.0 + "px";
	
	ElemId("SubmitButton").style.top = sHeight * 3.0 / 100.0 + "px";
	ElemId("SubmitButton").style.width = sHeight * 15.0 / 100.0 + "px";
	ElemId("SubmitButton").style.height = sHeight * 2.5 / 100.0 + "px";
	ElemId("SubmitButton").style.left = sHeight * 37.0 / 100.0 + "px";
	
	ElemId("SubmitButtonBackground").style.height = ElemId("SubmitButton").style.height;
	ElemId("SubmitButtonBackground").style.width = ElemId("SubmitButton").style.width;
	ElemId("SubmitTextBox").style.height = ElemId("SubmitButton").style.height;
	ElemId("SubmitTextBox").style.left = sHeight * 2.0 / 100.0 + "px";
	ElemId("SubmitFileNameBox").style.height = ElemId("SubmitButton").style.height;
	ElemId("SubmitFileNameBox").style.width =  "auto";
	ElemId("SubmitFileNameBox").style.fontSize = sHeight * 1.5 / 100.0 + "px";
	
	ElemId("LoadingGif").style.width = sHeight * 15.0 / 100.0 + "px";
	ElemId("LoadingGif").style.height = sHeight * 18.0 / 100.0 + "px";
	ElemId("LoadingGif").style.top = (CropPX(ElemId("HTMLContent").style.height) - CropPX(ElemId("LoadingGif").style.height)) / 2.0 + "px";
	ElemId("LoadingGif").style.left = (CropPX(ElemId("HTMLContent").style.width) - CropPX(ElemId("LoadingGif").style.width)) / 2.0 + "px";
	
	ElemId("BlurImg").style.width = sWidth + "px";
	ElemId("BlurImg").style.top = 0.0 + "px";
	ElemId("BlurImg").style.height = sHeight + "px";
}
/**
 * Resize the dynamic section of the page
 */
function ResizeHTMLContent(){
	ElemId("HTMLContent").style.top = ElemId("Header").style.height;
	ElemId("HTMLContent").style.left = ElemId("Menu").style.width;
	ElemId("HTMLContent").style.height = (wHeight - CropPX(ElemId("Header").style.height) - CropPX(ElemId("Playbar").style.height)) + "px";
	ElemId("HTMLContent").style.width = (wWidth - CropPX(ElemId("Menu").style.width)) + "px";
	
	switch(viewState.state){
		case STATEARTISTS:
			ResizeArtists();
			break;
		case STATEALBUMS:
			ResizeAlbums();
			break;
		case STATEPLAYLIST:
			ResizePlaylist();
			break;
		case STATESETTINGS:
			ResizeSettings();
			break;
	}
}
function resize(){
	wWidth = $(window).width();
	wHeight = $(window).height();
	sHeight = window.screen.height;
	sWidth = window.screen.width;
	
	ElemId("BackgroundPicture").style.height = wHeight + "px";
	ResizePlaybar();
	ResizeMenu();
	ResizeHeader();
	ResizeHTMLContent();
}
$(window).on("load resize", resize);