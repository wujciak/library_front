export class BookDTO {
    bookId: number | undefined;
    isbn: string | undefined;
    title: string | undefined;
    author: string | undefined;
    publisher: string | undefined;
    yearOfPublish: number | undefined;
    availableCopies: number | undefined;
}

export class CreateBookDTO {
    isbn: string | undefined;
    title: string | undefined;
    author: string | undefined;
    publisher: string | undefined;
    yearOfPublish: number | undefined;
    availableCopies: number | undefined;
}

export class Book {
    bookId: number | undefined;
    isbn: string | undefined;
    title: string | undefined;
    author: string | undefined;
    publisher: string | undefined;
    yearOfPublish: number | undefined;
    availableCopies: number | undefined;
}
