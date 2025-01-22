import { Component, Input } from '@angular/core';
import { Comment } from '../../shared/models';

@Component({
  selector: 'app-comment-item',
  imports: [],
  templateUrl: './comment-item.component.html',
  styleUrl: './comment-item.component.css',
})
export class CommentItemComponent {
  @Input() comment: Comment = {} as Comment;
}
