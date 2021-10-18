console.log("I test");
/* Declarate variables. */
const booksDiv = document.querySelector('.books');
const addBtn = document.querySelector('.add-book');
const remove = document.querySelector('.Remove');
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
  booksDiv.innerHTML += `<div><p> ${title} by ${author} </p> <input type= 'button' class='Remove' value ='Remove'></div>`;

}
function removeBooks(){
  const title = document.getElementById('title-book').value;
  remove(title);
  booksDiv.innerHTML += `<div><p> ${title} by ${author} </p> <input type= 'button' class='Remove' value ='Remove'></div>`;
}
/*Loop into Books array */
booksDiv.innerHTML = '';
books.forEach((elem) => {
  booksDiv.innerHTML += `<div> <p> ${elem.title} by ${elem.author}</p> <input type= 'button' class= 'Remove' value='Remove'></div> `;
});
/* tracking events */
addBtn.addEventListener('click',updateBooks);

// remove button


remove.addEventListener('click', removeBooks);
