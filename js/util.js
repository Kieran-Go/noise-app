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