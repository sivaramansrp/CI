import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { CommonModule } from '@angular/common';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosAdicionalesComponent } from './datos-adicionales.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { ValidacionesFormularioService } from '../../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';

describe('DatosAdicionalesComponent', () => {
  let component: DatosAdicionalesComponent;
  let fixture: ComponentFixture<DatosAdicionalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        DatosAdicionalesComponent,
        TituloComponent,
        AlertComponent,
        SelectCatalogosComponent
      ],
      providers: [
        ValidacionesFormularioService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosAdicionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize entidad and representacion on ngOnInit', () => {
    component.ngOnInit();
    expect(component.entidad).toBeDefined();
    expect(component.entidad.labelNombre).toBe('Entidad federativa');
    expect(component.representacion).toBeDefined();
    expect(component.representacion.labelNombre).toBe('Representación federal');
  });

  it('should handle docSeleccionado event', () => {
    const catalogo = { id: 1, descripcion: 'SINALOA' };
    component.docSeleccionado(catalogo);
    expect(console.log).toHaveBeenCalledWith('Seleccionar', catalogo);
  });

  it('should handle validarRepresentacionFederalIDCSECEROR_ event', () => {
    const catalogo = { id: 1, descripcion: 'CULIACAN' };
    spyOn(console, 'log');
    component.validarRepresentacionFederalIDCSECEROR_(catalogo);
    expect(console.log).toHaveBeenCalledWith('Seleccionar', catalogo);
  });
});
