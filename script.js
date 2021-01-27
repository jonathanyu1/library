let myLibrary = [];
const bookContainer = document.querySelector('.bookContainer');

function bookMaker(title,author,pages,read){
    this.title=title;
    this.author=author;
    this.pages=pages+' pages';
    if (read){
        this.read='read';
    } else{
        this.read='not read';
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
        console.log(item);
        console.log(index);
        book = document.createElement('div');
        book.classList.add('bookCard');
        book.setAttribute('data-index',`${index}`);
        console.log(book.getAttribute('data-index')); //string
        bookContainer.appendChild(book);
        // loop through each object book, add contents of book to each bookCard
        Object.keys(item).forEach(key =>{
            console.log(key, item[key]);
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
            console.log(readTgl.previousSibling.innerHTML);
            const currentStatus=(readTgl.previousSibling.innerHTML);
            const currIndex=Number(readTgl.parentNode.getAttribute('data-index'));
            toggleReadStatus(currentStatus,currIndex);
        });
    });
}

function toggleReadStatus(currentStatus, index){
    if (currentStatus=='read'){
        myLibrary[index].read='not read';
    } else{
        myLibrary[index].read='read';
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

function openForm(){
    document.getElementById('formContainer').style.display='block'
    document.getElementById('formPopup').reset();
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
    const bookN = new bookMaker(bookTitle.value, bookAuthor.value, bookPages.value, bookRead.checked)
    addBookToLibrary(bookN);
    displayLibrary();
    closeForm();
});



let book1 = new bookMaker('The Hobbit', 'J.R.R. Tolkien', '295', 'not read');
addBookToLibrary(book1);
let book2 = new bookMaker ('Harry Potter', 'J.K. Rowling', '300', 'read');
addBookToLibrary(book2);
console.log(displayLibrary());
