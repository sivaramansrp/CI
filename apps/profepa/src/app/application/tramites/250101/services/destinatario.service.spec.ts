import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { DestinatarioService } from './destinatario.service';

describe('DestinatarioService', () => {
  let service: DestinatarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [HttpClientTestingModule], 
                  providers: [DestinatarioService]
    });
    service = TestBed.inject(DestinatarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
