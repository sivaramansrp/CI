import { TestBed } from '@angular/core/testing';
import { PasotresComponent } from './paso-tres.component';
import { Router } from '@angular/router';
import { ServiciosPantallaService } from '@libs/shared/data-access-user/src/core/services/31601/servicios-pantalla.service';
import { TramiteCofeprisStore } from '../../../../estados/tramite.store';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PasotresComponent', () => {
  let component: PasotresComponent;
  let router: jest.Mocked<Router>;
  let servicios: jest.Mocked<ServiciosPantallaService>;
  let tramiteStore: jest.Mocked<TramiteCofeprisStore>;

  beforeEach(() => {
    router = { navigate: jest.fn() } as any;
    servicios = { obtenerTramite: jest.fn() } as any;
    tramiteStore = { establecerTramite: jest.fn() } as any;

    TestBed.configureTestingModule({
      declarations: [PasotresComponent],
      providers: [
        { provide: Router, useValue: router },
        { provide: ServiciosPantallaService, useValue: servicios },
        { provide: TramiteCofeprisStore, useValue: tramiteStore }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    const fixture = TestBed.createComponent(PasotresComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe llamar a obtenerTramite y navegar si la firma es válida', () => {
    const tramiteMock = { id: 1, descripcion: 'desc', codigo: 'code', data: JSON.stringify({ id: 1 }) };
    servicios.obtenerTramite.mockReturnValue(of(tramiteMock));
    const firma = 'FIRMA_VALIDA';

    component.obtieneFirma(firma);

    expect(servicios.obtenerTramite).toHaveBeenCalledWith(19);
    expect(tramiteStore.establecerTramite).toHaveBeenCalledWith(tramiteMock.data, firma);
    expect(router.navigate).toHaveBeenCalledWith(['servicios-extraordinarios/acuse']);
  });

  it('no debe llamar a obtenerTramite si la firma es vacía', () => {
    component.obtieneFirma('');
    expect(servicios.obtenerTramite).not.toHaveBeenCalled();
    expect(tramiteStore.establecerTramite).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('debe limpiar destroyed$ al destruir el componente', () => {
    (component as any).destroyed$ = { next: jest.fn(), complete: jest.fn() };
    component.ngOnDestroy();
    expect((component as any).destroyed$.next).toHaveBeenCalled();
    expect((component as any).destroyed$.complete).toHaveBeenCalled();
  });

  it('debe permitir múltiples llamadas a obtieneFirma con firmas distintas', () => {
    const tramiteMock = { id: 3, descripcion: 'desc', codigo: 'code', data: JSON.stringify({ id: 3 }) };
    servicios.obtenerTramite.mockReturnValue(of(tramiteMock));
    component.obtieneFirma('FIRMA_1');
    component.obtieneFirma('FIRMA_2');
    expect(servicios.obtenerTramite).toHaveBeenCalledTimes(2);
    expect(tramiteStore.establecerTramite).toHaveBeenCalledTimes(2);
    expect(router.navigate).toHaveBeenCalledTimes(2);
    expect(tramiteStore.establecerTramite).toHaveBeenNthCalledWith(1, tramiteMock.data, 'FIRMA_1');
    expect(tramiteStore.establecerTramite).toHaveBeenNthCalledWith(2, tramiteMock.data, 'FIRMA_2');
  });

  it('debe no hacer nada si obtieneFirma recibe un string solo con espacios', () => {
    component.obtieneFirma('   ');
    expect(servicios.obtenerTramite).not.toHaveBeenCalled();
    expect(tramiteStore.establecerTramite).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('debe no hacer nada si obtieneFirma recibe un objeto no string', () => {
    servicios.obtenerTramite.mockReturnValue(of({ id: 0, descripcion: '', codigo: '', data: '{}' }));
    component.obtieneFirma({} as any);
    expect(servicios.obtenerTramite).not.toHaveBeenCalled();
    expect(tramiteStore.establecerTramite).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('debe no hacer nada si obtieneFirma recibe null o undefined', () => {
    component.obtieneFirma(null as any);
    component.obtieneFirma(undefined as any);
    expect(servicios.obtenerTramite).not.toHaveBeenCalled();
    expect(tramiteStore.establecerTramite).not.toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });})