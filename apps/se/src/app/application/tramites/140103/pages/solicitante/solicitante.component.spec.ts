import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Solicitante140103Component } from './solicitante.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';

describe('Solicitante140103Component', () => {
  let component: Solicitante140103Component;
  let fixture: ComponentFixture<Solicitante140103Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Solicitante140103Component,
        ReactiveFormsModule,
        CommonModule,
        TituloComponent
      ],
      providers: [FormBuilder],
    }).compileComponents();

    fixture = TestBed.createComponent(Solicitante140103Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe establecer valores por defecto en establecerValoresDeFormulario', () => {
    component.establecerValoresDeFormulario();
    expect(component.solicitudForm.get('rfc')?.value).toBe('AALM87326');
    expect(component.solicitudForm.get('denominacion')?.value).toBe('SVHGSA ASCV 332');
    expect(component.solicitudForm.get('actividadEconomica')?.value).toBe('SIMa gsys');
    expect(component.solicitudForm.get('correoElectronico')?.value).toBe('SV US');
  });

  it('debe llamar a establecerValoresDeFormulario en ngOnInit', () => {
    const spy = jest.spyOn(component, 'establecerValoresDeFormulario');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });
});
