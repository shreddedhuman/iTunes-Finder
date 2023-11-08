// Búsqueda
const searchItunes = (term) => {
    const url = `https://itunes.apple.com/search?term=${term}`;
    return fetch(url)
        .then((response) => response.json())
        .then((data) => data.results)
        .catch((error) => console.error('Request failed:', error));
}

// Crea elementos HTML a partir de los resultados
const createSongElements = (results) => {
    const songContainer = document.getElementById('songs');
    songContainer.innerHTML = ''; // Limpia el contenedor antes de agregar nuevos elementos

    results.forEach((result) => {
        const article = document.createElement('article');
        const artist = document.createElement('p');
        const song = document.createElement('h4');
        const img = document.createElement('img');
        const audio = document.createElement('audio');
        const audioSource = document.createElement('source');

        artist.textContent = result.artistName;
        song.textContent = result.trackName;
        img.src = result.artworkUrl100;
        audioSource.src = result.previewUrl;
        audio.controls = true;

        article.appendChild(img);
        article.appendChild(artist);
        article.appendChild(song);
        article.appendChild(audio);
        audio.appendChild(audioSource);

        songContainer.appendChild(article);

        img.style.width = '100px'; 
        img.style.height = '100px'; 
    });
}

// Manejo de búsqueda
const handleSearch = () => {
    const searchTerm = document.getElementById('searchTerm').value;
    if (!searchTerm || searchTerm === '') {
        alert('Por favor, introduce un término de búsqueda.');
    } else {
        searchItunes(searchTerm)
            .then((data) => createSongElements(data))
            .catch((error) => console.error('Error:', error));
    }
}

const searchBtn = document.getElementById('searchTermBtn');
searchBtn.addEventListener('click', handleSearch);

document.addEventListener('play', (event) => {
    const audioElements = document.getElementsByTagName('audio');
    for (let i = 0; i < audioElements.length; i++) {
        if (audioElements[i] !== event.target) {
            audioElements[i].pause();
        }
    }
}, true);
