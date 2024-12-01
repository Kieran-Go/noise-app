// Initialize all audio elements
const sounds = document.querySelectorAll("audio");
for (const sound of sounds) {
    sound.volume = 0; // Initialize the volume of all audio to 0
}

// Initialize the volume slider elements
const volumeSliders = document.querySelectorAll(".volumeSlider");

// Initialize the Master volume slider element
const masterVolume = document.getElementById("masterVolume");
masterVolume.value = 1; // Master volume starts at 1

// Function to update the volume of a single audio element
function updateVolume(sliderValue, sound) {
    const masterMultiplier = parseFloat(masterVolume.value);
    sound.volume = sliderValue * masterMultiplier;

    if (sound.volume > 0 && playBtn.className !== "paused") {
        sound.play();
    } else {
        sound.pause();
    }

    // Store the volume in local storage
    localStorage.setItem(sound.id, sound.volume);
}

// Event listener for individual sliders
for (const slider of volumeSliders) {
    slider.value = 0; // Volume sliders start at 0

    slider.addEventListener("input", () => {
        const sliderId = slider.id.replace("Slider", "");
        const sound = Array.from(sounds).find(s => s.id === sliderId);

        if (sound) {
            const sliderValue = parseFloat(slider.value);
            updateVolume(sliderValue, sound);

            // Store the slider value into local storage
            localStorage.setItem(slider.id, slider.value);
        }
    });
}

// Event listener for the master volume slider
masterVolume.addEventListener("input", () => {
    const masterMultiplier = parseFloat(masterVolume.value);

    for (const slider of volumeSliders) {
        const sliderId = slider.id.replace("Slider", "");
        const sound = Array.from(sounds).find(s => s.id === sliderId);

        if (sound) {
            const sliderValue = parseFloat(slider.value);
            updateVolume(sliderValue, sound);
            localStorage.setItem(sound.id, sound.volume);
        }
    }

    if(masterVolume.value > 0){
        muteBtn.classList.remove("muted");
        muteBtn.textContent = "MUTE";
    }
    else{
        muteBtn.classList.add("muted");
        muteBtn.textContent = "UNMUTE";
    }
    localStorage.setItem(masterVolume, masterVolume.value);
});


// Initialize the vgm audio seperately as it has additional requirements
const vgm = document.querySelector("#vgm");
vgm.onended = function(){
    prepareSong(SONG_DATA);
    vgm.play();
}

// Initialize play button
const playBtn = document.getElementById("playBtn");
playBtn.addEventListener("click", () =>{
    playBtn.classList.toggle("paused");

    for(const sound of sounds){
        if(sound.id != "light"){ // Exclude the light sfx
            if(playBtn.className !== "paused"){
                if(sound.volume > 0){
                    sound.play();
                }
            }
            else sound.pause();

        }
    }
    playBtn.className === "paused" ? playBtn.setAttribute("src", "img/playBtn_hover.png") :
     playBtn.setAttribute("src", "img/pauseBtn_hover.png");
});

// Play button states
playBtn.addEventListener("mouseover", () => {
    if(playBtn.className === "paused") playBtn.setAttribute("src", "img/playBtn_hover.png");
    else playBtn.setAttribute("src", "img/pauseBtn_hover.png");
});
playBtn.addEventListener("mouseout", () => {
    playBtn.className === "paused" ? playBtn.setAttribute("src", "img/playBtn_neutral.png") :
     playBtn.setAttribute("src", "img/pauseBtn_neutral.png");
});
playBtn.addEventListener("mousedown", () => {
    playBtn.className === "paused" ? playBtn.setAttribute("src", "img/playBtn_pressed.png") :
     playBtn.setAttribute("src", "img/pauseBtn_pressed.png");
});