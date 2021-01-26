let myLibrary = [];

function bookMaker(title,author,pages,read){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
    this.info= function(){
        return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`;
    }   
}

// takes user input, store book object into array
function addBookToLibrary(newBook){
    myLibrary.push(newBook);
}

//let book = new bookMaker('The Hobbit', 'J.R.R. Tolkien', '295 pages', 'not read yet');