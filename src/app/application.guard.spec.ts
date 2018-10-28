import { TestBed, async, inject } from '@angular/core/testing';

import { ApplicationGuard } from './application.guard';

describe('ApplicationGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplicationGuard]
    });
  });

  it('should ...', inject([ApplicationGuard], (guard: ApplicationGuard) => {
    expect(guard).toBeTruthy();
  }));
});
