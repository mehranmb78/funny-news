import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models';
import { CardApiService } from '../services/card-api.service';
import { CardComponent } from '../components/card/card.component';

@Component({
  selector: 'app-posts',
  imports: [CommonModule, CardComponent],
  standalone: true,
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})
export class CardsComponent {
  cards$: Observable<Card[]>;
  selectedPost?: Card;

  constructor(private cardApiService: CardApiService) {
    this.cards$ = cardApiService.getCards();
  }
}
