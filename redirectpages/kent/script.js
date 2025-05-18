// Music toggle functionality
const musicToggle = document.getElementById('musicToggle');
let audioPlayer = null;
let lastSongNumber = 0; // Track the last played song

// Function to get a random song (that's not the previous song)
function getRandomSong() {
    let songNumber;
    // Keep generating random numbers until we get one that's not the last song
    do {
        songNumber = Math.floor(Math.random() * 5) + 1; // Random number between 1-5
    } while (songNumber === lastSongNumber && lastSongNumber !== 0);
    
    lastSongNumber = songNumber; // Update the last played song
    return `./assets/${songNumber}.ogg`;
}

musicToggle.addEventListener('click', function(e) {
    e.preventDefault();
    if (!audioPlayer) {
        // First time playing - create new Audio and set up ended event
        audioPlayer = new Audio(getRandomSong());
        audioPlayer.volume = 0.5; // Set volume to 50%
        audioPlayer.loop = false; // Disable loop as we'll manually load the next song
        audioPlayer.play();
        musicToggle.classList.add('playing');
        
        // When current song ends, play a different one
        audioPlayer.addEventListener('ended', function() {
            audioPlayer.src = getRandomSong();
            audioPlayer.volume = 0.5; // Ensure volume is 50%
            audioPlayer.play();
        });
    } else if (audioPlayer.paused) {
        // Play a new song when resuming from pause
        audioPlayer.src = getRandomSong();
        audioPlayer.volume = 0.5; // Ensure volume is 50%
        audioPlayer.play();
        musicToggle.classList.add('playing');
    } else {
        // Pause the current song
        audioPlayer.pause();
        musicToggle.classList.remove('playing');
    }
}); 