import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { HttpClientModule } from '@angular/common/http';
import { ExportarIlustracionesService } from '../../services/exportar-ilustraciones.service';
import { Tramite270101Query } from '../../../../estados/queries/270101/tramite270101.query';
import { of } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let exportarIlustracionesService: ExportarIlustracionesService;
  let validacionesServiceMock = { isValid: jest.fn() } as any;
  const tramite270101QueryMock = {
    selectExportarIlustraciones$: of({ configuracionTablaDatos: [{ titulo: 'Item 1' }] })
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosDeLaSolicitudComponent, HttpClientModule],
      providers: [
        ExportarIlustracionesService,
        { provide: validacionesServiceMock, useValue: validacionesServiceMock },
        { provide: Tramite270101Query, useValue: tramite270101QueryMock }
      ],
    }).compileComponents();
    exportarIlustracionesService = TestBed.inject(ExportarIlustracionesService);
    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    component.consultaState = {
      readonly: false,
    } as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate autor options from service', () => {
    const mockAutores = [{ id: 1, descripcion: 'Autor A' }];
    jest.spyOn(exportarIlustracionesService, 'getAutorData').mockReturnValue(of(mockAutores));
    const autorField = { campo: 'autor' } as any;
    component.informacionFormData = [autorField];
    component.obtenerAutor();
    expect(autorField.opciones).toEqual([{ id: 1, descripcion: 'Autor A' }]);
  });

  it('should assign moneda data from service', () => {
    const mockMonedas = [
      { id: 1, descripcion: 'US Dollar' },
      { id: 2, descripcion: 'Mexican Peso' }
    ];
    jest.spyOn(exportarIlustracionesService, 'getMonedaData').mockReturnValue(of(mockMonedas));
    component.obtenerMonedaDatos();
    expect(component.monedaData).toEqual(mockMonedas);
  });

  it('should click closeModal element to hide modal', () => {
    const clickSpy = jest.fn();
    component.closeModal = {
      nativeElement: { click: clickSpy }
    } as any;
    component.cerrarModal();
    expect(clickSpy).toHaveBeenCalled();
  });

  it('should add item and reset forms when both forms are valid', () => {
    const ninoMockGroup = {
      valid: true,
      get: (key: string) => ({ value: `value-${key}` }),
      reset: jest.fn(),
      markAllAsTouched: jest.fn()
    };
    const formaMock = {
      valid: true,
      get: (key: string) => {
        if (key === 'ninoFormGroup') return ninoMockGroup;
        return { value: `value-${key}` };
      },
      reset: jest.fn(),
      markAllAsTouched: jest.fn()
    };
    component['forma'] = formaMock as any;
    component.configuracionTablaDatos = [];
    const cerrarSpy = jest.spyOn(component, 'cerrarModal');
    const storeSpy = jest.spyOn(component, 'cambioEnValoresStore');
    component.agregarConfirmarModal();
    expect(component.configuracionTablaDatos.length).toBe(1);
    expect(storeSpy).toHaveBeenCalledWith('configuracionTablaDatos', expect.any(Object));
    expect(cerrarSpy).toHaveBeenCalled();
  });

  // it('should update value in store from input event', () => {
  //   const storeSpy = jest.spyOn(component, 'cambioEnValoresStore');
  //   const mockEvent = { target: { value: '123' }, campo: 'avaluo' };
  //   component.cambioEvento(mockEvent, 'avaluo');
  //   expect(storeSpy).toHaveBeenCalledWith('avaluo', '123');
  // });

  it('should update value in store from input event', () => {
  const storeSpy = jest.spyOn(component, 'cambioEnValoresStore');
  const inputElement = document.createElement('input');
  inputElement.value = '123';
  const mockEvent = new Event('input');
  Object.defineProperty(mockEvent, 'target', {
    writable: false,
    value: inputElement,
  });
  component.cambioEvento(mockEvent, 'avaluo');
  expect(storeSpy).toHaveBeenCalledWith('avaluo', '123');
});


  it('should call cambioEnValoresStore with provided event', () => {
    const storeSpy = jest.spyOn(component, 'cambioEnValoresStore');
    const event = { campo: 'moneda', valor: 'USD' };
    component.establecerCambioDeValor(event);
    expect(storeSpy).toHaveBeenCalledWith('moneda', 'USD');
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroy$ = component.destroy$ || {};
    component.destroy$.next = jest.fn();
    component.ngOnDestroy();
  });

  it('should complete destroy$ on destroy', () => {
    const completeSpy = jest.spyOn(component.destroy$, 'complete');
    const nextSpy = jest.spyOn(component.destroy$, 'next');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
  
  it('should not add item if main form is invalid', () => {
    const ninoMockGroup = {
      valid: true,
      get: jest.fn(),
      reset: jest.fn(),
      markAllAsTouched: jest.fn()
    };
  
    const formaMock = {
      valid: false,
      get: (key: string) => {
        if (key === 'ninoFormGroup') return ninoMockGroup;
        return { value: null };
      },
      reset: jest.fn(),
      markAllAsTouched: jest.fn()
    };
  
    component['forma'] = formaMock as any;
    component.configuracionTablaDatos = [];
  
    component.agregarConfirmarModal();
  
    expect(component.configuracionTablaDatos.length).toBe(0);
  });
  

  it('should not throw if closeModal is undefined', () => {
    component.closeModal = undefined as any;
    expect(() => component.cerrarModal()).not.toThrow();
  });

  it('should populate configuracionTablaDatos on init from query observable', () => {
    component.ngOnInit();
    expect(component.configuracionTablaDatos).toEqual([{ titulo: 'Item 1' }]);
  });
  
  
  
});
