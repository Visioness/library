const library = [];
const libraryElement = document.querySelector(".library");
const dialogElement = document.querySelector("dialog");
const newBookButton = document.querySelector("#new-book");
const form = document.querySelector("form");
const closeButton = document.querySelector("#close");


addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "295");
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "295");
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "295");
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "295");
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "295");
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "295");
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "295");
displayLibrary()

newBookButton.addEventListener("click", () => {
  dialogElement.showModal();
});

closeButton.addEventListener("click", () => {
  dialogElement.close();
});

libraryElement.addEventListener("click", (event) => {
  if (["read", "button"].every(cls => event.target.classList.contains(cls))) {
    const parent = event.target.parentNode.parentNode;
    parent.book.toggleRead();
    displayLibrary();
  }

  else if (["remove", "button"].every(cls => event.target.classList.contains(cls))) {
    const parent = event.target.parentNode.parentNode;
    const index = library.findIndex(book => book.id === parent.dataset.id);
    if (index !== -1) {
      library.splice(index, 1);
    }
    displayLibrary();
  }
})

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const titleInput = form.elements["title"].value;
  const authorInput = form.elements["author"].value;
  const pagesInput = form.elements["pages"].value;
  const readInput = form.elements["read"].checked;
  if (titleInput && authorInput && pagesInput) {
    addBookToLibrary(titleInput, authorInput, pagesInput, readInput);
    displayLibrary();
  }

  form.reset();
  dialogElement.close();
});


function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
}


function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  library.push(newBook);
}


function displayLibrary() {
  clearLibraryDisplay();

  library.forEach(book => {
    const bookElement = document.createElement("li");
    const title = document.createElement("span");
    const author = document.createElement("span");
    const pages = document.createElement("span");
    const read = document.createElement("span");
    
    const readButton = document.createElement("button");
    const removeButton = document.createElement("button");
    const buttonsDiv = document.createElement("div");

    title.classList.add("title");
    author.classList.add("author");
    pages.classList.add("pages");
    read.classList.add("read");
    readButton.classList.add("button", "read")
    removeButton.classList.add("button", "remove")
    buttonsDiv.classList.add("buttons");
    bookElement.classList.add("book");

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    read.textContent = book.read ? "Read!" : "Not read yet!";
    readButton.textContent = "Read";
    removeButton.textContent = "Remove";
    
    buttonsDiv.appendChild(readButton);
    buttonsDiv.appendChild(removeButton);

    bookElement.appendChild(title);
    bookElement.appendChild(author);
    bookElement.appendChild(pages);
    bookElement.appendChild(read);
    bookElement.appendChild(buttonsDiv);

    bookElement.book = book;
    bookElement.setAttribute("data-id", book.id);

    libraryElement.appendChild(bookElement);
  })
}


function clearLibraryDisplay() {
  while(libraryElement.lastChild) libraryElement.removeChild(libraryElement.lastChild);
}