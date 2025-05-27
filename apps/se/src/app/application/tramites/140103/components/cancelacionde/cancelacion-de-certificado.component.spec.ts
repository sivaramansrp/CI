// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { CancelacionDeCertificateComponent } from './cancelacion-de-certificate.component';
// import { CatalogoSelectComponent } from '../../../../../../../../../libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
// import { CommonModule } from '@angular/common'; 
// import { OficioComponent } from '../oficio/oficio.component';
// import { TablaDinamicaComponent } from 'libs/shared/data-access-user/src/tramites/components/tabla-dinamica/tabla-dinamica.component';
// import { TituloComponent } from '@ng-mf/data-access-user'; 
// import cancelations from 'libs/shared/theme/assets/json/140103/cancelacion.json';
// import cancelcatalog from 'libs/shared/theme/assets/json/140103/cancelcatalog.json';
//  interface Cupos {
//   cupo: number;
//   nombreProducto: string;
//   nombreSubproducto: string;
//   mecanismoAsignacion: string;
//   tipoCupo: string;
// }
// describe('CancelacionDeCertificateComponent', () => {
//   let component: CancelacionDeCertificateComponent;
//   let fixture: ComponentFixture<CancelacionDeCertificateComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [
//         CommonModule, 
//         FormsModule, 
//         ReactiveFormsModule, 
//         TituloComponent, 
//         OficioComponent,
//         TablaDinamicaComponent,
//         CatalogoSelectComponent,
//         CancelacionDeCertificateComponent 
//       ],
//       declarations: [] 
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(CancelacionDeCertificateComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize the cancelation property with data from cancelations.json', () => {
//     expect(component.cancelation).toEqual(cancelations);
//     expect(component.cancelation.length).toBeGreaterThan(0);
//   });

//   it('should initialize the regime property with data from cancelcatalog.regime', () => {
//     expect(component.regime).toEqual(cancelcatalog.regime);
//     expect(component.regime.length).toBeGreaterThan(0);
//   });

//   it('should initialize the mecanismo property with data from cancelcatalog.mecanismo', () => {
//     expect(component.mecanismo).toEqual(cancelcatalog.mecanismo);
//     expect(component.mecanismo.length).toBeGreaterThan(0);
//   });

//   it('should initialize the tratado property with data from cancelcatalog.tratado', () => {
//     expect(component.tratado).toEqual(cancelcatalog.tratado);
//     expect(component.tratado.length).toBeGreaterThan(0);
//   });

//   it('should initialize the nombrede property with data from cancelcatalog.nombrede', () => {
//     expect(component.nombrede).toEqual(cancelcatalog.nombrede);
//     expect(component.nombrede.length).toBeGreaterThan(0);
//   });

//   it('should initialize the nombredel property with data from cancelcatalog.nombredel', () => {
//     expect(component.nombredel).toEqual(cancelcatalog.nombredel);
//     expect(component.nombredel.length).toBeGreaterThan(0);
//   });

//   it('should initialize the representacion property with data from cancelcatalog.representacion', () => {
//     expect(component.representacion).toEqual(cancelcatalog.representacion);
//     expect(component.representacion.length).toBeGreaterThan(0);
//   });

//   it('should initialize the configuracionTabla with correct table configuration', () => {
//     const EXPECTEDCONFIGURATION: unknown = [
//       { encabezado: 'Cupo', clave: (item: Cupos) => item.cupo, orden: 1 },
//       { encabezado: 'Nombre de Producto', clave: (item: Cupos) => item.nombreProducto, orden: 2 },
//       { encabezado: 'Nombre del Subproducto', clave: (item: Cupos) => item.nombreSubproducto, orden: 3 },
//       { encabezado: 'Mecanismo de Asignación', clave: (item: Cupos) => item.mecanismoAsignacion, orden: 4 },
//       { encabezado: 'Tipo Cupo', clave: (item: Cupos) => item.tipoCupo, orden: 5 }
//     ];

//     expect(component.configuracionTabla).toEqual(EXPECTEDCONFIGURATION);
//     expect(component.configuracionTabla.length).toBe(5); 
//   });
// });


// Mock the cancelcatalog and cancelations JSON imports
jest.mock('libs/shared/theme/assets/json/140103/cancelcatalog.json', () => ({
  regimen: [{ id: 1, nombre: 'Regimen 1' }],
  mecanismo: [{ id: 1, nombre: 'Mecanismo 1' }],
  tratado: [{ id: 1, nombre: 'Tratado 1' }],
  nombrede: [{ id: 1, nombre: 'NombreDe 1' }],
  nombredel: [{ id: 1, nombre: 'NombreDel 1' }],
  representacion: [{ id: 1, nombre: 'Representacion 1' }]
}));
jest.mock('libs/shared/theme/assets/json/140103/cancelacion.json', () => ([
  { cupo: 1, nombreProducto: 'Producto 1', nombreSubproducto: 'Subproducto 1', mecanismoAsignacion: 'Mecanismo 1', tipoCupo: 'Tipo 1' }
]));

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CancelacionDeCertificateComponent } from './cancelacion-de-certificado.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { Tramite140103Store } from '../../../../estados/tramites/tramite140103.store';
import { Tramite140103Query } from '../../../../estados/queries/tramite140103.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import cancelations from 'libs/shared/theme/assets/json/140103/cancelacion.json';
import cancelcatalog from 'libs/shared/theme/assets/json/140103/cancelcatalog.json';

describe('CancelacionDeCertificateComponent', () => {
  let component: CancelacionDeCertificateComponent;
  let fixture: ComponentFixture<CancelacionDeCertificateComponent>;
  let tramite140103Store: Tramite140103Store;
  let tramite140103Query: Tramite140103Query;
  let consultaioQuery: ConsultaioQuery;

  const mockSolicitudState = {
    regimen: 'regimen1',
    mecanismo: 'mecanismo1',
    tratado: 'tratado1',
    producto: 'producto1',
    subproducto: 'subproducto1',
    representacion: 'representacion1'
  };

  beforeEach(async () => {
    tramite140103Store = {
      setRegimen: jest.fn(),
      setMecanismo: jest.fn(),
      setTratado: jest.fn(),
      setProducto: jest.fn(),
      setSubproducto: jest.fn(),
      setRepresentacion: jest.fn()
    } as any;

    tramite140103Query = {
      selectSolicitud$: of(mockSolicitudState)
    } as any;

    consultaioQuery = {
      selectConsultaioState$: of({ readonly: false })
    } as any;

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        CancelacionDeCertificateComponent,
        CatalogoSelectComponent
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: Tramite140103Store, useValue: tramite140103Store },
        { provide: Tramite140103Query, useValue: tramite140103Query },
        { provide: ConsultaioQuery, useValue: consultaioQuery }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CancelacionDeCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with correct values', () => {
    component.solicitudState = mockSolicitudState as any;
    component['inicializarFormulario']();
    expect(component.CancelacionForm.value.regimen).toBe('regimen1');
    expect(component.CancelacionForm.value.mecanismo).toBe('mecanismo1');
    expect(component.CancelacionForm.value.tratado).toBe('tratado1');
    expect(component.CancelacionForm.value.producto).toBe('producto1');
    expect(component.CancelacionForm.value.subproducto).toBe('subproducto1');
    expect(component.CancelacionForm.value.representacion).toBe('representacion1');
  });

  it('should disable the form in readonly mode', () => {
    component.esFormularioSoloLectura = true;
    component.solicitudState = mockSolicitudState as any;
    component['inicializarFormulario']();
    component.CancelacionForm.enable();
    component.guardarDatosFormulario();
    expect(component.CancelacionForm.disabled).toBe(true);
  });

  it('should enable the form in editable mode', () => {
    component.esFormularioSoloLectura = false;
    component.solicitudState = mockSolicitudState as any;
    component['inicializarFormulario']();
    component.CancelacionForm.disable();
    component.guardarDatosFormulario();
    expect(component.CancelacionForm.enabled).toBe(true);
  });

  it('should call the correct store method in setValoresStore', () => {
    component.solicitudState = mockSolicitudState as any;
    component['inicializarFormulario']();
    const spy = jest.spyOn(tramite140103Store, 'setRegimen');
    component.setValoresStore(component.CancelacionForm, 'regimen', 'setRegimen');
    expect(spy).toHaveBeenCalledWith('regimen1');
  });

  it('should clean up subscriptions on destroy', () => {
    const destroySpy = jest.spyOn((component as any).destroyNotifier$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should call inicializarFormulario and inicializarEstadoFormulario on ngOnInit', () => {
    const initFormSpy = jest.spyOn(component as any, 'inicializarFormulario');
    const initStateSpy = jest.spyOn(component, 'inicializarEstadoFormulario');
    component.ngOnInit();
    expect(initFormSpy).toHaveBeenCalled();
    expect(initStateSpy).toHaveBeenCalled();
  });

  it('should call guardarDatosFormulario if esFormularioSoloLectura is true in inicializarEstadoFormulario', () => {
    const guardarSpy = jest.spyOn(component, 'guardarDatosFormulario');
    component.esFormularioSoloLectura = true;
    component.inicializarEstadoFormulario();
    expect(guardarSpy).toHaveBeenCalled();
  });

  it('should call inicializarFormulario if esFormularioSoloLectura is false in inicializarEstadoFormulario', () => {
    const initFormSpy = jest.spyOn(component as any, 'inicializarFormulario');
    component.esFormularioSoloLectura = false;
    component.inicializarEstadoFormulario();
    expect(initFormSpy).toHaveBeenCalled();
  });

  it('should not throw if CancelacionForm is undefined in guardarDatosFormulario', () => {
    component.CancelacionForm = undefined as any;
    component.esFormularioSoloLectura = false;
    expect(() => component.guardarDatosFormulario()).not.toThrow();
  });
});