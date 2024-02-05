function search() {


    let field = document.getElementById('searchField');
    let artista = field.value;
    if (artista && artista !== '') {

        let hiddenCards = document.querySelectorAll('div.row div.col-10');
        for (const div of hiddenCards) {


            div.style.display = 'none';

        }

        let containerMain = document.getElementById('searchResults');
        containerMain.parentNode.style.display = 'flex';
        containerMain.style.display = 'flex';

        let div = document.getElementById(artista + 'Section');
        div.parentNode.parentNode.style.display = 'flex';
    } else {
        let hiddenCards = document.querySelectorAll('div.row div.col-10');
        for (const div of hiddenCards) {


            div.style.display = 'flex';

        }
    }

}

function createCard(artista, json) {

    let container = document.getElementById(artista);
    container.parentNode.style.display = 'flex';
    container.classList = ['d-flex flex-column'];
    let div = document.getElementById(artista + 'Section');

    let card = document.createElement('div');
    card.classList = ['card', 'p-0'];
    let cardBody = document.createElement('div');
    cardBody.classList = ['card-body p-0'];
    let image = document.createElement('img');
    image.src = json.album.cover;
    cardBody.appendChild(image);
    card.appendChild(cardBody);
    div.appendChild(card);


}

function initAlbum() {
    const artisti = ['eminem', 'metallica', 'queen'];

    for (const artista of artisti) {

        fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artista}`)
            .then(response => response.json())
            .then(json => {

                for (let i = 0; i < 4; ++i) {
                    createCard(artista, json.data[i]);

                }

            });
    }






}

initAlbum();


function test() {


    let search = document.getElementById('searchField');
    let prevList = document.querySelectorAll('#modalBody ol li');

    // Reset lista Modale
    for (const li of prevList) {
        li.remove();
    }


    // Creo la lista con il valore dell'input di ricerca
    if (search.value && search.value !== '') {
        fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${search.value.toLowerCase()}`)
            .then(response => response.json())
            .then(json => {
                let modalBody = document.getElementById('modalBody');
                let lista = document.createElement('ol');
                modalBody.appendChild(lista);
                for (const res of json.data) {
                    console.log(res.album.title);
                    let elem = document.createElement('li');
                    elem.innerText = `${res.album.title} (${res.artist.name})`
                    lista.appendChild(elem);
                }

            });
    } else {

        // Creo la lista generale delgi album senza il valore dell' input
        const artisti = ['eminem', 'metallica', 'queen'];

        for (const artista of artisti) {

            fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artista}`)
                .then(response => response.json())
                .then(json => {

                    let modalBody = document.getElementById('modalBody');
                    let lista = document.createElement('ol');
                    modalBody.appendChild(lista);
                    for (const res of json.data) {
                        console.log(res.album.title);
                        let elem = document.createElement('li');
                        elem.innerText = `${res.album.title} (${res.artist.name})`
                        lista.appendChild(elem);
                    }

                });
        }
    }
}

// test();

