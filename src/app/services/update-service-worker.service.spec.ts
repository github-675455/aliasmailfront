import { TestBed } from '@angular/core/testing';

import { UpdateServiceWorkerService } from './update-service-worker.service';

describe('UpdateServiceWorkerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateServiceWorkerService = TestBed.get(UpdateServiceWorkerService);
    expect(service).toBeTruthy();
  });
});
