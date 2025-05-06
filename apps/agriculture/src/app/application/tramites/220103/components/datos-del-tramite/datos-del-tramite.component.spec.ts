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
  let mockQuery: jest.Mocked<Tramite220103Query>;
  let mockStore: jest.Mocked<Tramite220103Store>;
  let mockService: jest.Mocked<SanidadAcuicolaImportacionService>;

  beforeEach(async () => {
    mockQuery = {
      selectTramite220103State$: of({
        Tablamercancia: [
          { id: 1, descripcion: 'Mercancía 1' },
          { id: 2, descripcion: 'Mercancía 2' },
        ],
      }),
    } as unknown as jest.Mocked<Tramite220103Query>;

    mockStore = {
      setTramite220103State: jest.fn(),
      agregarMercancia: jest.fn(),
      eliminarMercancia: jest.fn(),
    } as unknown as jest.Mocked<Tramite220103Store>;

    mockService = {
      getMercancias: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Mercancía 1' }])),
    } as unknown as jest.Mocked<SanidadAcuicolaImportacionService>;

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule,DatosDelTramiteComponent],
      providers: [
        FormBuilder,
        { provide: Tramite220103Query, useValue: mockQuery },
        { provide: Tramite220103Store, useValue: mockStore },
        { provide: SanidadAcuicolaImportacionService, useValue: mockService },
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
    component.obtenerDescripcionFraccion();

    expect(component.formularioDatosMercancia.value).toEqual({
      descripcionFraccion: 'Los demás',
      umt: 'kilogramo',
    });
    expect(mockStore.setTramite220103State).toHaveBeenCalledWith('descripcionFraccion', 'Los demás');
    expect(mockStore.setTramite220103State).toHaveBeenCalledWith('umt', 'kilogramo');
  });

  it('debería establecer un cambio de valor en el estado del trámite', () => {
    const mockEvent = { campo: 'fraccionArancelaria', valor: '123456' };
    component.establecerCambioDeValor(mockEvent);

    expect(mockStore.setTramite220103State).toHaveBeenCalledWith('fraccionArancelaria', '123456');
  });

  it('debería obtener las mercancías seleccionadas en la tabla', () => {
    const mockMercancias: Mercancia[] = [{
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
    component.obtenerMercanciasSeleccionadas(mockMercancias);

    expect(component.mercanciasSeleccionadas).toEqual(mockMercancias);
  });

  it('debería agregar una mercancía al estado del trámite', () => {
    component.formularioDatosMercancia.setValue({ descripcionFraccion: 'Nueva Mercancía', umt: 'kilogramo' });
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

    expect(mockStore.setTramite220103State).toHaveBeenCalledWith({
      descripcionFraccion: 'Nueva Mercancía',
      umt: 'kilogramo',
      id: 1,
    });
    expect(component.formularioDatosMercancia.value).toEqual({});
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

    expect(mockStore.eliminarMercancia).toHaveBeenCalledWith(1);
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

    component.modificarMercancia();

    expect(component.formularioDatosMercancia.value).toEqual({ id: 1, descripcion: 'Mercancía 1' });
  });

  it('debería obtener mercancías desde el servicio y actualizar el estado', () => {
    component.obtenerMercancia();

    expect(mockService.getMercancias).toHaveBeenCalled();
    expect(mockStore.setTramite220103State).toHaveBeenCalledWith('Tablamercancia', [
      { id: 1, descripcion: 'Mercancía 1' },
    ]);
  });

  it('debería limpiar las suscripciones en ngOnDestroy', () => {
    const destroyNotifierSpy = jest.spyOn(component['notificadorDestruccion$'], 'next');
    const destroyNotifierCompleteSpy = jest.spyOn(component['notificadorDestruccion$'], 'complete');

    component.ngOnDestroy();

    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
  });
});