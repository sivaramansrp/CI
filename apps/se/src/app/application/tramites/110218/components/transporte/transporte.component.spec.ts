import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransporteComponent } from './transporte.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Tramite110218Store } from '../../estados/tramites/tramite110218.store';
import { Tramite110218Query } from '../../estados/queries/tramite110218.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('TransporteComponent', () => {
  let component: TransporteComponent;
  let fixture: ComponentFixture<TransporteComponent>;
  let mockStore: any;
  let mockQuery: any;
  let mockConsultaioQuery: any;

  beforeEach(async () => {
    mockStore = {
      setTramite110218State: jest.fn()
    };
    mockQuery = {
      selectTramite110218State$: of({
        puertodeEmbarque: 'Yokohama',
        puertodeDesembarque: 'Manzanillo',
        puertodeTransito: 'Honolulu',
        nombredelaEmbarcacion: 'Nippon Maru',
        numerodeVuelo: '12345'
      })
    };
    mockConsultaioQuery = {
      selectConsultaioState$: of({ readonly: false })
    };

    await TestBed.configureTestingModule({
      imports: [TransporteComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Tramite110218Store, useValue: mockStore },
        { provide: Tramite110218Query, useValue: mockQuery },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with values from estadoSeleccionado', () => {
    component.estadoSeleccionado = {
      puertodeEmbarque: 'Kobe',
      puertodeDesembarque: 'Lázaro Cárdenas',
      puertodeTransito: 'San Diego',
      nombredelaEmbarcacion: 'Yamato',
      numerodeVuelo: '67890'
    } as any;
    component.inicializarFormulario();
    expect(component.detallestransporte.get('puertodeEmbarque')?.value).toBe('Kobe');
    expect(component.detallestransporte.get('puertodeDesembarque')?.value).toBe('Lázaro Cárdenas');
    expect(component.detallestransporte.get('puertodeTransito')?.value).toBe('San Diego');
    expect(component.detallestransporte.get('nombredelaEmbarcacion')?.value).toBe('Yamato');
    expect(component.detallestransporte.get('numerodeVuelo')?.value).toBe('67890');
  });

  it('should enable the form if esSoloLectura is false', () => {
    component.inicializarFormulario();
    component.esSoloLectura = false;
    component.habilitarDeshabilitarFormulario();
    expect(component.detallestransporte.enabled).toBe(true);
  });

  it('should disable the form if esSoloLectura is true', () => {
    component.inicializarFormulario();
    component.esSoloLectura = true;
    component.habilitarDeshabilitarFormulario();
    expect(component.detallestransporte.disabled).toBe(true);
  });

  it('should update store with setValorStore', () => {
    component.inicializarFormulario();
    component.detallestransporte.get('puertodeEmbarque')?.setValue('Nagoya');
    component.setValorStore(component.detallestransporte, 'puertodeEmbarque');
    expect(mockStore.setTramite110218State).toHaveBeenCalledWith({ puertodeEmbarque: 'Nagoya' });
  });

  it('should update estadoSeleccionado on getValorStore', () => {
    component.getValorStore();
    expect(component.estadoSeleccionado).toEqual(expect.objectContaining({
      puertodeEmbarque: 'Yokohama',
      puertodeDesembarque: 'Manzanillo'
    }));
  });

  it('should clean up destroyed$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});