import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RepresentacionComponent } from './representacion.component';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

describe('RepresentacionComponent', () => {
  let component: RepresentacionComponent;
  let fixture: ComponentFixture<RepresentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        SelectCatalogosComponent,
        TituloComponent,
        RepresentacionComponent,
      ],
      declarations: [],
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
    expect(component.frmRepresentacion.controls['entidad'].value).toEqual(
      mockEntidad
    );
  });

  it('should handle representacionFederalSeleccion correctly', () => {
    const mockRepresentacion = { id: 1, descripcion: 'Culican' };
    component.representacionFederalSeleccion(mockRepresentacion);
    expect(component.selectedRepresentacionFederal).toEqual(mockRepresentacion);
    expect(
      component.frmRepresentacion.controls['representacion'].value
    ).toEqual(mockRepresentacion);
  });

  it('should set entidadFederativa on init', () => {
    component.ngOnInit();
    expect(component.entidadFederativa.catalogos.length).toBeGreaterThan(0);
  });

  it('should set representacionFederal on init', () => {
    component.ngOnInit();
    expect(component.representacionFederal.catalogos.length).toBeGreaterThan(0);
  });
});
