import {Component, Input, OnInit, signal, WritableSignal,} from '@angular/core';
import {News} from '../../models';
import {animate, state, style, transition, trigger,} from '@angular/animations';
import {CommonModule} from '@angular/common';

export enum CardState {
  default = 'default',
  firstClick = 'firstClick',
  secondClick = 'secondClick',
  lastClick = 'lastClick',
}

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.scss',
  animations: [
    trigger('flip', [
      state(
        'default',
        style({
          transform: 'rotateX(0) rotateY(0)',
        })
      ),
      state(
        'firstClick',
        style({
          transform: 'rotateX(0) rotateY(180deg)',
        })
      ),
      state(
        'secondClick',
        style({
          transform: 'rotateX(180deg) rotateY(180deg)',
        })
      ),
      state(
        'lastClick',
        style({
          transform: 'rotateX(180deg) rotateY(0)',
        })
      ),
      transition('default => firstClick', animate('300ms ease-in')),
      transition('firstClick => secondClick', animate('300ms ease-in')),
      transition('secondClick => lastClick', animate('300ms ease-in')),
      transition('lastClick => default', animate('300ms ease-out')),
      transition('secondClick => default', animate('300ms ease-out')),
      transition('firstClick => default', animate('300ms ease-out')),
    ]),
  ],
})
export class NewsCardComponent implements OnInit {
  @Input({ required: true }) news!: News;
  @Input() set isSelected(isSelected: boolean) {
    if (!isSelected && this.cardState !== CardState.default) {
      this.setCardState(CardState.default, this.news.title);
    }
  }

  cardState: CardState = CardState.default;
  content: WritableSignal<string | number> = signal('');

  protected readonly CardState = CardState;

  ngOnInit(): void {
    this.setCardState(CardState.default, this.news.title);
  }

  onCardClick() {
    switch (this.cardState) {
      case CardState.default:
        this.setCardState(CardState.firstClick, this.news.userId);
        break;
      case CardState.firstClick:
        this.setCardState(CardState.secondClick, this.news.id);
        break;
      case CardState.secondClick:
        this.setCardState(CardState.lastClick, this.news.body);
        break;
      case CardState.lastClick:
        this.setCardState(CardState.default, this.news.title);
        break;
      default:
        this.setCardState(CardState.default, this.news.title);
        break;
    }
  }

  private setCardState(state: CardState, content: string | number): void {
    this.cardState = state;
    this.content.set(content);
  }
}
