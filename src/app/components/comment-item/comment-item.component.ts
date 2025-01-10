import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { Comment } from '../../shared/interfaces';

@Component({
  selector: 'app-comment-item',
  imports: [],
  templateUrl: './comment-item.component.html',
  styleUrl: './comment-item.component.css',
})
export class CommentItemComponent {
  @Input() comment: Comment = {} as Comment;
}
