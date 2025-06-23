import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { PasoDosComponent } from './paso-dos.component';
import { ServiciosPantallaService } from '@libs/shared/data-access-user/src/core/services/31601/servicios-pantalla.service';
import { TramiteStore } from '../../../../estados/tramite.store';
import {CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;
  let routerMock: any;
  let serviciosPantallaServiceMock: any;
  let tramiteStoreMock: any;

  beforeEach(async () => {
    routerMock = {
      navigate: jest.fn(),
    };

    serviciosPantallaServiceMock = {
      obtenerTramite: jest.fn(),
    };

    tramiteStoreMock = {
      establecerTramite: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [PasoDosComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ServiciosPantallaService, useValue: serviciosPantallaServiceMock },
        { provide: TramiteStore, useValue: tramiteStoreMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call obtenerTramite and navigate to acuse on valid signature', () => {
    const mockTramite = { data: { id: 1, name: 'Tramite Test' } };
    serviciosPantallaServiceMock.obtenerTramite.mockReturnValue(of(mockTramite));

    component.obtieneFirma('valid-signature');

    expect(serviciosPantallaServiceMock.obtenerTramite).toHaveBeenCalledWith(19);
    expect(tramiteStoreMock.establecerTramite).toHaveBeenCalledWith(mockTramite.data, 'valid-signature');
    expect(routerMock.navigate).toHaveBeenCalledWith(['servicios-extraordinarios/acuse']);
  });

  it('should handle error when obtenerTramite fails', () => {
    serviciosPantallaServiceMock.obtenerTramite.mockReturnValue(throwError(() => new Error('Error')));

    component.obtieneFirma('valid-signature');

    expect(serviciosPantallaServiceMock.obtenerTramite).toHaveBeenCalledWith(19);
    expect(tramiteStoreMock.establecerTramite).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should not call obtenerTramite if signature is invalid', () => {
    component.obtieneFirma('');

    expect(serviciosPantallaServiceMock.obtenerTramite).not.toHaveBeenCalled();
    expect(tramiteStoreMock.establecerTramite).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should complete destroyed$ on component destroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
