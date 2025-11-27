import { Book } from "./books-state.model";

export class GetBooks {
    public static readonly type = '[Books] Get book';
}

export class AddBook {
    public static readonly type = '[Books] Add book';
    constructor(public payload: Book) {}
}

export class DeleteBook {
    public static readonly type = '[Books] Delete book';
    constructor(public payload: number) {}
}

