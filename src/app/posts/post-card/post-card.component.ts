import {Component, Input, OnInit, signal, WritableSignal,} from '@angular/core';
import {Post} from '../../models';
import {animate, state, style, transition, trigger,} from '@angular/animations';
import {CommonModule} from '@angular/common';

export enum State {
  default = 'default',
  firstClick = 'firstClick',
  secondClick = 'secondClick',
  lastClick = 'lastClick',
}

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
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
export class PostCardComponent implements OnInit {
  @Input({ required: true }) post!: Post;
  @Input() set isSelected(isSelected: boolean) {
    if (!isSelected && this.cardState !== State.default) {
      this.setState(State.default, this.post.title);
    }
  }

  cardState: State = State.default;
  content: WritableSignal<string | number> = signal('');

  protected readonly CardState = State;

  ngOnInit(): void {
    this.setState(State.default, this.post.title);
  }

  onClick() {
    switch (this.cardState) {
      case State.default:
        this.setState(State.firstClick, this.post.userId);
        break;
      case State.firstClick:
        this.setState(State.secondClick, this.post.id);
        break;
      case State.secondClick:
        this.setState(State.lastClick, this.post.body);
        break;
      case State.lastClick:
        this.setState(State.default, this.post.title);
        break;
      default:
        this.setState(State.default, this.post.title);
        break;
    }
  }

  private setState(state: State, content: string | number): void {
    this.cardState = state;
    this.content.set(content);
  }
}
