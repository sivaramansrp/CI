import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RepresentacionComponent } from './representacion.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

fdescribe('RepresentacionComponent', () => {
  let component: RepresentacionComponent;
  let fixture: ComponentFixture<RepresentacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CatalogoSelectComponent,
        TituloComponent,
        CommonModule,
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

  it('should handle fetchEntidadFederativa correctly', () => {
    const mockEntidad = { id: 1, descripcion: 'Sinaloa' };
    component.fetchEntidadFederativa(mockEntidad);
    expect(component.seleccionadaEntidadFederativa).toEqual(mockEntidad);
  });

  it('should handle fetchRepresentacionFederal correctly', () => {
    const mockRepresentacion = { id: 1, descripcion: 'Culican' };
    component.fetchRepresentacionFederal(mockRepresentacion);
    expect(component.seleccionadaRepresentacionFederal).toEqual(
      mockRepresentacion
    );
  });

  it('should set entidadFederativaLista on init', () => {
    component.ngOnInit();
    expect(component.entidadFederativaLista.length).toBeGreaterThan(0);
  });

  it('should set representacionFederalLista on init', () => {
    component.ngOnInit();
    expect(component.representacionFederalLista.length).toBeGreaterThan(0);
  });
});
