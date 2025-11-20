import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { Book } from '../books-page/models/book-model';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-page-detail',
  standalone: false,
  templateUrl: './page-detail.html',
  styleUrl: './page-detail.scss',
})
export class PageDetail implements OnInit {
  protected book$!: Observable<Book | undefined>;
  protected pageNumber$!: Observable<number>;

  @ViewChild('pageCanvas') private readonly canvasRef!: ElementRef<HTMLCanvasElement>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly bookService: BookService,
  ) {}

  public ngOnInit(): void {
    this.pageNumber$ = this.route.paramMap.pipe(
      map(params => Number(params.get('pageNumber')))
    );

    this.book$ = this.route.paramMap.pipe(
      switchMap(params => {
        const bookId = Number(params.get('bookId'));
        return this.bookService.getBookById(bookId);
      }),
    );
  }

  public ngAfterViewInit(): void {
    this.drawPageLines();
  }

  private drawPageLines(): void {
    if (!this.canvasRef?.nativeElement) {
      return;
    }

    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d'); 

    if (context) {
      const width = canvas.width;
      const height = canvas.height;
      const cellSize = 30; 

      context.clearRect(0, 0, width, height);
      context.beginPath();

      context.strokeStyle = '#e0e0e0'; 
      context.lineWidth = 1;

      for (let y = cellSize; y < height; y += cellSize) {
        context.moveTo(0, y);
        context.lineTo(width, y);
      }

      for (let x = cellSize; x < width; x += cellSize) {
        context.moveTo(x, 0);
        context.lineTo(x, height);
      }

      context.stroke();
    }
  }
  }
