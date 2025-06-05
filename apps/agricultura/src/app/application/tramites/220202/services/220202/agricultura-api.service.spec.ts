import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';  // Import the testing module
import { AgriculturaApiService } from './agricultura-api.service';
import { TituloComponent } from '@libs/shared/data-access-user/src';

describe('AgriculturaApiService', () => {
  let service: AgriculturaApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TituloComponent],  // Add the testing module here
    });
    service = TestBed.inject(AgriculturaApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
