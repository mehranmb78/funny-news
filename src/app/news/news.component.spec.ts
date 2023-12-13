import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewsComponent} from './news.component';
import {NewsService} from "./services/news.service";
import {of} from "rxjs";
import {News} from "../models";
import {Component, Input} from "@angular/core";
import {NewsCardComponent} from "./news-card/news-card.component";


@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [],
  template: ''
})
export class NewsCardMockComponent {
  @Input() news!: News
  @Input() isSelected?: boolean
}

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;
  const mockNews: News[] = [
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
      imports: [NewsComponent],
      providers: [
        {
          provide: NewsService,
          useValue: {
            getNews: () => of(mockNews)
          }
        }
      ]
    }).overrideComponent(NewsComponent, {
      remove: {imports: [NewsCardComponent]},
      add: {imports: [NewsCardMockComponent]}
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show news-card as number of news from getNews api', () => {
    expect(fixture.debugElement.nativeElement.getElementsByTagName('app-news-card').length).toBe(mockNews.length)
  })
});
