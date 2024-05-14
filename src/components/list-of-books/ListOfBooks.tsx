import React, { useState } from 'react';
import './ListOfBooks.css';
import { booksData } from "../../res/booksData";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import TablePagination from '@mui/material/TablePagination';

function ListOfBooks() {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handlePageChange = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredBooks = booksData.filter(book =>
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
                    <th><PersonIcon className="PersonIcon"/> Author</th>
                    <th>ISBN</th>
                    <th>Publisher</th>
                    <th>Date of Publish</th>
                    <th>Available Copies</th>
                </tr>
                </thead>
                <tbody>
                {(rowsPerPage > 0
                        ? filteredBooks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : filteredBooks
                ).map(book => (
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
            <TablePagination
                component="div"
                count={filteredBooks.length}
                page={page}
                onPageChange={handlePageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
}

export default ListOfBooks;
