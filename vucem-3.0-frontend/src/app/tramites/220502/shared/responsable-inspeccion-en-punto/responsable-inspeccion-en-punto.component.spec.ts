import { ComponentFixture } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { FormGroupName } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ResponsableInspeccionEnPuntoComponent } from './responsable-inspeccion-en-punto.component';
import { SelectCatalogosComponent } from '../../../../shared/components/select-catalogos/select-catalogos.component';
import { TestBed } from '@angular/core/testing';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

describe('ResponsableInspeccionEnPuntoComponent', () => {
  let component: ResponsableInspeccionEnPuntoComponent;
  let fixture: ComponentFixture<ResponsableInspeccionEnPuntoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsableInspeccionEnPuntoComponent, TituloComponent, SelectCatalogosComponent ],
      imports: [ ReactiveFormsModule ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsableInspeccionEnPuntoComponent);
    component = fixture.componentInstance;
    component.claveDeControl = 'testControl';
    component.contenedorPrincipal = {
      control: new FormGroup({})
    } as FormGroupName;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls on ngOnInit', () => {
    component.ngOnInit();
    const formGroup = component.grupoformulariopadre.get(component.claveDeControl) as FormGroup;
    expect(formGroup).toBeTruthy();
    expect(formGroup.get('nombre')).toBeTruthy();
    expect(formGroup.get('primerapellido')).toBeTruthy();
    expect(formGroup.get('segyndoapellido')).toBeTruthy();
    expect(formGroup.get('mercancia')).toBeTruthy();
    expect(formGroup.get('tipocontenedor')).toBeTruthy();
  });

  it('should remove control on ngOnDestroy', () => {
    component.ngOnInit();
    expect(component.grupoformulariopadre.contains(component.claveDeControl)).toBeTrue();
    component.ngOnDestroy();
    expect(component.grupoformulariopadre.contains(component.claveDeControl)).toBeFalse();
  });

  it('should handle catalog selection correctly', () => {
    component.ngOnInit();
    const catalogo = { id: 1, descripcion: 'Tipo contenedor 1', tam: 'Tipo contenedor 1', dpi: 'Tipo contenedor 1' };
    component.tipoContenedorSeleccion(catalogo);
    const formGroup = component.grupoformulariopadre.get(component.claveDeControl) as FormGroup;
    expect(formGroup.get('tipocontenedor').value).toBe('Tipo contenedor 1');
  });
});