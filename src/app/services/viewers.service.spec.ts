import { TestBed } from '@angular/core/testing';

import { ViewersService } from './viewers.service';

describe('ViewersService', () => {
  let service: ViewersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
