import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { SolicitudComponent } from './solicitud.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Tramite130202Query } from '../../estados/queries/tramite130202.query';
import { Tramite130202Store } from '../../estados/tramites/tramites130202.store';
import { DetosDelTramiteComponent } from '../../../../shared/components/detos-de-tramite/detos-del-tramite.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;
  let tramite130202Store: jest.Mocked<Tramite130202Store>;
  let tramite130202Query: jest.Mocked<Tramite130202Query>;

  beforeEach(async () => {
    const storeMock = {
      updateState: jest.fn(),
      updateSolicitud: jest.fn(),
      setregimen: jest.fn(),
      setclasificacion: jest.fn(),
      setProducto: jest.fn(),
      setDescripcion: jest.fn(),
      setCantidad: jest.fn(),
      setValorPartidaUSD: jest.fn(),
      setUnidadMedida: jest.fn(),
    } as unknown as jest.Mocked<Tramite130202Store>;
    

    const queryMock = {
      solicitud$: of('mockSolicitud'),
      regimen$: of('mockRegimen'),
      classification$: of('mockClassification'),
      mercanciaState$: of({
        producto: 'mockProducto',
        descripcion: 'mockDescripcion',
        fraccion: 'mockFraccion',
        cantidad: '5',
        valorPartidaUSD: 100,
        unidadMedida: 'mockUnidadMedida',
      }),
    } as jest.Mocked<Tramite130202Query>;

    await TestBed.configureTestingModule({
      declarations: [SolicitudComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, DetosDelTramiteComponent, ],
      providers: [
        FormBuilder,
        { provide: Tramite130202Store, useValue: storeMock },
        { provide: Tramite130202Query, useValue: queryMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    tramite130202Store = TestBed.inject(Tramite130202Store) as jest.Mocked<Tramite130202Store>;
    tramite130202Query = TestBed.inject(Tramite130202Query) as jest.Mocked<Tramite130202Query>;

    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar formularios en ngOnInit', () => {
    component.ngOnInit();

   
    expect(component.formDelTramite.get('solicitud')).toBeTruthy();
    expect(component.formDelTramite.get('regimen')).toBeTruthy();
    expect(component.formDelTramite.get('classification')).toBeTruthy();

  
    expect(component.mercanciaForm.get('producto')).toBeTruthy();
    expect(component.mercanciaForm.get('descripcion')).toBeTruthy();
    expect(component.mercanciaForm.get('fraccion')).toBeTruthy();
    expect(component.mercanciaForm.get('cantidad')).toBeTruthy();
    expect(component.mercanciaForm.get('valorFacturaUSD')).toBeTruthy();
    expect(component.mercanciaForm.get('unidadMedida')).toBeTruthy();
  });

  it('Debería parchear los valores en los formularios cuando se emiten consultas', () => {
    expect(component.formDelTramite.value.solicitud).toEqual('mockSolicitud');
    expect(component.formDelTramite.value.regimen).toEqual('mockRegimen');
    expect(component.formDelTramite.value.classification).toEqual('mockClassification');

    expect(component.mercanciaForm.value.producto).toEqual('mockProducto');
    expect(component.mercanciaForm.value.descripcion).toEqual('mockDescripcion');
    expect(component.mercanciaForm.value.fraccion).toEqual('mockFraccion');
    expect(component.mercanciaForm.value.cantidad).toEqual('5');
    expect(component.mercanciaForm.value.valorFacturaUSD).toEqual('100');
    expect(component.mercanciaForm.value.unidadMedida).toEqual('mockUnidadMedida');
  });

  it('Debe actualizar el estado de la tienda de trámites cuando cambian los formularios', () => {
    const mockValue = {
      solicitud: 'mockSolicitud',
      regimen: 'mockRegimen',
      classification: 'mockClassification',
    };

    component.formDelTramite.setValue(mockValue);
    component.formDelTramite.updateValueAndValidity();

    expect(tramite130202Store.updateState).toHaveBeenCalledWith(mockValue);
  });

  it('debe llamar al método de tienda correcto cuando se activa setValoresStore', () => {
    component.setValoresStore({
      form: component.mercanciaForm,
      campo: 'producto',
      metodoNombre: 'setProducto',
    });

    expect(tramite130202Store.setProducto).toHaveBeenCalledWith('mockProducto');
  });

  it('Debería completar el tema destruido$ en ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
