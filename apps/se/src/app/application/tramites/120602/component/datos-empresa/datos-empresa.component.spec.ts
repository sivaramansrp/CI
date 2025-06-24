import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosEmpresaComponent } from './datos-empresa.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
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
      declarations: [],
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
    expect(component.formularioEmpresa.value).toMatchObject({
      actividadEconomicaPreponderante: 'Comercio',
      correoElectronico: 'test@mail.com',
      datosCodigoPostal: '12345',
      datosEstado: 'CDMX',
      datosPais: 'MX',
      denominacion: 'Empresa SA',
      nacionalidad: 'Mexicana',
      representacionFederal: 'Federal',
      taxId: 'TAX123',
      tipoDePersona: 'Moral',
      tipoEmpresa: 'SA',
    });
  });

  it('should call setValoresStore and update store on cambioDeRadio', () => {
    const spy = jest.spyOn(component, 'setValoresStore');
    component.cambioDeRadio('Moral', 'tipoEmpresa', 'setTipoEmpresa');
    expect(component.formularioEmpresa.get('tipoEmpresa')?.value).toBe('Moral');
    expect(spy).toHaveBeenCalledWith(component.formularioEmpresa, 'tipoEmpresa', 'setTipoEmpresa');
    expect(mockTramite120602Store.setTipoEmpresa).toHaveBeenCalledWith('Moral');
  });

  it('should not set federalEstatal if dropDown is undefined', () => {
    (component as any).dropDown = undefined;
    component.federalEstatal = [{ id: 0, descripcion: 'should be unchanged' }];
    component.obtenerFederalEstatal();
    expect(component.federalEstatal).toEqual([{ id: 0, descripcion: 'should be unchanged' }]);
  });

  it('should clean up subscriptions on destroy', () => {
    (component as any).dropDown = { listaDesplegable: [] };
    const nextSpy = jest.spyOn<any, any>(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn<any, any>(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
