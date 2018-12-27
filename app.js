//Book Class : Represents a book
class Book {
    constructor(title, author, year, isbn) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.isbn = isbn;
    }
}

//UI class: Handle UI task 
class UI {
    static displayBook() {
        const books = Store.getBook();

        books.forEach((book) => UI.addBookToList(book));
    }


    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.year}</td>
          <td>${book.isbn}</td>
          <td><a href="#" class="btn btn-outline-danger btn-sm delete">Delete</a></td>
        `;

        list.appendChild(row);
    }

    static deleteBookFromList(element) {
        if (element.classList.contains('delete')) {
            element.parentElement.parentElement.remove();
        }
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#year').value = '';
        document.querySelector('#isbn').value = '';
    }
}

// Store Class: Handle Storage
class Store {
    static getBook() {
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBook(book){
        const books = Store.getBook();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));

    }

    static removeBook(isbn){
       const books = Store.getBook();

       books.forEach((book, index) => {
           if(book.isbn === isbn){
               books.splice(index, 1);
           }
       });

       localStorage.setItem('books', JSON.stringify(books));
    }
}

// Event : Display Book
document.addEventListener('DOMContentLoaded', UI.displayBook);

// Event : Add a book 
document.querySelector('#book-form').addEventListener('submit', (e) => {
    //Persiting the data 
    e.preventDefault();

    //get form value
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const year = document.querySelector('#year').value;
    const isbn = document.querySelector('#isbn').value;

    // inserting the data 
    const book = new Book(title, author, year, isbn);
    console.log(book);

    // Add Book to UI
    UI.addBookToList(book);
    Store.addBook(book);

    // Clear Fields
    UI.clearFields();
})

// Event : Remove a book
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBookFromList(e.target);

    //Remove book from store 
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
})