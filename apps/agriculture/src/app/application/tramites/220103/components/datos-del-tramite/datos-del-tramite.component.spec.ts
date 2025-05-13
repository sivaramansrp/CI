import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelTramiteComponent } from './datos-del-tramite.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SanidadAcuicolaImportacionService } from '../../services/sanidad-acuicola-importacion.service';
import { Tramite220103Store } from '../../estados/tramites/tramites220103.store';
import { Tramite220103Query } from '../../estados/queries/tramites220103.query';
import { of } from 'rxjs';
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
      getMercancias: jest.fn().mockReturnValue(of([{ id: '1', descripcion: 'Mercancía 1' }])),
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
    component.obtenerAduanaDeIngreso();
    expect(servicioMock.getAdunaDeIngreso).toHaveBeenCalled();
  });

  it('debe obtener las opciones de medios de transporte', () => {
    component.obtenerMedioDeTransporte();
    expect(servicioMock.getMedioDeTransporte).toHaveBeenCalled();
  });

  it('debe obtener las opciones de origen', () => {
    component.obtenerOrigen();
    expect(servicioMock.getOrigen).toHaveBeenCalled();
  });

  it('debe obtener las opciones de UMC', () => {
    component.obtenerUmc();
    expect(servicioMock.getUmc).toHaveBeenCalled();
  });

  it('debe obtener las opciones de uso', () => {
    component.obtenerUso();
    expect(servicioMock.getUso).toHaveBeenCalled();
  });

  it('debe obtener las opciones de país', () => {
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
});