import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RegistroParaLaComponent } from './registro-para-la.component';

import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { BtnContinuarComponent } from '../../../../shared/components/btn-continuar/btn-continuar.component';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

describe('RegistroParaLaComponent', () => {
  let component: RegistroParaLaComponent;
  let fixture: ComponentFixture<RegistroParaLaComponent>;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule,RegistroParaLaComponent, AlertComponent, BtnContinuarComponent, SelectCatalogosComponent, TituloComponent],
      providers: [FormBuilder]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroParaLaComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize registro with correct data', () => {
    component.getRegistro(); // Call the method to initialize the 'registro' data

    // Verify if the registro object has the correct initial values
    expect(component.registro).toBeTruthy();
    expect(component.registro.labelNombre).toBe('¿Se han realizado previamente importaciones o exportaciones del producto a registrar?');
    expect(component.registro.required).toBeTrue();
    expect(component.registro.catalogos.length).toBe(2);
    expect(component.registro.catalogos[0].descripcion).toBe('Si');
    expect(component.registro.catalogos[1].descripcion).toBe('No');
  });

  it('should initialize datosPasos object with correct values', () => {
    component.getRegistro(); // Initialize registro data

    // After initializing, check if datosPasos contains correct values
    expect(component.datosPasos.nroPasos).toBe(0);  // Initial value, assuming pasos is empty initially
    expect(component.datosPasos.indice).toBe(1); // Default index value
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should call getRegistro() during ngOnInit', () => {
    spyOn(component, 'getRegistro'); // Spy on getRegistro method

    component.ngOnInit();

    expect(component.getRegistro).toHaveBeenCalled();
  });

  it('should initialize pasos with an empty array', () => {
    expect(component.pasos).toEqual([]);  // Initially, pasos should be an empty array
  });

  it('should call docSeleccionado method (placeholder)', () => {
    const spy = spyOn(component, 'docSeleccionado'); // Spy on docSeleccionado method

    // Simulate calling docSeleccionado
    component.docSeleccionado('some event');

    expect(spy).toHaveBeenCalledWith('some event');
  });
});
