import { Injectable, signal, computed } from '@angular/core';
import { Comment } from '../models';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private commentsSignal = signal<Comment[]>([]);

  readonly randomComments = computed(() => {
    const allComments = this.commentsSignal();
    if (allComments.length === 0) return [];

    const count = Math.ceil(Math.random() * 6) + 1; //Random number between 2 and 7
    const startIndex = Math.ceil(Math.random() * (allComments.length - count));
    return allComments.slice(startIndex, startIndex + count);
  });

  constructor() {}

  initialize(): void {
    const storedComments = this.loadLocalData();
    if (storedComments.length > 0) this.commentsSignal.set(storedComments);
    else this.loadComments();
  }

  public addComment(body: string): void {
    const randomId = Math.ceil(Math.random() * 1000);
    const newComment: Comment = {
      id: randomId,
      body: body,
    };
    this.randomComments().push(newComment);
  }

  private async loadComments(): Promise<void> {
    try {
      const fetchedComments = await this.loadApiData();
      const mappedComments = this.commentMapper(fetchedComments);
      this.commentsSignal.set(mappedComments);
      localStorage.setItem('comments', JSON.stringify(fetchedComments));
    } catch (error) {
      console.error('Error fetching comments: ', error);
    }
  }

  private async loadApiData(): Promise<Comment[]> {
    console.time('comment fetch done');
    const response = await fetch('https://dummyjson.com/Comments?limit=50');
    if (!response.ok) throw new Error('Failed to fetch comments');
    const json = await response.json();
    console.timeEnd('comment fetch done');
    return json.comments;
  }

  private commentMapper(comments: any[]): Comment[] {
    return comments.map(({ id, body }) => ({
      id,
      body,
    }));
  }

  private loadLocalData(): Comment[] {
    const comments = localStorage.getItem('comments');
    return comments ? JSON.parse(comments) : [];
  }
}
