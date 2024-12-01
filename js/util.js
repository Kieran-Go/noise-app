// Initialize the 'next' button
const nextBtn = document.querySelector(".nextBtn");
nextBtn.addEventListener("click", () =>{
    prepareSong(SONG_DATA);
    if(playBtn.className !== "paused") vgm.play();
});
setupButtonStates(nextBtn, "img/nextBtn");

// Initialize the 'prev' button
const prevBtn = document.querySelector(".prevBtn");
prevBtn.addEventListener("click", () =>{
    prepareSong(SONG_DATA, true);
    if(playBtn.className !== "paused") vgm.play();
});
setupButtonStates(prevBtn, "img/nextBtn");

// Initialize the Dark mode toggle button
const darkModeBtn = document.querySelector(".darkModeBtn");
darkModeBtn.addEventListener("click", () =>{
    // Toggle dark mode
    const overlay = document.getElementById("overlay");
    const body = document.body;
    overlay.classList.toggle("visible");
    body.classList.toggle('noScroll');

    // Change the toggle button source
    const sunSrc = "img/sunBtn.png";
    const moonSrc = "img/moonBtn.png";
    overlay.className === "hidden" ? darkModeBtn.setAttribute("src", sunSrc) : darkModeBtn.setAttribute("src", moonSrc);

    // Play the sound effect
    const sound = document.getElementById("light");
    const lightOn = "audio/util/lightOn.mp3";
    const lightOff = "audio/util/lightOff.mp3";
    overlay.className === "hidden" ? sound.setAttribute("src", lightOn) : sound.setAttribute("src", lightOff);
    if(sound.volume < 1) sound.volume = 1;
    sound.play();
})

// Initialize the delete button
const delBtn = document.querySelector(".delBtn");
delBtn.addEventListener("click", () => {
    for(const slider of volumeSliders){
        slider.value = 0;
        // Store the slider value into local storage
        localStorage.setItem(slider.id, slider.value);
    }
    for(const sound of sounds){
        if(sound.id != "light"){ // Exclude the light sfx
            sound.volume = 0;
            sound.pause();
            // Store the sound volume into local storage
            localStorage.setItem(sound.id, sound.volume);
        }
    }
})
setupButtonStates(delBtn, "img/delBtn");

// Sets up a button with basic state management, changing its src to reflect the user's interaction with it
function setupButtonStates(button, btnSrc){
    button.addEventListener("mouseover", () => {
        button.setAttribute("src", btnSrc + "_hover.png");
    });

    button.addEventListener("mouseout", () => {
        button.setAttribute("src", btnSrc + "_neutral.png");
    });

    button.addEventListener("mousedown", () => {
        button.setAttribute("src", btnSrc + "_pressed.png");
    });

    button.addEventListener("mouseup", () => {
        button.setAttribute("src", btnSrc + "_hover.png");
    });
}

// Initialize the mute button
const muteBtn = document.getElementById("muteBtn");
muteBtn.addEventListener("click", () => {
    const isMuted = muteBtn.classList.toggle("muted");
    if (isMuted) {
        // Store the current master volume before muting
        previousMasterVolume = masterVolume.value;
        masterVolume.value = 0; // Set master volume to 0
        muteBtn.textContent = "UNMUTE";
    } else {
        // Restore the previous master volume
        masterVolume.value = previousMasterVolume || 1; // Defaults to 1 if undefined
        muteBtn.textContent = "MUTE";
    }

    // Trigger master volume input event to update audio
    masterVolume.dispatchEvent(new Event("input"));
});