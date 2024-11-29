// Plays the song on the current index
function prepareSong(){
    vgmIndex = (vgmIndex + 1) % VGM_SONGS.length; // Loop back to the start
    vgm.setAttribute("src", "audio/vgm/" + VGM_SONGS[vgmIndex]);
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

// VGM songs array
const VGM_SONGS = [
    "FF7 Remake_Midnight Rendezvous.mp3",
    "Gran Turismo 5_Sunset Haze.mp3"
];
let vgmIndex = -1;

shuffleMusic(VGM_SONGS);
prepareSong();

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