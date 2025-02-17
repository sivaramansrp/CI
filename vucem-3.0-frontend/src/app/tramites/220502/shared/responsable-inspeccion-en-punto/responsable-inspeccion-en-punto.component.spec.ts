import { By } from '@angular/platform-browser';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { Component } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { ControlContainer } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ResponsableInspeccionEnPuntoComponent } from './responsable-inspeccion-en-punto.component';
import { TestBed } from '@angular/core/testing';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

@Component({
  selector: 'app-test-host',
  template: `<form [formGroup]="form">
    <app-responsable-inspeccion-en-punto
      [claveDeControl]="'testControl'"
    ></app-responsable-inspeccion-en-punto>
  </form>`,
})
class TestHostComponent {
  form: FormGroup;

  constructor() {
    this.form = new FormGroup({});
  }
}

describe('ResponsableInspeccionEnPuntoComponent', () => {
  let component: ResponsableInspeccionEnPuntoComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [
        ReactiveFormsModule,
        ResponsableInspeccionEnPuntoComponent,
        TituloComponent,
        CatalogoSelectComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ControlContainer,
          useValue: {
            control: new FormGroup({}),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();
    component = fixture.debugElement.children[0].componentInstance;
    component = fixture.debugElement.query(
      By.directive(ResponsableInspeccionEnPuntoComponent)
    )?.componentInstance;

    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form controls on ngOnInit', () => {
    component.ngOnInit();
    const formGroup = component.grupoformulariopadre.get(
      component.claveDeControl
    ) as FormGroup;
    expect(formGroup).toBeTruthy();
    expect(formGroup.get('nombre')).toBeTruthy();
    expect(formGroup.get('primerapellido')).toBeTruthy();
    expect(formGroup.get('segyndoapellido')).toBeTruthy();
    expect(formGroup.get('mercancia')).toBeTruthy();
    expect(formGroup.get('tipocontenedor')).toBeTruthy();
  });

  it('should remove control on ngOnDestroy', () => {
    component.ngOnInit();
    expect(
      component.grupoformulariopadre.contains(component.claveDeControl)
    ).toBeTrue();
    component.ngOnDestroy();
    expect(
      component.grupoformulariopadre.contains(component.claveDeControl)
    ).toBeFalse();
  });

  it('should handle catalog selection correctly', () => {
    component.ngOnInit();
    const catalogo: Catalogo = {
      id: 1,
      descripcion: 'Tipo contenedor 1',
      tam: 'Tipo contenedor 1',
      dpi: 'Tipo contenedor 1',
    };
    component.tipoContenedorSeleccion(catalogo);
    const formGroup = component.grupoformulariopadre.get(
      component.claveDeControl
    ) as FormGroup;
    expect(formGroup.get('tipocontenedor').value).toBe('Tipo contenedor 1');
  });

  it('should load initial catalog data correctly', () => {
    component.cargarDatosIniciales();
    expect(component.tipoContenedor).toEqual({
      labelNombre: 'Tipo contenedor',
      required: false,
      primerOpcion: 'Selecciona un valor',
      catalogos: [
        {
          id: 1,
          descripcion: 'Tipo contenedor 1',
          tam: 'Tipo contenedor 1',
          dpi: 'Tipo contenedor 1',
        },
        {
          id: 2,
          descripcion: 'Tipo contenedor 2',
          tam: 'Tipo contenedor 2',
          dpi: 'Tipo contenedor 2',
        },
        {
          id: 3,
          descripcion: 'Tipo contenedor 3',
          tam: 'Tipo contenedor 3',
          dpi: 'Tipo contenedor 3',
        },
      ],
    });
  });
});
