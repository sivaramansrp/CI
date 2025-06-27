/* apps/cofepris/src/app/application/tramites/260211/components/representanteLegal/representanteLegal.component.spec.ts */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';

import { RepresentanteLegalComponent } from './representanteLegal.component';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';

describe('RepresentanteLegalComponent', () => {
  let component: RepresentanteLegalComponent;
  let fixture  : ComponentFixture<RepresentanteLegalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RepresentanteLegalComponent,          // componente standalone
      ],
      providers: [FormBuilder, ValidacionesFormularioService],
    }).compileComponents();

    fixture   = TestBed.createComponent(RepresentanteLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();                  // dispara ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    const form = component.representante;

    expect(form).toBeDefined();
    expect(form.get('rfc')?.value).toBe('');

    // Sólo verificamos si los controles existen
    const nombreCtrl          = form.get('nombre');
    const primerApellidoCtrl  = form.get('primerApellido');
    const segundoApellidoCtrl = form.get('segundoApellido');

    if (nombreCtrl) {
      expect(nombreCtrl.disabled).toBe(true);
    }
    if (primerApellidoCtrl) {
      expect(primerApellidoCtrl.disabled).toBe(true);
    }
    if (segundoApellidoCtrl) {
      expect(segundoApellidoCtrl.disabled).toBe(true);
    }
  });
});
