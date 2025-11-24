import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { appRoutes } from './app.routes';
import { BooksState } from './store/books/books.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    importProvidersFrom(
      NgxsModule.forRoot([BooksState]),
      NgxsReduxDevtoolsPluginModule.forRoot()
    )
  ]
};