// Modal functionality
const modal = new bootstrap.Modal(document.getElementById("songModal"));
const addSongBtn = document.getElementById("addSongBtn");
const playPauseBtn = document.getElementById('playPauseBtn');
const audioPlayer = document.getElementById('audioPlayer');

// Show modal when 'Add Song' button is clicked
addSongBtn.addEventListener('click', () => {
    modal.show();
});

// Handling song playback
let currentTrackIndex = 0;
const tracks = document.querySelectorAll('.song-item');
let isShuffle = false;
let isRepeat = false;

function loadTrack(index) {
    const songItem = tracks[index];
    const songFile = songItem.querySelector('.song-file').src;
    audioPlayer.src = songFile;
    audioPlayer.play();
    playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i> Pause';
}

playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i> Pause';
    } else {
        audioPlayer.pause();
        playPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i> Play';
    }
});

document.getElementById('prevBtn').addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
});

document.getElementById('nextBtn').addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
});

document.getElementById('shuffleBtn').addEventListener('click', function () {
    isShuffle = !isShuffle;
    this.innerHTML = isShuffle ? '<i class="bi bi-shuffle"></i> Unshuffle' : '<i class="bi bi-shuffle"></i> Shuffle';
});

document.getElementById('repeatBtn').addEventListener('click', function () {
    isRepeat = !isRepeat;
    this.innerHTML = isRepeat ? '<i class="bi bi-arrow-repeat"></i> Repeat: On' : '<i class="bi bi-arrow-repeat"></i> Repeat: Off';
});

audioPlayer.addEventListener('ended', function () {
    if (isRepeat) {
        loadTrack(currentTrackIndex);
    } else if (isShuffle) {
        currentTrackIndex = Math.floor(Math.random() * tracks.length);
        loadTrack(currentTrackIndex);
    } else {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
        loadTrack(currentTrackIndex);
    }
});

// Load the first track when the page loads
if (tracks.length > 0) {
    loadTrack(currentTrackIndex);
}
