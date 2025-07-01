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

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar formularioEmpresa con los valores correctos', () => {
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

  it('debe llamar a setValoresStore y actualizar el store en cambioDeRadio', () => {
    const spy = jest.spyOn(component, 'setValoresStore');
    component.cambioDeRadio('Moral', 'tipoEmpresa', 'setTipoEmpresa');
    expect(component.formularioEmpresa.get('tipoEmpresa')?.value).toBe('Moral');
    expect(spy).toHaveBeenCalledWith(component.formularioEmpresa, 'tipoEmpresa', 'setTipoEmpresa');
    expect(mockTramite120602Store.setTipoEmpresa).toHaveBeenCalledWith('Moral');
  });

  it('debe establecer federalEstatal cuando dropDown.listaDesplegable existe', () => {
    const mockLista = [{ id: 1, nombre: 'Federal' }, { id: 2, nombre: 'Estatal' }];
    (component as any).dropDown = { listaDesplegable: mockLista };
    component.obtenerFederalEstatal();
    expect(component.federalEstatal).toEqual(mockLista);
  });

  it('no debe establecer federalEstatal si dropDown es undefined', () => {
    (component as any).dropDown = undefined;
    component.federalEstatal = [{ id: 0, descripcion: 'debe permanecer igual' }];
    component.obtenerFederalEstatal();
    expect(component.federalEstatal).toEqual([{ id: 0, descripcion: 'debe permanecer igual' }]);
  });

  it('no debe establecer federalEstatal si dropDown.listaDesplegable no existe', () => {
    (component as any).dropDown = {};
    component.federalEstatal = [{ id: 0, descripcion: 'debe permanecer igual' }];
    component.obtenerFederalEstatal();
    expect(component.federalEstatal).toEqual([{ id: 0, descripcion: 'debe permanecer igual' }]);
  });

  it('no debe establecer federalEstatal si dropDown es null', () => {
    (component as any).dropDown = null;
    component.federalEstatal = [{ id: 0, descripcion: 'debe permanecer igual' }];
    component.obtenerFederalEstatal();
    expect(component.federalEstatal).toEqual([{ id: 0, descripcion: 'debe permanecer igual' }]);
  });

  it('debe deshabilitar todos los controles si esFormularioSoloLectura es true', () => {
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

  it('no debe llamar al método del store si el control no existe en setValoresStore', () => {
    const fakeForm: any = { get: () => undefined };
    component.setValoresStore(fakeForm, 'notExist', 'setTipoEmpresa');
    expect(mockTramite120602Store.setTipoEmpresa).not.toHaveBeenCalled();
  });

  it('no debe lanzar error si setValoresStore es llamado con control que retorna undefined', () => {
    const fakeForm: any = { get: () => ({ value: undefined }) };
    expect(() => component.setValoresStore(fakeForm, 'tipoEmpresa', 'setTipoEmpresa')).not.toThrow();
  });

  it('no debe lanzar error si cambioDeRadio es llamado con control inexistente', () => {
    expect(() => component.cambioDeRadio('value', 'notExist', 'setTipoEmpresa')).not.toThrow();
  });

  it('debe limpiar las suscripciones al destruir el componente', () => {
    (component as any).dropDown = { listaDesplegable: [] };
    const nextSpy = jest.spyOn<any, any>(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn<any, any>(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('no debe lanzar error si ngOnDestroy se llama varias veces', () => {
    (component as any).dropDown = { listaDesplegable: [] };
    component.ngOnDestroy();
    expect(() => component.ngOnDestroy()).not.toThrow();
  });
});
