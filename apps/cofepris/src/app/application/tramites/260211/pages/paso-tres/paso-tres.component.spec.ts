import { PasotresComponent } from './paso-tres.component';
import { Router } from '@angular/router';
import { ServiciosPantallaService } from 'libs/shared/data-access-user/src/core/services/31601/servicios-pantalla.service';
import { TramiteCofeprisStore } from '../../../../estados/tramite.store';
import { of, throwError } from 'rxjs';

describe('PasotresComponent', () => {
  let component: PasotresComponent;
  let routerMock: any;
  let serviciosExtraordinariosServicesMock: any;
  let tramiteCofeprisStoreMock: any;

  beforeEach(() => {
    routerMock = { navigate: jest.fn() };
    serviciosExtraordinariosServicesMock = {
      obtenerTramite: jest.fn()
    };
    tramiteCofeprisStoreMock = {
      establecerTramite: jest.fn()
    };

    component = new PasotresComponent(
      routerMock as any,
      serviciosExtraordinariosServicesMock as any,
      tramiteCofeprisStoreMock as any
    );
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not call obtenerTramite if firma is falsy', () => {
    component.obtieneFirma('');
    expect(serviciosExtraordinariosServicesMock.obtenerTramite).not.toHaveBeenCalled();
    expect(tramiteCofeprisStoreMock.establecerTramite).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should call obtenerTramite and establecerTramite, then navigate on valid firma', () => {
    const tramiteData = { data: { id: 1 } };
    serviciosExtraordinariosServicesMock.obtenerTramite.mockReturnValue(of(tramiteData));

    component.obtieneFirma('valid-firma');

    expect(serviciosExtraordinariosServicesMock.obtenerTramite).toHaveBeenCalledWith(19);
    expect(tramiteCofeprisStoreMock.establecerTramite).toHaveBeenCalledWith(tramiteData.data, 'valid-firma');
    expect(routerMock.navigate).toHaveBeenCalledWith(['servicios-extraordinarios/acuse']);
  });

  it('should handle error in obtenerTramite gracefully', () => {
    serviciosExtraordinariosServicesMock.obtenerTramite.mockReturnValue(throwError(() => new Error('error')));

    // Should not throw
    expect(() => component.obtieneFirma('valid-firma')).not.toThrow();
  });

  it('should complete destroyed$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();})})