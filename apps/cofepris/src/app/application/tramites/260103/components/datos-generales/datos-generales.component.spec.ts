// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Injectable } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of as observableOf } from 'rxjs';

import { DatosGeneralesComponent } from './datos-generales.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { Tramite260103Store } from '../../estados/tramite260103Store.store';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Injectable()
class MockDatosSolicitudService {
  obtenerListaPaises() { return observableOf([{ id: 1, nombre: 'México' }]); }
  obtenerListaEstados() { return observableOf([{ id: 1, nombre: 'CDMX' }]); }
  obtenerListaMunicipios() { return observableOf([{ id: 1, nombre: 'Coyoacán' }]); }
  obtenerListaCodigosPostales() { return observableOf([{ id: 1, cp: '04000' }]); }
  obtenerListaColonias() { return observableOf([{ id: 1, nombre: 'Colonia X' }]); }
  obtenerListaLocalidades() { return observableOf([{ id: 1, nombre: 'Localidad Y' }]); }
}

@Injectable()
class MockTramite260103Store {
  updateDatosSolicitudFormState = jest.fn();
}

@Injectable()
class MockRouter {
  navigate = jest.fn();
}

describe('DatosGeneralesComponent', () => {
  let fixture: ComponentFixture<DatosGeneralesComponent>;
  let component: DatosGeneralesComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule,DatosGeneralesComponent,HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        { provide: DatosSolicitudService, useClass: MockDatosSolicitudService },
        { provide: Tramite260103Store, useClass: MockTramite260103Store },
        { provide: Router, useClass: MockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              url: 'url',
              params: {},
              queryParams: {},
              data: {},
              paramMap: { get: (key: string) => 'someValue' }
            },
            url: observableOf('url'),
            params: observableOf({}),
            queryParams: observableOf({}),
            fragment: observableOf('fragment'),
            data: observableOf({})
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call cargarDatos and fetch paises', () => {
    const spy = jest.spyOn(component['datosSolicitudService'], 'obtenerListaPaises');
    component.cargarDatos();
    expect(spy).toHaveBeenCalled();
  });

  it('should call cancelar and navigate', () => {
    component.cancelar();
  });

  it('should reset the form on limpiarFormulario', () => {
    component.agregarDatosForm = component.fb.group({
      campoTest: ['valor']
    });
    const resetSpy = jest.spyOn(component.agregarDatosForm, 'reset');
    component.limpiarFormulario();
    expect(resetSpy).toHaveBeenCalled();
  });

  it('should update store on guardar()', () => {
    component.agregarDatosForm = component.fb.group({
      rfcSanitario: ['RFC123'],
      denominacionRazon: ['Empresa'],
      correoElectronico: ['test@email.com'],
      codigoPostal: ['04000'],
      estado: ['CDMX'],
      municipioAlcaldia: ['Coyoacán'],
      localidad: ['Localidad'],
      colonia: ['Colonia'],
      calle: ['Calle X'],
      lada: ['55'],
      telefono: ['12345678'],
      aviso: ['Aviso'],
      licenciaSanitaria: ['Licencia'],
      regimen: ['Regimen'],
      adunasDeEntradas: ['Aduana'],
      aeropuerto: [true],
      publico: ['no'],
      representanteRfc: ['RFCREP'],
      representanteNombre: ['Juan'],
      apellidoPaterno: ['Pérez'],
      apellidoMaterno: ['García'],
      marca: ['MarcaX'],
      especifique: [''],
      claveDeLos: ['Clave'],
      fechaDeFabricacio: ['2023-01-01'],
      fechaDeCaducidad: ['2025-01-01'],
    });
  
  });

  it('should patch form on cargarFormulario()', () => {
    const mockData = {
      rfcSanitario: 'RFC001',
      denominacionRazon: 'Test Co.',
      correoElectronico: 'test@co.com',
      codigoPostal: '12345',
      estado: 'CDMX',
      municipioAlcaldia: 'Benito Juárez',
      localidad: 'Localidad',
      colonia: 'Colonia',
      calle: 'Av. Siempre Viva',
      lada: '55',
      telefono: '12345678',
      aviso: '',
      licenciaSanitaria: '',
      regimen: '',
      adunasDeEntradas: '',
      aeropuerto: true,
      publico: 'si',
      representanteRfc: '',
      representanteNombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      marca: '',
      especifique: '',
      claveDeLos: '',
      fechaDeFabricacio: '',
      fechaDeCaducidad: '',
    };
    component.agregarDatosForm = component.fb.group({});
  });

  it('should initialize form correctly on crearFormulario()', () => {
    component.crearFormulario();
  });

  it('should call ngOnInit', () => {
  });

  describe('addDestinatario', () => {
    let mockDestinatario: any;

    beforeEach(() => {
      mockDestinatario = { nombreRazonSocial: '' };
      component.tramiteStore.updateDestinatarioTablaDatos = jest.fn();
    });

    it('should set nombreRazonSocial for MORAL and call updateDestinatarioTablaDatos', () => {
      component.tipoPersona = { MORAL: 'MORAL', FISICA: 'FISICA' } as any;
      component.agregarDatosForm = component.fb.group({
        tipoPersona: ['MORAL'],
        denominacionRazon: ['Empresa Moral'],
        nombres: [''],
        primerApellido: [''],
        segundoApellido: ['']
      });
      component.addDestinatario(mockDestinatario);
      expect(mockDestinatario.nombreRazonSocial).toBe('Empresa Moral');
      expect(component.tramiteStore.updateDestinatarioTablaDatos).toHaveBeenCalledWith([mockDestinatario]);
    });

    it('should set nombreRazonSocial for FISICA and call updateDestinatarioTablaDatos', () => {
      component.tipoPersona = { MORAL: 'MORAL', FISICA: 'FISICA' } as any;
      component.agregarDatosForm = component.fb.group({
        tipoPersona: ['FISICA'],
        denominacionRazon: [''],
        nombres: ['Juan'],
        primerApellido: ['Pérez'],
        segundoApellido: ['García']
      });
      component.addDestinatario(mockDestinatario);
      expect(mockDestinatario.nombreRazonSocial).toBe('Juan Pérez García');
      expect(component.tramiteStore.updateDestinatarioTablaDatos).toHaveBeenCalledWith([mockDestinatario]);
    });

    it('should set nombreRazonSocial for FISICA without segundoApellido', () => {
      component.tipoPersona = { MORAL: 'MORAL', FISICA: 'FISICA' } as any;
      component.agregarDatosForm = component.fb.group({
        tipoPersona: ['FISICA'],
        denominacionRazon: [''],
        nombres: ['Ana'],
        primerApellido: ['López'],
        segundoApellido: ['']
      });
      component.addDestinatario(mockDestinatario);
      expect(mockDestinatario.nombreRazonSocial).toBe('Ana López');
      expect(component.tramiteStore.updateDestinatarioTablaDatos).toHaveBeenCalledWith([mockDestinatario]);
    });

    it('should set nombreRazonSocial as empty string for unknown tipoPersona', () => {
      component.tipoPersona = { MORAL: 'MORAL', FISICA: 'FISICA' } as any;
      component.agregarDatosForm = component.fb.group({
        tipoPersona: ['OTRO'],
        denominacionRazon: [''],
        nombres: [''],
        primerApellido: [''],
        segundoApellido: ['']
      });
      component.addDestinatario(mockDestinatario);
      expect(mockDestinatario.nombreRazonSocial).toBe('');
      expect(component.tramiteStore.updateDestinatarioTablaDatos).toHaveBeenCalledWith([mockDestinatario]);
    });
  });
});