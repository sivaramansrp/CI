import { TestBed } from '@angular/core/testing';

import { IssuanceExtensionModificationServiceService } from './issuance-extension-modification.service';

describe('IssuanceExtensionModificationServiceService', () => {
  let service: IssuanceExtensionModificationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssuanceExtensionModificationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
