// Initialize Current index in SONG_DATA
let songIndex = -1;

// Shuffle the song order on start
shuffle(SONG_DATA);

// Prepare the first song for playing
prepareSong(SONG_DATA);

// Overwrite custom themes for browsers that change the background color
const page = document.querySelector("html");
page.setAttribute("style", "background-color: rgb(28, 28, 162) !important;");