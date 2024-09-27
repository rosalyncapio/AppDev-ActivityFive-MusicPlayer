   // JavaScript to handle opening the edit modal and populating the fields
   document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', function() {
        const songId = this.getAttribute('data-id');
        const songTitle = this.getAttribute('data-title');
        const songArtist = this.getAttribute('data-artist');

        // Populate the modal fields
        document.getElementById('editSongId').value = songId;
        document.getElementById('editTitle').value = songTitle;
        document.getElementById('editArtist').value = songArtist;

        // Set the action for the form
        const editSongForm = document.getElementById('editSongForm');
        editSongForm.action = `/edit/${songId}`; // Set the action to include the song ID

        // Open the edit modal
        document.getElementById('editSongModal').style.display = 'block';
    });
});

// Close the modal
document.getElementById('closeEditModal').addEventListener('click', function() {
    document.getElementById('editSongModal').style.display = 'none';
});