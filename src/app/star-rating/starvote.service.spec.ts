import { TestBed } from '@angular/core/testing';

import { StarvoteService } from './starvote.service';

describe('StarvoteService', () => {
  let service: StarvoteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StarvoteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
