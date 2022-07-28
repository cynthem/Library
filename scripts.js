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

function addBookToLibrary(title, author, rating='', readStatus='', start='', end='') {
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
        if (myLibrary[i].rating === '') {
            rating.classList.add('fa-plus', 'plus-rating');
        } else if (myLibrary[i].rating === 1) {
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
        if (myLibrary[i].readStatus === '') {
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
        if (myLibrary[i].start === '') {
            const noStart = document.createElement('i');
            noStart.classList.add('fa-solid', 'fa-plus', 'plus-start');
            listRow.appendChild(noStart);
        } else if (myLibrary[i].start !== ''){
            const start = document.createElement('p');
            start.textContent = myLibrary[i].start;
            listRow.appendChild(start);
        }
        // End date
        if (myLibrary[i].end === '') {
            const noEnd = document.createElement('i');
            noEnd.classList.add('fa-solid', 'fa-plus', 'plus-end');
            listRow.appendChild(noEnd);
        } else if (myLibrary[i].end !== ''){
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

function validateForm(e) {
    e.preventDefault();
    const detailsForm = document.querySelector('.details-form');
    const statusForm = document.querySelector('.status-form');
    const titleInput = document.getElementById('title');
    const titleError = document.querySelector('.title-error');
    const authorInput = document.getElementById('author');
    const authorError = document.querySelector('.author-error');
    const ratingInput = document.getElementById('rating');
    const ratingError = document.querySelector('.rating-error');
    const startInput = document.getElementById('start');
    //const startError = document.querySelector('.start-error');
    const endInput = document.getElementById('end');
    //const endError = document.querySelector('.end-error');
    const radioRead = document.getElementById('read');
    const radioUnread = document.getElementById('currently');
    const radioWish = document.getElementById('planning');
    if (titleInput.value === '') {
        titleError.style.display = 'block';
    } else {
        titleError.style.display = 'none';
    }
    if (authorInput.value === '') {
        authorError.style.display = 'block';
    } else {
        authorError.style.display = 'none';
    }
    if (ratingInput.value !== '' && ratingInput.value < 0 || 
        ratingInput.value !== '' && ratingInput.value > 5) {
        ratingError.style.display = 'block';
    } else {
        ratingError.style.display = 'none';
    }
    if (titleInput.value !== '' &&
        authorInput.value !== '' &&
        ratingError.style.display !== 'block') {
        if (radioRead.checked) {
            addBookToLibrary(titleInput.value, authorInput.value, ratingInput.value, radioRead.value, startInput.value, endInput.value);
        } else if (radioUnread.checked) {
            addBookToLibrary(titleInput.value, authorInput.value, ratingInput.value, radioUnread.value, startInput.value, endInput.value);
        } else if (radioWish.checked) {
            addBookToLibrary(titleInput.value, authorInput.value, ratingInput.value, radioWish.value, startInput.value, endInput.value);
        } else if (!radioRead.checked && !radioUnread.checked && !radioWish.checked) {
            addBookToLibrary(titleInput.value, authorInput.value, ratingInput.value, radioWish.value, startInput.value, endInput.value);
        }
    }



    //if (/\d/.test(startInput.value) && startInput.value.includes('m') ||
       ///\d/.test(startInput.value) && startInput.value.includes('d') || 
      //  /\d/.test(startInput.value) && startInput.value.includes('y')) {
      //      startError.classList.remove('invisible');
    //}
    //if (/\d/.test(endInput.value) && endInput.value.includes('m') ||
    //    /\d/.test(endInput.value) && endInput.value.includes('d') || 
    //    /\d/.test(endInput.value) && endInput.value.includes('y')) {
    //        endError.classList.remove('invisible');
    //}
}

const radios = document.querySelectorAll('.radio');
for (const rad of radios) {
  rad.onclick = (e) => {
    console.log(e.target.value);
  }
}

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
        myLibrary[changed].rating = '';
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
        myLibrary[changed].status = '';
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
    if (target.classList.contains('plus-start')) {
        changed.removeChild(plusIcon);
        const createDiv = document.createElement('div');
        createDiv.classList.add('start-container');
        changed.addChild(createDiv);
        const createInput = document.createElement('input');
        createInput.type = 'date';
        createInput.name = 'start-main';
        createInput.id = 'mainstart';
        createDiv.addChild(createInput);
        const createIcon = document.createElement('i');
        createIcon.classList.add('fa-solid', 'fa-check', 'check-start');
        createDiv.addChild(createIcon);
    } else if (target.classList.contains('check-start')) {
        divContainer.removeChild(checkIcon);
        divContainer.removeChild(dateInput);
        changed.removeChild(divContainer);
        const createText = document.createElement('p');
        createText.classList.add('starting');
        changed.addChild(createText);
        myLibrary[changed].start = target.value;
    } else if (target.classList.contains('starting')) {
        changed.removeChild(dateText);
        const createDiv = document.createElement('div');
        createDiv.classList.add('start-container');  
        changed.addChild(createDiv);
        const createInput = document.createElement('input');
        createInput.type = 'date';
        createInput.name = 'start-main';
        createInput.id = 'mainstart';
        createDiv.addChild(createInput);
        const createIcon = document.createElement('i');
        createIcon.classList.add('fa-solid', 'fa-check', 'check-start');
        createDiv.addChild(createIcon);
    }
    displayLibrary();
}

function changeEnd(e) {
    const { target } = e;
    const changed = target.parentNode;
    const plusIcon = document.querySelector('.plus-end');
    const dateText = document.querySelector('.ending');
    const divContainer = document.querySelector('.end-container');   
    const dateInput = document.querySelector('#mainend');
    const checkIcon = document.querySelector('.check-end');
    if (target.classList.contains('plus-end')) {
        changed.removeChild(plusIcon);
        const createDiv = document.createElement('div');
        createDiv.classList.add('end-container');
        changed.addChild(createDiv);
        const createInput = document.createElement('input');
        createInput.type = 'date';
        createInput.name = 'end-main';
        createInput.id = 'mainend';
        createDiv.addChild(createInput);
        const createIcon = document.createElement('i');
        createIcon.classList.add('fa-solid', 'fa-check', 'check-end');
        createDiv.addChild(createIcon);
    } else if (target.classList.contains('check-end')) {
        divContainer.removeChild(checkIcon);
        divContainer.removeChild(dateInput);
        changed.removeChild(divContainer);
        const createText = document.createElement('p');
        createText.classList.add('ending');
        changed.addChild(createText);
        myLibrary[changed].start = target.value;
    } else if (target.classList.contains('ending')) {
        changed.removeChild(dateText);
        const createDiv = document.createElement('div');
        createDiv.classList.add('end-container');  
        changed.addChild(createDiv);
        const createInput = document.createElement('input');
        createInput.type = 'date';
        createInput.name = 'end-main';
        createInput.id = 'mainend';
        createDiv.addChild(createInput);
        const createIcon = document.createElement('i');
        createIcon.classList.add('fa-solid', 'fa-check', 'check-end');
        createDiv.addChild(createIcon);
    }
    displayLibrary();
}

function removeBook(e) {
    const removalRow = e.target.parentNode - 1;
    myLibrary.splice(removalRow, 1);
    displayLibrary();
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
                    myLibrary[i].readStatus === '') {
            unreadCounter += 1;
            totalUnread.textContent = unreadCounter;
        }
    }
    totalBooks.textContent = myLibrary.length;
}
