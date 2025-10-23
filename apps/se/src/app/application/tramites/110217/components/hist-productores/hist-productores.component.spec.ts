import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistProductoresComponent } from './hist-productores.component';
import { provideHttpClient } from '@angular/common/http';
import { CertificadosOrigenService } from '../../services/certificado-origen.service.ts';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('HistProductoresComponent', () => {
  let component: HistProductoresComponent;
  let fixture: ComponentFixture<HistProductoresComponent>;
  let certificadosOrigenService: jest.Mocked<CertificadosOrigenService>;

  beforeEach(async () => {
    const mockCertificadosOrigenService = {
      obtenerProductorPorExportador: jest.fn().mockReturnValue(of({})),
      // Agregar otros métodos que podrían ser utilizados por el componente
    };

    await TestBed.configureTestingModule({
      imports: [HistProductoresComponent],
      providers: [
        provideHttpClient(),
        { provide: CertificadosOrigenService, useValue: mockCertificadosOrigenService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(HistProductoresComponent);
    component = fixture.componentInstance;
    certificadosOrigenService = TestBed.inject(CertificadosOrigenService) as jest.Mocked<CertificadosOrigenService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component properties', () => {
    expect(component).toBeDefined();
    expect(certificadosOrigenService.obtenerProductorPorExportador).toBeDefined();
  });
});
