let myLibrary = [];

function Book() {
    this.title = title;
    this.author = author;
    this.rating = rating;
    this.readStatus = readStatus;
    this.start = start;
    this.end = end;
}

function addBookToLibrary(title, author, rating=0, readStatus=0, start=0, end=0) {
    const newBook = new Book(title, author, rating, readStatus, start, end);
    myLibrary.push(book);
}

function displayLibrary() {
    const listContent = document.querySelector('.main-content');
    listContent.textContent = '';
    for (let i = 0; i < myLibrary.length; i++) {
        const listRow = document.createElement('div');
        listRow.classList.add('.list-item');
        listContent.appendChild(listRow);
        // Title
        const title = document.createElement('p');
        title.textContent = myLibrary[i].title;
        listRow.appendChild(title);
        // Author
        const author = document.createElement('p');
        author.textContent = myLibrary[i].author;
        listRow.appendChild(author);
        // Rating
        const rating = document.createElement('i');
        rating.classList.add('fa-solid');
        if (myLibrary[i].rating === 1) {
            rating.classList.add('fa-1');
        } else if (myLibrary[i].rating === 2) {
            rating.classList.add('fa-2');
        } else if (myLibrary[i].rating === 3) {
            rating.classList.add('fa-3');
        } else if (myLibrary[i].rating === 4) {
            rating.classList.add('fa-4');
        } else if (myLibrary[i].rating === 5) {
            rating.classList.add('fa-5');
        }
        listRow.appendChild(rating);
        // Status
        const readStatus = document.createElement('i');
        readStatus.classList.add('fa-solid');
        if (myLibrary[i].readStatus === 'read') {
            readStatus.classList.add('fa-circle-check', 'fa-xl');
        } else if (myLibrary[i].readStatus === 'unread') {
            readStatus.classList.add('fa-circle-xmark', 'fa-xl');
        } else if (myLibrary[i].readStatus === 'wish') {
            readStatus.classList.add('fa-bookmark', 'fa-lg');
        }
        listRow.appendChild(readStatus);
        // Start date
        const start = document.createElement('p');
        start.textContent = myLibrary[i].start;
        listRow.appendChild(start);
        // End date
        const end = document.createElement('p');
        end.textContent = myLibrary[i].end;
        listRow.appendChild(end);
    }
}