// Initialize all audio
const sounds = document.querySelectorAll("audio");
for(const sound of sounds){
    // Initialize the sound of all audio at 0
    sound.volume = 1;
}

// Initialize the vgm audio as it has additional requirements
const vgm = document.querySelector("#vgm");
// Change vgm song on ended
vgm.onended = function(){
    prepareSong();
    vgm.play();
}

const VGM_SONGS = [
    "FF7 Remake_Midnight Rendezvous.mp3",
    "Gran Turismo 5_Sunset Haze.mp3"
];
let vgmIndex = -1;

function prepareSong(){
    vgmIndex = (vgmIndex + 1) % VGM_SONGS.length; // Loop back to the start
    vgm.setAttribute("src", "audio/vgm/" + VGM_SONGS[vgmIndex]);
}

function shuffleMusic(music) {
    for (let i = music.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [music[i], music[j]] = [music[j], music[i]]; // Swap
    }
}

shuffleMusic(VGM_SONGS);
prepareSong();

const volumeSliders = document.querySelectorAll(".volumeSlider");
for(const slider of volumeSliders){
    // Initialize the volume slider values at 0
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