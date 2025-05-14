import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { DestinatariosComponent } from './destinatarios.component';
import { Tramite300105Store } from '../../estados/tramite300105.store';
import { Tramite300105Query } from '../../estados/tramite300105.query';
import { AutorizacionDeRayosXService } from '../../services/autorizacion-de-rayos-x.service';
import { DESTINATARIO_TABLA_CONFIGURACION, MERCANCIA_TABLA_CONFIGURACION } from '../../enum/destinatario-tabla.enum';

describe('DestinatariosComponent', () => {
  let component: DestinatariosComponent;
  let fixture: ComponentFixture<DestinatariosComponent>;
  let tramite300105StoreMock: jest.Mocked<Tramite300105Store>;
  let tramite300105QueryMock: jest.Mocked<Tramite300105Query>;
  let autorizacionDeRayosXServiceMock: jest.Mocked<AutorizacionDeRayosXService>;

  beforeEach(async () => {
    tramite300105StoreMock = {
        setDestinatarioTablaDatos: jest.fn(),
    } as unknown as jest.Mocked<Tramite300105Store>;

    tramite300105QueryMock = {
        selectTramite300105$: of({
            destinatarioTablaDatos: [],
        }),
    } as unknown as jest.Mocked<Tramite300105Query>;

    autorizacionDeRayosXServiceMock = {
        fraccionArancelariaDescripcion: [{ id: '1', descripcion: 'Fracción 1' }],
        pais: [{ id: '1', descripcion: 'México' }],
        tipoMercancia: [{ id: '1', descripcion: 'Tipo 1' }],
        inicializaMercanciaDatosCatalogos: jest.fn(),
    } as unknown as jest.Mocked<AutorizacionDeRayosXService>;

    await TestBed.configureTestingModule({
      declarations: [DestinatariosComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Tramite300105Store, useValue: tramite300105StoreMock },
        { provide: Tramite300105Query, useValue: tramite300105QueryMock },
        { provide: AutorizacionDeRayosXService, useValue: autorizacionDeRayosXServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DestinatariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
    component.ngOnDestroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and fetch data on ngOnInit', () => {
    expect(component.datosTablaDestinatario).toEqual([]);
    expect(component.botonesMovimientos).toBeDefined();
  });

  it('should create a new formularioMercancia with default values', () => {
    component.crearNuevoFormularioMercancia();
    expect(component.formularioMercancia).toBeDefined();
    expect(component.formularioMercancia.get('denominacionRazon')?.value).toBe('');
  });

  it('should handle fracción arancelaria change', () => {
    const event = { id: 1, descripcion: '1' };
    component.crearNuevoFormularioMercancia();
    component.manejarCambioFraccionArancelaria(event);
    expect(component.formularioMercancia.get('fraccionDescripcion')?.value).toBe('Fracción 1');
  });

  it('should update the selected row', () => {
    component.filaSeleccionadaMercancia = { 
      id: 1, 
      denominacionRazon: 'Razón 1', 
      domicilio: 'Domicilio 1', 
      pais: 'México', 
      correo: 'correo@example.com', 
      paginaWeb: 'www.example.com' ,
        tipoMercancia: 'Tipo 1'
    };
    component.actualizarFilaSeleccionada();
    expect(component.filaSeleccionadaMercancia.denominacionRazon).toBe('Razón 1');
  });

  it('should modify an item in the table', () => {
    component.listaFilaSeleccionadaMercancia = [{
        id: 1, denominacionRazon: 'Razón 1',
        domicilio: '',
        pais: '',
        correo: '',
        paginaWeb: '',
        tipoMercancia: ''
    }];
    component.datosTablaDestinatario = [{
        id: 1, denominacionRazon: 'Razón 1',
        domicilio: '',
        pais: '',
        correo: '',
        paginaWeb: '',
        tipoMercancia: ''
    }];
    component.modificarItemMercancia();
    expect(component.esOperacionDeActualizacion).toBe(true);
    expect(component.mostrarModalDatosMercancia).toBe(true);
  });

  it('should confirm deletion of selected items', () => {
    component.listaFilaSeleccionadaMercancia = [{
        id: 1,
        denominacionRazon: '',
        domicilio: '',
        pais: '',
        correo: '',
        paginaWeb: '',
        tipoMercancia: ''
    }];
    component.confirmEliminarMercanciaItem();
    expect(component.confirmEliminarPopupAbierto).toBe(true);
  });

  it('should delete selected items from the table', () => {
    component.listaFilaSeleccionadaMercancia = [{
        id: 1,
        denominacionRazon: '',
        domicilio: '',
        pais: '',
        correo: '',
        paginaWeb: '',
        tipoMercancia: ''
    }];
    component.datosTablaDestinatario = [{
        id: 1,
        denominacionRazon: '',
        domicilio: '',
        pais: '',
        correo: '',
        paginaWeb: '',
        tipoMercancia: ''
    }, {
        id: 2,
        denominacionRazon: '',
        domicilio: '',
        pais: '',
        correo: '',
        paginaWeb: '',
        tipoMercancia: ''
    }];
    component.eliminarMercanciaItem();
    expect(component.datosTablaDestinatario).toEqual([{ id: 2 }]);
    expect(tramite300105StoreMock.setDestinatarioTablaDatos).toHaveBeenCalledWith([{ id: 2 }]);
  });

  it('should open and close the modal for mercancía', () => {
    component.alternarModalMercancia();
    expect(component.mostrarModalDatosMercancia).toBe(true);
    component.alternarModalMercancia();
    expect(component.mostrarModalDatosMercancia).toBe(false);
  });

  it('should validate if a control is invalid', () => {
    component.crearNuevoFormularioMercancia();
    const controlName = 'denominacionRazon';
    component.formularioMercancia.get(controlName)?.markAsTouched();
    expect(component.esControlInvalido(controlName)).toBe(true);
  });

  it('should submit the mercancía form and add a new row', () => {
    component.crearNuevoFormularioMercancia();
    component.formularioMercancia.patchValue({
      denominacionRazon: 'Razón 1',
      domicilio: 'Domicilio 1',
      pais: '1',
      correo: 'correo@example.com',
      paginaWeb: 'www.example.com',
      tipoMercancia: '1',
    });
    component.enviarFormularioMercancia();
    expect(component.datosTablaDestinatario.length).toBe(1);
    expect(tramite300105StoreMock.setDestinatarioTablaDatos).toHaveBeenCalled();
  });

  it('should clean up on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['notificadorDestruccion$'], 'next');
    const completeSpy = jest.spyOn(component['notificadorDestruccion$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});