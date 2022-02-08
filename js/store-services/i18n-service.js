'use strict';


const gTrans = {
    title: {
        en: 'Book Store',
        he: 'חנות ספרים'
    },
    'sort-select': {
        en: 'Select sorting',
        he: 'מיין לפי',
    },
    'book-title': {
        en: 'Book Name',
        he: 'שם ספר',
    },
    'sort-price': {
        en: 'By price',
        he: 'לפי מחיר',
    },
    descending: {
        en: 'Descending',
        he: 'סדר יורד'
    },
    'add-book': {
        en: 'Add New Book',
        he: 'הוסף ספר חדש',
    },
    previous: {
        en: '<-',
        he: '<-',
    },
    next: {
        en: '->',
        he: '->',
    },
    add: {
        en: 'Add',
        es: 'Aggregar',
        he: 'הוסף',
    },
    id: {
        en: 'id?',
        he: 'מספר זיהוי',
    },
    read: {
        en: 'Read',
        he: 'לקרוא'
    },

    update: {
        en: 'Update',
        he: 'עדכן'
    },

    remove: {
        en: 'Delete',
        he: 'מחק'
    },

    exit: {
        en: 'Exit',
        he: 'יציאה'
    },
    price: {
        en: 'Price',
        he: 'מחיר'
    },

    currentPrice: {
        en: 'Current Price',
        he: 'מחיר עכשיו'
    },
    currentRating: {
        en: 'Current Rating',
        he: 'דירוג'
    },
    book: {
        en: 'Book Name',
        he: 'שם ספר'
    },
    submit: {
        en: 'Submit',
        he: 'אישור'
    },
    'rate-here': {
        en: 'Rate here⭐',
        he: 'דרג⭐'
    },
    'add-rating': {
        en: 'Add rating',
        he: 'הוסף'
    },
    'book-description': {
        en: 'Book Description',
        he: 'תיאור הספר'
    },

    'rating': {
        en: 'Book Rating',
        he: 'דירוג הספר'
    },
    'action': {
        en: 'Actions',
        he: 'פעולות'
    },
    'update-menu': {
        en: 'Update Menu',
        he: 'עדכון הספר'
    },

    'sort-name': {
        en: 'By name',
        he: 'לפי א-ב'
    }

};

var gCurrLang = 'en';


function setLanguag(language) {
    gCurrLang = language;
}


function getTranslate(transKey) {
    var keyTrans = gTrans[transKey];
    if (!keyTrans) return 'UNKNOWN';

    var txt = keyTrans[gCurrLang];
    if (!txt) txt = keyTrans.en;

    return txt;
}


function doTranslate() {

    var els = document.querySelectorAll('[data-trans]');

    els.forEach(el => {
        var transKey = el.dataset.trans;
        var txt = getTranslate(transKey);

        el.innerText = txt;
    });
}