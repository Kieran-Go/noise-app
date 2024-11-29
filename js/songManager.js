// Plays the song on the current index
function prepareSong(songArray){
    songIndex = (songIndex + 1) % songArray.length; // Loop back to the start
    vgm.setAttribute("src", `audio/vgm/${songArray[songIndex]}`);
}

// Use Fisher-Yates shuffle to randomize the music array
function shuffle(arr) {
    for (let currentIndex = arr.length - 1; currentIndex > 0; currentIndex--) {
        const randomIndex = Math.floor(Math.random() * (currentIndex + 1));
        [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]]; // Swap
    }
}