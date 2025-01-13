import { Injectable } from '@angular/core';
import { Comment } from './interfaces';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  private apiComments: Comment[] = [];
  private localComments: Comment[] = [];
  private noOfCommentsReturned: number = 0;
  private startIndex: number = 0;
  private endIndex: number = 0;

  constructor() {
    this.localComments = this.loadLocalData();
    if (this.localComments.length < 1)
      this.getComments().then((comments) => (this.apiComments = comments));
    this.noOfCommentsReturned = Math.ceil(Math.random() * 5) + 2;
    this.startIndex = Math.floor(Math.random() * this.localComments.length);
    this.endIndex = Math.min(
      this.startIndex + this.noOfCommentsReturned,
      this.localComments.length
    );
  }

  get comments(): Comment[] {
    const commentsToReturn = [...this.apiComments, ...this.localComments].slice(
      this.startIndex,
      this.endIndex
    );
    return this.commentMapper(commentsToReturn);
  }

  private async getComments(): Promise<Comment[]> {
    const localData = localStorage.getItem('comments');

    if (localData) {
      console.log('Loading comments from localStorage...');
      const parsedData = JSON.parse(localData);
      console.log('Parsed localData: ', parsedData);
    } else {
      console.log('No comments found, Fetching data from the API...');
      const fetchedComments = await this.loadApiData();
      this.apiComments = fetchedComments;
      localStorage.setItem('comments', JSON.stringify(fetchedComments));
    }

    return [...this.apiComments, ...this.localComments];
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
    return comments.map(({ body, id }) => ({
      id,
      body,
    }));
  }

  private loadLocalData(): Comment[] {
    const comments = localStorage.getItem('comments');
    return !comments ? [] : JSON.parse(comments);
  }
}
