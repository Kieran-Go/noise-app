// Plays the song on the current index
function prepareSong(songArray, prev){
    songIndex = prev 
    ? (songIndex - 1 + songArray.length) % songArray.length // Decrement songIndex if prev is true
    : (songIndex + 1) % songArray.length; // Otherwise increment songIndex

    vgm.setAttribute("src", `audio/vgm/${songArray[songIndex]}`);
    showCurrentSong();
}

// Use Fisher-Yates shuffle to randomize the music array
function shuffle(arr) {
    for (let currentIndex = arr.length - 1; currentIndex > 0; currentIndex--) {
        const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
        [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]]; // Swap
    }
}

// Scroll the name of the current vgm song on the screen
function showCurrentSong(){
    // Initialize the song name
    const songName = document.querySelector(".songName");

    // Set songName text content to the name of the current song
    let content = SONG_DATA[songIndex].replace("_",": ").replace(".mp3","");
    songName.textContent = content;

    // Iniialize the song name container and wrapper
    const songNameContainer = document.querySelector(".songNameContainer");
    const songNameWrapper = document.querySelector(".songNameWrapper");

    // Set the scrolling speed
    resetScroll();
    const speed = 30;
    const animDur = (songNameWrapper.offsetWidth + songNameContainer.offsetWidth) / speed;
    songNameWrapper.style.animationDuration = `${animDur}s`;
}

function resetScroll(){
    const songNameWrapper = document.querySelector(".songNameWrapper");

    songNameWrapper.style.animation = 'none'; // Disable the animation
    songNameWrapper.offsetHeight; // Trigger a reflow to apply the style changes
    songNameWrapper.style.animation = ''; // Reapply the animation (CSS defined)
}