import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnlaceComponent } from './enlace.component';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

fdescribe('EnlaceComponent', () => {
  let component: EnlaceComponent;
  let fixture: ComponentFixture<EnlaceComponent>;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, FormsModule,EnlaceComponent, TableComponent, TituloComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EnlaceComponent);
    component = fixture.componentInstance;
    fb = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.represtantante).toBeTruthy();
    expect(component.represtantante.controls['resigtro']).toBeTruthy();
    expect(component.represtantante.controls['RFC']).toBeTruthy();
    expect(component.represtantante.controls['Nombre']).toBeTruthy();
    // check all form controls
  });


  it('should disable specific form controls when patchData is called', () => {
    component.ngOnInit();
    component.patchData();
    expect(component.represtantante.get('RFC')?.disabled).toBeTrue();
    expect(component.represtantante.get('Nombre')?.disabled).toBeTrue();
    expect(component.represtantante.get('ApellidoPaterno')?.disabled).toBeTrue();
    expect(component.represtantante.get('ApellidoMaterno')?.disabled).toBeTrue();
    expect(component.represtantante.get('Cuidad')?.disabled).toBeTrue();
  });

  it('should set modal value to "show" when abrirModal is called', () => {
    component.abrirModal();
    expect(component.modal).toBe('show');
  });

  it('should call getregistroForm when abrirModal is called', () => {
    spyOn(component, 'getregistroForm');
    component.abrirModal();
    expect(component.getregistroForm).toHaveBeenCalled();
  });

  it('should update enlaceHeaderData when getEnlace is called', () => {
    component.getEnlace();
    expect(component.enlaceHeaderData).toEqual(component.enlaceTableData.tableHeader);
  });

  it('should render the form inputs and buttons correctly', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const inputs = compiled.querySelectorAll('input');
    expect(inputs.length).toBeGreaterThan(0); // Check if form controls are rendered
  });

  it('should display the modal when "Abrir Modal" button is clicked', () => {
    fixture.detectChanges();
    const modalButton: HTMLElement = fixture.nativeElement.querySelector('button');
    modalButton.click();
    fixture.detectChanges();
    const modal = fixture.nativeElement.querySelector('.modal');
    expect(modal).toBeTruthy();
  });

  // Optional: Additional tests for form validation and edge cases
});
