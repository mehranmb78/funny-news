import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsComponent } from './cards.component';
import { CardService } from "./services/card.service";
import { of } from "rxjs";
import { Card } from "../models";
import { Component, Input } from "@angular/core";
import { CardComponent } from "./card/card.component";


@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [],
  template: ''
})
export class PostCardMockComponent {
  @Input() post!: Card
  @Input() isSelected?: boolean
}

describe('PostsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;
  const postsMock: Card[] = [
    {
      body: 'testBody',
      title: 'testTitle',
      userId: 22,
      id: 11
    },
    {
      body: 'testBody2',
      title: 'testTitle2',
      userId: 33,
      id: 22
    },
    {
      body: 'testBody3',
      title: 'testTitle3',
      userId: 44,
      id: 33
    },
  ]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsComponent],
      providers: [
        {
          provide: CardService,
          useValue: {
            getPosts: () => of(postsMock)
          }
        }
      ]
    }).overrideComponent(CardsComponent, {
      remove: { imports: [CardComponent] },
      add: { imports: [PostCardMockComponent] }
    })
      .compileComponents();

    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show app-post-card elements to the number of posts from getPosts api', () => {
    expect(fixture.debugElement.nativeElement.getElementsByTagName('app-post-card').length).toBe(postsMock.length)
  })
});
