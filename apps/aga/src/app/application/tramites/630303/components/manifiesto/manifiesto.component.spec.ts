import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';

import { ManifiestoComponent } from './manifiesto.component';
import { Tramite630303Store } from '../../estados/tramite630303.store';
import { Tramite630303Query } from '../../estados/tramite630303.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

describe('ManifiestoComponent', () => {
  let componente: ManifiestoComponent;
  let fixture: ComponentFixture<ManifiestoComponent>;
  let mockTramite630303Store: jest.Mocked<Tramite630303Store>;
  let mockTramite630303Query: jest.Mocked<Tramite630303Query>;
  let mockConsultaioQuery: jest.Mocked<ConsultaioQuery>;

  let subjectEstadoTramite: BehaviorSubject<any>;
  let subjectEstadoConsulta: BehaviorSubject<any>;

  const datosTramiteSimulados = {
    declaracion: 'Declaración de prueba para manifiesto'
  };

  const datosConsultaSimulados = { readonly: false };

  beforeEach(async () => {
    subjectEstadoTramite = new BehaviorSubject(datosTramiteSimulados);
    subjectEstadoConsulta = new BehaviorSubject(datosConsultaSimulados);

    mockTramite630303Store = {
      setTramite630303State: jest.fn()
    } as any;

    mockTramite630303Query = {
      selectTramite630303State$: subjectEstadoTramite.asObservable()
    } as any;

    mockConsultaioQuery = {
      selectConsultaioState$: subjectEstadoConsulta.asObservable()
    } as any;

    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule, ManifiestoComponent],
      providers: [
        FormBuilder,
        { provide: Tramite630303Store, useValue: mockTramite630303Store },
        { provide: Tramite630303Query, useValue: mockTramite630303Query },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ManifiestoComponent);
    componente = fixture.componentInstance;
    componente.estadoSeleccionado = datosTramiteSimulados;
  });

  afterEach(() => {
    subjectEstadoTramite.complete();
    subjectEstadoConsulta.complete();
  });

  it('should create the component', fakeAsync(() => {
    componente.ngOnInit();
    tick();
    fixture.detectChanges();
    expect(componente).toBeTruthy();
  }));

  describe('Readonly behavior after init', () => {
    it('should reflect readonly as false after state change', fakeAsync(() => {
      componente.ngOnInit();
      tick();
      fixture.detectChanges();

      subjectEstadoConsulta.next({ readonly: true });
      tick();
      subjectEstadoConsulta.next({ readonly: false });
      tick();
      fixture.detectChanges();

      expect(componente.esFormularioSoloLectura).toBe(false);
      expect(componente.manifiestoFormulario.enabled).toBe(true);
    }));
  });

  describe('Form initialization', () => {
    beforeEach(fakeAsync(() => {
      componente.ngOnInit();
      tick();
      fixture.detectChanges();
    }));

    it('should init form with state value', () => {
      expect(componente.manifiestoFormulario.get('declaracion')?.value)
        .toBe(datosTramiteSimulados.declaracion);
    });

    it('should apply required validator', () => {
      const control = componente.manifiestoFormulario.get('declaracion');
      control?.setValue('');
      expect(control?.hasError('required')).toBe(true);
    });
  });

  describe('Store interaction', () => {
    beforeEach(fakeAsync(() => {
      componente.ngOnInit();
      tick();
      fixture.detectChanges();
    }));

    it('should update store value on setValorStore()', () => {
      const newVal = 'New text';
      componente.manifiestoFormulario.patchValue({ declaracion: newVal });
      componente.setValorStore(componente.manifiestoFormulario, 'declaracion');
      expect(mockTramite630303Store.setTramite630303State).toHaveBeenCalledWith('declaracion', newVal);
    });

    it('should handle removed control safely', () => {
      componente.manifiestoFormulario.removeControl('declaracion');
      expect(() => componente.setValorStore(componente.manifiestoFormulario, 'declaracion')).not.toThrow();
    });
  });
});
