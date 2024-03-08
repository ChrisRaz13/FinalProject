import { TestBed } from '@angular/core/testing';

import { BoardLikeService } from './board-like.service';

describe('BoardLikeService', () => {
  let service: BoardLikeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardLikeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
