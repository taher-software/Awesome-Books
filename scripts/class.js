/* Create book class */
class Books {
  constructor(bookLIst) {
    this.books = bookLIst;
  }

  add(bookTitle, bookAuthor) {
    const title = bookTitle;
    const author = bookAuthor;
    const newBook = {
      title,
      author,
    };
    this.books.push(newBook);
  }

  remove(bookTitle) {
    let index = 0;
    for (let i = 0; i < this.books.length; i += 1) {
      if (this.books[i] === bookTitle) {
        index = i;
        break;
      }
    }
    this.books.splice(index, 1);
  }
}
/* create variables. */
const targetDiv = document.querySelector('.books');
let myBooks = new Books([]);
const addBtn = document.querySelector('.add-book');
let removeBtns = Array.from(document.querySelectorAll('.remove'));
/* create books object variables */
if (localStorage.getItem('myBooks')) {
  myBooks = new Books(JSON.parse(localStorage.getItem('myBooks')));
}
/* utilities */
function displayBooks(bookObejct) {
  const bookArray = bookObejct.books;
  bookArray.forEach((element) => {
    targetDiv.innerHTML += `<div><p>${element.title} by ${element.author}</p> <input type='button' value='remove' class='remove'> <hr></div>`;
  });
}
function removeBook(e) {
  console.log('works...');
  const targetBtn = e.target;
  const targetBlock = targetBtn.parentNode;
  const bookData = Array.from(targetDiv.children)[0].textContent;
  const bookTitle = bookData.split('by')[0];
  myBooks.remove(bookTitle);
  localStorage.setItem('MyBooks', JSON.stringify(myBooks.books));
  targetBlock.innerHTML = '';
}
function addNewBook() {
  const bookTitle = document.getElementById('title-book').value;
  const bookAuthor = document.getElementById('author-book').value;
  myBooks.add(bookTitle, bookAuthor);
  targetDiv.innerHTML += `<div><p>${bookTitle} by ${bookAuthor}</p> <input type='button' value='remove' class='remove'> <hr></div>`;
  localStorage.setItem('myBooks', JSON.stringify(myBooks.books));
  removeBtns = Array.from(document.querySelectorAll('.remove'));
  removeBtns.forEach((element) => {
    element.addEventListener('click', removeBook, false);
  });
}
/* Load page */
targetDiv.innerHTML = '';
displayBooks(myBooks);
/* tracking add button */
addBtn.addEventListener('click', addNewBook);
/* tracking the remove buttons */
removeBtns = Array.from(document.querySelectorAll('.remove'));
removeBtns.forEach((element) => {
  element.addEventListener('click', removeBook, false);
});

// set local storage
const titleBook = document.getElementById('title-book');
const authorBook = document.getElementById('author-book');
function setStorage() {
  const inputBook = {
    bookTitle: document.getElementById('title-book').value,
    bookAuthor: document.getElementById('author-book').value,
  };
  localStorage.setItem('BookIdentifier', JSON.stringify(inputBook));
}
function setDesign() {
  const book = JSON.parse(localStorage.getItem('BookIdentifier'));
  document.getElementById('title-book').value = book.bookTitle;
  document.getElementById('author-book').value = book.bookAuthor;
}
if (!localStorage.getItem('BookIdentifier')) {
  setStorage();
} else {
  setDesign();
}
titleBook.onchange = setStorage;
authorBook.onchange = setStorage;