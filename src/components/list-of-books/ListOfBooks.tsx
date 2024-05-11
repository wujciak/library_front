import React, { useState } from 'react';
import './ListOfBooks.css';
import { metadata } from "../../res/metadata";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';


function ListOfBooks() {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredBooks = metadata.filter(book =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="listOfBooks">
            <h1>List Of Books </h1>
            <div className="searchContainer">
                <SearchIcon className="searchIcon"/>
                <input
                    className="searchInput"
                    type="text"
                    placeholder="Search books by title or ISBN"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <table>
                <thead>
                <tr>
                    <th>Title</th>
                    <th className="authorHeader"> <PersonIcon className="PersonIcon"/> Author</th>
                    <th>ISBN</th>
                    <th>Publisher</th>
                    <th>Date of Publish</th>
                    <th>Available Copies</th>
                </tr>
                </thead>
                <tbody>
                {filteredBooks.map(book => (
                    <tr key={book.id} className={book.availableCopies === 0 ? "unavailable" : ""}>
                        <td>{book.name}</td>
                        <td>{book.author}</td>
                        <td>{book.isbn}</td>
                        <td>{book.publisher}</td>
                        <td>{book.dateOfPublish}</td>
                        <td>{book.availableCopies}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default ListOfBooks;
