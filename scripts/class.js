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
const sectionLinks = document.querySelectorAll('.section-link');
const allBooks = document.getElementById('all-books');
const formWrapper = document.querySelector('.form-wrapper');
const contactWrapper = document.getElementById('contact');
const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
let removeBtns = Array.from(document.querySelectorAll('.remove'));
const timeElement = document.querySelector('.time');
/* eslint-disable */
const DateTime = luxon.DateTime.now();
/* eslint-disable */
let nbrGrid = 0;
/* create books object variables */
if (localStorage.getItem('myBooks')) {
  myBooks = new Books(JSON.parse(localStorage.getItem('myBooks')));
}
/* utilities */
function displayBooks(bookObejct) {
  const bookArray = bookObejct.books;
  bookArray.forEach((element) => {
    const newBlock = document.createElement('div');
    newBlock.innerHTML = `<p>${element.title} by ${element.author}</p> <input type='button' value='remove' class='remove'> <hr>`;
    nbrGrid += 1;
    newBlock.style.gridRow = `${nbrGrid} / span 1`;
    newBlock.className = 'book-card';
    targetDiv.style.gridTemplateRows = `repeat(${nbrGrid}, 1fr)`;
    if (nbrGrid % 2 === 0) {
      newBlock.style.backgroundColor = '#fff';
    } else {
      newBlock.style.backgroundColor = 'rgb(221,221,221)';
    }
    targetDiv.appendChild(newBlock);
  });
}
function removeBook(e) {
  const targetBtn = e.target;
  const targetBlock = targetBtn.parentNode;
  const bookData = Array.from(targetDiv.children)[0].textContent;
  const bookTitle = bookData.split('by')[0];
  myBooks.remove(bookTitle);
  localStorage.setItem('myBooks', JSON.stringify(myBooks.books));
  targetDiv.removeChild(targetBlock);
  nbrGrid -= 1;
  targetDiv.style.gridTemplateRows = `repeat(${nbrGrid}, 1fr)`;
  const children = Array.from(targetDiv.children);
  let j = 1;
  children.forEach((elem) => {
    elem.style.gridRow = `${j} / span 1`;
    j += 1;
  });
}
function addNewBook() {
  const bookTitle = document.getElementById('title-book').value;
  const bookAuthor = document.getElementById('author-book').value;
  const newBlock = document.createElement('div');
  newBlock.innerHTML = `<p>${bookTitle} by ${bookAuthor}</p> <input type='button' value='remove' class='remove'> <hr>`;
  myBooks.add(bookTitle, bookAuthor);
  nbrGrid += 1;
  newBlock.style.gridRow = `${nbrGrid} / span 1`;
  newBlock.className = 'book-card';
  if (nbrGrid % 2 === 0) {
    newBlock.style.backgroundColor = '#fff';
  } else {
    newBlock.style.backgroundColor = 'rgb(221,221,221)';
  }
  targetDiv.style.gridTemplateRows = `repeat(${nbrGrid}, 1fr)`;
  targetDiv.appendChild(newBlock);
  localStorage.setItem('myBooks', JSON.stringify(myBooks.books));
  removeBtns = Array.from(document.querySelectorAll('.remove'));
  removeBtns.forEach((element) => {
    element.addEventListener('click', removeBook, false);
  });
  allBooks.style.display = 'block';
  formWrapper.style.display = 'none';
  contactWrapper.style.display = 'none';
}

function trackMenu(e) {
  const targetElem = e.target;
  const targetLink = e.target.textContent;
  if (targetLink.trim() === 'List') {
    allBooks.style.display = 'block';
    formWrapper.style.display = 'none';
    contactWrapper.style.display = 'none';
    sectionLinks.forEach((elem) => {
      elem.style.color = 'white';
    });
  } else if (targetLink.trim() === 'Add new') {
    allBooks.style.display = 'none';
    formWrapper.style.display = 'block';
    contactWrapper.style.display = 'none';
    sectionLinks.forEach((elem) => {
      elem.style.color = 'white';
    });
  } else if (targetLink.trim() === 'Contact') {
    allBooks.style.display = 'none';
    formWrapper.style.display = 'none';
    contactWrapper.style.display = 'block';
    sectionLinks.forEach((elem) => {
      elem.style.color = 'white';
    });
  }
  targetElem.style.color = 'blue';
}
function customiseTime(h, m, s) {
  if (h <= 12) {
    return `${h}:${m}:${s} am`;
  }

  return `${h - 12}:${m}:${s} pm`;
}
/* Load page */
timeElement.textContent = `${weekDays[DateTime.weekday]} ${DateTime.month}th ${DateTime.year}, ${customiseTime(DateTime.hour, DateTime.minute, DateTime.second)}`;
targetDiv.innerHTML = '';
targetDiv.style.display = 'grid';
allBooks.style.display = 'block';
formWrapper.style.display = 'none';
contactWrapper.style.display = 'none';
sectionLinks[0].style.color = 'blue';
for (let i; i < sectionLinks.length; i += 1) {
  if (i >= 1) {
    sectionLinks[i].style.color = 'white';
  }
}

displayBooks(myBooks);
/* tracking add button */
addBtn.addEventListener('click', addNewBook);
/* tracking the remove buttons */
removeBtns = Array.from(document.querySelectorAll('.remove'));
removeBtns.forEach((element) => {
  element.addEventListener('click', removeBook, false);
});
/* tracking menu links */
sectionLinks.forEach((elem) => {
  elem.addEventListener('click', trackMenu, false);
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