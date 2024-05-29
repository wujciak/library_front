import {Book} from "./book.dto";
import {User} from "./user.dto";

export class LoanDTO {
    loanId: number | undefined;
    book: Book | undefined;
    user: User | undefined;
    dateOfStart: Date | undefined;
    dateOfEnd: Date | undefined;
    dateOfReturn: Date | undefined;
}

export class CreateLoanDTO {
    book: Book | undefined;
    user: User | undefined;
    dateOfStart: Date | undefined;
    dateOfEnd: Date | undefined;
    dateOfReturn: Date | undefined;
}