import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { TituloComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { InputRadioComponent } from '@ng-mf/data-access-user';
import { Solicitud130106State } from '../../../../estados/tramites/tramite130106.store';
import RadioOptionsData from 'libs/shared/theme/assets/json/130106/radioButton.json';
import SolicitudeDropdown from 'libs/shared/theme/assets/json/130106/datos-de-la-solicitud.json';
import { of } from 'rxjs';
import { Tramite130106Query } from '../../../../estados/queries/tramite130106.query';
import { Tramite130106Store } from '../../../../estados/tramites/tramite130106.store';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;

const MOCK_SOLICITUD_STATE: Solicitud130106State = {
  regimen: 'mock-regimen',
  clasificacion: 'mock-clasificacion',
  solicitudDescripcion: 'mock-descripcion',
  fraccion: 'mock-fraccion',
  cantidad: '10',
  factura: 'mock-factura',
  umt: 'mock-umt',
  mercanciaCantidad: '5',
  mercanciaFactura: 'mock-mercancia-factura',
  descripcion: 'mock-descripcion-mercancia',
  especifico: 'mock-especifico',
  justificacion: 'mock-justificacion',
  observaciones: 'mock-observaciones',
  entidad: 'mock-entidad',
  representacion: 'mock-representacion',
  bloque: 'mock-bloque',
  disponible: 'mock-disponible',
  seleccionado: 'mock-seleccionado',
  solicitud: 'mock-solicitud',
  producto: 'mock-producto',
  selectRangoDias: ['lunes', 'martes']
};

  const tramite130106QueryMock = {
    selectSolicitud$: of(MOCK_SOLICITUD_STATE)
  };

  const consultaioQueryMock = {
    selectConsultaioState$: of({ readonly: false })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        TituloComponent,
        CatalogoSelectComponent,
        InputRadioComponent,
        DatosDeLaSolicitudComponent
      ],
      providers: [
        FormBuilder,
        Tramite130106Store,
        { provide: Tramite130106Query, useValue: tramite130106QueryMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    component.inicializarFormularioSolicitud(); // Explicitly initialize the form
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values from solicitudState', () => {
    expect(component.formulario).toBeTruthy();
    expect(component.formulario.get('solicitud')?.value).toBe('mock-solicitud');
    expect(component.formulario.get('regimen')?.value).toBe('mock-regimen');
    expect(component.formulario.get('clasificacion')?.value).toBe('mock-clasificacion');
    expect(component.formulario.get('solicitudDescripcion')?.value).toBe('mock-descripcion');
    expect(component.formulario.get('producto')?.value).toBe('mock-producto');
  });

  it('should have required validators for form controls', () => {
    component.formulario.get('solicitud')?.setValue('');
    component.formulario.get('regimen')?.setValue('');
    component.formulario.get('clasificacion')?.setValue('');
    component.formulario.get('solicitudDescripcion')?.setValue('');
    component.formulario.get('producto')?.setValue('');

    expect(component.formulario.get('solicitud')?.hasError('required')).toBe(true);
    expect(component.formulario.get('regimen')?.hasError('required')).toBe(true);
    expect(component.formulario.get('clasificacion')?.hasError('required')).toBe(true);
    expect(component.formulario.get('solicitudDescripcion')?.hasError('required')).toBe(true);
    expect(component.formulario.get('producto')?.hasError('required')).toBe(true);
  });

  it('should call ngOnDestroy and complete destroyNotifier$', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should have correct radio options', () => {
    expect(component.radioOptions).toEqual(RadioOptionsData);
  });

  it('should initialize configuracionesDropdown with the correct catalogs', () => {
    expect(component.configuracionesDropdown.length).toBe(4);
    expect(component.configuracionesDropdown[0].catalogos).toEqual(SolicitudeDropdown.tramite);
    expect(component.configuracionesDropdown[1].catalogos).toEqual(SolicitudeDropdown.regimen);
    expect(component.configuracionesDropdown[2].catalogos).toEqual(SolicitudeDropdown.arancelaria);
    expect(component.configuracionesDropdown[3].catalogos).toEqual(SolicitudeDropdown.umt);
  });
});
