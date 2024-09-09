import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsComponent } from './cards.component';
import { CardApiService } from '../services/card-api.service';
import { of } from 'rxjs';
import { Card } from '../models';
import { Component, Input } from '@angular/core';
import { CardComponent } from '../components/card/card.component';

@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [],
  template: '',
})
export class PostCardMockComponent {
  @Input() post!: Card;
  @Input() isSelected?: boolean;
}

describe('PostsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;
  const postsMock: Card[] = [
    {
      body: 'testBody',
      title: 'testTitle',
      id: '11',
    },
    {
      body: 'testBody2',
      title: 'testTitle2',
      id: '22',
    },
    {
      body: 'testBody3',
      title: 'testTitle3',
      id: '33',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardsComponent],
      providers: [
        {
          provide: CardApiService,
          useValue: {
            getPosts: () => of(postsMock),
          },
        },
      ],
    })
      .overrideComponent(CardsComponent, {
        remove: { imports: [CardComponent] },
        add: { imports: [PostCardMockComponent] },
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
    expect(
      fixture.debugElement.nativeElement.getElementsByTagName('app-post-card')
        .length
    ).toBe(postsMock.length);
  });
});
