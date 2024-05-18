import React, { useState, MouseEvent, ChangeEvent } from "react";
import { loansData } from "../../res/loansData";
import PersonIcon from "@mui/icons-material/Person";
import TablePagination from "@mui/material/TablePagination";
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography
} from "@mui/material";
import MenuAppBar from "../app-bar/MenuAppBar";
import "./ListOfLoans.css";

function ListOfLoans() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handlePageChange = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box>
            <MenuAppBar/>
            <Box sx={{marginTop: 4, padding: 2}}>
                <Typography variant="h4" gutterBottom>
                    List Of Loans
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Loan ID</TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <PersonIcon sx={{marginRight: 1}}/> User
                                    </Box>
                                </TableCell>
                                <TableCell>Book</TableCell>
                                <TableCell>Date of Start</TableCell>
                                <TableCell>Date of End</TableCell>
                                <TableCell>Date of Return</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                    ? loansData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : loansData
                            ).map((loan) => (
                                <TableRow key={loan.loanId}>
                                    <TableCell>{loan.loanId}</TableCell>
                                    <TableCell>{loan.user}</TableCell>
                                    <TableCell>{loan.book}</TableCell>
                                    <TableCell>{loan.dateOfStart}</TableCell>
                                    <TableCell>{loan.dateOfEnd}</TableCell>
                                    <TableCell>{loan.dateOfReturn || "Not Returned"}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={loansData.length}
                    page={page}
                    onPageChange={handlePageChange}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </Box>
    );
}

export default ListOfLoans;
