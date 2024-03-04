const audioElement = document.querySelector("audio");
const playButton = document.querySelector(".player-play-btn");
const playIcon = document.querySelector(".player-icon-play");
const pauseIcon = document.querySelector(".player-icon-pause");
const progress = document.querySelector(".player-progress");
const progressFilled = document.querySelector(".player-progress-filled");
const playerDuration = document.getElementById("player-time-duration");
const playerCurrentTime = document.querySelector(".player-time-current");
const previousSong = document.getElementById("previous-song");
const nextSong = document.getElementById("next-song");

const recommendedArtistOne = document.querySelector(".recommended-artist-1");



//-display song and artist-------------------------
const songList = document.querySelectorAll("#song");
const playSongList = document.querySelectorAll('.grid-songs > div > div');
const songArtist = document.getElementById("song-artist");
const songName = document.getElementById("song-name");
const coverImg = document.querySelector(".cover-image");

const playBtnImage = document.querySelectorAll(".playlist-play-btn");
const pauseBtnImage = document.querySelectorAll(".playlist-pause-btn");
const song = document.querySelector("song");




//-volume bar--------------
const volumeButtonActive = document.querySelector(".volume-button-active");
const volumeButtonMute = document.querySelector(".volume-button-mute");
const volumeBar = document.querySelector(".adjust-volume-bar");
const adjustVolume = document.querySelector(".adjust-volume");
const volumeButton = document.getElementById("volume-button");

//-Navigation bar--------------------
const navBar = document.querySelector(".navbar-click");
const navPlayList = document.querySelector(".navigation-playlist");
const navBarClose = document.querySelector(".close-navbar");



//-------------Songs List ------------------------
const songs = [
    { cover:"images/in-da-club-cover.jpg", artist: "50 Cent", song: "In Da Club", url: "songs/50 Cent - In Da Club (Lyrics).mp3" },
    { cover:"images/candy-shop-cover.jpg", artist: "50 Cent", song: "Candy Shop", url:"songs/50Cent -Candy Shop (Feat Olivia) - Lyrics-Dirty Version.mp3" },
    { cover:"images/in-da-club-cover.jpg", artist: "50 Cent", song: "Many Men(Wish Death)", url: "songs/50 Cent - Many men (wish death).mp3" },
    { cover:"images/baby-by-me-cover.jpg", artist: "50 Cent", song: "Baby By Me", url: "songs/50 Cent - Baby By Me.mp3" },
    { cover:"images/in-da-club-cover.jpg", artist: "50 Cent", song: "P.I.M.P.", url: "songs/50 Cent - P.I.M.P..mp3", },
];
audioElement.src = songs[0].url;
window.addEventListener("load", () => {
 generatePlaylist();


    function generatePlaylist(songsToDisplay) {
        songsToDisplay = songsToDisplay || songs;

        const playlistContainer = document.querySelector(".playlist-songs");
        playlistContainer.innerHTML = `<p class="top-5">Best of 50 Cent: </p>`;

        songsToDisplay.forEach((song, index) => {
            const songDiv = document.createElement("div");

            songDiv.className = `song-${index + 1}`;
            songDiv.id = "song";
            songDiv.innerHTML = `
            <p class="song-order">${index + 1}<p>
            <img class="playlist-play-btn" src="images/play-button.png">
            <img class="playlist-pause-btn hidden" src="images/pause.-icon.lnk">
            <p class="song-cover"><img src=${song.cover}><p>
            <p class="song-details">
            <span class="song">${song.song}<span>
            <span class="artist">${song.artist}<span>   
            <p>`;
            songDiv.addEventListener("click", () => playSong(songDiv));
            playlistContainer.appendChild(songDiv);
            console.log(index);
        });
    }

    function playSong(songDiv) {
        const index = Array.from(songDiv.parentElement.children).indexOf(songDiv);
    
        const selectedSong = songs[index];
    
        const playBtn = songDiv.querySelector('.playlist-play-btn');
        const pauseBtn = songDiv.querySelector('.playlist-pause-btn');
        
        if (audioElement.src === window.location.url + "/" + selectedSong.url && !audioElement.paused) {
            // If the clicked song is currently playing, pause it
            audioElement.pause();
            playButton.dataset.playing = "false";
            playBtn.classList.toggle("hidden");
            pauseBtn.classList.toggle("hidden");
            console.log(" if ")
        } else {
            // Otherwise, play the clicked song
            audioElement.src = selectedSong.url;
            audioElement.play();
            playButton.dataset.playing = "true";
            playBtn.classList.add("hidden");
            pauseBtn.classList.remove("hidden");
            console.log("else if ")
        }
    }
    

 
});

