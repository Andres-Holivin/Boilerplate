import { Component, Inject } from '@angular/core';
import { ListComment } from '../../models/comment.model';
import { CommentService } from '../../services/comment/comment.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Post } from '../../models/post.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  listComment?: ListComment;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { post: Post | null },
    private commentService: CommentService
  ) {}
  ngOnInit(): void {
    this.getListPost();
  }
  getListPost(): void {
    console.log(this.data)
    if (this.data.post) {
      this.commentService
        .getAll({
          page: 1,
          post: this.data.post,
        })
        .subscribe({
          next: (data) => {
            this.listComment = data;
            console.log(this.listComment);
          },
          error(err) {
            console.log(err);
          },
        });
    }
  }
}
