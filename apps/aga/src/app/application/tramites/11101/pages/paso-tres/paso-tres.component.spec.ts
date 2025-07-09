import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FirmaElectronicaComponent, TramiteFolioService } from '@ng-mf/data-access-user';
import { TramiteFolioStore } from '@ng-mf/data-access-user';
import { JSONResponse } from '../../service/servicios-extraordinarios.service';
import { PasoTresComponent } from './paso-tres.component';
import { ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;
  let routerMock: jest.Mocked<Router>;
  let tramiteFolioServiceMock: jest.Mocked<TramiteFolioService>;
  let tramiteStoreMock: jest.Mocked<TramiteFolioStore>;
  let toastrServiceMock: Partial<ToastrService>;

  beforeEach(async () => {
    routerMock = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    tramiteFolioServiceMock = {
      obtenerTramite: jest.fn(),
    } as unknown as jest.Mocked<TramiteFolioService>;

    tramiteStoreMock = {
      establecerTramite: jest.fn(),
    } as unknown as jest.Mocked<TramiteFolioStore>;

    toastrServiceMock = {
      success: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
      warning: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [PasoTresComponent],
      imports: [FirmaElectronicaComponent,HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: TramiteFolioService, useValue: tramiteFolioServiceMock },
        { provide: TramiteFolioStore, useValue: tramiteStoreMock },
        { provide: ToastrService, useValue: toastrServiceMock }, // ✅ mock ToastrService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should handle obtieneFirma successfully', () => {
    const mockTramite = {
      id: 19,
      descripcion: 'Test Tramite',
      codigo: 'ABC123',
      data: { id: 19, descripcion: 'Test Tramite' }
    };
    tramiteFolioServiceMock.obtenerTramite.mockReturnValue(of(mockTramite as unknown as JSONResponse));

    component.obtieneFirma('mockFirma');

    expect(tramiteFolioServiceMock.obtenerTramite).toHaveBeenCalledWith(19);
    expect(tramiteStoreMock.establecerTramite).toHaveBeenCalledWith(mockTramite.data, 'mockFirma');
    expect(routerMock.navigate).toHaveBeenCalledWith(['servicios-extraordinarios/acuse']);
  });

  it('should handle error in obtieneFirma', () => {
    tramiteFolioServiceMock.obtenerTramite.mockReturnValue(throwError(() => new Error('Error')));

    component.obtieneFirma('mockFirma');

    expect(tramiteFolioServiceMock.obtenerTramite).toHaveBeenCalledWith(19);
    expect(tramiteStoreMock.establecerTramite).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});
