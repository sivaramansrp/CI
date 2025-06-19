import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { FloraFaunaService } from './flora-fauna.service';

describe('FloraFaunaService', () => {
  let service: FloraFaunaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
           imports: [HttpClientTestingModule], 
            providers: [FloraFaunaService]
    });
    service = TestBed.inject(FloraFaunaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
