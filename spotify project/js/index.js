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

const playBtnImage = document.querySelectorAll(".play-button-image");
const pauseBtnImage = document.querySelectorAll(".pause-button-image");
const songsContainer= document.querySelectorAll(".grid-songs .song ");




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
    { cover:"images/window-shopper-cover.jpg", artist: "50 Cent", song: "Window Shopper", url: "file:///C:/Users/sidri/Desktop/Projects/spotify%20project/songs/50%20Cent%20-%20Window%20Shopper%20(Official%20Music%20Video).mp3" },
    { cover:"images/love-is-only-a-feeling-cover.jpg", artist: "Joey Bada$$", song: "Love is only a feeling", url:"file:///C:/Users/sidri/Desktop/Projects/spotify%20project/songs/Joey%20Bada$$%20-%20Love%20Is%20Only%20A%20Feeling%20(Official%20Audio).mp3", },
    { cover:"images/superman-cover.jpg", artist: "Eminem", song: "Superman", url: "file:///C:/Users/sidri/Desktop/Projects/spotify%20project/songs/Eminem%20-%20Superman%20(Official%20Video%20-%20Dirty%20Version).mp3" },
    { cover:"images/when-it-rain-it-pours-cover.jpg", artist: "50 Cent", song: "When It Rains It Pours", url: "file:///C:/Users/sidri/Desktop/Projects/spotify%20project/songs/When%20It%20Rains%20It%20Pours.mp3" },
    { cover:"images/welcome-cover.jpg", artist: "J. Cole", song: "Welcome", url: "file:///C:/Users/sidri/Desktop/Projects/spotify%20project/songs/J.%20Cole%20-%20Welcome%20(Warm%20Up%20Mixtape).mp3" },
]; 

const songURLs = songs.map(song => song.url);
const songNamePlaying = songs.map(song => song.song);
const artistNamePlaying = songs.map(song => song.artist);
const currentCoverImage = songs.map(song => song.cover);
const currentPauseButton = songs.map(song => song.pauseButton);


window.addEventListener("load", () => {
    initializePlayer();
    

audioElement.addEventListener("timeupdate", () => {
    updatePlayer();
});

function initializePlayer() {
    setTimes();
    audioElement.volume = 0.5;
    adjustVolume.style.flexBasis = `${audioElement.volume * 100}%`;
}

function updatePlayer() {
    setTimes();
    progressUpdate();
}

//-------------PLAYER CONTROLS-------------------------------------------------------------------------------------------------


    audioElement.addEventListener("ended", () => {
        const currentUrlIndex = songURLs.indexOf(audioElement.src);

        if (currentUrlIndex < songURLs.length -1) {

            audioElement.src = songURLs[currentUrlIndex + 1];
            songName.textContent = songs[currentUrlIndex + 1].song;
            songArtist.textContent = songs[currentUrlIndex + 1].artist;
            coverImg.src = songs[currentUrlIndex + 1].cover;
        
            audioElement.load();
            audioElement.play().then(() => {

                playButton.dataset.playing = "true";
                playIcon.classList.add("hidden");
                pauseIcon.classList.remove("hidden");
                coverImg.classList.remove("hidden");
            });
        } else {
            window.alert("This is the last song, cannot play the next one!");
        }
        playButton.dataset.playing = "false";
        pauseIcon.classList.add("hidden");
        playIcon.classList.remove("hidden");
        progressFilled.style.flexBasis = "0%";
        audioElement.currentTime = 0;
        audioElement.duration = audioElement.duration;

        
        

        pauseBtnImage.forEach(pauseBtnImage => {
            pauseBtnImage.classList.add("hidden")
        });
        playBtnImage.forEach(playBtnImage => {
            playBtnImage.classList.remove("hidden");
        });

            
    });
//-------------TOGGLE PAUSE IMAGE ON #SONG SO THAT SKIPPING SONG WILL WORK WHEN USING THE PLAYER BUTTONS  ------------------------------------------------------------
    function togglePauseButtonVisibility(index) {
        pauseBtnImage.forEach((pauseBtn, i) => {
            if (i === index) {
                pauseBtn.classList.remove('hidden');
            } else {
                pauseBtn.classList.add('hidden');
            }
        });
    }
//-------------TOGGLE PLAY IMAGE ON #SONG SO THAT SKIPPING SONG WILL WORK WHEN USING THE PLAYER BUTTONS ------------------------------------------------------------

    function togglePlayButtonVisibility(index) {
        playBtnImage.forEach((playBtn, i) => {
            if (i === index) {
                playBtn.classList.add("hidden");
            } else {
                playBtn.classList.remove("hidden");
            }
        });
        playBtnImage[index].classList.add('hidden');
    }
    
    
//-------------SKIPPING TO PREVIOUS SONG AND SWITCHING PAUSE AND PLAY IMAGE ------------------------------------------------------------
    previousSong.addEventListener("click", () => {
       
        const currentUrlIndex = songURLs.indexOf(audioElement.src);

        if (currentUrlIndex > 0) {
            previousUrlIndex = currentUrlIndex - 1;

            audioElement.src = songURLs[currentUrlIndex - 1];
            songName.textContent = songs[currentUrlIndex -1].song;
            songArtist.textContent = songs[currentUrlIndex -1].artist;
            coverImg.src = songs[currentUrlIndex -1].cover;
            
            togglePlayButtonVisibility(previousUrlIndex);

            togglePauseButtonVisibility(previousUrlIndex);
            
            audioElement.load();
            audioElement.play().then(() => {
                playButton.dataset.playing = "true";
                playIcon.classList.add("hidden");
                pauseIcon.classList.remove("hidden");
                coverImg.classList.remove("hidden");
                

            });
        } else {
            window.alert("This is the first song, cannot play the previous one!");
        }
    });

//-------------SKIPPING TO NEXT SONG AND SWITCHING PAUSE AND PLAY IMAGE ------------------------------------------------------------
    nextSong.addEventListener("click", () => {

        const currentUrlIndex = songURLs.indexOf(audioElement.src);
    
        if (currentUrlIndex < songURLs.length -1) {

            nextUrlIndex = currentUrlIndex + 1;

            audioElement.src = songURLs[currentUrlIndex + 1];
            songName.textContent = songs[currentUrlIndex + 1].song;
            songArtist.textContent = songs[currentUrlIndex + 1].artist;
            coverImg.src = songs[currentUrlIndex + 1].cover;
            
            togglePlayButtonVisibility(nextUrlIndex);
            togglePauseButtonVisibility(nextUrlIndex);

            audioElement.load();
            audioElement.play().then(() => {


                playButton.dataset.playing = "true";
                playIcon.classList.add("hidden");
                pauseIcon.classList.remove("hidden");
                coverImg.classList.remove("hidden");
            });
        } else {
            window.alert("This is the last song, cannot play the next one!");
        }
    });

    playButton.addEventListener("click", () => {
        
        if(playButton.dataset.playing === "false") {

            audioElement.play();

            playButton.dataset.playing = "true";
            playIcon.classList.add("hidden");
            pauseIcon.classList.remove("hidden");

        } else if (playButton.dataset.playing === "true") {

            audioElement.pause();

            playButton.dataset.playing = "false";
            pauseIcon.classList.add("hidden");
            playIcon.classList.remove("hidden");

        }
    });
    
    

    function scrub (event) {
        const scrubTime = (event.offsetX / progress.offsetWidth) * audioElement.duration;
        audioElement.currentTime = scrubTime;
    }

    


//-------------Drag control Music ------------------------------------------------------------

    function setTimes() {
        const newCurrentTime = new Date(audioElement.currentTime * 1000);
        const newDuration = new Date(audioElement.duration * 1000);

        playerCurrentTime.textContent = newCurrentTime.getMinutes() + ":" + newCurrentTime.getSeconds();
        playerDuration.textContent = newDuration.getMinutes() + ":" + newDuration.getSeconds();
    }


    function progressUpdate () {
        const percent = (audioElement.currentTime / audioElement.duration ) * 100;
        progressFilled.style.flexBasis =`${percent}%`;
    }
    


    progress.addEventListener("click", scrub);
    progress.addEventListener("mousemove", (event) => mousedown && scrub(event));
    progress.addEventListener("mousedown", () => (mousedown = true));
    progress.addEventListener("mouseup", () => (mousedown = false));


//-------------PAUSE AND PLAY FROM SPACEBAR---------------------------------------------------------

    window.addEventListener('keydown', (event) => {
        
        if (event.code === 'Space' && event.target == document.body && playButton.dataset.playing === "false") {

            audioElement.play();

            playButton.dataset.playing = "true";
            playIcon.classList.add("hidden");
            pauseIcon.classList.remove("hidden");

        } else if (event.code === 'Space' && event.target == document.body && playButton.dataset.playing === "true") {

            audioElement.pause();

            playButton.dataset.playing = "false";
            playIcon.classList.remove("hidden");
            pauseIcon.classList.add("hidden");
        } 
    });

    window.onkeydown = function(e) { 
        return !(e.keyCode == 32 && e.target == document.body);
    }; 

//-------------VOLUME CONTROLS---------------------------------------------------------

    function adjustVolumeLevel(event) {
        const volumeLevel = event.offsetX / volumeBar.offsetWidth;
        audioElement.volume = volumeLevel;
        
        adjustVolume.style.flexBasis = `${volumeLevel * 100}%`;
    }

    volumeButton.addEventListener("click", () => {
        
        if(audioElement.volume !== 0) {

            audioElement.volume = 0;
            adjustVolume.style.flexBasis = "0%";
            volumeButtonActive.classList.add("hidden");
            volumeButtonMute.classList.remove("hidden");
            console.log("muted");
        } else {
            adjustVolume.style.flexBasis = "50%";
            audioElement.volume = 0.5;
            volumeButtonActive.classList.remove("hidden");
            volumeButtonMute.classList.add("hidden");
            console.log("unmuted")
        }
    });
    



    volumeBar.addEventListener("click", adjustVolumeLevel);
    volumeBar.addEventListener("mousemove", (event) => {


        // Adjust volume level only if mouse button is down
        if (event.buttons === 1) {
            adjustVolumeLevel(event);
            
        }
    });




//-------------NAVIGATION BAR---------------------------------------------------------------------------
    navBar.addEventListener("click", () => {
        
        console.log("clicked");

        navBar.classList.add("hidden");
        navPlayList.classList.remove("hidden");

    });

    navBarClose.addEventListener("click", () => {
        console.log("click click")

        navPlayList.classList.add("hidden");
        navBar.classList.remove("hidden");
    });




//-------------PLAYLIST---------------------------------------------------------------------------

   
    playSongList.forEach((song) => {
        song.addEventListener('click', () => {
            const songIndex = Array.from(playSongList).indexOf(song);
            const songUrl = songs[songIndex].url; // Get the URL of the clicked song
            const songPlaying = songs[songIndex].song;
            const artistPlaying = songs[songIndex].artist;
            const coverImage = songs[songIndex].cover;

            audioElement.src = songUrl;
            songName.innerHTML = songPlaying;
            songArtist.innerHTML = artistPlaying;
            coverImg.src = coverImage;
            
            
            if (audioElement.paused === true) {
                console.log(audioElement.paused);
                audioElement.play();
                playButton.dataset.playing = "true";
                playIcon.classList.add("hidden");
                pauseIcon.classList.remove("hidden");
                coverImg.classList.remove("hidden");
                

            } else if (audioElement.paused === false){
                console.log("pausing");
                audioElement.pause();

                playButton.dataset.playing = "false";
                playIcon.classList.add("hidden");
                pauseIcon.classList.remove("hidden");
            } 
            
        });
    });


//-------------CHANGE PAUSE AND PLAY ICON ON THE PLAYLIST WHEN CLICKED---------------------------------------------------------------------------
    let currentSongContainer = null;

    songsContainer.forEach(songContainer => {
        songContainer.addEventListener('click', () => {
            const playBtnImage = songContainer.querySelector('.play-button-image');
            const pauseBtnImage = songContainer.querySelector('.pause-button-image');

            playBtnImage.classList.toggle('hidden');
            pauseBtnImage.classList.toggle('hidden');

            if (currentSongContainer && currentSongContainer !== songContainer) {
                
                const currentPlayBtnImage = currentSongContainer.querySelector('.play-button-image');
                const currentPauseBtnImage = currentSongContainer.querySelector('.pause-button-image');
    
                
                currentPlayBtnImage.classList.remove('hidden');
                currentPauseBtnImage.classList.add('hidden');
            } else if (currentSongContainer === songContainer && audioElement.paused === true) {
                audioElement.load();
                audioElement.play();
            } else if (currentSongContainer === songContainer && audioElement.paused === false) {
                audioElement.load(); 
                audioElement.pause();
            }
    
            
            currentSongContainer = songContainer;
        });
    });






//-------------RECOMMENDED ARTISTS CONTAINER FUNCTIONALITY---------------------------------------------------------------------------


    recommendedArtistOne.addEventListener("click", () => {
        window.location.href ="pages/50cent.html"
    });
    


});


