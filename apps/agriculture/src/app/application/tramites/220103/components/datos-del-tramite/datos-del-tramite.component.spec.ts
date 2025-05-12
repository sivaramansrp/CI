import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelTramiteComponent } from './datos-del-tramite.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SanidadAcuicolaImportacionService } from '../../services/sanidad-acuicola-importacion.service';
import { Tramite220103Store } from '../../estados/tramites/tramites220103.store';
import { Tramite220103Query } from '../../estados/queries/tramites220103.query';
import { of, Subject, throwError } from 'rxjs';
import { Modal } from 'bootstrap';

describe('DatosDelTramiteComponent', () => {
  let component: DatosDelTramiteComponent;
  let fixture: ComponentFixture<DatosDelTramiteComponent>;
  let servicioMock: jest.Mocked<SanidadAcuicolaImportacionService>;
  let storeMock: jest.Mocked<Tramite220103Store>;
  let queryMock: jest.Mocked<Tramite220103Query>;

  beforeEach(async () => {
    servicioMock = {
      getAdunaDeIngreso: jest.fn().mockReturnValue(of([])),
      getMedioDeTransporte: jest.fn().mockReturnValue(of([])),
      getOrigen: jest.fn().mockReturnValue(of([])),
      getUmc: jest.fn().mockReturnValue(of([])),
      getUso: jest.fn().mockReturnValue(of([])),
      getPais: jest.fn().mockReturnValue(of([])),
      getMercancias: jest.fn().mockReturnValue(of([])),
    } as unknown as jest.Mocked<SanidadAcuicolaImportacionService>;

    storeMock = {
      setTramite220103State: jest.fn(),
      eliminarMercancia: jest.fn(),
    } as unknown as jest.Mocked<Tramite220103Store>;

    queryMock = {
      selectTramite220103State$: of({ tablaMercancia: [] }),
    } as unknown as jest.Mocked<Tramite220103Query>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DatosDelTramiteComponent],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: SanidadAcuicolaImportacionService, useValue: servicioMock },
        { provide: Tramite220103Store, useValue: storeMock },
        { provide: Tramite220103Query, useValue: queryMock },
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
    const mockEstado = {
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
    queryMock.selectTramite220103State$ = of(mockEstado);

    component.ngOnInit();

    expect(component.datosTabla).toEqual(mockEstado.tablaMercancia);
  });

  it('debe obtener las opciones de aduanas de ingreso', () => {
    const mockOpciones = [{ id: 1, descripcion: 'Aduana 1' }];
    servicioMock.getAdunaDeIngreso.mockReturnValue(of(mockOpciones));

    component.obtenerAduanaDeIngreso();

    expect(servicioMock.getAdunaDeIngreso).toHaveBeenCalled();
  });

  it('debe obtener las opciones de medios de transporte', () => {
    const mockOpciones = [{ id: 1, descripcion: 'Transporte 1' }];
    servicioMock.getMedioDeTransporte.mockReturnValue(of(mockOpciones));

    component.obtenerMedioDeTransporte();

    expect(servicioMock.getMedioDeTransporte).toHaveBeenCalled();
  });

  it('debe obtener las opciones de origen', () => {
    const mockOpciones = [{ id: 1, descripcion: 'Origen 1' }];
    servicioMock.getOrigen.mockReturnValue(of(mockOpciones));

    component.obtenerOrigen();

    expect(servicioMock.getOrigen).toHaveBeenCalled();
  });

  it('debe obtener las opciones de UMC', () => {
    const mockOpciones = [{ id: 1, descripcion: 'UMC 1' }];
    servicioMock.getUmc.mockReturnValue(of(mockOpciones));

    component.obtenerUmc();

    expect(servicioMock.getUmc).toHaveBeenCalled();
  });

  it('debe obtener las opciones de uso', () => {
    const mockOpciones = [{ id: 1, descripcion: 'Uso 1' }];
    servicioMock.getUso.mockReturnValue(of(mockOpciones));

    component.obtenerUso();

    expect(servicioMock.getUso).toHaveBeenCalled();
  });

  it('debe obtener las opciones de país', () => {
    const mockOpciones = [{ id: 1, descripcion: 'México' }];
    servicioMock.getPais.mockReturnValue(of(mockOpciones));

    component.obtenerPais();

    expect(servicioMock.getPais).toHaveBeenCalled();
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

    expect(storeMock.eliminarMercancia).toHaveBeenCalledWith('1');
    expect(component.mercanciasSeleccionadas).toEqual([]);
  });

  it('debe modificar una mercancía seleccionada', () => {
    component.mercanciasSeleccionadas = [{ id: '1', descripcion: 'Mercancía 1' } as any];

    component.modificarMercancia();

    expect(component.esModificarMercancia).toBe(true);
    expect(component.formularioDatosMercancia.value.descripcion).toBe('Mercancía 1');
  });

  it('debe cerrar el modal de mercancías', () => {
    const mockModalInstance = { hide: jest.fn() } as unknown as Modal;
    component.elementoModal = { nativeElement: {} } as any;
    jest.spyOn(Modal, 'getInstance').mockReturnValue(mockModalInstance);

    component.cerrarModal();

    expect(mockModalInstance.hide).toHaveBeenCalled();
  });

  it('debe limpiar las suscripciones al destruir el componente', () => {
    const spy = jest.spyOn(component['notificadorDestruccion$'], 'next');
    const spyComplete = jest.spyOn(component['notificadorDestruccion$'], 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });

  describe('establecerCambioDeValor', () => {
    it('debe manejar cambios en fraccionArancelaria', () => {
      const evento = { 
        campo: 'fraccionArancelaria', 
        valor: '30019099' 
      };
      
      component.establecerCambioDeValor(evento, 'mercancia');
      
      expect(component.formularioDatosMercancia.get('descripcionFraccion')?.value)
        .toBe('Los demás');
      expect(component.formularioDatosMercancia.get('umt')?.value)
        .toBe('kilogramo');
      expect(storeMock.setTramite220103State)
        .toHaveBeenCalledWith('descripcionFraccion', 'Los demás');
    });

    it('debe manejar cambios en uso y mostrar/ocultar otroUso', () => {
      const evento = { campo: 'uso', valor: 'OTRO' };
      component.establecerCambioDeValor(evento, 'mercancia');
      
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
      
      const postMercanciaSpy = jest.spyOn(component, 'postMercancia');
      component.agregarMercancia();
      
      expect(postMercanciaSpy).toHaveBeenCalled();
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
      const markAllAsTouchedSpy = jest.spyOn(component.formularioDatosMercancia, 'markAllAsTouched');
      
      component.agregarMercancia();
      
      expect(markAllAsTouchedSpy).toHaveBeenCalled();
    });
  });

  describe('obtenerDescripcionFraccion', () => {
    it('debe actualizar descripción y UMT para fracción específica', () => {
      component.formularioDatosMercancia.patchValue({
        fraccionArancelaria: '30019099'
      });
      
      component.obtenerDescripcionFraccion();
      
      expect(storeMock.setTramite220103State)
        .toHaveBeenCalledWith('descripcionFraccion', 'Los demás');
      expect(storeMock.setTramite220103State)
        .toHaveBeenCalledWith('umt', 'kilogramo');
    });

    it('no debe actualizar para otras fracciones arancelarias', () => {
      component.formularioDatosMercancia.patchValue({
        fraccionArancelaria: '12345678'
      });
      
      component.obtenerDescripcionFraccion();
      
      expect(storeMock.setTramite220103State)
        .not.toHaveBeenCalled();
    });
  });

  describe('manejo de errores en servicios', () => {
    it('debe manejar error en getAduanaDeIngreso', () => {
      servicioMock.getAdunaDeIngreso.mockReturnValue(throwError(() => new Error('Error')));
      
      component.obtenerAduanaDeIngreso();
      
      const aduanaField = component.configuracionFormularioDatos
        .find(item => item.campo === 'aduanaDeIngreso');
      expect(aduanaField?.opciones).toBeUndefined();
    });

    // Similar tests for other service methods
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