import React, {useState} from "react";
import {loansData} from "../../res/loansData";
import PersonIcon from "@mui/icons-material/Person";
import TablePagination from "@mui/material/TablePagination";

function ListOfLoans() {
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

    const handleSearch = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className="listOfLoans">
            <h1>List Of Loans </h1>
            <table>
                <thead>
                <tr>
                    <th>Loan ID</th>
                    <th><PersonIcon className="PersonIcon"/> User </th>
                    <th>Book</th>
                    <th>Date of start</th>
                    <th>Date of end</th>
                    <th>Date of return</th>
                </tr>
                </thead>
                <tbody>
                {(rowsPerPage > 0
                        ? loansData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : loansData
                ).map(loan => (
                    <tr key={loan.loanId}>
                        <td>{loan.user}</td>
                        <td>{loan.book}</td>
                        <td>{loan.dateOfStart}</td>
                        <td>{loan.dateOfEnd}</td>
                        <td>{loan.dateOfReturn}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <TablePagination
                component="div"
                count={loansData.length}
                page={page}
                onPageChange={handlePageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </div>
    );
}

export default ListOfLoans;