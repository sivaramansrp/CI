import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { PasoTresComponent } from './paso-tres.component';
import { RegistrosDeComercioExteriorService } from '../../services/registros-de-comercio-exterior.service';
import { TramiteAgaceState } from '../../../../estados/tramite.store';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;
  let certificadosSvcMock: any;
  let routerMock: any;
  let tramiteStoreMock: any;

  beforeEach(async () => {
    certificadosSvcMock = {
      obtenerTramite: jest.fn(),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    tramiteStoreMock = {
      establecerTramite: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [PasoTresComponent],
      providers: [
        { provide: RegistrosDeComercioExteriorService, useValue: certificadosSvcMock },
        { provide: Router, useValue: routerMock },
        { provide: 'TramiteAgaceState', useValue: tramiteStoreMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call obtenerTramite and navigate on valid firma', () => {
    const mockTramite = { data: { id: 1 } };
    certificadosSvcMock.obtenerTramite.mockReturnValue(of(mockTramite));

    component.obtieneFirma('valid-firma');

    expect(certificadosSvcMock.obtenerTramite).toHaveBeenCalledWith(19);
    expect(tramiteStoreMock.establecerTramite).toHaveBeenCalledWith(mockTramite.data, 'valid-firma');
    expect(routerMock.navigate).toHaveBeenCalledWith(['servicios-extraordinarios/acuse']);
  });

  it('should handle error when obtenerTramite fails', () => {
    certificadosSvcMock.obtenerTramite.mockReturnValue(throwError(() => new Error('Error')));

    component.obtieneFirma('valid-firma');

    expect(certificadosSvcMock.obtenerTramite).toHaveBeenCalledWith(19);
    expect(tramiteStoreMock.establecerTramite).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should not call obtenerTramite if firma is invalid', () => {
    component.obtieneFirma('');

    expect(certificadosSvcMock.obtenerTramite).not.toHaveBeenCalled();
    expect(tramiteStoreMock.establecerTramite).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should complete destroyed$ on ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn((component as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');

    component.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
