import { TestBed } from '@angular/core/testing';

import { SiblingComponentDataSharingService } from './component.2way.databinding.service';

describe('Component.2way.DatabindingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SiblingComponentDataSharingService = TestBed.get(SiblingComponentDataSharingService);
    expect(service).toBeTruthy();
  });
});
