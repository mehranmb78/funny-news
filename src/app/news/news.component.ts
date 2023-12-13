import { Component } from '@angular/core';
import { NewsService } from './services/news.service';
import { Observable } from 'rxjs';
import { News } from '../models';
import { NewsCardComponent } from './news-card/news-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, NewsCardComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent {
  news$: Observable<News[]>;
  selectedNews?: News;

  constructor(private newsService: NewsService) {
    this.news$ = newsService.getNews();
  }
}
