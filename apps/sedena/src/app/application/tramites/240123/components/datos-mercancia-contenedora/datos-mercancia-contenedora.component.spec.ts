import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosMercanciaContenedoraComponent } from './datos-mercancia-contenedora.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DatosSolicitudService } from '../../services/datos-solicitud.service';
import { Tramite240123Store } from '../../estados/tramite240123Store.store';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { DatosMercanciaComponent } from '../../../../shared/components/datos-mercancia/datos-mercancia.component';
import { TituloComponent } from '@ng-mf/data-access-user';

describe('DatosMercanciaContenedoraComponent', () => {
  let component: DatosMercanciaContenedoraComponent;
  let fixture: ComponentFixture<DatosMercanciaContenedoraComponent>;
  let datosSolicitudServiceMock: Partial<DatosSolicitudService>;
  let tramiteStoreMock: Partial<Tramite240123Store>;
  let locationMock: Partial<Location>;

  const FRACCIONES_CATALOGO = [
    { nombre: 'Fracción 1', id: 1 },
    { nombre: 'Fracción 2', id: 2 },
  ];

  const MONEDA_CATALOGO = [
    { nombre: 'MXN', id: 1 },
    { nombre: 'USD', id: 2 },
  ];

  const MERCANCIA_TABLA = [
    { fraccionArancelaria: '25030002', descripcionFraccion: 'Azufre', unidadMedidaTarifa: 'Kilogramo', cantidadUMT: 10, valorComercial: 100, tipoMoneda: 'MXN', descripcion: 'Descripción' },
  ];

  beforeEach(async () => {
    datosSolicitudServiceMock = {
      obtenerFraccionesCatalogo: jest.fn().mockReturnValue(of(FRACCIONES_CATALOGO)),
      obtenerMonedaCatalogo: jest.fn().mockReturnValue(of(MONEDA_CATALOGO)),
    };

    tramiteStoreMock = {
      updateMercanciaTablaDatos: jest.fn(),
    };

    locationMock = {
      back: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CatalogoSelectComponent, DatosMercanciaComponent, DatosMercanciaContenedoraComponent, TituloComponent],
      providers: [
        { provide: DatosSolicitudService, useValue: datosSolicitudServiceMock },
        { provide: Tramite240123Store, useValue: tramiteStoreMock },
        { provide: Location, useValue: locationMock },
        FormBuilder,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosMercanciaContenedoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar los catálogos correctamente', () => {
    component.ngOnInit();
    expect(component.fraccionesCatalogo.length).toBeGreaterThan(0);
    expect(component.monedaCatalogo.length).toBeGreaterThan(0);
  });

  it('debería inicializar el formulario con los valores por defecto', () => {
    component.ngOnInit();
    expect(component.datosMercancia.value.fraccionArancelaria).toBe('25030002');
    expect(component.datosMercancia.get('descFraccion')?.value).toBe('Azufre de cualquier clase, excepto el sublimado, el precipitado y el coloidal.');
    expect(component.datosMercancia.get('umt')?.value).toBe('Kilogramo');
  });

  it('debería guardar correctamente los datos de la mercancía', () => {
    component.datosMercancia.patchValue({
      fraccionArancelaria: '25030002',
      descFraccion: 'Azufre de cualquier clase, excepto el sublimado, el precipitado y el coloidal.',
      umt: 'Kilogramo',
      cantidadUMT: 10,
      valorComercial: 100,
      tipoMoneda: 'MXN',
      descripcion: 'Descripción',
    });

    component.guardar();

    expect(component.datosMercancias.length).toBeGreaterThan(0);
    expect(locationMock.back).toHaveBeenCalled();
    expect(tramiteStoreMock.updateMercanciaTablaDatos).toHaveBeenCalledWith(component.datosMercancias);
  });

  it('debería limpiar el formulario correctamente', () => {
    component.limpiarFormulario();
    
    expect(component.datosMercancia.value).toEqual({
      descripcion: null,
      fraccionArancelaria: null,
      cantidadUMT: null,
      umc: null,
      valorComercial: null,
      tipoMoneda: null,
    });
  });
  

  it('debería cancelar y regresar correctamente', () => {
    component.cancelar();
    expect(locationMock.back).toHaveBeenCalled();
  });
});