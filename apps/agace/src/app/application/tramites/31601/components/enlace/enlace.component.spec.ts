/* eslint-disable dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable sort-imports */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EnlaceComponent } from './enlace.component';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { TableComponent, TituloComponent} from '@libs/shared/data-access-user/src';

jest.mock('@libs/shared/theme/assets/json/31601/enlace.json', () => ({
  __esModule: true,
  default: {
    tableHeader: ['Col1', 'Col2'],
    tableBody: [{ Col1: 'A', Col2: 'B' }]
  }
}));

jest.mock('@libs/shared/theme/assets/json/31601/enlace-data.json', () => ({
  __esModule: true,
  default: {
    resigtro: '123',
    rfc: 'RFC123',
    nombre: 'Nombre',
    apellidoPaterno: 'ApellidoP',
    apellidoMaterno: 'ApellidoM',
    cuidad: 'Ciudad',
    cargo: 'Cargo',
    telefono: '55555555',
    correo: 'correo@mail.com'
  }
}));

fdescribe('EnlaceComponent', () => {
  let component: EnlaceComponent;
  let fixture: ComponentFixture<EnlaceComponent>;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        EnlaceComponent,
        TableComponent,
        TituloComponent,
      ],
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
  expect(component.represtantante.controls['resigtroReprestantante']).toBeTruthy();
  expect(component.represtantante.controls['rfcReprestantante']).toBeTruthy();
  expect(component.represtantante.controls['nombreReprestante']).toBeTruthy();
  expect(component.represtantante.controls['apellidoPaterno']).toBeTruthy();
  expect(component.represtantante.controls['apellidoMaterno']).toBeTruthy();
  expect(component.represtantante.controls['cargo']).toBeTruthy();
  expect(component.represtantante.controls['cuidad']).toBeTruthy();
  expect(component.represtantante.controls['telefonoReprestantante']).toBeTruthy();
  expect(component.represtantante.controls['correoReprestantante']).toBeTruthy();
  expect(component.represtantante.controls['suplente']).toBeTruthy();
});

  it('should disable specific form controls when patchData is called', () => {
    component.ngOnInit();
    component.patchData();
    expect(
      component.represtantante.get('apellidoPaterno')?.disabled
    ).toBe(true);
    expect(
      component.represtantante.get('apellidoMaterno')?.disabled
    ).toBe(true);
    expect(component.represtantante.get('cuidad')?.disabled).toBe(true);
  });

  it('should set modal value to "show" when abrirModal is called', () => {
    component.abrirModal();
    expect(component.modal).toBe('show');
  });

  it('should call getRegistroForm when abrirModal is called', () => {
    jest.spyOn(component, 'getRegistroForm');
    component.abrirModal();
    expect(component.getRegistroForm).toHaveBeenCalled();
  });

  it('should update enlaceHeaderData when getEnlace is called', () => {
    component.getEnlace();
    expect(component.enlaceHeaderData).toEqual(
      component.enlaceTableData.tableHeader
    );
  });

  it('should render the form inputs and buttons correctly', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const inputs = compiled.querySelectorAll('input');
    expect(inputs.length).toBeGreaterThan(0); 
  });

  it('should display the modal when "Abrir Modal" button is clicked', () => {
    fixture.detectChanges();
    const modalButton: HTMLElement =
    fixture.nativeElement.querySelector('button');
    modalButton.click();
    fixture.detectChanges();
    const modal = fixture.nativeElement.querySelector('.modal');
    expect(modal).toBeTruthy();
  });
});
