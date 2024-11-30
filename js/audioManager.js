// Initialize all audio elements
const sounds = document.querySelectorAll("audio");
for(const sound of sounds){
    sound.volume = 0; // Initialize the volume of all audio to 0
}

// Initialize the volume slider elements
const volumeSliders = document.querySelectorAll(".volumeSlider");

for(const slider of volumeSliders){
    // Volume slider values start at 0
    slider.value = 0;

    // Event listener for changing audio value
    slider.addEventListener("input", () => {
        const sliderId = slider.id.replace("Slider", "");
        const sound = Array.from(sounds).find(s => s.id === sliderId);

        // Play/pause the audio depending on if the volume is > than 0
        if (sound) {
            sound.volume = slider.value;
            sound.volume > 0 ? sound.play() : sound.pause();
        }
    });
}

// Initialize the vgm audio seperately as it has additional requirements
const vgm = document.querySelector("#vgm");
vgm.onended = function(){
    prepareSong(SONG_DATA);
    vgm.play();
}