const searchInput = document.getElementById('search');
    const tracks = document.querySelectorAll('.song-item');
    const audioPlayer = document.createElement('audio');
    let currentTrackIndex = 0;
    // Music Player Elements
    const musicPlayer = document.getElementById('musicPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const progressBar = document.getElementById('progressBar');
    const currentCover = document.getElementById('currentCover');
    const currentTitle = document.getElementById('currentTitle');
    const currentArtist = document.getElementById('currentArtist');

    // Function to filter songs based on search input
    function filterSongs() {
      const query = searchInput.value.toLowerCase();

      tracks.forEach(track => {
        const songTitle = track.querySelector('h5').textContent.toLowerCase();
        const songArtist = track.querySelector('p').textContent.toLowerCase();

        if (songTitle.includes(query) || songArtist.includes(query)) {
          track.style.display = ''; // Show the track
        } else {
          track.style.display = 'none'; // Hide the track
        }
      });
    }

    // Attach the input event listener to the search input
    searchInput.addEventListener('input', filterSongs);

    // Modal Elements
    const modal = document.getElementById('songModal');
    const addSongBtn = document.getElementById('addSongBtn');
    const closeModal = document.getElementsByClassName('close')[0];

    // Show modal when 'Add Song' button is clicked
    addSongBtn.onclick = function() {
      modal.style.display = 'block';
    }

    // Close modal when 'X' is clicked
    closeModal.onclick = function() {
      modal.style.display = 'none';
    }

    // Close modal if clicked outside the modal content
    window.onclick = function(event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    }

    // Function to load and play the selected track
    function loadTrack(index) {
      const songItem = tracks[index];
      const songAudio = songItem.querySelector('.song-file').src;
      const songTitle = songItem.querySelector('h5').textContent;
      const songArtist = songItem.querySelector('p').textContent;
      const songCover = songItem.querySelector('.song-cover').src;

      audioPlayer.src = songAudio;
      currentCover.src = songCover;
      currentTitle.textContent = songTitle;
      currentArtist.textContent = songArtist;

      audioPlayer.play();
      playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>';

      // Show the music player (was initially hidden)
      musicPlayer.style.display = 'flex';
    }
    playPauseBtn.addEventListener('click', function() {
      if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.innerHTML = '<i class="bi bi-pause-fill"></i>'; // Change to pause icon
      } else {
        audioPlayer.pause();
        playPauseBtn.innerHTML = '<i class="bi bi-play-fill"></i>'; // Change back to play icon
      }
    });

    progressBar.addEventListener('input', function() {
      audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
    });

    document.querySelectorAll('.play-btn').forEach(button => {
      button.addEventListener('click', function() {
        currentTrackIndex = this.getAttribute('data-index');
        loadTrack(currentTrackIndex);
      });
    });
    document.getElementById('nextBtn').addEventListener('click', function() {
      currentTrackIndex = (parseInt(currentTrackIndex) + 1) % tracks.length;
      loadTrack(currentTrackIndex);
    });

    document.getElementById('prevBtn').addEventListener('click', function() {
      currentTrackIndex = (parseInt(currentTrackIndex) - 1 + tracks.length) % tracks.length;
      loadTrack(currentTrackIndex);
    });
    audioPlayer.addEventListener('timeupdate', function() {
      progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', function() {
        const songId = this.getAttribute('data-id');
        const confirmation = confirm("Are you sure you want to delete this song?");
        if (confirmation) {
          fetch(`/delete/${songId}`, {
              method: 'POST', // Use POST method to match the Express route
            })
            .then(response => {
              if (response.ok) {
                // Optionally, you could remove the song from the DOM
                const songItem = this.closest('.song-item');
                songItem.remove();
              } else {
                alert('Error deleting song');
              }
            })
            .catch(error => {
              console.error('Error:', error);
              alert('Error deleting song');
            });
        }
      });
    });