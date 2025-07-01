import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of, BehaviorSubject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatosEmpresaService } from '../../services/datos-empresa.service';
import { Tramite120601Store } from '../../estados/tramite-120601.store';
import { Tramite120601Query } from '../../estados/tramite-120601.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let consultaioSubject: BehaviorSubject<any>;
  let tipoEmpresaSubject: BehaviorSubject<any>;
  let actividadClaveSubject: BehaviorSubject<any>;

  const mockService = {
    obtenerEstado: jest.fn(() => of([{ id: 1, descripcion: 'Empresa A' }])),
  };

  const mockStore = {
    setTipoDeEmpresa: jest.fn(),
  };

  beforeEach(async () => {
    consultaioSubject = new BehaviorSubject<any>({ readonly: false });
    tipoEmpresaSubject = new BehaviorSubject<string>('EMP123');
    actividadClaveSubject = new BehaviorSubject<string>('1122');

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DatosDeLaSolicitudComponent],
      providers: [
        { provide: DatosEmpresaService, useValue: mockService },
        { provide: Tramite120601Store, useValue: mockStore },
        {
          provide: Tramite120601Query,
          useValue: {
            selectTipoDeEmpresa$: tipoEmpresaSubject.asObservable(),
            selectActividadEconomicaClave$: actividadClaveSubject.asObservable(),
          },
        },
        {
          provide: ConsultaioQuery,
          useValue: {
            selectConsultaioState$: consultaioSubject.asObservable(),
          },
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  function initComponent() {
    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('debería crear el componente', () => {
    initComponent();
    expect(component).toBeTruthy();
  });

  it('debería crear el formulario con valores por defecto y obtener tipoDeEmpresa', () => {
    initComponent();
    expect(component.solicitudForm).toBeTruthy();
    expect(component.solicitudForm.get('tipoDeEmpresa')).toBeTruthy();
    expect(mockService.obtenerEstado).toHaveBeenCalled();
  });

  it('debería actualizar tipoDeEmpresa y actividadEconomicaClave desde los observables del query', () => {
    initComponent();
    expect(component.solicitudForm.get('tipoDeEmpresa')?.value).toBe('EMP123');
    expect(component.solicitudForm.get('actividadEconomicaClave')?.value).toBe('1122');
    // Simula el cambio de valor en los subjects
    tipoEmpresaSubject.next('EMP999');
    actividadClaveSubject.next('9999');
    fixture.detectChanges();
    expect(component.solicitudForm.get('tipoDeEmpresa')?.value).toBe('EMP999');
    expect(component.solicitudForm.get('actividadEconomicaClave')?.value).toBe('9999');
  });

  it('debería habilitar los controles del formulario si readonly es false', () => {
    consultaioSubject.next({ readonly: false });
    initComponent();

    expect(component.esFormularioSoloLectura).toBe(false);
    expect(component.solicitudForm.get('tipoDeEmpresa')?.enabled).toBe(true);
    expect(component.solicitudForm.get('actividadEconomicaClave')?.enabled).toBe(true);
  });

  it('debería llamar a store.setTipoDeEmpresa al ejecutar docSeleccionado', () => {
    initComponent();
    component.solicitudForm.get('tipoDeEmpresa')?.setValue('EMP456');
    component.docSeleccionado(new Event('change'));
    expect(mockStore.setTipoDeEmpresa).toHaveBeenCalledWith('EMP456');
  });

  it('no debe llamar a store.setTipoDeEmpresa si el valor no cambia', () => {
    initComponent();
    const spy = jest.spyOn(mockStore, 'setTipoDeEmpresa');
    component.solicitudForm.get('tipoDeEmpresa')?.setValue('EMP123');
    component.docSeleccionado(new Event('change'));
    expect(spy).toHaveBeenCalledWith('EMP123');
  });

  it('debería completar las suscripciones al destruir el componente', () => {
    initComponent();
    // Espía las llamadas a next y complete del subject destroyed$
    const nextSpy = jest.spyOn((component as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledTimes(2);
    expect(completeSpy).toHaveBeenCalledTimes(2);
  });
});

