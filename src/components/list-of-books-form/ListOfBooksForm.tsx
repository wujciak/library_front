import React from 'react';
import './ListOfBooksForm.css';
import {metadata} from "../../res/metadata";

function ListOfBooksForm() {
    let listsBooks = metadata.map(book =>
    <li key={book.id}></li>)
    return
}

export default ListOfBooksForm;