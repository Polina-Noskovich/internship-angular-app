export type BookType = 'Design Book' | 'Item Schedule' | 'Installation Book';

export interface Book {
  id: number;
  name: string;
  type: BookType;
  size: string;
  createdAt: Date;
  pages: number;
}