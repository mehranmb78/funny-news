import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../models';
import { CardService } from './services/card.service';
import { CardComponent } from "./card/card.component";

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

  constructor(private postService: CardService) {
    this.cards$ = postService.getPosts();
  }
}
