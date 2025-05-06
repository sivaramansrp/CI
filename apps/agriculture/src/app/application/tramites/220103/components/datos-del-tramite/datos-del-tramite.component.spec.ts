import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelTramiteComponent } from './datos-del-tramite.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Tramite220103Query } from '../../estados/queries/tramites220103.query';
import { Tramite220103Store } from '../../estados/tramites/tramites220103.store';
import { SanidadAcuicolaImportacionService } from '../../services/sanidad-acuicola-importacion.service';
import { Mercancia } from '../../modelos/sanidad-acuicola-importacion.model';

describe('DatosDelTramiteComponent', () => {
  let component: DatosDelTramiteComponent;
  let fixture: ComponentFixture<DatosDelTramiteComponent>;
  let MOCK_QUERY: jest.Mocked<Tramite220103Query>;
  let MOCK_STORE: jest.Mocked<Tramite220103Store>;
  let MOCK_SERVICE: jest.Mocked<SanidadAcuicolaImportacionService>;

  beforeEach(async () => {
    MOCK_QUERY = {
      selectTramite220103State$: of({
        Tablamercancia: [
          { id: 1, descripcion: 'Mercancía 1' },
          { id: 2, descripcion: 'Mercancía 2' },
        ],
      }),
    } as unknown as jest.Mocked<Tramite220103Query>;

    MOCK_STORE = {
      setTramite220103State: jest.fn(),
      agregarMercancia: jest.fn(),
      eliminarMercancia: jest.fn(),
    } as unknown as jest.Mocked<Tramite220103Store>;

    MOCK_SERVICE = {
      getMercancias: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Mercancía 1' }])),
    } as unknown as jest.Mocked<SanidadAcuicolaImportacionService>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,DatosDelTramiteComponent],
      providers: [
        FormBuilder,
        { provide: Tramite220103Query, useValue: MOCK_QUERY },
        { provide: Tramite220103Store, useValue: MOCK_STORE },
        { provide: SanidadAcuicolaImportacionService, useValue: MOCK_SERVICE },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el estado y los datos de la tabla en ngOnInit', () => {
    component.ngOnInit();

    expect(component.estadoSeleccionado).toEqual({
      Tablamercancia: [
        { id: 1, descripcion: 'Mercancía 1' },
        { id: 2, descripcion: 'Mercancía 2' },
      ],
    });
    expect(component.datosTabla).toEqual([
      { id: 1, descripcion: 'Mercancía 1' },
      { id: 2, descripcion: 'Mercancía 2' },
    ]);
  });

  it('debería obtener la descripción de la fracción arancelaria y actualizar el formulario y el estado', () => {
    component.getDescripcionFraccion();

    expect(component.datosMercanciaFormulario.value).toEqual({
      descripcionFraccion: 'Los demas',
      umt: 'kilogramo',
    });
    expect(MOCK_STORE.setTramite220103State).toHaveBeenCalledWith('descripcionFraccion', 'Los demas');
    expect(MOCK_STORE.setTramite220103State).toHaveBeenCalledWith('umt', 'kilogramo');
  });

  it('debería establecer un cambio de valor en el estado del trámite', () => {
    const MOCK_EVENT = { campo: 'fraccionArancelaria', valor: '123456' };
    component.establecerCambioDeValor(MOCK_EVENT);

    expect(MOCK_STORE.setTramite220103State).toHaveBeenCalledWith('fraccionArancelaria', '123456');
    expect(component.datosMercanciaFormulario.value.descripcionFraccion).toBe('Los demas');
  });

  it('debería obtener las mercancías seleccionadas en la tabla', () => {
    const MOCK_MERCANCIAS: Mercancia[] = [{
      id: "1", descripcion: 'Mercancía 1',
      fraccionArancelaria: '',
      descripcionFraccion: '',
      cantidadUMT: '',
      umt: '',
      cantidadUMC: '',
      umc: '',
      nombreComun: '',
      nombreCientifico: '',
      faseDesarrollo: '',
      uso: '',
      otroUso: '',
      origen: '',
      paisOrigen: '',
      paisProcedencia: ''
    }];
    component.getMercanciasSeleccionadas(MOCK_MERCANCIAS);

    expect(component.mercanciasSeleccionadas).toEqual(MOCK_MERCANCIAS);
  });

  it('debería agregar una mercancía al estado del trámite', () => {
    component.datosMercanciaFormulario.setValue({ id: null, descripcion: 'Nueva Mercancía' });
    component.mercanciasSeleccionadas = [{
      id: "1", descripcion: 'Mercancía 1',
      fraccionArancelaria: '',
      descripcionFraccion: '',
      cantidadUMT: '',
      umt: '',
      cantidadUMC: '',
      umc: '',
      nombreComun: '',
      nombreCientifico: '',
      faseDesarrollo: '',
      uso: '',
      otroUso: '',
      origen: '',
      paisOrigen: '',
      paisProcedencia: ''
    }];

    component.agregarMercancia();

    expect(MOCK_SERVICE.getMercancias).toHaveBeenCalled();
    expect(MOCK_STORE.setTramite220103State).toHaveBeenCalledWith('Tablamercancia', [
      { id: 1, descripcion: 'Mercancía 1' },
    ]);
    expect(component.datosMercanciaFormulario.value).toEqual({});
    expect(component.mercanciasSeleccionadas).toEqual([]);
  });

  it('debería eliminar una mercancía seleccionada del estado del trámite', () => {
    component.mercanciasSeleccionadas = [{
      id: "1", descripcion: 'Mercancía 1',
      fraccionArancelaria: '',
      descripcionFraccion: '',
      cantidadUMT: '',
      umt: '',
      cantidadUMC: '',
      umc: '',
      nombreComun: '',
      nombreCientifico: '',
      faseDesarrollo: '',
      uso: '',
      otroUso: '',
      origen: '',
      paisOrigen: '',
      paisProcedencia: ''
    }];

    component.eliminarMercancia();

    expect(MOCK_STORE.eliminarMercancia).toHaveBeenCalledWith(1);
    expect(component.mercanciasSeleccionadas).toEqual([]);
  });

  it('debería modificar una mercancía seleccionada en el formulario', () => {
    component.mercanciasSeleccionadas = [{
      id: "1", descripcion: 'Mercancía 1',
      fraccionArancelaria: '',
      descripcionFraccion: '',
      cantidadUMT: '',
      umt: '',
      cantidadUMC: '',
      umc: '',
      nombreComun: '',
      nombreCientifico: '',
      faseDesarrollo: '',
      uso: '',
      otroUso: '',
      origen: '',
      paisOrigen: '',
      paisProcedencia: ''
    }];

    component.mercanciaModificar();

    expect(component.datosMercanciaFormulario.value).toEqual({ id: 1, descripcion: 'Mercancía 1' });
  });

  it('debería limpiar las suscripciones en ngOnDestroy', () => {
    const DESTROY_NOTIFIER_SPY = jest.spyOn(component['destroyNotifier$'], 'next');
    const DESTROY_NOTIFIER_COMPLETE_SPY = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(DESTROY_NOTIFIER_SPY).toHaveBeenCalled();
    expect(DESTROY_NOTIFIER_COMPLETE_SPY).toHaveBeenCalled();
  });
});