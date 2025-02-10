import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RepresentacionComponent } from './representacion.component';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

describe('RepresentacionComponent', () => {
  let component: RepresentacionComponent;
  let fixture: ComponentFixture<RepresentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [
        RepresentacionComponent,
        SelectCatalogosComponent,
        TituloComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RepresentacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.frmRepresentacion).toBeDefined();
    expect(component.frmRepresentacion.controls['entidad']).toBeDefined();
    expect(
      component.frmRepresentacion.controls['representacion']
    ).toBeDefined();
  });

  it('should handle entidadFederativaSeleccion correctly', () => {
    const mockEntidad = { id: 1, descripcion: 'Sinaloa' };
    component.entidadFederativaSeleccion(mockEntidad);
    expect(component.selectedEntidadFederativa).toEqual(mockEntidad);
  });

  it('should handle representacionFederalSeleccion correctly', () => {
    const mockRepresentacion = { id: 1, descripcion: 'Culican' };
    component.representacionFederalSeleccion(mockRepresentacion);
    expect(component.selectedRepresentacionFederal).toEqual(mockRepresentacion);
  });

  it('should update form controls when entidadFederativaSeleccion is called', () => {
    const mockEntidad = { id: 1, descripcion: 'Sinaloa' };
    component.entidadFederativaSeleccion(mockEntidad);
    fixture.detectChanges();
    expect(component.frmRepresentacion.controls['entidad'].value).toEqual(
      mockEntidad
    );
  });

  it('should update form controls when representacionFederalSeleccion is called', () => {
    const mockRepresentacion = { id: 1, descripcion: 'Culican' };
    component.representacionFederalSeleccion(mockRepresentacion);
    fixture.detectChanges();
    expect(
      component.frmRepresentacion.controls['representacion'].value
    ).toEqual(mockRepresentacion);
  });

  it('should fetch entidad federativa on init', () => {
    spyOn(component, 'fetchEntidadFederativa');
    component.ngOnInit();
    expect(component.fetchEntidadFederativa).toHaveBeenCalled();
  });

  it('should fetch representacion federal on init', () => {
    spyOn(component, 'fetchRepresentacionFederal');
    component.ngOnInit();
    expect(component.fetchRepresentacionFederal).toHaveBeenCalled();
  });
});
