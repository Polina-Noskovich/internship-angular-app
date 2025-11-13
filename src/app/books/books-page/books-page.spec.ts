import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksPage } from './books-page';

describe('BooksPage', () => {
  let component: BooksPage;
  let fixture: ComponentFixture<BooksPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BooksPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
