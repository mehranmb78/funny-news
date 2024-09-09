import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Card } from '../../models';

export enum State {
  Title = 'Title',
  Description = 'Description',
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  animations: [
    trigger('flip', [
      state(
        'Title',
        style({
          transform: 'rotateX(0) rotateY(0)',
        })
      ),
      state(
        'Description',
        style({
          transform: 'rotateX(0) rotateY(180deg)',
        })
      ),
      transition('Title => Description', animate('300ms ease-in')),
      transition('Description => Title', animate('300ms ease-out')),
    ]),
  ],
})
export class CardComponent implements OnInit {
  @Input({ required: true }) post!: Card;
  @Input() set isSelected(isSelected: boolean) {
    if (!isSelected && this.cardState !== State.Title) {
      this.setState(State.Title, this.post.title);
    }
  }

  cardState: State = State.Title;
  content: WritableSignal<string | number> = signal('');

  protected readonly CardState = State;

  ngOnInit(): void {
    this.setState(State.Title, this.post.title);
  }

  onClick() {
    switch (this.cardState) {
      case State.Title:
        this.setState(State.Description, this.post.body);
        break;
      case State.Description:
        this.setState(State.Title, this.post.title);
        break;
      default:
        this.setState(State.Title, this.post.title);
        break;
    }
  }

  private setState(state: State, content: string | number): void {
    this.cardState = state;
    this.content.set(content);
  }
}
