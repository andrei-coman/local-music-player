# local-music-player
 
This project is a Windows Desktop Music-Player, designed for personal use. It aims to provide a more customizable environment for browsing and playing local music files, and is fully operable offline. This is not intended for organising online files, but rather local collections of ```.mp3``` and ```.flac``` documents. The project is still in its first stages, so many more functionalities will be added in the future. Currently, it only implements the common basic features of all the similar applications.

# Details

The application is written in JavaScript with minimal external resources and uses Visual C# to manage local Windows files. It is based upon the Node Package Manager and is compiled into an application using Electron. Although it requires local music and media to be functional, none such files are provided due to Copyright reasons. The web-page scripts can be found in ```resources/app```.

# How to install

In order to begin using the Music Player, use 7Zip to extract the ```MP.7z``` compressed file into the ```MP``` folder, then copy the ```resources``` into the extracted directory. The application can then be run through ```media-player.exe``` without any further preparation.

# How to use

The application currently requires all the music files to be placed in one main directory (including its subdirectories) placed anywhere on the local storage. The path to the directory must be specified in the Settings tab of the application, in the provided format. After submitting, the app will process all the ```.mp3``` and ```.flac``` files and display them by Artist and Album. In order for the files to be sorted, each music file must have its associated metadata correctly filled-out (artist, album and song title are mandatory, while the track number is also recommended).

The application further requires additional ```.jpg``` files, corresponding to the artist image and the album art. Each artist must have an associated file in the format ```Artist Name.jpg```, placed in the ```resources/app/img/artists``` directory. Similarly, each album must have an associated image named as ```Artist Name - Album Title.jpg```, placed in ```resources/app/img/albums```. Without these files, the player will still be operable, but the sections might become hardly distinguishable.

Note: ```resources/app/JavaScript/data.js``` is automatically generated and should not be modified. If the file has an invalid format, you will have to resubmit the music folder path in the Settings tab.
