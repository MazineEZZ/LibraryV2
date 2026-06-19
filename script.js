// HTML elements
const bookContainer = document.querySelector("#bookContainer");
const modal = document.querySelector("#addBookModal");
const openModal = document.querySelector("#addBook");
const closeModal = document.querySelector("#closeModal");
const bookTitle = document.querySelector("#title");
const bookAuthor = document.querySelector("#author");
const bookPages = document.querySelector("#pages");
const bookIsRead = document.querySelector("#read");
const bookSubmit = document.querySelector("#submit");
const bookForm = document.querySelector("form");

// JS Variables
let library = [];
const colors = [
    "#815756",
    "#d34245",
    "#3b796b",
    "#06532e",
    "#d2b482",
    "#f17448",
    "#76588f",
    "#0d8cce",

]

openModal.addEventListener("click", () => {
    modal.showModal();
});

closeModal.addEventListener("click", () => {
    modal.close();  
});

bookSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    
    const title = bookTitle.value;
    const author = bookAuthor.value;
    const pages = bookPages.value;
    const isRead = bookIsRead.checked;
    addBookToLibrary(title, author, pages, isRead);
    displayLibrary();

    bookForm.reset();
    modal.close();
})



function Book(title, author, pages, isRead) {
    this.id = crypto.randomUUID();
    this.title = title; 
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.color = Math.floor(Math.random() * colors.length);
}

function addBookToLibrary(title, author, pages, isRead) {
    const book = new Book(title, author, pages, isRead);
    library.push(book);
}

function displayLibrary() {
    bookContainer.replaceChildren();
    for (let book of library) {
        const bookCard = document.createElement("div");
        const bookInfo = document.createElement("div");
        const bookTitle = document.createElement("p");
        const bookAuthor = document.createElement("p");
        const bookPages = document.createElement("p");
        const bookReadBtn = document.createElement("button");
        bookCard.classList.add("card");
        bookInfo.classList.add("info");
        bookTitle.classList.add("title");
        bookAuthor.classList.add("author");
        bookPages.classList.add("pages");
        bookTitle.innerText = book.title;
        bookAuthor.innerText = book.author;
        bookPages.innerText = book.pages;
        
        bookReadBtn.innerText = "Read";
        if (book.isRead) {
                bookReadBtn.classList.add("read");
        }
        bookReadBtn.addEventListener("click", (e) => toggleReadState(e, book));
        
        // Remove Button
        const removeBtn = document.createElement("button");
        const removeImg = document.createElement("img");
        removeImg.src = "assets/img/remove.png"
        removeImg.alt = "Remove Book";
        removeImg.width = 20;
        removeImg.height = 20;
        removeBtn.appendChild(removeImg);
        removeBtn.addEventListener("click", () => removeBookByID(book.id));
        removeBtn.classList.add("remove");

        const bookOptions = document.createElement("div");
        bookOptions.classList.add("options");

        bookInfo.style.backgroundColor = colors[book.color];


        bookInfo.appendChild(bookTitle);
        bookInfo.appendChild(bookAuthor);
        bookInfo.appendChild(bookPages);
        
        bookOptions.appendChild(bookReadBtn);
        bookOptions.appendChild(removeBtn);

        bookCard.appendChild(bookInfo);
        bookCard.appendChild(bookOptions);

        bookContainer.appendChild(bookCard);
    }
}

function removeBookByID(id) {
    library = library.filter(book => book.id != id);

    displayLibrary();
}

function toggleReadState(btn, book) {
    book.isRead = !book.isRead;
    btn.target.classList.toggle("read");
}

addBookToLibrary("To Kill a Mockingbird", "Harper lee", 281, true);
addBookToLibrary("1984", "George Orwell", 328, false);
displayLibrary();
