import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoTresComponent } from './paso-tres.component';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ServiciosPantallaService } from '@libs/shared/data-access-user/src/core/services/31601/servicios-pantalla.service';
import { TramiteAgaceStore } from '../../../../estados/tramite.store';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;
  let routerMock: jest.Mocked<Router>;
  let serviceMock: jest.Mocked<ServiciosPantallaService>;
  let storeMock: jest.Mocked<TramiteAgaceStore>;

  @Component({
    selector: 'firma-electronica',
    template: ''
  })
  class MockFirmaElectronicaComponent {
    @Input() tipo: string = '';
    @Output() firma = new EventEmitter<string>();
  }

  beforeEach(async () => {
    routerMock = {
      navigate: jest.fn()
    } as unknown as jest.Mocked<Router>;

    serviceMock = {
      obtenerTramite: jest.fn()
    } as unknown as jest.Mocked<ServiciosPantallaService>;

    storeMock = {
      establecerTramite: jest.fn()
    } as unknown as jest.Mocked<TramiteAgaceStore>;

    await TestBed.configureTestingModule({
      declarations: [PasoTresComponent, MockFirmaElectronicaComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ServiciosPantallaService, useValue: serviceMock },
        { provide: TramiteAgaceStore, useValue: storeMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  describe('obtieneFirma', () => {

    it('no debe ejecutar nada si la firma está vacía', () => {
      component.obtieneFirma('');
      expect(serviceMock.obtenerTramite).not.toHaveBeenCalled();
      expect(storeMock.establecerTramite).not.toHaveBeenCalled();
      expect(routerMock.navigate).not.toHaveBeenCalled();
    });

    it('debe manejar errores al obtener el trámite', () => {
      const error = new Error('Fallo del servicio');
      serviceMock.obtenerTramite.mockReturnValue(throwError(() => error));

      component.obtieneFirma('firma-valida');

      expect(serviceMock.obtenerTramite).toHaveBeenCalled();
    });
  });

  it('debería completar destroyed$ al llamar a ngOnDestroy', () => {
    const destroyed$ = (component as any).destroyed$;
    const completeSpy = jest.spyOn(destroyed$, 'complete');
    const nextSpy = jest.spyOn(destroyed$, 'next');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
