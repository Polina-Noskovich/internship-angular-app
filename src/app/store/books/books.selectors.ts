import { Selector, createSelector } from '@ngxs/store';
import { BooksStateModel, Book } from './books-state.model';
import { BooksState } from './books.state';

export class BooksSelectors {
  @Selector([BooksState])
  static getBooksList(state: BooksStateModel): Book[] {
    return state.books;
  }

  @Selector([BooksState])
  static getBooksCount(state: BooksStateModel): number {
    return state.books.length;
  }

  static getBookById(id: number) {
    return createSelector([BooksState], (state: BooksStateModel) =>
      state.books.find((book) => book.id === id)
    );
  }
}
