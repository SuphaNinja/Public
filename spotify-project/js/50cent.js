const audioElement = document.querySelector("audio");
const playButton = document.querySelector(".player-play-btn");
const playIcon = document.querySelector(".player-icon-play");
const pauseIcon = document.querySelector(".player-icon-pause");
const progress = document.querySelector(".player-progress");
const progressFilled = document.querySelector(".player-progress-filled");
const playerDuration = document.getElementById("player-time-duration");
const playerCurrentTime = document.getElementById("player-time-current");
const previousSong = document.getElementById("previous-song");
const nextSong = document.getElementById("next-song");

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

//-display song and artist-------------------------
const songList = document.querySelectorAll(".song");
const playSongList = document.querySelectorAll('.playlist-container > div > div');
const songArtist = document.getElementById("song-artist");
const songName = document.getElementById("song-name");
const coverImg = document.querySelector(".cover-image");

const playBtnImage = document.querySelectorAll(".play-button-image");
const pauseBtnImage = document.querySelectorAll(".pause-button-image");
const songsContainer = document.querySelectorAll(".playlist-songs .song ");

const searchInput = document.getElementById("search-input");


//-------------Songs List ------------------------
const songs = [
    { cover:"C:/Users/sidri/Desktop/Projects/spotify project/images/in-da-club-cover.jpg", artist: "50 Cent", song: "In Da Club", url: "C:/Users/sidri/Desktop/Projects/spotify project/songs/50 Cent - In Da Club (Lyrics).mp3" },
    { cover:"C:/Users/sidri/Desktop/Projects/spotify project/images/candy-shop-cover.jpg", artist: "50 Cent", song: "Candy Shop", url:"C:/Users/sidri/Desktop/Projects/spotify project/songs/50Cent -Candy Shop (Feat Olivia) - Lyrics-Dirty Version.mp3" },
    { cover:"C:/Users/sidri/Desktop/Projects/spotify project/images/in-da-club-cover.jpg", artist: "50 Cent", song: "Many Men(Wish Death)", url: "C:/Users/sidri/Desktop/Projects/spotify project/songs/50 Cent - Many men (wish death).mp3" },
    { cover:"C:/Users/sidri/Desktop/Projects/spotify project/images/baby-by-me-cover.jpg", artist: "50 Cent", song: "Baby By Me", url: "C:/Users/sidri/Desktop/Projects/spotify project/songs/50 Cent - Baby By Me.mp3" },
    { cover:"C:/Users/sidri/Desktop/Projects/spotify project/images/in-da-club-cover.jpg", artist: "50 Cent", song: "P.I.M.P.", url: "C:/Users/sidri/Desktop/Projects/spotify project/songs/50 Cent - P.I.M.P..mp3" },
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
        playerDuration.textContent = "0:0";
        
    }

    function updatePlayer() {
        setTimes();
        progressUpdate();
    }
    

    playButton.addEventListener("click", () => {
        togglePlayPause();
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
        pauseBtnImage[index].classList.remove('hidden');
    };

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
    };


    
    let initialSetupDone = false;
    function togglePlayPause() {
        if (!initialSetupDone) {
            // Perform initial setup only if it hasn't been done before
            audioElement.src = songs[0].url;
            songName.textContent = songs[0].song;
            songArtist.textContent = songs[0].artist;
            coverImg.src = songs[0].cover;
            coverImg.classList.remove("hidden");
            initialSetupDone = true; // Set the flag to indicate initial setup is done
        }

        if (playButton.dataset.playing === "false") {
            
            audioElement.play().then(() => {
                togglePlayButtonVisibility(currentSongIndex);
                togglePauseButtonVisibility(currentSongIndex);
                console.log("if" + currentSongIndex );
                playButton.dataset.playing = "true";
                playIcon.classList.add("hidden");
                pauseIcon.classList.remove("hidden");

            });
        } else {
            audioElement.pause();
            console.log("else")
            playButton.dataset.playing = "false";
            pauseIcon.classList.add("hidden");
            playIcon.classList.remove("hidden");
        }
    };


//-------------SKIPPING TO NEXT SONG AND SWITCHING PAUSE AND PLAY IMAGE ------------------------------------------------------------

    let currentSongIndex =  0;
    nextSong.addEventListener("click", () => {
        if (currentSongIndex < songs.length -1) {
                currentSongIndex += 1;
                const nextSongInfo = songs[currentSongIndex];
                audioElement.src = nextSongInfo.url;
                songName.textContent = nextSongInfo.song;
                songArtist.textContent = nextSongInfo.artist;
                coverImg.src = nextSongInfo.cover;
                togglePlayButtonVisibility(currentSongIndex);
                togglePauseButtonVisibility(currentSongIndex);

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

//-------------SKIPPING TO PREVIOUS SONG AND SWITCHING PAUSE AND PLAY IMAGE ------------------------------------------------------------
    previousSong.addEventListener("click", () => {
        if (currentSongIndex > 0) {
            currentSongIndex -= 1;
            const nextSongInfo = songs[currentSongIndex];
            audioElement.src = nextSongInfo.url;
            songName.textContent = nextSongInfo.song;
            songArtist.textContent = nextSongInfo.artist;
            coverImg.src = nextSongInfo.cover;
            togglePlayButtonVisibility(currentSongIndex);
            togglePauseButtonVisibility(currentSongIndex);

        audioElement.load();
        audioElement.play().then(() => {

            togglePauseButtonVisibility(currentSongIndex);
            togglePlayButtonVisibility(currentSongIndex);
            playButton.dataset.playing = "true";
            playIcon.classList.add("hidden");
            pauseIcon.classList.remove("hidden");
            coverImg.classList.remove("hidden");
        });
        } else {
            window.alert("This is the first song, cannot play the previous one!");
        }
    });


//-------------Drag control Music ------------------------------------------------------------
    function scrub (event) {
        const scrubTime = (event.offsetX / progress.offsetWidth) * audioElement.duration;
        audioElement.currentTime = scrubTime;
    }

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
            togglePlayPause()
        } else if (event.code === 'Space' && event.target == document.body && playButton.dataset.playing === "true") {
            togglePlayPause();
        }});
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
            audioElement.volume = 0.5;
            adjustVolume.style.flexBasis = "50%";
            volumeButtonActive.classList.remove("hidden");
            volumeButtonMute.classList.add("hidden");
            console.log("unmuted")
        }
    });
    volumeBar.addEventListener("click", adjustVolumeLevel);
    volumeBar.addEventListener("mousemove", (event) => {
        if (event.buttons === 1) {
            adjustVolumeLevel(event);
        }
    });


//-------------PLAYLIST---------------------------------------------------------------------------
    audioElement.src = songs[currentSongIndex].url
    let previousPlayBtnImage = null;
    let previousPauseBtnImage = null;
    playSongList.forEach((song, index) => {
        song.addEventListener('click', () => {
            const clickedSongIndex = index;
            const songUrl = songs[clickedSongIndex].url; // Get the URL of the clicked song
            const songPlaying = songs[clickedSongIndex].song;
            const artistPlaying = songs[clickedSongIndex].artist;
            const coverImage = songs[clickedSongIndex].cover;
            const playBtnImage = song.querySelector('.play-button-image');
            const pauseBtnImage = song.querySelector('.pause-button-image'); 
            
            coverImg.classList.remove("hidden");
            songName.innerHTML = songPlaying;
            songArtist.innerHTML = artistPlaying;
            coverImg.src = coverImage;
            
            if (currentSongIndex !== clickedSongIndex) {
                currentSongIndex = index;
                audioElement.src = songUrl;
                audioElement.play();
                playButton.dataset.playing = "true";
                playBtnImage.classList.add('hidden');
                pauseBtnImage.classList.remove('hidden');
               if (previousPlayBtnImage && previousPauseBtnImage) {
                    previousPlayBtnImage.classList.remove('hidden');
                    previousPauseBtnImage.classList.add('hidden');
                }
                previousPlayBtnImage = playBtnImage;
                previousPauseBtnImage = pauseBtnImage;
            } else {
                if (playButton.dataset.playing === "true") {
                    audioElement.pause();
                    playButton.dataset.playing = "false";
                    playIcon.classList.remove("hidden");
                    pauseIcon.classList.add("hidden");
                } else {
                    audioElement.play();
                    playButton.dataset.playing = "true";
                    playIcon.classList.add("hidden");
                    pauseIcon.classList.remove("hidden");
                }
                playBtnImage.classList.toggle('hidden');
                pauseBtnImage.classList.toggle('hidden');
                
            }
        });
    });

    function playSong(searchQuery) {
        const song = songs.find(song => song.song.toLowerCase() === searchQuery.toLowerCase());
        if (song) {
            // Play the song URL
            const audio =   audioElement.songURLs;
            audioElement.play();
            console.log(currentSongIndex);
        } else {
            console.log("Song not found");
        }
    }
    
    // Event listener for search input
    
    // Event listener for Enter key press
    searchInput.addEventListener("keyup", event => {    
        if (event.key === "Enter") {
            const searchQuery = searchInput.value.trim();
            playSong(searchQuery);
        }
    });





});
