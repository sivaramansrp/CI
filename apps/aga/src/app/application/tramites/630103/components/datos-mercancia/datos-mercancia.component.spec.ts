import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DatosMercanciaComponent } from './datos-mercancia.component';
import { Tramite630103Store } from '../../estados/tramite630103.store';
import { Tramite630103Query } from '../../estados/tramite630103.query';
import { of } from 'rxjs';

describe('DatosMercanciaComponent', () => {
  let componente: DatosMercanciaComponent;
  let fixture: ComponentFixture<DatosMercanciaComponent>;
  let storeMock: jest.Mocked<Tramite630103Store>;
  let queryMock: jest.Mocked<Tramite630103Query>;

  beforeEach(async () => {
    storeMock = {
      setTramite630103State: jest.fn(),
    } as unknown as jest.Mocked<Tramite630103Store>;

    queryMock = {
      selectTramite630103State$: of({
        campo: 'valor',
      }),
    } as unknown as jest.Mocked<Tramite630103Query>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DatosMercanciaComponent],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: Tramite630103Store, useValue: storeMock },
        { provide: Tramite630103Query, useValue: queryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosMercanciaComponent);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(componente).toBeTruthy();
  });

  it('debería inicializar el formulario en ngOnInit', () => {
    const inicializarFormularioSpy = jest.spyOn(componente, 'inicializarFormulario');
    const obtenerValorStoreSpy = jest.spyOn(componente, 'getValorStore');

    componente.ngOnInit();

    expect(inicializarFormularioSpy).toHaveBeenCalled();
    expect(obtenerValorStoreSpy).toHaveBeenCalled();
  });

  it('debería inicializar el formulario con valores predeterminados', () => {
    componente.inicializarFormulario();
    expect(componente.datosMercancia).toBeTruthy();
  });

  it('debería obtener el estado actual del store', () => {
    componente.getValorStore();
    expect(componente.estadoSeleccionado).toEqual({ campo: 'valor' });
  });

  it('debería actualizar el store cuando establecerCambioDeValor es llamado', () => {
    const eventoMock = { campo: 'campoPrueba', valor: 'valorPrueba' };

    componente.establecerCambioDeValor(eventoMock);

    expect(storeMock.setTramite630103State).toHaveBeenCalledWith('campoPrueba', 'valorPrueba');
  });

  it('debería limpiar las suscripciones al destruir el componente', () => {
    const destroyedSpy = jest.spyOn((componente as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((componente as any).destroyed$, 'complete');

    componente.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});