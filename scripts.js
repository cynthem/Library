let myLibrary = [];

function Book() {
    this.title = title;
    this.author = author;
    this.rating = rating;
    this.readStatus = readStatus;
    this.start = start;
    this.end = end;
}

// First check storage for pre-existing books
if (localStorage.getItem('books') === null) {
    myLibrary = [];
} else {
    const storedBooks = JSON.parse(localStorage.getItem('books'));
    myLibrary = storedBooks;
}

function addBookToLibrary(title, author, rating, readStatus, start, end) {
    const newBook = new Book(title, author, rating, readStatus, start, end);
    myLibrary.push(newBook);
    displayLibrary();
}

function displayLibrary() {
    localStorage.setItem('books', JSON.stringify(myLibrary));
    updateLibraryStats();
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
        if (myLibrary[i].rating === 'none') {
            rating.classList.add('fa-plus', 'plus-rating');
        } else if (myLibrary[i].rating === '1') {
            rating.classList.add('fa-1');
        } else if (myLibrary[i].rating === '2') {
            rating.classList.add('fa-2');
        } else if (myLibrary[i].rating === '3') {
            rating.classList.add('fa-3');
        } else if (myLibrary[i].rating === '4') {
            rating.classList.add('fa-4');
        } else if (myLibrary[i].rating === '5') {
            rating.classList.add('fa-5');
        }
        listRow.appendChild(rating);
        // Status
        const readStatus = document.createElement('i');
        readStatus.classList.add('fa-solid');
        if (myLibrary[i].readStatus === 'none') {
            readStatus.classList.add('fa-plus', 'plus-status');
        } else if (myLibrary[i].readStatus === 'read') {
            readStatus.classList.add('fa-circle-check', 'fa-xl');
        } else if (myLibrary[i].readStatus === 'unread') {
            readStatus.classList.add('fa-circle-xmark', 'fa-xl');
        } else if (myLibrary[i].readStatus === 'wish') {
            readStatus.classList.add('fa-bookmark', 'fa-lg');
        }
        listRow.appendChild(readStatus);
        // Start date
        if (myLibrary[i].start = 'none') {
            const noStart = document.createElement('i');
            noStart.classList.add('fa-solid', 'fa-plus', 'plus-start');
            listRow.appendChild(noStart);
        } else {
            const start = document.createElement('p');
            start.textContent = myLibrary[i].start;
            listRow.appendChild(start);
        }
        // End date
        if (myLibrary[i].end = 'none') {
            const noEnd = document.createElement('i');
            noEnd.classList.add('fa-solid', 'fa-plus', 'plus-end');
            listRow.appendChild(noEnd);
        } else {
            const end = document.createElement('p');
            end.textContent = myLibrary[i].end;
            listRow.appendChild(end);
        }
        // Trash
        const trash = document.createElement('i');
        trash.classList.add('fa-solid', 'fa-trash-can');
        listRow.appendChild(trash);
    }
}

function updateLibraryStats() {
    const totalRead = document.querySelector('.read-total');
    const totalUnread = document.querySelector('.unread-total');
    const totalBooks = document.querySelector('.books-total');
    let readCounter = 0;
    let unreadCounter = 0;
    totalRead.textContent = 0;
    totalUnread.textContent = 0;
    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].readStatus === 'read') {
            readCounter += 1;
            totalRead.textContent = readCounter;
        } else if (myLibrary[i].readStatus === 'unread' || 
                    myLibrary[i].readStatus === 'wish' ||
                    myLibrary[i].readStatus === 'none') {
            unreadCounter += 1;
            totalUnread.textContent = unreadCounter;
        }
    }
    totalBooks.textContent = myLibrary.length;
}

function handleClicks() {
    document.addEventListener('click', (e) => {
        const { target } = e;
        if (target.classList.contains('add-book')) {
            validateForm(e);
        } else if (target.classList.contains('fa-1') ||
                    target.classList.contains('fa-2') ||
                    target.classList.contains('fa-3') ||
                    target.classList.contains('fa-4') ||
                    target.classList.contains('fa-5') ||
                    target.classList.contains('plus-rating')) {   
            changeRating(e);
        } else if (target.classList.contains('fa-circle-xmark') ||
                    target.classList.contains('fa-bookmark') ||
                    target.classList.contains('fa-circle-check') ||
                    target.classList.contains('plus-status')) {
            changeStatus(e);
        } else if (target.classList.contains('starting') ||
                    target.classList.contains('plus-start') ||
                    target.classList.contains('check-start')) {
            changeStart(e);
        } else if (target.classList.contains('ending') ||
                    target.classList.contains('plus-end') ||
                    target.classList.contains('check-end')) {
            changeEnd(e);
        } else if (target.classList.contains('fa-trash-can')) {
            removeBook(e);
        }
    })
}

function validateForm(e) {}

function changeRating(e) {
    const { target } = e;
    const changed = target.parentNode;
    if (target.classList.contains('plus-rating')) {
        target.classList.remove('fa-plus', 'plus-rating');
        target.classList.add('fa-1');
        myLibrary[changed].rating = '1';
    } else if (target.classList.contains('fa-1')) {
        target.classList.replace('fa-1', 'fa-2');
        myLibrary[changed].rating = '2';
    } else if (target.classList.contains('fa-2')) {
        target.classList.replace('fa-2', 'fa-3');
        myLibrary[changed].rating = '3';
    } else if (target.classList.contains('fa-3')) {
        target.classList.replace('fa-3', 'fa-4');
        myLibrary[changed].rating = '4';
    } else if (target.classList.contains('fa-4')) {
        target.classList.replace('fa-4', 'fa-5');
        myLibrary[changed].rating = '5';
    } else if (target.classList.contains('fa-5')) {
        target.classList.remove('fa-5');
        target.classList.add('fa-plus', 'plus-rating');
        myLibrary[changed].rating = 'none';
    }
    displayLibrary();
}

function changeStatus(e) {
    const { target } = e;
    const changed = target.parentNode;
    if (target.classList.contains('plus-status')) {
        target.classList.remove('fa-plus', 'plus-status');
        target.classList.add('fa-circle-check', 'fa-xl');
        myLibrary[changed].status = 'read';
    } else if (target.classList.contains('fa-circle-check')) {
        target.classList.remove('fa-circle-check', 'fa-xl');
        target.classList.add('fa-bookmark', 'fa-lg');
        myLibrary[changed].status = 'wish';
    } else if (target.classList.contains('fa-bookmark')) {
        target.classList.remove('fa-bookmark', 'fa-lg');
        target.classList.add('fa-circle-xmark', 'fa-xl');
        myLibrary[changed].status = 'unread';
    } else if (target.classList.contains('fa-circle-xmark')) {
        target.classList.remove('fa-circle-xmark', 'fa-xl');
        target.classList.add('fa-plus', 'plus-status');
        myLibrary[changed].status = 'none';
    }
    displayLibrary();
}

function changeStart(e) {
    const { target } = e;
    const changed = target.parentNode;
    const plusIcon = document.querySelector('.plus-start');
    const dateText = document.querySelector('.starting');
    const divContainer = document.querySelector('.start-container');
    const dateInput = document.querySelector('#mainstart');
    const checkIcon = document.querySelector('.check-start');
    const createIcon = document.createElement('i');
    const createText = document.createElement('p');
    const createDiv = document.createElement('div');
    const createInput = document.createElement('input');
    if (target.classList.contains('plus-start')) {

        changed.removeChild(plusIcon);
        changed.addChild(createDiv);
        createDiv.addChild(createInput);
        createDiv.addChild(createIcon);

    } else if (target.classList.contains('check-start')) {

        divContainer.removeChild(checkIcon);
        divContainer.removeChild(dateInput);
        changed.removeChild(divContainer);
        changed.addChild(createText);
        
        myLibrary[changed].start = target.value;

    } else if (target.classList.contains('starting')) {

        changed.removeChild(dateText);
        changed.addChild(createDiv);
        createDiv.addChild(createInput);
        createDiv.addChild(createIcon);

    }

}

function removeBook(e) {
    const removalRow = e.target.parentNode - 1;
    myLibrary.splice(removalRow, 1);
    displayLibrary();
}




            