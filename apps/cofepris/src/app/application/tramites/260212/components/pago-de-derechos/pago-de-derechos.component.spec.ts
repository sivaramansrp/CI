import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoDeDerechosComponent } from './pago-de-derechos.component';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagoDeDerechosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { ReactiveFormsModule } from '@angular/forms';
// import { PagoDeDerechosComponent } from './pago-de-derechos.component'; // Replace with actual component path
// import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src'; // Replace with actual path

// describe('PagoDerechosComponent', () => {
//   let component: PagoDeDerechosComponent;
//   let fixture: ComponentFixture<PagoDeDerechosComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [PagoDeDerechosComponent, CatalogoSelectComponent],
//       imports: [ReactiveFormsModule]
//     }).compileComponents();

//     fixture = TestBed.createComponent(PagoDeDerechosComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create the component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should initialize the form group', () => {
//     expect(component.pagoDerechos).toBeDefined();
//     expect(component.pagoDerechos.controls['claveDeReferncia']).toBeDefined();
//     expect(component.pagoDerechos.controls['cadenaDeLaDependencia']).toBeDefined();
//     expect(component.pagoDerechos.controls['llaveDePago']).toBeDefined();
//     expect(component.pagoDerechos.controls['fechaDePago']).toBeDefined();
//     expect(component.pagoDerechos.controls['importeDePago']).toBeDefined();
//   });

//   it('should render form fields correctly', () => {
//     const compiled = fixture.nativeElement;
//     expect(compiled.querySelector('#claveDeReferncia')).toBeTruthy();
//     expect(compiled.querySelector('#cadenaDeLaDependencia')).toBeTruthy();
//     expect(compiled.querySelector('#llaveDePago')).toBeTruthy();
//     expect(compiled.querySelector('#fechaDePago')).toBeTruthy();
//     expect(compiled.querySelector('#importeDePago')).toBeTruthy();
//   });

//   it('should validate required fields', () => {
//     const claveDeRefernciaControl = component.pagoDerechos.get('claveDeReferncia');
//     claveDeRefernciaControl?.setValue('');
//     expect(claveDeRefernciaControl?.valid).toBeFalsy();

//     const cadenaDeLaDependenciaControl = component.pagoDerechos.get('cadenaDeLaDependencia');
//     cadenaDeLaDependenciaControl?.setValue('');
//     expect(cadenaDeLaDependenciaControl?.valid).toBeFalsy();

//     const llaveDePagoControl = component.pagoDerechos.get('llaveDePago');
//     llaveDePagoControl?.setValue('');
//     expect(llaveDePagoControl?.valid).toBeFalsy();

//     const fechaDePagoControl = component.pagoDerechos.get('fechaDePago');
//     fechaDePagoControl?.setValue('');
//     expect(fechaDePagoControl?.valid).toBeFalsy();

//     const importeDePagoControl = component.pagoDerechos.get('importeDePago');
//     importeDePagoControl?.setValue('');
//     expect(importeDePagoControl?.valid).toBeFalsy();
//   });

//   it('should handle "Borrar datos del pago" button click', () => {
//     spyOn(component, 'clearForm'); // Assuming clearForm is a method to clear the form
//     const compiled = fixture.nativeElement;
//     const button = compiled.querySelector('.btn-danger');
//     button.click();
//     fixture.detectChanges();

//     expect(component.clearForm).toHaveBeenCalled();
//   });
// });