import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CamDatosCertificadoComponent } from './cam-datos-certificado.component';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Catalogo } from '@ng-mf/data-access-user';
import { CamCertificadoService } from '../../services/cam-certificado.service';

describe('CamDatosCertificadoComponent', () => {
  let component: CamDatosCertificadoComponent;
  let fixture: ComponentFixture<CamDatosCertificadoComponent>;
  let camCertificadoService: jest.Mocked<CamCertificadoService>;

  beforeEach(async () => {
    const camCertificadoServiceMock = {
      obtenerMenuDesplegable: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [CamDatosCertificadoComponent],
      providers: [
        { provide: CamCertificadoService, useValue: camCertificadoServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CamDatosCertificadoComponent);
    component = fixture.componentInstance;
    camCertificadoService = TestBed.inject(CamCertificadoService) as jest.Mocked<CamCertificadoService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('CamDatosCertificadoComponent - entidadFederativasOpcion', () => {
  let component: CamDatosCertificadoComponent;
  let fixture: ComponentFixture<CamDatosCertificadoComponent>;
  let camCertificadoService: jest.Mocked<CamCertificadoService>;

  beforeEach(async () => {
    const camCertificadoServiceMock = {
      obtenerMenuDesplegable: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [CamDatosCertificadoComponent],
      providers: [
        { provide: CamCertificadoService, useValue: camCertificadoServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CamDatosCertificadoComponent);
    component = fixture.componentInstance;
    camCertificadoService = TestBed.inject(CamCertificadoService) as jest.Mocked<CamCertificadoService>;
    fixture.detectChanges();
  });

  it('should populate entidadFederativas on successful API call', () => {
    const mockData: Catalogo[] = [{ id: 1, clave: 'Entidad 1', descripcion: '' }, { id: 2, clave: 'Entidad 2', descripcion: '' }];
    camCertificadoService.obtenerMenuDesplegable.mockReturnValue(of(mockData));

    component.entidadFederativasOpcion();

    expect(camCertificadoService.obtenerMenuDesplegable).toHaveBeenCalledWith('entidadFederativas.json');
    expect(component.entidadFederativas).toEqual(mockData);
  });

  it('should handle error and set entidadFederativas to an empty array on API failure', () => {
    const mockError = new HttpErrorResponse({ error: 'Error message', status: 500 });
    camCertificadoService.obtenerMenuDesplegable.mockReturnValue(throwError(() => mockError));

    component.entidadFederativasOpcion();

    expect(camCertificadoService.obtenerMenuDesplegable).toHaveBeenCalledWith('entidadFederativas.json');
    expect(component.entidadFederativas).toEqual([]);
  });
});
