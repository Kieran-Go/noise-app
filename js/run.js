// Initialize globally the Current index in SONG_DATA
let songIndex = -1;

// Shuffle the vgm playlist
shuffle(SONG_DATA);

// Prepare the first song for playing
prepareSong(SONG_DATA);