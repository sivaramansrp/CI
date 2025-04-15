import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { of, ReplaySubject } from 'rxjs';
import { TercerosRelacinadosComponent } from './terceros-relacinados.component';
import { ConsultaService } from '../../service/consulta.service';
import { Tramite260704Store } from '../../estados/Tramite260704.store';
import { Tramite260704Query } from '../../estados/Tramite260704.query';
import { Destinatario, Fabricante } from '../../models/consulta.model';
import { Modal } from 'bootstrap';
import { ElementRef } from '@angular/core';

describe('TercerosRelacinadosComponent', () => {
  let component: TercerosRelacinadosComponent;
  let fixture: ComponentFixture<TercerosRelacinadosComponent>;
  let consultaServiceMock: any;
  let storeMock: any;
  let queryMock: any;

  beforeEach(async () => {
    consultaServiceMock = {
      obtenerTablaTerceros: jest.fn().mockReturnValue(of([{ nombre: 'Test Destinatario' }])),
    };

    storeMock = {
      removeDestinatarioDato: jest.fn(),
    };

    queryMock = {
      selectSolicitud$: of({
        destinatario: 'Test Destinatario',
        fabricante: 'Test Fabricante',
        tipoPersona: 'fisica',
        nombre: 'Test Nombre',
        primerApellido: 'Test Apellido',
        segundoApellido: 'Test Apellido 2',
        denominacion: 'Test Denominacion',
        pais: 'Test Pais',
        estados: 'Test Estado',
        codigoDeZip: '12345',
        camino: 'Test Camino',
        numeroExterior: '123',
        numeroInterior: '456',
        ladaDeTerceros: '01',
        fon: '1234567890',
        email: 'test@test.com',
      }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,TercerosRelacinadosComponent],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: ConsultaService, useValue: consultaServiceMock },
        { provide: Tramite260704Store, useValue: storeMock },
        { provide: Tramite260704Query, useValue: queryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacinadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms and fetch data on ngOnInit', () => {
    const spyDonanteDomicilio = jest.spyOn(component, 'donanteDomicilio');
    const spyObtenerTablaTerceros = jest.spyOn(component, 'obtenerTablaTerceros');

    component.ngOnInit();

    expect(spyDonanteDomicilio).toHaveBeenCalled();
    expect(spyObtenerTablaTerceros).toHaveBeenCalled();
    expect(component.solicitudState).toEqual({
      destinatario: 'Test Destinatario',
      fabricante: 'Test Fabricante',
      tipoPersona: 'fisica',
      nombre: 'Test Nombre',
      primerApellido: 'Test Apellido',
      segundoApellido: 'Test Apellido 2',
      denominacion: 'Test Denominacion',
      pais: 'Test Pais',
      estados: 'Test Estado',
      codigoDeZip: '12345',
      camino: 'Test Camino',
      numeroExterior: '123',
      numeroInterior: '456',
      ladaDeTerceros: '01',
      fon: '1234567890',
      email: 'test@test.com',
    });
  });

  it('should fetch terceros data', () => {
    component.obtenerTablaTerceros();
    expect(consultaServiceMock.obtenerTablaTerceros).toHaveBeenCalled();
    expect(component.destinatarioDatos).toEqual([{ nombre: 'Test Destinatario' }]);
  });

  it('should set tipoPersona', () => {
    component.setTipoPersona('moral');
    expect(component.tipoPersonaSeleccionada).toBe('moral');
  });

  it('should update selectedDestinatario on obtenerDatosDestinatario', () => {
    const evento: Fabricante[] = [{ nombre: 'Test Fabricante' } as Fabricante];
    component.obtenerDatosDestinatario(evento);
    expect(component.selectedDestinatario).toEqual(evento);
  });

  it('should remove destinatario on eliminarMercancias', () => {
    component.selectedDestinatario = [{ nombre: 'Test Fabricante', rfc: '123' } as Fabricante];
    component.eliminarMercancias();
    expect(storeMock.removeDestinatarioDato).toHaveBeenCalledWith({ nombre: 'Test Fabricante', rfc: '123' });
  });

  it('should open modal on abrirModificarProductos', () => {
    const modalElementMock = document.createElement('div');
    component.modalElement = { nativeElement: modalElementMock } as ElementRef;

    const spyModal = jest.spyOn(Modal.prototype, 'show');
    component.abrirModificarProductos();

    expect(spyModal).toHaveBeenCalled();
  });

  it('should validate form fields using isValid', () => {
    component.tercerosForm = component.fb.group({
      nombre: ['Test Nombre', Validators.required],
    });

    const isValid = component.isValid(component.tercerosForm, 'nombre');
    expect(isValid).toBe(true);
  });

  it('should set values in the store using setValoresStore', () => {
    const form = component.fb.group({
      nombre: ['Test Nombre'],
    });

    component.setValoresStore(form, 'nombre', 'setNombre');

    expect(storeMock.setNombre).toHaveBeenCalledWith('Test Nombre');
  });

  it('should initialize the form in donanteDomicilio', () => {
    component.donanteDomicilio();

    expect(component.tercerosForm.value).toEqual({
      destinatario: 'Test Destinatario',
      fabricante: 'Test Fabricante',
      tipoPersona: 'fisica',
      nombre: 'Test Nombre',
      primerApellido: 'Test Apellido',
      segundoApellido: 'Test Apellido 2',
      denominacion: 'Test Denominacion',
      pais: 'Test Pais',
      estados: 'Test Estado',
      codigoDeZip: '12345',
      camino: 'Test Camino',
      numeroExterior: '123',
      numeroInterior: '456',
      ladaDeTerceros: '01',
      fon: '1234567890',
      email: 'test@test.com',
    });
  });

  it('should destroy subscriptions on ngOnDestroy', () => {
    const spyNext = jest.spyOn(component['destroyed$'], 'next');
    const spyComplete = jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(spyNext).toHaveBeenCalledWith(true);
    expect(spyComplete).toHaveBeenCalled();
  });

  it('should have correct table headers configuration', () => {
    // Test mercancias headers
    expect(component.destinatarioConfiguracionTabla.length).toBe(15);
    expect(component.destinatarioConfiguracionTabla[0].encabezado).toBe('Nombre/denominación o razón social');
    expect(component.destinatarioConfiguracionTabla[1].encabezado).toBe('R.F.C.');
    expect(component.destinatarioConfiguracionTabla[2].encabezado).toBe('CURP');
    expect(component.destinatarioConfiguracionTabla[3].encabezado).toBe('Teléfono');
    expect(component.destinatarioConfiguracionTabla[4].encabezado).toBe('Correo electrónico');
    expect(component.destinatarioConfiguracionTabla[5].encabezado).toBe('Calle');
    expect(component.destinatarioConfiguracionTabla[6].encabezado).toBe('Número exterior');
    expect(component.destinatarioConfiguracionTabla[7].encabezado).toBe('Número interior');
    expect(component.destinatarioConfiguracionTabla[8].encabezado).toBe('País');
    expect(component.destinatarioConfiguracionTabla[9].encabezado).toBe('Colonia');
    expect(component.destinatarioConfiguracionTabla[10].encabezado).toBe('Municipio o alcaldía');
    expect(component.destinatarioConfiguracionTabla[11].encabezado).toBe('Localidad');
    expect(component.destinatarioConfiguracionTabla[12].encabezado).toBe('Estado');
    expect(component.destinatarioConfiguracionTabla[13].encabezado).toBe('Estado');
    expect(component.destinatarioConfiguracionTabla[14].encabezado).toBe('Código postal');

  });

  it('should correctly extract values through clave functions', () => {
      const mockMercancia: Destinatario = {
        nombre: 'Test Nombre',
        rfc: '123456789',
        curp: 'ABC123456789',
        telefono: '1234567890', 
        correoElectronico: 'abcd',
        calle: 'Test Calle',
        numeroExterior: '123',
        numeroInterior: '456',
        pais: 'Test Pais',
        colonia: 'Test Colonia',
        municipio: 'Test Municipio',
        localidad: 'Test Localidad',
        estado: 'Test Estado',
        estado2: 'Test Estado 2',
        codigo: '12345',
      };
  
  
      // Test mercancia clave functions
      expect(component.destinatarioConfiguracionTabla[0].clave(mockMercancia)).toBe('Test Nombre');
      expect(component.destinatarioConfiguracionTabla[1].clave(mockMercancia)).toBe('123456789');
      expect(component.destinatarioConfiguracionTabla[2].clave(mockMercancia)).toBe('ABC123456789');
      expect(component.destinatarioConfiguracionTabla[3].clave(mockMercancia)).toBe('1234567890');
      expect(component.destinatarioConfiguracionTabla[4].clave(mockMercancia)).toBe('abcd');
      expect(component.destinatarioConfiguracionTabla[5].clave(mockMercancia)).toBe('Test Calle');
      expect(component.destinatarioConfiguracionTabla[6].clave(mockMercancia)).toBe('123');
      expect(component.destinatarioConfiguracionTabla[7].clave(mockMercancia)).toBe('456');
  
      expect(component.destinatarioConfiguracionTabla[8].clave(mockMercancia)).toBe('Test Pais');
      expect(component.destinatarioConfiguracionTabla[9].clave(mockMercancia)).toBe('Test Colonia');
      expect(component.destinatarioConfiguracionTabla[10].clave(mockMercancia)).toBe('Test Municipio');
      expect(component.destinatarioConfiguracionTabla[11].clave(mockMercancia)).toBe('Test Localidad');
      expect(component.destinatarioConfiguracionTabla[12].clave(mockMercancia)).toBe('Test Estado');
      expect(component.destinatarioConfiguracionTabla[13].clave(mockMercancia)).toBe('Test Estado 2');
      expect(component.destinatarioConfiguracionTabla[14].clave(mockMercancia)).toBe('12345');
  
  
    });

});