import { CommonModule } from '@angular/common';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { CatalogoSelectComponent, TablaDinamicaComponent, TableComponent, TituloComponent } from '@ng-mf/data-access-user';
import { RepresentacionFederalComponent } from './representacion-federal.component';

describe('RepresentacionFederalComponent', () => {
  let component: RepresentacionFederalComponent;
  let fixture: ComponentFixture<RepresentacionFederalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        TituloComponent,
        CatalogoSelectComponent,
        TableComponent,
        TablaDinamicaComponent
      ],
      declarations: [RepresentacionFederalComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentacionFederalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create the form with default values', () => {
    expect(component.formulario).toBeDefined();
    expect(component.formulario.get('estado')?.value).toBe('');
    expect(component.formulario.get('representacion')?.value).toBe('');
  });

  it('should call getEntidadFederativa and set estado values', () => {
    component.getEntidadFederativa();
    expect(component.estado).toEqual([
      { id: 1, descripcion: 'SINALOA' },
      { id: 2, descripcion: 'Opción 1' }
    ]);
  });

  it('should call getRepresentacionFederal and set representacion values', () => {
    component.getRepresentacionFederal();
    expect(component.representacion).toEqual([
      { id: 1, descripcion: 'CULIACAN' },
      { id: 2, descripcion: 'Opción 1' }
    ]);
  });

  it('should validate "representacion" field as required', () => {
    const REPRESENTACION_FIELD = component.formulario.get('representacion');
    REPRESENTACION_FIELD?.setValue('');
    expect(REPRESENTACION_FIELD?.valid).toBeFalsy();
    REPRESENTACION_FIELD?.setValue('CULIACAN');
    expect(REPRESENTACION_FIELD?.valid).toBeTruthy();
  });

  it('should have the default table header and body', () => {
    expect(component.tableHeaderData).toEqual([]);
    expect(component.tableBodyData).toEqual([]);
  });

  it('should have default socio data', () => {
    expect(component.datos_Socios).toEqual([
      {
        calle: "AV PARQUE INDUSTRIAL AZTECAS",
        numeroExterior: "1550",
        numeroInterior: "",
        codigoPostal: "32679",
        colonia: "PARQUE INDUSTRIAL AZTECA",
        municipio: "JUAREZ",
        estado: "CHIHUAHUA"
      }
    ]);
  });

});
