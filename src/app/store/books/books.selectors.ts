import { Selector, createSelector } from '@ngxs/store';
import { BooksStateModel, Book } from './books-state.model';
import { BooksState } from './books.state';

export class BooksSelectors {
  @Selector([BooksState])
  public static books(state: BooksStateModel): Book[] {
    return state.books;
  }

  @Selector([BooksState])
  public static booksCount(state: BooksStateModel): number {
    return state.books.length;
  }

  public static bookById(id: number) {
    return createSelector([BooksState], (state: BooksStateModel) =>
      state.books.find((book) => book.id === id)
    );
  }
}
