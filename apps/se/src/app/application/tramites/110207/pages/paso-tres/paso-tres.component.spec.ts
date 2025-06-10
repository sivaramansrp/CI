import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoTresComponent } from './paso-tres.component';
import { Router } from '@angular/router';
import { TramiteFolioService } from '@ng-mf/data-access-user';
import { TramiteStore } from '../../../../estados/tramite.store';
import { of, throwError } from 'rxjs';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;
  let routerMock: any;
  let tramiteFolioServiceMock: any;
  let tramiteStoreMock: any;

  beforeEach(async () => {
    routerMock = { navigate: jest.fn() };
    tramiteFolioServiceMock = {
      obtenerTramite: jest.fn()
    };
    tramiteStoreMock = {
      establecerTramite: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [PasoTresComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: TramiteFolioService, useValue: tramiteFolioServiceMock },
        { provide: TramiteStore, useValue: tramiteStoreMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set tipoPersona in obtenerTipoPersona', () => {
    component.obtenerTipoPersona(2);
    expect(component.tipoPersona).toBe(2);
  });

  it('should call TramiteFolioService, TramiteStore, and Router in obtieneFirma when FIRMA is present', () => {
    const tramiteData = { data: { folio: '123' } };
    tramiteFolioServiceMock.obtenerTramite.mockReturnValue(of(tramiteData));
    component.obtieneFirma('FIRMA123');
    expect(tramiteFolioServiceMock.obtenerTramite).toHaveBeenCalledWith(19);
    expect(tramiteStoreMock.establecerTramite).toHaveBeenCalledWith(tramiteData.data, 'FIRMA123');
    expect(routerMock.navigate).toHaveBeenCalledWith(['pago/reportes/acuse']);
  });

  it('should handle error in obtieneFirma observable', () => {
    tramiteFolioServiceMock.obtenerTramite.mockReturnValue(throwError(() => new Error('fail')));
    expect(() => component.obtieneFirma('FIRMA123')).not.toThrow();
  });

  it('should not call TramiteFolioService if FIRMA is falsy', () => {
    component.obtieneFirma('');
    expect(tramiteFolioServiceMock.obtenerTramite).not.toHaveBeenCalled();
  });

  it('should complete destroyed$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });
});