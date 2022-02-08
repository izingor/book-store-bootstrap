'use strict';





function onInit() {
    renderBooks();
    doTranslate();
}


function renderBooks() {
    const books = getBooksForDisplay();
    const elTable = document.querySelector('.books-table');
    console.log('gello');
    var strHTML = `<trclass="table-primary><th class="table-primary data-trans="id">id</th>
    <th class="table-primary data-trans="book-title">Title</th>
    <th class="table-primary data-trans="price">Price</th>
    <th class="table-primary data-trans="rating">Rating</th>
    <th class="table-primary data-trans="action">Action</th></tr>`;

    books.forEach(book =>
        strHTML +=
        `  <tr class="table-primary" id="${book.id}">
        <td class="table-primary">${book.id}</td>
        <td class="table-primary">${book.title}</td>
        <td class="table-primary">$${book.price}</td>
        <td class="table-primary">⭐${book.rating}</td>
        <td class="table-primary">
            <button data-trans="read" onclick="onReadBook('${book.id}')" class="btn btn-primary read-btn">Read</button>
            <button data-trans="update" onclick="onUpdateMenu('${book.id}')" class="btn btn-warning update-btn">Update</button>
            <button data-trans="remove" onclick="onRemoveBook('${book.id}')" class="btn btn-danger remove-btn">Delete</button>
        </td>
    </tr>`
    );
    elTable.innerHTML = strHTML;
}

function onAddMenu() {
    const trans = getTrans();
    const language = getCurrLang();
    const elMenu = document.querySelector('.menu');

    const strHTML = `<h4 data-trans="add-book">Add new book</h4><input type="text" placeholder="${trans.book[language]}" name="name">
    <input data-trans="price" type="number" placeholder="${trans.price[language]}" name="price">
    <div>
        <button data-trans="add" class="btn btn-outline-success" name="addNew" onclick="onBookAdd()">Add</button>
        <button data-trans="exit" class="btn btn-outline-warning" name="exit" onclick="openAndCloseMenu()">Exit</button>
    </div>`;
    elMenu.innerHTML = strHTML;
    doTranslate();
    openAndCloseMenu();
}

function onUpdateMenu(id) {
    const elMenu = document.querySelector('.menu');
    const book = getBook(id);
    const trans = getTrans();
    const language = getCurrLang();

    var options = createRatingOptions();

    const strHTML = `<h4 data-trans="update-menu">Update Menu</h4>
    <form onsubmit="onSubmitChange(this,'${book.id}');return false"><h3>${trans.book[language]}-${book.title}</h3>
    <span>${trans.currentPrice[language]}:${book.price}</span>
    <input type = "number" name= "price-update" class ="small" min="1" placeholder = "${trans.price[language]}"/>
    <span> ${trans.currentRating[language]}: ${book.rating} </span>
    ${options}
    <button class = "btn btn-outline-success" data-trans="submit">Submit</button>
    </form>
    <button class = "btn btn-outline-warning" data-trans="exit" onclick="openAndCloseMenu('update-book-menu')">Exit</button>`;

    elMenu.innerHTML = strHTML;
    doTranslate();
    openAndCloseMenu('update-book-menu');
}

function onReadBook(id) {
    const trans = getTrans();
    const language = getCurrLang();
    const elMenu = document.querySelector('.menu');
    const book = getBook(id);

    const strHTML = `<h3>${book.title}</h3><h4>${trans['book-description'][language]}</h3><p>${book.description}</p>
    <form onsubmit="onUserRatingUpdate(this,'${book.id}');return false">
    <input type="number" min="1" max="10" placeholder="${trans['rate-here'][language]}"/>
    <button class = "btn btn-outline-success">${trans['add-rating'][language]}</button>
    </form>
    <button class="btn btn-outline-warning" data-trans="exit" onclick="openAndCloseMenu('read-book-menu')">Exit</button>`;

    elMenu.innerHTML = strHTML;
    doTranslate();
    openAndCloseMenu('read-book-menu');
}

function onBookAdd() {
    const bookName = document.querySelector('input[name="name"]');
    const bookPrice = document.querySelector('input[name="price"]');
    const newBook = createBook(bookName.value, bookPrice.value);

    if (!newBook.title || !newBook.price) return;
    addNewBook(newBook);
    openAndCloseMenu();
    renderBooks();
}

function onRemoveBook(id) {
    const targetRow = document.getElementById(`${id}`);
    targetRow.classList.add('remove-book');
    targetRow.innerHTML = 'Removed';

    setTimeout(() => {
        removeBook(id);
        renderBooks();
    }, 1000);
}

function onSubmitChange(event, id) {
    const updatedRating = +event[1].value;
    const updatedPrice = +event[0].value;

    updateBook(id, updatedPrice, updatedRating);
    renderBooks();
    openAndCloseMenu('update-book-menu');
    doTranslate()
}

function openAndCloseMenu(effect) {
    const elMenu = document.querySelector('.menu');
    if (effect) elMenu.classList.toggle(effect);
    elMenu.classList.toggle('hide');
}





function createRatingOptions() {
    var options = '<select>';
    for (var i = 0; i < 11; i++) {
        options += `<option>${i}</option>`;
    }
    options += '</select>';
    return options;
}



function onUserRatingUpdate(ev, id) {
    const newRating = ev[0].value;

    updateRating(id, newRating);
    openAndCloseMenu('read-book-menu');
    renderBooks();

}


function onSetSortBy() {
    const prop = document.querySelector('.sort-by').value;
    const isDesc = document.querySelector('.sort-desc').checked;
    const sortBy = {};

    sortBy[prop] = (isDesc) ? -1 : 1;

    setBookSort(sortBy);
    renderBooks();
}

function onNextPage() {
    const elPageCounter = document.querySelector('.page-counter');

    setNextPage();
    renderBooks();
    doTranslate();

    elPageCounter.innerText = gPageIdx;
}

function onPrevPage() {
    const elPageCounter = document.querySelector('.page-counter');

    setPrevPage();
    renderBooks();
    doTranslate();

    elPageCounter.innerText = gPageIdx;
}

function getCurrLang() {
    return gCurrLang;
}

function getTrans() {
    return gTrans;
}

function onChangeLanguage(ev) {
    const elContainer = document.querySelector('.main-container');
    const language = ev.value;

    language === 'en' ?
        elContainer.setAttribute("dir", "ltl") :
        elContainer.setAttribute("dir", "rtl");

    setLanguag(language);
    doTranslate();
}