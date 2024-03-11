import { UnsplashService } from './../../services/unsplash.service';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Post } from '../../models/post';
import { PostService } from '../../services/post.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Board } from '../../models/board';
import { BoardService } from '../../services/board.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export class PostFormComponent implements OnInit{
  post: Post = new Post();
  board: Board = new Board();
  @Input() boardId: number = 0;
  createSuccess: boolean = false;
  photos: any[] = [];
  searchQuery: string = '';
  collections: any[] = [];
  searchResults: any[] = [];

  constructor(private postService: PostService,
    private boardService: BoardService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private http: HttpClient,
    private unsplashService: UnsplashService) {}


    ngOnInit() {
      this.searchCollections();
    }


    searchCollections() {
      if (!this.searchQuery.trim()) return;

      this.unsplashService.searchCollections(this.searchQuery).subscribe({
        next: (response) => {

          this.collections = response.results;


          this.photos = response.results.flatMap((collection: { preview_photos: any; }) => collection.preview_photos).map((photo: { id: any; urls: any; description: any; }) => ({
            id: photo.id,
            urls: photo.urls,
            description: photo.description || 'No Description',
          }));
        },
        error: (error) => {
          console.error('Error fetching collections:', error);
        }
      });
    }

 search() {
   this.searchCollections();
    }

selectedPhotoUrl: string = '';

selectPhoto(photo: { id: string; urls: { regular: string; }; }): void {
  this.post.imageUrl = photo.urls.regular; // Set the post's imageUrl to the selected photo's URL
  this.selectedPhotoUrl = photo.urls.regular;
}


hidePhotos(): void {
  this.photos = [];
}



  loadBoard(boardId: number): void {
    this.boardService.getBoardById(boardId).subscribe({
      next: (board) => {
        console.log(boardId);
        this.board = board;
      },
      error: (problem) => {
        console.error(
          'PostFormHttpComponent.loadBoard(): error loading board:'
        );
        console.error(problem);
      },
    });
  }

  createPost(addPost: Post): void {
    addPost.board.id = this.boardId;
    console.log('Post JSON:', JSON.stringify(addPost));
    this.postService.create(addPost).subscribe({
      next: (addedPost) => {
        console.log('Post created successfully:', addedPost);
        this.createSuccess = true;
      },
      error: (error) => {
        console.error('Error creating post:', error);
      },
    });
  }

}
