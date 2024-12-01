// Initialize globally the Current index in SONG_DATA
let songIndex = -1;

// Shuffle the vgm playlist
shuffle(SONG_DATA);

// Prepare the first song for playing
prepareSong(SONG_DATA);

// Load saved volume from localStorage if it exists
for(const slider of volumeSliders){
    const savedValue = localStorage.getItem(slider.id);
    if(savedValue !== null){
        slider.value = savedValue;
        
    }
}
for(const sound of sounds){
    const savedSound = localStorage.getItem(sound.id);
    if(savedSound !== null){
        sound.volume = savedSound;
    }
}