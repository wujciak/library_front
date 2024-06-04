import React, { useState, useEffect, MouseEvent, ChangeEvent } from "react";
import { LoanDTO } from "../../api/dto/loan.dto";
import SearchIcon from "@mui/icons-material/Search";
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
    Typography,
    TextField
} from "@mui/material";
import MenuAppBar from "../menu-app-bar/MenuAppBar";
import { useApi } from "../../api/ApiProvider";
import "./ListOfLoans.css";
import {useTranslation} from "react-i18next";
import PersonIcon from "@mui/icons-material/Person";

function ListOfLoans() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loans, setLoans] = useState<LoanDTO[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const apiClient = useApi();
    const { t } = useTranslation();

    useEffect(() => {
        apiClient.getAllLoans().then(response => {
            if (response.success && response.data) {
                setLoans(response.data);
            } else {
                console.error('Failed to fetch loans');
            }
        });
    }, [apiClient]);

    const handlePageChange = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const filteredLoans = loans.filter(loan =>
        loan.user?.toString().includes(searchTerm) ||
        loan.book?.toString().includes(searchTerm)
    );

    return (
        <Box>
            <MenuAppBar/>
            <Box sx={{marginTop: 4, padding: 2}}>
                <Typography variant="h4" gutterBottom>
                    {t("List Of Loans")}
                </Typography>
                <Box display="flex" alignItems="center" mb={2}>
                    <SearchIcon sx={{marginRight: 1}} />
                    <TextField
                        variant="outlined"
                        fullWidth
                        placeholder={t("Search loans by user ID or book ID")}
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </Box>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>{t("Loan ID")}</TableCell>
                                <TableCell>
                                    <Box display="flex" alignItems="center">
                                        <PersonIcon sx={{marginRight: 1}}/> {t("User")}
                                    </Box>
                                </TableCell>
                                <TableCell>{t("Book")}</TableCell>
                                <TableCell>{t("Date of Start")}</TableCell>
                                <TableCell>{t("Date of End")}</TableCell>
                                <TableCell>{t("Date of Return")}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                    ? filteredLoans.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : filteredLoans
                            ).map((loan) => (
                                <TableRow key={loan.loanId}>
                                    <TableCell>{loan.loanId}</TableCell>
                                    <TableCell>{loan.user?.userId}</TableCell>
                                    <TableCell>{loan.book?.bookId}</TableCell>
                                    <TableCell>{loan.dateOfStart?.toString()}</TableCell>
                                    <TableCell>{loan.dateOfEnd?.toString()}</TableCell>
                                    <TableCell>{loan.dateOfReturn?.toString()}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={filteredLoans.length}
                    page={page}
                    onPageChange={handlePageChange}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Box>
        </Box>
    );
}

export default ListOfLoans;
