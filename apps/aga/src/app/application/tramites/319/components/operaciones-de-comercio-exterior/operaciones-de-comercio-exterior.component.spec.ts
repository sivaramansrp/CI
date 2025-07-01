import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { CatalogoSelectComponent, SharedModule, TablaDinamicaComponent, TituloComponent } from '@ng-mf/data-access-user';  // Import shared modules if needed
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { OperacionesDeComercioExterioComponent } from './operaciones-de-comercio-exterior.component';

describe('OperacionesDeComercioExteriorComponent', () => {
  let component: OperacionesDeComercioExterioComponent;
  let fixture: ComponentFixture<OperacionesDeComercioExterioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, SharedModule,HttpClientTestingModule,TablaDinamicaComponent,CatalogoSelectComponent,AlertComponent,TituloComponent,ReactiveFormsModule,OperacionesDeComercioExterioComponent],  
      declarations: [],  // Declare the component in the declarations array
    }).compileComponents();

    fixture = TestBed.createComponent(OperacionesDeComercioExterioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
   it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
  });
  it('should disable the form if esFormularioSoloLectura is true in ngAfterViewInit', () => {
    component.miformulario = component.fb.group({
      operacion: ['']
    });
    component.esFormularioSoloLectura = true;
    const disableSpy = jest.spyOn(component.miformulario, 'disable');
    const enableSpy = jest.spyOn(component.miformulario, 'enable');
    component.ngAfterViewInit();
    expect(disableSpy).toHaveBeenCalled();
    expect(enableSpy).not.toHaveBeenCalled();
  });

  it('should enable the form if esFormularioSoloLectura is false in ngAfterViewInit', () => {
    component.miformulario = component.fb.group({
      operacion: ['']
    });
    component.esFormularioSoloLectura = false;
    const disableSpy = jest.spyOn(component.miformulario, 'disable');
    const enableSpy = jest.spyOn(component.miformulario, 'enable');
    component.ngAfterViewInit();
    expect(enableSpy).toHaveBeenCalled();
    expect(disableSpy).not.toHaveBeenCalled();
  });
  it('should set periodoView and modalEmergente, and initialize periodoForm when abrirModuloPersonasNotificaciones(true) is called', () => {
    component.abrirModuloPersonasNotificaciones(true);
    expect(component.periodoView).toBe(true);
    expect(component.modalEmergente).toBeFalsy();
    expect(component.periodoForm).toBeDefined();
    expect(component.periodoForm.get('periodo')).toBeTruthy();
    expect(component.periodoForm.get('periodoInicial')).toBeTruthy();
    expect(component.periodoForm.get('periodoFinal')).toBeTruthy();
  });

  it('should set periodoView and modalEmergente, and not initialize periodoForm when abrirModuloPersonasNotificaciones(false) is called', () => {
    component.periodoForm = undefined as any;
    component.abrirModuloPersonasNotificaciones(false);
    expect(component.periodoView).toBeFalsy();
    expect(component.modalEmergente).toBeTruthy();
    expect(component.periodoForm).toBeUndefined();
  });
  it('should add a new persona to cuerpoSolicitarTablaFila if periodoForm is valid', () => {
    component.cuerpoSolicitarTablaFila = [];
    component.periodoForm = component.fb.group({
      periodo: ['2024', Validators.required],
      periodoInicial: ['01/2024', Validators.required],
      periodoFinal: ['02/2024', Validators.required],
    });
    // Make the form valid
    component.periodoForm.markAllAsTouched();
    component.periodoForm.updateValueAndValidity();

    // Mock methods and stores
    const abrirAlertaSeleccionModalSpy = jest.spyOn(component, 'abrirAlertaSeleccionModal');
    component.seccionStore = {
      establecerFormaValida: jest.fn(),
      establecerSeccion: jest.fn(),
    } as any;

    component.agregarPersona();

    expect(component.cuerpoSolicitarTablaFila.length).toBe(1);
    expect(component.cuerpoSolicitarTablaFila[0]).toEqual({
      id: 1,
      periodo: '2024',
      fechas_sobre_el_periodo: '01/2024 al 02/2024',
    });
    expect(component.modalEmergente).toBe(true);
    expect(abrirAlertaSeleccionModalSpy).toHaveBeenCalled();
    expect(component.seccionStore.establecerFormaValida).toHaveBeenCalledWith([true]);
    expect(component.seccionStore.establecerSeccion).toHaveBeenCalledWith([true]);
  });

  it('should show alert and set textos if periodoForm is invalid', () => {
    component.periodoForm = component.fb.group({
      periodo: ['', Validators.required],
      periodoInicial: ['01/2024', Validators.required],
      periodoFinal: ['02/2024', Validators.required],
    });
    // Make the form invalid
    component.periodoForm.get('periodo')?.setValue('');
    component.periodoForm.markAllAsTouched();
    component.periodoForm.updateValueAndValidity();

    component.vistaAlerta = false;
    component.textos = '';
    component.cuerpoSolicitarTablaFila = [];
    component.seccionStore = {
      establecerFormaValida: jest.fn(),
      establecerSeccion: jest.fn(),
    } as any;

    component.agregarPersona();

    expect(component.vistaAlerta).toBe(true);
    expect(component.textos).toContain('01/2024 al 02/2024');
    expect(component.cuerpoSolicitarTablaFila.length).toBe(0);
  });
  it('should reset periodoForm, update tramite319Store, and set periodoView and vistaAlerta to false when eliminarPedimento(true) is called', () => {
    // Arrange
    component.periodoForm = {
      reset: jest.fn()
    } as any;
    component.tramite319Store = {
      actualizarDatosForma: jest.fn()
    } as any;
    component.cuerpoSolicitarTablaFila = [{ id: 1, periodo: '2024', fechas_sobre_el_periodo: '01/2024 al 02/2024' }];
    component.periodoView = true;
    component.vistaAlerta = true;

    // Act
    component.eliminarPedimento(true);

    // Assert
    expect(component.periodoForm.reset).toHaveBeenCalled();
    expect(component.tramite319Store.actualizarDatosForma).toHaveBeenCalledWith(component.cuerpoSolicitarTablaFila);
    expect(component.periodoView).toBe(false);
    expect(component.vistaAlerta).toBe(false);
  });

  it('should do nothing when eliminarPedimento(false) is called', () => {
    // Arrange
    component.periodoForm = {
      reset: jest.fn()
    } as any;
    component.tramite319Store = {
      actualizarDatosForma: jest.fn()
    } as any;
    component.periodoView = true;
    component.vistaAlerta = true;

    // Act
    component.eliminarPedimento(false);

    // Assert
    expect(component.periodoForm.reset).not.toHaveBeenCalled();
    expect(component.tramite319Store.actualizarDatosForma).not.toHaveBeenCalled();
    expect(component.periodoView).toBe(true);
    expect(component.vistaAlerta).toBe(true);
  });
});
