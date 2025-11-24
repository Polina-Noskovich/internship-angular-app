import { Book } from "./books-state.model";

export class GetBooks {
    public static readonly type = '[Books] Get books';
}

export class AddBook {
    public static readonly type = '[Books] Add books';
    constructor(public payload: Book) {}
}

export class DeleteBook {
    public static readonly type = '[Books] Delete books';
    constructor(public payload: number) {}
}

