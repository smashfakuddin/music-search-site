const searchSongs = () => {
    const searchText = document.getElementById('search-field').value;
    url = `https://api.lyrics.ovh/suggest/${searchText }`
    fetch(url)
        .then(response => response.json())
        .then(data => displaySongs(data.data))
}

const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    console.log(songs);

    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p>Total Duration: <span>${song.duration} sec</span></p>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                     <source src="horse.ogg" type="audio/ogg">
                     <source src="${song.preview}" type="audio/mpeg">               
                </audio>
             </div>
                 <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
             </div>       
        `
        songContainer.appendChild(songDiv);
    });
}

const getLyrics = (artist, title) =>{
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displayLyrics(data.lyrics))
}

const displayLyrics = lyrics =>{
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
}