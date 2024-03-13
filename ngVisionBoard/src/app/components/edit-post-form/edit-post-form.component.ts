import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../../models/post';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { UnsplashService } from '../../services/unsplash.service';

@Component({
  selector: 'app-edit-post-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-post-form.component.html',
  styleUrl: './edit-post-form.component.css'
})
export class EditPostFormComponent {
  @Input() post: Post | null = null;
  @Output() postUpdated = new EventEmitter<Post>();
  @Output() cancelled = new EventEmitter<void>();
  photos: any[] = [];
  searchQuery: string = '';
  collections: any[] = [];
  searchResults: any[] = [];
  selectedPhotoUrl: string = '';

  constructor(private postService: PostService, private unsplashService: UnsplashService) {}

  ngOnInit(): void {
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


  selectPhoto(photo: { id: string; urls: { regular: string; }; }): void {
    if (this.post) {
      this.post.imageUrl = photo.urls.regular;
      this.selectedPhotoUrl = photo.urls.regular;
    } else {
      console.error('No post to update the image URL for');
    }
  }


  hidePhotos(): void {
  this.photos = [];
  }

  updatePost(): void {
    if (this.post && this.post.id) {
      this.postService.update(this.post).subscribe({
        next: (updatedPost) => {
          console.log('Post updated successfully:', updatedPost);
          this.postUpdated.emit(updatedPost);
        },
        error: (error) => {
          console.error('Error updating post:', error);
        },
      });
    } else {
      console.error('Post or Post ID not provided!');
    }
  }

  cancel(): void {
    this.cancelled.emit();
  }

}
