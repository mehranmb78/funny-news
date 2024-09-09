import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { DebugElement } from "@angular/core";

import { State, CardComponent } from './card.component';
import { Card } from "../../models";

describe('PostCardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;
  let postMock: Card = {
    body: 'testBody',
    title: 'testTitle',
    userId: 22,
    id: 11
  }
  let postCardElement: DebugElement

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent, NoopAnimationsModule],
    })
      .compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
    postCardElement = fixture.debugElement.query(By.css('div'));
    component.post = postMock
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when is default state for card', () => {
    it('should show userId as card content', () => {
      expect(component.content()).toBe(postMock.title)
    })
  })

  describe('when one time click on card', () => {
    beforeEach(() => {
      postCardElement.nativeElement.dispatchEvent(new Event('click'))
    })

    it('should show userId as card content', () => {
      expect(component.content()).toBe(postMock.userId)
    })

    it('should has post-card--first-click class', () => {
      fixture.detectChanges()

      expect(postCardElement.classes['post-card--first-click']).toBeTruthy();
    })
  })

  describe('when two times click on card', () => {
    beforeEach(() => {
      postCardElement.nativeElement.dispatchEvent(new Event('click'))
      postCardElement.nativeElement.dispatchEvent(new Event('click'))
    })

    it('should show id as card content', () => {
      expect(component.content()).toBe(postMock.id)
    })

    it('should has post-card--first-click class', () => {
      fixture.detectChanges()

      expect(postCardElement.classes['post-card--second-click']).toBeTruthy();
    })
  })

  describe('when three times click on card', () => {
    beforeEach(() => {
      postCardElement.nativeElement.dispatchEvent(new Event('click'))
      postCardElement.nativeElement.dispatchEvent(new Event('click'))
      postCardElement.nativeElement.dispatchEvent(new Event('click'))
    })

    it('should show body as card content', () => {
      expect(component.content()).toBe(postMock.body)
    })

    it('should has post-card--last-click class', () => {
      fixture.detectChanges()

      expect(postCardElement.classes['post-card--last-click']).toBeTruthy();
    })
  })

  it('should reset to default state when parent change selected post card', () => {
    postCardElement.nativeElement.dispatchEvent(new Event('click'))
    postCardElement.nativeElement.dispatchEvent(new Event('click'))

    component.isSelected = false

    expect(component.content()).toBe(postMock.title)
    expect(component.cardState).toBe(State.Title)
  })
});
