class Song{
	constructor(_title, _album, _artist, _track, _length, _path){
		this.title = _title;
		this.album = _album;
		this.artist = _artist;
		this.track = _track;
		this.length = _length;
		this.path = _path.substring(0);
	}
}
class Playlist{
	constructor(_name, _artist){
		this.name = _name;
		this.artist = _artist;
		this.songs = [];
	}
	addSong(song){
		this.songs.push(song);
	}
}
class Artist{
	constructor(_name){
		this.name = _name;
		this.countP = 0; //number of playlists
		this.countS = 0; //number of songs
		this.playlists = {};
	}
	addPlaylist(playlist){
		this.countP++;
		this.countS += playlist.songs.length;
		this.playlists[playlist.name] = playlist;
	}
}
var artistsCount = 0; //number of artists
var artistsP = {}; //map of artist names

/**
 * Index songs into albums and artists
 */
function ProcessData(){
	var playlists = {};
	playlists["All tracks"] = new Playlist("All tracks", "Shuffle play all tracks!");
	songs.forEach(function(song, index){
		playlists["All tracks"].addSong(song);
		
		if(playlists[song.artist + "/"] === undefined)
			playlists[song.artist + "/"] = new Playlist("All tracks", song.artist);
		playlists[song.artist + "/"].addSong(song);
		
		if(playlists[song.artist + "/" + song.album] === undefined)
			playlists[song.artist + "/" + song.album] = new Playlist(song.album, song.artist);
		playlists[song.artist + "/" + song.album].addSong(song);
	});
	for(const p in playlists){
		playlists[p].songs.sort(function(a, b){
			if(parseInt(a.track) < parseInt(b.track)) 
				return -1; 
			else 
				return 1;
		});
		if(artistsP[playlists[p].artist] === undefined){
			artistsP[playlists[p].artist] = new Artist(playlists[p].artist);
			artistsCount++;
		}
		artistsP[playlists[p].artist].addPlaylist(playlists[p]);
	}
}