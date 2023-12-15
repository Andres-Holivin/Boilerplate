import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommentComponent } from '../../pages/comment/comment.component';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './card.component.html',
})
export class CardComponent {
  @Input() propsPost: Post | undefined;
  constructor(public dialog: MatDialog) {}
  openDialog() {
    const dialogRef = this.dialog.open(CommentComponent, {
      data: { post: this.propsPost },
      maxHeight:"80vh",
      width: '80vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
