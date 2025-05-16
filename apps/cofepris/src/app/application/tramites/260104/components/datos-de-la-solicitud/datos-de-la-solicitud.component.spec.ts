import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosDeLaSolicitudComponent,
        HttpClientTestingModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should initialize solicitudForm with default values', () => {
    expect(component.solicitudForm).toBeDefined();
    
  });
  
  it('should toggle colapsable state', () => {
    expect(component.colapsable).toBeFalsy();
    component.mostrar_colapsable();
    expect(component.colapsable).toBe(true);
    component.mostrar_colapsable();
    expect(component.colapsable).toBeFalsy();
  });
  
  it('should call obtenerEstadoCatalogo and set estadoCatalogo', () => {
    const mockCatalogo = { estados: ['Estado1', 'Estado2'] } as any;
    jest.spyOn(component['permisoSanitarioProductosService'], 'obtenerEstadoCatalogo').mockReturnValue({
      pipe: jest.fn().mockReturnValue({
        subscribe: jest.fn((callback) => callback(mockCatalogo)),
      }),
    } as any);
  
    component.obtenerEstadoCatalogo();
    expect(component.estadoCatalogo).toEqual(mockCatalogo);
  });
  
  it('should enable razonSocial and correoElectronico fields', () => {
    component.habilitarCampos();
    expect(component.solicitudForm.get('razonSocial')?.enabled).toBe(true);
    expect(component.solicitudForm.get('correoElectronico')?.enabled).toBe(true);
  });
  
  it('should update fechaCaducidad in formMercancias', () => {
    const newDate = '2023-12-31';
    component.cambioFechaFinal(newDate);
    expect(component.formMercancias.get('fechaCaducidad')?.value).toBe(newDate);
  });
  
  it('should update fechaFabricacion in formMercancias', () => {
    const newDate = '2023-01-01';
    component.cambioFechaFabricacion(newDate);
    expect(component.formMercancias.get('fechaFabricacion')?.value).toBe(newDate);
  });
  
  it('should call setValoresStore and update tramite260104Store', () => {
    const mockStoreMethod = jest.fn();
    component['tramite260104Store'] = { razonSocial: mockStoreMethod } as any;
    const mockForm = new FormBuilder().group({ razonSocial: ['testValue'] });
  
    component.setValoresStore(mockForm, 'razonSocial', 'setRazonSocial');
    expect(mockStoreMethod).toHaveBeenCalledWith('testValue');
  });
  
  it('should destroy observables on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
  
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
  it('should toggle colapsableDos state', () => {
    expect(component.colapsableDos).toBeFalsy();
    component.mostrar_colapsableDos();
    expect(component.colapsableDos).toBe(true);
    component.mostrar_colapsableDos();
    expect(component.colapsableDos).toBeFalsy();
  });
  it('should toggle colapsableTres state', () => {
    expect(component.colapsableTres).toBeFalsy();
    component.mostrar_colapsableTres();
    expect(component.colapsableTres).toBe(true);
    component.mostrar_colapsableTres();
    expect(component.colapsableTres).toBeFalsy();
  });
  it('should enable "Especifique" field and update tramite260104Store', () => {
    const mockStoreMethod = jest.fn();
    component['tramite260104Store'] = { setEspecifique: mockStoreMethod } as any;
  
    const mockForm = new FormBuilder().group({ especifique: ['testValue'] });
  
    component.habilitarEspecifique(mockForm, 'especifique', 'setEspecifique');
  
    expect(component.isHabilitarEspecifique).toBe(true);
    expect(mockStoreMethod).toHaveBeenCalledWith('testValue');
  });
  it('should enable "EspecifiqueTipo" field and update tramite260104Store', () => {
    const mockStoreMethod = jest.fn();
    component['tramite260104Store'] = { setEspecifiqueTipo: mockStoreMethod } as any;
  
    const mockForm = new FormBuilder().group({ especifiqueTipo: ['testValue'] });
  
    component.habilitarEspecifiqueTipo(mockForm, 'especifiqueTipo', 'setEspecifiqueTipo');
  
    expect(component.isHabilitarEspecifiqueTipo).toBe(true);
    expect(mockStoreMethod).toHaveBeenCalledWith('testValue');
  });
  it('should call obtenerTablaDatos and set nicoTablaDatos', () => {
    const mockData = { datos: [{ id: 1, name: 'Test Data' }] };
    jest.spyOn(component['permisoSanitarioProductosService'], 'obtenerTablaDatos').mockReturnValue({
      pipe: jest.fn().mockReturnValue({
        subscribe: jest.fn((callback) => callback(mockData)),
      }),
    } as any);
  
    component.obtenerTablaDatos();
  
    expect(component.nicoTablaDatos).toEqual(mockData.datos);
  });
});

