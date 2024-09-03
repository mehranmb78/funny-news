import { Routes } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  // {
  // component: AppComponent,
  // path: '',
  // children: [
  { path: '', component: CardsComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/' }
  //   ]
  // }
  // ,
];
