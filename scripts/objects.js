console.log("I test");
/* Declarate variables. */
const booksDiv = document.querySelector('.books');
const addBtn = document.querySelector('.add-book');
let books = [];
/* utilities */
function newBook(title,author){
  books.push({title: title, author: author});
}
function remove(title){
  books.filter((elem) => {
      elem.title != title;
  });
}
function updateBooks(){
  const title = document.getElementById('title-book').value;
  const author = document.getElementById('author-book').value;
  newBook(title,author);
  booksDiv.innerHTML += `<div><p> ${title} by ${author} </p> <button>Remove</button></div>`;

}
/*Loop into Books array */
booksDiv.innerHTML = '';
books.forEach((elem) => {
  booksDiv.innerHTML += `<div> <p> ${elem.title} by ${elem.author}</p> <button>Remove</button></div> `;
});
/* tracking events */
addBtn.addEventListener('click',updateBooks);