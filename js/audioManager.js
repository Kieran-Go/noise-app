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
            if(sound.volume > 0 && playBtn.className !== "paused"){
                sound.play();
            }
            else sound.pause();

            // Store the sound volume into local storage
            localStorage.setItem(sound.id, sound.volume);
        }

        // Store the slider value into local storage
        localStorage.setItem(slider.id, slider.value);
    });
}

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