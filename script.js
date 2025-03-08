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
  function createElement(tag, className, textContent = "") {
    const el = document.createElement(tag);
    if (className) el.classList.add(className);
    if (textContent) el.textContent = textContent;
    return el;
  }
  
  clearLibraryDisplay();

  library.forEach(book => {
    const bookElement = createElement("li", "book");
    bookElement.setAttribute("data-id", book.id);
    bookElement.book = book;

    const title = createElement("span", "title", book.title);

    const properties = createElement("div", "properties");
    const labels = ["Who is the author?", "How many pages?", "Have you read?"];
    const values = [book.author, book.pages, book.read ? "Read!" : "Not read yet!"];
    labels.forEach((text, index) => {
      const label = createElement("label", "label", text);
      const span = createElement("span", ["author", "pages", "read"][index], values[index]);
      properties.append(label, span);
    });

    const buttonsDiv = createElement("div", "buttons");
    const readButton = createElement("button", "button-read", "Read");
    const removeButton = createElement("button", "button-remove", "Remove");
    buttonsDiv.append(readButton, removeButton);

    bookElement.append(title, properties, buttonsDiv);
    libraryElement.appendChild(bookElement);
  });
}


function clearLibraryDisplay() {
  while(libraryElement.lastChild) libraryElement.removeChild(libraryElement.lastChild);
}