import { ProductService } from './../../services/product.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ListProduct } from '../../models/product.model';
import { CardComponent } from '../../components/card/card.component';
import { PostService } from '../../services/post/post.service';
import { ListPost } from '../../models/post.model';
import { ListComponent } from '../../components/list/list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardComponent, ListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  ListPost?: ListPost;
  constructor(private postService: PostService) {}
  ngOnInit(): void {
    this.getListPost();
  }
  getListPost(): void {
    this.postService.getAll(1).subscribe({
      next: (data) => {
        this.ListPost = data;
        console.log(this.ListPost);
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
