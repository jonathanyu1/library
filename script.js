let myLibrary = [];
const bookContainer = document.querySelector('.bookContainer');

function bookMaker(title,author,pages,read){
    this.title=title;
    this.author=author;
    this.pages=pages+' pages';
    if (read){
        this.read='Read';
    } else{
        this.read='Not Read';
    }
    // this.info= function(){
    //     return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`;
    // }   
}

// takes user input, store book object into array
function addBookToLibrary(newBook){
    myLibrary.push(newBook);
}

function displayLibrary(){
    clearDisplay();
    myLibrary.forEach((item,index) =>{
        // create div bookCard for each book
        book = document.createElement('div');
        book.classList.add('bookCard');
        book.setAttribute('data-index',`${index}`);
        bookContainer.appendChild(book);
        // loop through each object book, add contents of book to each bookCard
        Object.keys(item).forEach(key =>{
            content = document.createElement('div');
            content.classList.add(`${key}`);
            content.innerHTML=`${item[key]}`;
            book.appendChild(content);
        });
        // read toggle
        readStatus = document.createElement('button');
        readStatus.classList.add('readStatus');
        readStatus.innerHTML='Toggle Read';
        book.appendChild(readStatus);
         // delete button
         deleteBook = document.createElement('button');
         deleteBook.classList.add('deleteBook');
         deleteBook.innerHTML='Delete'
         book.appendChild(deleteBook);
    });
    const deleteButtons = document.querySelectorAll('.deleteBook');
    deleteButtons.forEach((delBtn)=>{
        delBtn.addEventListener('click', function(e){
            const currentIndex=Number(delBtn.parentNode.getAttribute('data-index'));
            removeBook(currentIndex);
        });
    });
     const readToggles = document.querySelectorAll('.readStatus');
     readToggles.forEach((readTgl)=>{
         readTgl.addEventListener('click', function(e){
             const currentStatus=(readTgl.previousSibling.innerHTML);
             const currIndex=Number(readTgl.parentNode.getAttribute('data-index'));
             myLibrary[currIndex].toggleReadStatus(currentStatus,currIndex);
         });
    });
    updateStats();
    updateColor();
}

function updateColor(){
    const readStat = document.querySelectorAll('.readStatus');
    readStat.forEach((item)=>{
        if (item.previousSibling.innerHTML=='Read'){
            item.style.backgroundColor='lightgreen';
        } else{
            item.style.backgroundColor='#F08080';
        }

    });
}

function updateStats(){
    let numBooksRead=0;
    document.getElementById('totalBooks').innerHTML=`Total Books: ${myLibrary.length}`;
     myLibrary.forEach((item)=>{
         if (item.read=='Read'){
             numBooksRead++;
         }
     });
    document.getElementById('totalRead').innerHTML=`Total Read: ${numBooksRead}`;
    document.getElementById('totalUnread').innerHTML=`Total Unread: ${myLibrary.length-numBooksRead}`;
    numBooksRead=0;
}

bookMaker.prototype.toggleReadStatus = function(currentStatus,index){
    if (currentStatus=='Read'){
        myLibrary[index].read='Not Read';
    } else{
        myLibrary[index].read='Read';
        }
    displayLibrary();
}

function removeBook(index){
    myLibrary.splice(index,1);
    displayLibrary();
}

function clearDisplay(){
    while (bookContainer.lastChild){
        bookContainer.removeChild(bookContainer.lastChild);
    }
}

function addRequiredField(element){
    element.classList.add('requiredField');
}

function removeRequiredField(element){
    element.classList.remove('requiredField');
}

function clearAllRequiredFields(){
    const bookTitle=document.getElementById('titleInput');
    const bookAuthor=document.getElementById('authorInput');
    const bookPages=document.getElementById('pagesInput');
    removeRequiredField(bookTitle);
    removeRequiredField(bookAuthor);
    removeRequiredField(bookPages);
}

function openForm(){
    document.getElementById('formContainer').style.display='block'
    document.getElementById('formPopup').reset();
    clearAllRequiredFields();
}

function closeForm(){
    document.getElementById('formContainer').style.display='none'
}


// add new book
const btnNewBook = document.getElementById('newBook');
btnNewBook.addEventListener('click', openForm);

// form
const addBook = document.getElementById('btnAddBook');
const cancel = document.getElementById('btnCloseForm');
cancel.addEventListener('click', closeForm);
addBook.addEventListener('click', function(e){
    const bookTitle=document.getElementById('titleInput');
    const bookAuthor=document.getElementById('authorInput');
    const bookPages=document.getElementById('pagesInput');
    const bookRead=document.getElementById('hasRead');
    if (!bookTitle.checkValidity()) {
        addRequiredField(bookTitle);
    } else if (bookTitle.checkValidity()){
        removeRequiredField(bookTitle);
    }
    if (!bookAuthor.checkValidity()) {
        addRequiredField(bookAuthor);
    } else if (bookAuthor.checkValidity()){
        removeRequiredField(bookAuthor);
    }
    if (!bookPages.checkValidity()) {
        addRequiredField(bookPages);
    } else if (bookPages.checkValidity()){
        removeRequiredField(bookPages);
    }
    if (bookTitle.checkValidity() && bookAuthor.checkValidity() && bookPages.checkValidity()){
        clearAllRequiredFields();
        const bookN = new bookMaker(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.checked)
        addBookToLibrary(bookN);
        displayLibrary();
        closeForm();
    }
});

// If user clicks anywhere outside of popup, close it
window.onclick = function(e) {
     if (e.target == formContainer) {
       closeForm();
     }
  }


// let book1 = new bookMaker('The Hobbit', 'J.R.R. Tolkien', '295', 'Not Read');
// addBookToLibrary(book1);
// let book2 = new bookMaker ('Harry Potter', 'J.K. Rowling', '300', 'Read');
// addBookToLibrary(book2);
// console.log(displayLibrary());