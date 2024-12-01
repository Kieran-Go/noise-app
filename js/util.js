// Initialize the 'next' button
const nextBtn = document.querySelector(".nextBtn");
nextBtn.addEventListener("click", () =>{
    prepareSong(SONG_DATA);
    if(vgm.volume > 0) vgm.play();
});

// Initialize the 'prev' button
const prevBtn = document.querySelector(".prevBtn");
prevBtn.addEventListener("click", () =>{
    prepareSong(SONG_DATA, true);
    if(vgm.volume > 0) vgm.play();
});

// Button states
const buttons = [nextBtn, prevBtn];

buttons.forEach(button => {
    button.addEventListener("mouseover", () => {
        button.setAttribute("src", "img/playBtn_hover.png");
    });

    button.addEventListener("mouseout", () => {
        button.style.backgroundColor = "";
        button.setAttribute("src", "img/playBtn_neutral.png");
    });

    button.addEventListener("mousedown", () => {
        button.setAttribute("src", "img/playBtn_pressed.png");
    });

    button.addEventListener("mouseup", () => {
        button.setAttribute("src", "img/playBtn_hover.png");
    });
});

// Dark mode toggle button
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