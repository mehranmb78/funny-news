import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PostsComponent} from './posts.component';
import {PostService} from "./services/post.service";
import {of} from "rxjs";
import {Post} from "../models";
import {Component, Input} from "@angular/core";
import {PostCardComponent} from "./post-card/post-card.component";


@Component({
  selector: 'app-post-card',
  standalone: true,
  imports: [],
  template: ''
})
export class PostCardMockComponent {
  @Input() post!: Post
  @Input() isSelected?: boolean
}

describe('PostsComponent', () => {
  let component: PostsComponent;
  let fixture: ComponentFixture<PostsComponent>;
  const postsMock: Post[] = [
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
      imports: [PostsComponent],
      providers: [
        {
          provide: PostService,
          useValue: {
            getPosts: () => of(postsMock)
          }
        }
      ]
    }).overrideComponent(PostsComponent, {
      remove: {imports: [PostCardComponent]},
      add: {imports: [PostCardMockComponent]}
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostsComponent);
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
