import { TestBed } from '@angular/core/testing';
import { ServicioDeMensajesService } from './servicio-de-mensajes.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ServicioDeMensajesService', () => {
  let service: ServicioDeMensajesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ServicioDeMensajesService]
    });
    service = TestBed.inject(ServicioDeMensajesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

