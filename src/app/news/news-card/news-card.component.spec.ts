import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from "@angular/platform-browser";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {DebugElement} from "@angular/core";

import {CardState, NewsCardComponent} from './news-card.component';
import {News} from "../../models";

describe('NewsCardComponent', () => {
  let component: NewsCardComponent;
  let fixture: ComponentFixture<NewsCardComponent>;
  let mockNews: News = {
    body: 'testBody',
    title: 'testTitle',
    userId: 22,
    id: 11
  }
  let newsCardElement: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsCardComponent, NoopAnimationsModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsCardComponent);
    component = fixture.componentInstance;
    newsCardElement = fixture.debugElement.query(By.css('div'));
    component.news = mockNews
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when is default state for card', () => {
    it('should show userId as card content', () => {
      expect(component.content()).toBe(mockNews.title)
    })
  })

  describe('when one time click on card', () => {
    beforeEach(() => {
      component.onCardClick()
      fixture.detectChanges()
    })

    it('should show userId as card content', () => {
      expect(component.content()).toBe(mockNews.userId)
    })

    it('should has news-card--first-click class', () => {
      expect(newsCardElement.classes['news-card--first-click']).toBeTruthy();
    })
  })

  describe('when two times click on card', () => {
    beforeEach(() => {
      component.onCardClick()
      component.onCardClick()
      fixture.detectChanges()
    })

    it('should show id as card content', () => {
      expect(component.content()).toBe(mockNews.id)
    })

    it('should has news-card--first-click class', () => {
      expect(newsCardElement.classes['news-card--second-click']).toBeTruthy();
    })
  })

  describe('when three times click on card', () => {
    beforeEach(() => {
      component.onCardClick()
      component.onCardClick()
      component.onCardClick()
      fixture.detectChanges()
    })

    it('should show body as card content', () => {
      expect(component.content()).toBe(mockNews.body)
    })

    it('should has news-card--last-click class', () => {
      expect(newsCardElement.classes['news-card--last-click']).toBeTruthy();
    })
  })

  it('should reset to default state when parent change selected news card', () => {
    component.onCardClick()
    component.onCardClick()

    component.isSelected = false

    expect(component.content()).toBe(mockNews.title)
    expect(component.cardState).toBe(CardState.default)
  })
});
