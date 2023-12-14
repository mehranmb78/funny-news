import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PostService } from './services/post.service';
import { Post } from '../models';
import {PostCardComponent} from "./post-card/post-card.component";

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule, PostCardComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent {
  posts$: Observable<Post[]>;
  selectedPost?: Post;

  constructor(private postService: PostService) {
    this.posts$ = postService.getPosts();
  }
}
