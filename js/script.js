// Plays the song on the current index
function prepareSong(){
    vgmIndex = (vgmIndex + 1) % vgmSongs.length; // Loop back to the start
    vgm.setAttribute("src", "audio/vgm/" + vgmSongs[vgmIndex]);
}

// Randomly shuffles the order of an array of music
function shuffleMusic(music) {
    for (let i = music.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [music[i], music[j]] = [music[j], music[i]]; // Swap
    }
}

// Initialize all audio
const sounds = document.querySelectorAll("audio");

// Initialize the vgm audio seperately as it has additional requirements
const vgm = document.querySelector("#vgm");
// Change vgm song on ended
vgm.onended = function(){
    prepareSong();
    vgm.play();
}

// Get an array of every song by reading from a txt file
async function loadSongs() {
    const vgmPath = "../audio/vgm/songs.txt";
    let vgmSongs;

    try {
        const response = await fetch(vgmPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        vgmSongs = text.split('\n').map(song => song.trim()).filter(line => line);
    } catch (error) {
        console.error('Error fetching the file:', error);
    }
    return vgmSongs;
}

// Initialize the songs array
let vgmSongs = [];
let vgmIndex = -1;

// Load, shuffle and prepare the songs
loadSongs().then(songsArray => {
    vgmSongs = songsArray;
    shuffleMusic(vgmSongs);
    prepareSong();
});

// Initialize the volume sliders
const volumeSliders = document.querySelectorAll(".volumeSlider");
for(const slider of volumeSliders){
    // Volume slider values start at 0
    slider.value = 0;

    // Event listener for changing audio value
    slider.addEventListener("input", () => {
        const sliderId = slider.id.replace("Slider", "");
        for(const sound of sounds){
            if(sound.id === sliderId){
                sound.volume = slider.value;
                if(sound.volume > 0) sound.play();
                else sound.pause();
            }
        }
    });
}