// Initialize all audio
const sounds = document.querySelectorAll("audio");
for(const sound of sounds){
    // Initialize the sound of all audio at 0
    sound.volume = 1;
}

// Initialize the vgm audio as it is unique to the other audio
const vgm = document.querySelector("#vgm");
// Change vgm song on ended
vgm.onended = function(){
    console.log("Song ended. Now changing songs");
}

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