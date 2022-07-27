let myLibrary = [];

function Book() {
    this.title = title;
    this.author = author;
    this.rating = rating;
    this.start = start;
    this.end = end;
    this.readStatus = readStatus;
}

function addBookToLibrary(title, author, rating=0, start=0, end=0, readStatus=0) {
    const newBook = new Book(title, author, rating, start, end, readStatus);
    myLibrary.push(book);
}