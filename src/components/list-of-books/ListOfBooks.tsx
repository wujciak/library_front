import React, { useState, ChangeEvent, MouseEvent } from 'react';
import './ListOfBooks.css';
import { booksData } from "../../res/booksData";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    TextField,
    TablePagination
} from '@mui/material';
import MenuAppBar from "../app-bar/MenuAppBar";

function ListOfBooks() {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handlePageChange = (
        event: MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredBooks = booksData.filter(book =>
        book.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.isbn.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Box>
            <MenuAppBar/>
            <Box sx={{marginTop: 4, padding: 2}}>
                <Typography variant="h4" gutterBottom>
                    List Of Books
                </Typography>
                <Box display="flex" alignItems="center" mb={2}>
                    <SearchIcon sx={{marginRight: 1}} />
                    <TextField
                        variant="outlined"
                        fullWidth
                        placeholder="Search books by title or ISBN"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Title</TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <PersonIcon sx={{marginRight: 1}}/> Author
                                    </Box>
                                </TableCell>
                                <TableCell>ISBN</TableCell>
                                <TableCell>Publisher</TableCell>
                                <TableCell>Date of Publish</TableCell>
                                <TableCell>Available Copies</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                    ? filteredBooks.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : filteredBooks
                            ).map(book => (
                                <TableRow key={book.id} className={book.availableCopies === 0 ? "unavailable" : ""}>
                                    <TableCell>{book.name}</TableCell>
                                    <TableCell>{book.author}</TableCell>
                                    <TableCell>{book.isbn}</TableCell>
                                    <TableCell>{book.publisher}</TableCell>
                                    <TableCell>{book.dateOfPublish}</TableCell>
                                    <TableCell>{book.availableCopies}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={filteredBooks.length}
                    page={page}
                    onPageChange={handlePageChange}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </Box>
    );
}

export default ListOfBooks;
