import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { PasoTresComponent } from './PasoTres.component';
import { TramiteFolioService } from '@libs/shared/data-access-user/src';
import { TramiteAgriState } from '../../../../estados/tramites/tramite220503.store';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;
  let routerMock: jest.Mocked<Router>;
  let tramiteFolioServiceMock: jest.Mocked<TramiteFolioService>;
  let tramiteStoreMock: jest.Mocked<TramiteAgriState>;

  beforeEach(async () => {
    routerMock = {
      navigate: jest.fn()
    } as any;

    tramiteFolioServiceMock = {
      obtenerTramite: jest.fn()
    } as any;

    tramiteStoreMock = {
      establecerTramite: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [
        PasoTresComponent,
        FirmaElectronicaComponent, 
        ToastrModule.forRoot(), 
        HttpClientTestingModule
      ],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: TramiteFolioService, useValue: tramiteFolioServiceMock },
        { provide: TramiteAgriState, useValue: tramiteStoreMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize destroy$ subject', () => {
    expect(component['destroy$']).toBeDefined();
  });

  it('should set tipoPersona when obtenerTipoPersona is called', () => {
    const tipo = 5;
    component.obtenerTipoPersona(tipo);
    expect(component.tipoPersona).toBe(tipo);
  });

  it('should handle obtieneFirma with valid signature', (done) => {
    const mockFirma = 'test-signature';
    const mockTramiteResponse = {
      id: 1,
      descripcion: 'Test Tramite',
      codigo: 'TEST_CODE',
      data: { id: 1, nombre: 'Test Tramite' }
    };

    tramiteFolioServiceMock.obtenerTramite.mockReturnValue(of(mockTramiteResponse as any));

    component.obtieneFirma(mockFirma);

    // Use setTimeout to wait for async operations to complete
    setTimeout(() => {
      expect(tramiteFolioServiceMock.obtenerTramite).toHaveBeenCalledWith(19);
      expect(tramiteStoreMock.establecerTramite).toHaveBeenCalledWith(mockTramiteResponse.data, mockFirma);
      expect(routerMock.navigate).toHaveBeenCalledWith(['servicios-extraordinarios/acuse']);
      done();
    }, 0);
  });

  it('should not process when firma is empty', () => {
    component.obtieneFirma('');

    expect(tramiteFolioServiceMock.obtenerTramite).not.toHaveBeenCalled();
    expect(tramiteStoreMock.establecerTramite).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should not process when firma is null', () => {
    component.obtieneFirma(null as any);

    expect(tramiteFolioServiceMock.obtenerTramite).not.toHaveBeenCalled();
    expect(tramiteStoreMock.establecerTramite).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should handle error in obtenerTramite', (done) => {
    const mockFirma = 'test-signature';
    const mockError = new Error('Test error');

    tramiteFolioServiceMock.obtenerTramite.mockReturnValue(throwError(() => mockError));

    component.obtieneFirma(mockFirma);

    // Use setTimeout to wait for async operations to complete
    setTimeout(() => {
      expect(tramiteFolioServiceMock.obtenerTramite).toHaveBeenCalledWith(19);
      expect(tramiteStoreMock.establecerTramite).not.toHaveBeenCalled();
      expect(routerMock.navigate).not.toHaveBeenCalled();
      done();
    }, 0);
  });


  it('should cleanup on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should have correct initial tipoPersona value', () => {
    expect(component.tipoPersona).toBeUndefined();
  });
});
