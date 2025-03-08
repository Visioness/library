const library = [];
const libraryElement = document.querySelector(".library");
const dialogElement = document.querySelector("dialog");
const newBookButton = document.querySelector("#new-book");
const form = document.querySelector("form");
const closeButton = document.querySelector("#close");


addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "600");
addBookToLibrary("Harry Potter", "J.K. Rowling", "700");
displayLibrary()

newBookButton.addEventListener("click", () => {
  dialogElement.showModal();
});

closeButton.addEventListener("click", () => {
  dialogElement.close();
});

libraryElement.addEventListener("click", (event) => {
  if (event.target.classList.contains("button-read")) {
    const parent = event.target.parentNode.parentNode;
    parent.book.toggleRead();
    displayLibrary();
  }

  else if (event.target.classList.contains("button-remove")) {
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
    const properties = document.createElement("div");
    const title = document.createElement("span");
    const labelAuthor = document.createElement("label");
    const author = document.createElement("span");
    const labelPages = document.createElement("label");
    const pages = document.createElement("span");
    const labelRead = document.createElement("label");
    const read = document.createElement("span");
    
    const readButton = document.createElement("button");
    const removeButton = document.createElement("button");
    const buttonsDiv = document.createElement("div");

    title.classList.add("title");
    author.classList.add("author");
    pages.classList.add("pages");
    read.classList.add("read");
    [labelAuthor, labelPages, labelRead].forEach(label => {label.classList.add("label")});
    readButton.classList.add("button-read")
    removeButton.classList.add("button-remove")
    buttonsDiv.classList.add("buttons");
    bookElement.classList.add("book");
    properties.classList.add("properties");

    title.textContent = book.title;
    author.textContent = book.author;
    pages.textContent = book.pages;
    read.textContent = book.read ? "Read!" : "Not read yet!";
    readButton.textContent = "Read";
    removeButton.textContent = "Remove";
    labelAuthor.textContent = "Who is the author?";
    labelPages.textContent = "How many pages?";
    labelRead.textContent = "Have you read?";
    
    buttonsDiv.appendChild(readButton);
    buttonsDiv.appendChild(removeButton);

    properties.appendChild(labelAuthor);
    properties.appendChild(author);
    properties.appendChild(labelPages);
    properties.appendChild(pages);
    properties.appendChild(labelRead);
    properties.appendChild(read);
    
    bookElement.appendChild(title);
    bookElement.appendChild(properties);
    bookElement.appendChild(buttonsDiv);

    bookElement.book = book;
    bookElement.setAttribute("data-id", book.id);

    libraryElement.appendChild(bookElement);
  })
}


function clearLibraryDisplay() {
  while(libraryElement.lastChild) libraryElement.removeChild(libraryElement.lastChild);
}