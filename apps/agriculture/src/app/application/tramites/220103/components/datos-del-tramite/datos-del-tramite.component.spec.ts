import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelTramiteComponent } from './datos-del-tramite.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SanidadAcuicolaImportacionService } from '../../services/sanidad-acuicola-importacion.service';
import { Tramite220103Store } from '../../estados/tramites/tramites220103.store';
import { Tramite220103Query } from '../../estados/queries/tramites220103.query';
import { of, throwError } from 'rxjs';
import { Modal } from 'bootstrap';

describe('DatosDelTramiteComponent', () => {
  let component: DatosDelTramiteComponent;
  let fixture: ComponentFixture<DatosDelTramiteComponent>;
  let SERVICIO_MOCK: jest.Mocked<SanidadAcuicolaImportacionService>;
  let STORE_MOCK: jest.Mocked<Tramite220103Store>;
  let QUERY_MOCK: jest.Mocked<Tramite220103Query>;

  beforeEach(async () => {
    SERVICIO_MOCK = {
      getAdunaDeIngreso: jest.fn().mockReturnValue(of([])),
      getMedioDeTransporte: jest.fn().mockReturnValue(of([])),
      getOrigen: jest.fn().mockReturnValue(of([])),
      getUmc: jest.fn().mockReturnValue(of([])),
      getUso: jest.fn().mockReturnValue(of([])),
      getPais: jest.fn().mockReturnValue(of([])),
      getMercancias: jest.fn().mockReturnValue(of([{ id: '1', descripcion: 'Mercancía 1' }])),
    } as unknown as jest.Mocked<SanidadAcuicolaImportacionService>;

    STORE_MOCK = {
      setTramite220103State: jest.fn(),
      eliminarMercancia: jest.fn(),
    } as unknown as jest.Mocked<Tramite220103Store>;

    QUERY_MOCK = {
      selectTramite220103State$: of({ tablaMercancia: [] }),
    } as unknown as jest.Mocked<Tramite220103Query>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DatosDelTramiteComponent],
      providers: [
        FormBuilder,
        { provide: SanidadAcuicolaImportacionService, useValue: SERVICIO_MOCK },
        { provide: Tramite220103Store, useValue: STORE_MOCK },
        { provide: Tramite220103Query, useValue: QUERY_MOCK },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el estado en ngOnInit', () => {
    const MOCK_ESTADO = {
      tablaMercancia: [{
        id: '1',
        descripcion: 'Mercancía 1',
        fraccionArancelaria: '1234',
        descripcionFraccion: 'Descripción',
        cantidadUMT: '10',
        umt: 'kg',
        cantidadUMC: '5',
        umc: 'unidad',
        nombreComun: 'Nombre común',
        nombreCientifico: 'Nombre científico',
        faseDesarrollo: 'Fase',
        uso: 'Uso',
        otroUso: '',
        origen: 'Origen',
        paisOrigen: 'México',
        paisProcedencia: 'EE.UU.',
      }],
    };
    QUERY_MOCK.selectTramite220103State$ = of(MOCK_ESTADO);

    component.ngOnInit();

    expect(component.datosTabla).toEqual(MOCK_ESTADO.tablaMercancia);
  });

  it('debe obtener las opciones de aduanas de ingreso', () => {
    component.obtenerAduanaDeIngreso();
    expect(SERVICIO_MOCK.getAdunaDeIngreso).toHaveBeenCalled();
  });

  it('debe obtener las opciones de medios de transporte', () => {
    component.obtenerMedioDeTransporte();
    expect(SERVICIO_MOCK.getMedioDeTransporte).toHaveBeenCalled();
  });

  it('debe obtener las opciones de origen', () => {
    component.obtenerOrigen();
    expect(SERVICIO_MOCK.getOrigen).toHaveBeenCalled();
  });

  it('debe obtener las opciones de UMC', () => {
    component.obtenerUmc();
    expect(SERVICIO_MOCK.getUmc).toHaveBeenCalled();
  });

  it('debe obtener las opciones de uso', () => {
    component.obtenerUso();
    expect(SERVICIO_MOCK.getUso).toHaveBeenCalled();
  });

  it('debe obtener las opciones de país', () => {
    component.obtenerPais();
    expect(SERVICIO_MOCK.getPais).toHaveBeenCalled();
  });

  it('debe agregar una mercancía al estado', () => {
    component.formularioDatosMercancia.setValue({
      descripcion: 'Mercancía 1',
      fraccionArancelaria: '1234',
      descripcionFraccion: 'Descripción',
      cantidadUMT: '10',
      umt: 'kg',
      cantidadUMC: '5',
      umc: 'unidad',
      nombreComun: 'Nombre común',
      nombreCientifico: 'Nombre científico',
      faseDesarrollo: 'Fase',
      uso: 'Uso',
      otroUso: '',
      origen: 'Origen',
      paisOrigen: 'México',
      paisProcedencia: 'EE.UU.',
    });

    jest.spyOn(component, 'postMercancia').mockImplementation();

    component.agregarMercancia();

    expect(component.postMercancia).toHaveBeenCalled();
  });

  it('debe eliminar una mercancía del estado', () => {
    component.mercanciasSeleccionadas = [{ id: '1', descripcion: 'Mercancía 1' } as any];

    component.eliminarMercancia();

    expect(STORE_MOCK.eliminarMercancia).toHaveBeenCalledWith('1');
    expect(component.mercanciasSeleccionadas).toEqual([]);
  });

  it('debe modificar una mercancía seleccionada', () => {
    component.mercanciasSeleccionadas = [{ id: '1', descripcion: 'Mercancía 1' } as any];

    component.modificarMercancia();

    expect(component.esModificarMercancia).toBe(true);
    expect(component.formularioDatosMercancia.value.descripcion).toBe('Mercancía 1');
  });

  it('debe cerrar el modal de mercancías', () => {
    const MOCK_MODAL_INSTANCE = { hide: jest.fn() } as unknown as Modal;
    component.elementoModal = { nativeElement: {} } as any;
    jest.spyOn(Modal, 'getInstance').mockReturnValue(MOCK_MODAL_INSTANCE);

    component.cerrarModal();

    expect(MOCK_MODAL_INSTANCE.hide).toHaveBeenCalled();
  });

  it('debe limpiar las suscripciones al destruir el componente', () => {
    const SPY = jest.spyOn(component['notificadorDestruccion$'], 'next');
    const SPY_COMPLETE = jest.spyOn(component['notificadorDestruccion$'], 'complete');
    component.ngOnDestroy();
    expect(SPY).toHaveBeenCalled();
    expect(SPY_COMPLETE).toHaveBeenCalled();
  });

  describe('establecerCambioDeValor', () => {
    it('debe manejar cambios en fraccionArancelaria', () => {
      const EVENTO = { 
        campo: 'fraccionArancelaria', 
        valor: '30019099' 
      };
      
      component.establecerCambioDeValor(EVENTO, 'mercancia');
      
      expect(component.formularioDatosMercancia.get('descripcionFraccion')?.value)
        .toBe('Los demás');
      expect(component.formularioDatosMercancia.get('umt')?.value)
        .toBe('kilogramo');
      expect(STORE_MOCK.setTramite220103State)
        .toHaveBeenCalledWith('descripcionFraccion', 'Los demás');
    });

    it('debe manejar cambios en uso y mostrar/ocultar otroUso', () => {
      const EVENTO = { campo: 'uso', valor: 'OTRO' };
      component.establecerCambioDeValor(EVENTO, 'mercancia');
      
      const otroUsoField = component.configuracionFormularioMercancia
        .find(item => item.campo === 'otroUso');
      
      expect(otroUsoField?.mostrar).toBeTruthy();
    });
  });

  describe('agregarMercancia', () => {
    it('debe agregar mercancía con nuevo ID cuando no es modificación', () => {
      component.esModificarMercancia = false;
      component.formularioDatosMercancia.patchValue({
        descripcion: 'Nueva Mercancía'
      });
      
      jest.spyOn(component.formularioDatosMercancia, 'valid', 'get')
        .mockReturnValue(true);
      
      const POST_MERCANCIA_SPY = jest.spyOn(component, 'postMercancia');
      component.agregarMercancia();
      
      expect(POST_MERCANCIA_SPY).toHaveBeenCalled();
      expect(component.esModificarMercancia).toBeFalsy();
    });

    it('debe actualizar mercancía existente cuando es modificación', () => {
      component.esModificarMercancia = true;
      component.mercanciasSeleccionadas = [{
        id: '123',
        descripcion: 'Mercancía Original',
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
      
      jest.spyOn(component.formularioDatosMercancia, 'valid', 'get')
        .mockReturnValue(true);
      
      component.formularioDatosMercancia.patchValue({
        descripcion: 'Mercancía Modificada'
      });
      
      component.agregarMercancia();
      
      expect(component.esModificarMercancia).toBeFalsy();
    });

    it('debe marcar campos como touched cuando el formulario es inválido', () => {
      jest.spyOn(component.formularioDatosMercancia, 'valid', 'get')
        .mockReturnValue(false);
      const MARK_ALL_AS_TOUCHED_SPY = jest.spyOn(component.formularioDatosMercancia, 'markAllAsTouched');
      
      component.agregarMercancia();
      
      expect(MARK_ALL_AS_TOUCHED_SPY).toHaveBeenCalled();
    });
  });

  describe('obtenerDescripcionFraccion', () => {
    it('debe actualizar descripción y UMT para fracción específica', () => {
      component.formularioDatosMercancia.patchValue({
        fraccionArancelaria: '30019099'
      });
      
      component.obtenerDescripcionFraccion();
      
      expect(STORE_MOCK.setTramite220103State)
        .toHaveBeenCalledWith('descripcionFraccion', 'Los demás');
      expect(STORE_MOCK.setTramite220103State)
        .toHaveBeenCalledWith('umt', 'kilogramo');
    });

    it('no debe actualizar para otras fracciones arancelarias', () => {
      component.formularioDatosMercancia.patchValue({
        fraccionArancelaria: '12345678'
      });
      
      component.obtenerDescripcionFraccion();
      
      expect(STORE_MOCK.setTramite220103State)
        .not.toHaveBeenCalled();
    });
  });

  describe('manejo de errores en servicios', () => {
    it('debe manejar error en getAduanaDeIngreso', () => {
      SERVICIO_MOCK.getAdunaDeIngreso.mockReturnValue(throwError(() => new Error('Error')));
      
      component.obtenerAduanaDeIngreso();
      
      const ADUANAFIELD = component.configuracionFormularioDatos
        .find(item => item.campo === 'aduanaDeIngreso');
      expect(ADUANAFIELD?.opciones).toBeUndefined();
    });
  });

  describe('estado inicial del componente', () => {
    it('debe inicializar todas las propiedades correctamente', () => {
      expect(component.esModificarMercancia).toBeFalsy();
      expect(component.mercanciasSeleccionadas).toEqual([]);
      expect(component.datosTabla).toEqual([]);
      expect(component.formularioDatosTramite).toBeTruthy();
      expect(component.formularioDatosMercancia).toBeTruthy();
    });
  });
});