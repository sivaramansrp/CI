import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';

import { TransporteComponent } from './transporte.component';
import { Tramite110218Store } from '../../estados/tramites/tramite110218.store';
import { Tramite110218Query } from '../../estados/queries/tramite110218.query';

describe('TransporteComponent', () => {
  let component: TransporteComponent;
  let fixture: ComponentFixture<TransporteComponent>;
  let storeMock: jest.Mocked<Tramite110218Store>;
  let queryMock: jest.Mocked<Tramite110218Query>;
  let destroyed$: Subject<void>;

  beforeEach(async () => {
    storeMock = {
      setTramite110218State: jest.fn(),
    } as unknown as jest.Mocked<Tramite110218Store>;

    queryMock = {
      selectTramite110218State$: of({
        puertodeEmbarque: 'Puerto A',
        puertodeDesembarque: 'Puerto B',
        puertodeTransito: 'Puerto C',
        nombredelaEmbarcacion: 'Embarcación 1',
        numerodeVuelo: '12345',
      }),
    } as unknown as jest.Mocked<Tramite110218Query>;

    destroyed$ = new Subject<void>();

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TransporteComponent],
      declarations: [],
      providers: [
        { provide: Tramite110218Store, useValue: storeMock },
        { provide: Tramite110218Query, useValue: queryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    destroyed$.next();
    destroyed$.complete();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con valores predeterminados', () => {
    component.inicializarFormulario();
    expect(component.detallestransporte.value).toEqual({
      puertodeEmbarque: 'Puerto A',
      puertodeDesembarque: 'Puerto B',
      puertodeTransito: 'Puerto C',
      nombredelaEmbarcacion: 'Embarcación 1',
      numerodeVuelo: '12345',
    });
  });

  it('debería actualizar un valor en el store', () => {
    component.detallestransporte = component.formBuilder.group({
      puertodeEmbarque: ['Nuevo Puerto'],
    });

    component.setValorStore(component.detallestransporte, 'puertodeEmbarque');

    expect(storeMock.setTramite110218State).toHaveBeenCalledWith({
      puertodeEmbarque: 'Nuevo Puerto',
    });
  });

  it('debería obtener el estado actual del trámite desde el store', () => {
    component.getValorStore();

    expect(component.estadoSeleccionado).toEqual({
      puertodeEmbarque: 'Puerto A',
      puertodeDesembarque: 'Puerto B',
      puertodeTransito: 'Puerto C',
      nombredelaEmbarcacion: 'Embarcación 1',
      numerodeVuelo: '12345',
    });
  });

  it('debería limpiar las suscripciones al destruir el componente', () => {
    const destroyedSubject = new Subject<void>();
    component['destroyed$'] = destroyedSubject;
    const destroyedSpy = jest.spyOn(destroyedSubject, 'next');
    const completeSpy = jest.spyOn(destroyedSubject, 'complete');

    component.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});