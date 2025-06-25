import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosEmpresaComponent } from './datos-empresa.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Tramite120602Store } from '../../../../estados/tramites/tramite120602.store';
import { Tramite120602Query } from '../../../../estados/queries/tramite120602.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

describe('DatosEmpresaComponent', () => {
  let component: DatosEmpresaComponent;
  let fixture: ComponentFixture<DatosEmpresaComponent>;
  let mockTramite120602Store: any;
  let mockTramite120602Query: any;
  let mockConsultaioQuery: any;

  beforeEach(async () => {
    mockTramite120602Store = {
      setTipoEmpresa: jest.fn(),
      setRepresentacionFederal: jest.fn(),
    };
    mockTramite120602Query = {
      selectSolicitud$: of({
        estado: 'CDMX',
        representacionFederal: 'Federal',
        tipoEmpresa: 'SA',
        especifique: 'Especifique',
        actividadEconomicaPreponderante: 'Comercio',
        descripcion: 'Desc',
        pais: 'MX',
        codigoPostal: '12345',
        estadoDomicilio: 'CDMX',
        municipioAlcaldia: 'Benito Juarez',
        localidad: 'Centro',
        colonia: 'Roma',
        calle: 'Insurgentes',
        numeroExterior: '100',
        numeroInterior: '10',
        lada: '55',
        telefono: '12345678',
        nacionalidad: 'Mexicana',
        tipoDePersona: 'Moral',
        taxId: 'TAX123',
        denominacion: 'Empresa SA',
        datosPais: 'MX',
        datosCodigoPostal: '12345',
        datosEstado: 'CDMX',
        correoElectronico: 'test@mail.com'
      })
    };
    mockConsultaioQuery = {
      selectConsultaioState$: of({ readonly: false })
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DatosEmpresaComponent],
      providers: [
        FormBuilder,
        { provide: Tramite120602Store, useValue: mockTramite120602Store },
        { provide: Tramite120602Query, useValue: mockTramite120602Query },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosEmpresaComponent);
    component = fixture.componentInstance;
    component.datosTablaExtranjeros = [];
    component.datosGenerales = [];
    component.tablaDatosSucursal = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize formularioEmpresa with correct values', () => {
    expect(component.formularioEmpresa.getRawValue()).toMatchObject({
      estado: 'CDMX',
      representacionFederal: 'Federal',
      tipoEmpresa: 'SA',
      especifique: 'Especifique',
      actividadEconomicaPreponderante: 'Comercio',
      descripcion: 'Desc',
      pais: 'MX',
      codigoPostal: '12345',
      estadoDomicilio: 'CDMX',
      municipioAlcaldia: 'Benito Juarez',
      localidad: 'Centro',
      colonia: 'Roma',
      calle: 'Insurgentes',
      numeroExterior: '100',
      numeroInterior: '10',
      lada: '55',
      telefono: '12345678',
      nacionalidad: 'Mexicana',
      tipoDePersona: 'Moral',
      taxId: 'TAX123',
      denominacion: 'Empresa SA',
      datosPais: 'MX',
      datosCodigoPostal: '12345',
      datosEstado: 'CDMX',
      correoElectronico: 'test@mail.com'
    });
  });

  it('should call setValoresStore and update store on cambioDeRadio', () => {
    const spy = jest.spyOn(component, 'setValoresStore');
    component.cambioDeRadio('Moral', 'tipoEmpresa', 'setTipoEmpresa');
    expect(component.formularioEmpresa.get('tipoEmpresa')?.value).toBe('Moral');
    expect(spy).toHaveBeenCalledWith(component.formularioEmpresa, 'tipoEmpresa', 'setTipoEmpresa');
    expect(mockTramite120602Store.setTipoEmpresa).toHaveBeenCalledWith('Moral');
  });

  it('should set federalEstatal when dropDown.listaDesplegable exists', () => {
    const mockLista = [{ id: 1, nombre: 'Federal' }, { id: 2, nombre: 'Estatal' }];
    (component as any).dropDown = { listaDesplegable: mockLista };
    component.obtenerFederalEstatal();
    expect(component.federalEstatal).toEqual(mockLista);
  });

  it('should not set federalEstatal if dropDown is undefined', () => {
    (component as any).dropDown = undefined;
    component.federalEstatal = [{ id: 0, descripcion: 'should be unchanged' }];
    component.obtenerFederalEstatal();
    expect(component.federalEstatal).toEqual([{ id: 0, descripcion: 'should be unchanged' }]);
  });

  it('should not set federalEstatal if dropDown.listaDesplegable is missing', () => {
    (component as any).dropDown = {};
    component.federalEstatal = [{ id: 0, descripcion: 'should be unchanged' }];
    component.obtenerFederalEstatal();
    expect(component.federalEstatal).toEqual([{ id: 0, descripcion: 'should be unchanged' }]);
  });

  it('should not set federalEstatal if dropDown is null', () => {
    (component as any).dropDown = null;
    component.federalEstatal = [{ id: 0, descripcion: 'should be unchanged' }];
    component.obtenerFederalEstatal();
    expect(component.federalEstatal).toEqual([{ id: 0, descripcion: 'should be unchanged' }]);
  });

  it('should disable all controls if esFormularioSoloLectura is true', () => {
    component.esFormularioSoloLectura = true;
    component['solicitudState'] = {
      estado: 'CDMX',
      representacionFederal: 'Federal',
      tipoEmpresa: 'SA',
      especifique: 'Especifique',
      actividadEconomicaPreponderante: 'Comercio',
      descripcion: 'Desc',
      pais: 'MX',
      codigoPostal: '12345',
      estadoDomicilio: 'CDMX',
      municipioAlcaldia: 'Benito Juarez',
      localidad: 'Centro',
      colonia: 'Roma',
      calle: 'Insurgentes',
      numeroExterior: '100',
      numeroInterior: '10',
      lada: '55',
      telefono: '12345678',
      nacionalidad: 'Mexicana',
      tipoDePersona: 'Moral',
      taxId: 'TAX123',
      denominacion: 'Empresa SA',
      datosPais: 'MX',
      datosCodigoPostal: '12345',
      datosEstado: 'CDMX',
      correoElectronico: 'test@mail.com'
    };
    component['inicializarFormulario']();
    const allDisabled = Object.values(component.formularioEmpresa.controls).every(ctrl => ctrl.disabled);
    expect(allDisabled).toBe(true);
  });

  it('should not call store method if control does not exist in setValoresStore', () => {
    const fakeForm: any = { get: () => undefined };
    component.setValoresStore(fakeForm, 'notExist', 'setTipoEmpresa');
    expect(mockTramite120602Store.setTipoEmpresa).not.toHaveBeenCalled();
  });

  it('should not throw if setValoresStore is called with control returning undefined', () => {
    const fakeForm: any = { get: () => ({ value: undefined }) };
    expect(() => component.setValoresStore(fakeForm, 'tipoEmpresa', 'setTipoEmpresa')).not.toThrow();
  });

  it('should not throw if cambioDeRadio is called with non-existent control', () => {
    expect(() => component.cambioDeRadio('value', 'notExist', 'setTipoEmpresa')).not.toThrow();
  });

  it('should clean up subscriptions on destroy', () => {
    (component as any).dropDown = { listaDesplegable: [] };
    const nextSpy = jest.spyOn<any, any>(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn<any, any>(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should not throw if ngOnDestroy is called multiple times', () => {
    (component as any).dropDown = { listaDesplegable: [] };
    component.ngOnDestroy();
    expect(() => component.ngOnDestroy()).not.toThrow();
  });
});
