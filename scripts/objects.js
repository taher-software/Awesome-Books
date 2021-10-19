/* Declarate variables. */
const booksDiv = document.querySelector('.books');
const addBtn = document.querySelector('.add-book');
let removeBook = Array.from(document.querySelectorAll('.Remove'));
const books = [];
/* utilities */
function newBook(tit, auth) {
  const title = tit;
  const author = auth;
  const myBook = {
    title,
    author,
  };
  books.push(myBook);
}
function remove(tit) {
  const ind = books.indexOf(tit);
  books.splice(ind, 1);
}
function removeBooks(e) {
  const targetELement = e.target;
  const parentElement = targetELement.parentNode;
  const data = Array.from(parentElement.children)[0].textContent;
  const tl = data.split('by')[0];
  remove(tl);
  parentElement.innerHTML = '';
}
function updateBooks() {
  const title = document.getElementById('title-book').value;
  const author = document.getElementById('author-book').value;
  const newBlock = `<div><p> ${title} by ${author} </p> <input type= 'button' class='Remove' value ='Remove'><hr></div>`;
  newBook(title, author);
  booksDiv.innerHTML += newBlock;
  removeBook = Array.from(document.querySelectorAll('.Remove'));
  removeBook.forEach((elem) => {
    elem.addEventListener('click', removeBooks, false);
  });
}

/* Loop into Books array */
booksDiv.innerHTML = '';
books.forEach((elem) => {
  booksDiv.innerHTML += `<div> <p> ${elem.title} by ${elem.author}</p> <input type= 'button' class= 'Remove' value='Remove' <hr>></div> `;
});
/* tracking events */
addBtn.addEventListener('click', updateBooks);
/* store datas. */
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