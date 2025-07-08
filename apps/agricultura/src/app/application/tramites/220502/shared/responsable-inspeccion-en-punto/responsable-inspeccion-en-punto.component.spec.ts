import { By } from '@angular/platform-browser';
import { Catalogo } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { Component } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { ControlContainer } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ResponsableInspeccionEnPuntoComponent } from './responsable-inspeccion-en-punto.component';
import { TestBed } from '@angular/core/testing';
import { TituloComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Component({
  selector: 'app-test-host',
  standalone: true,
  imports: [
    ResponsableInspeccionEnPuntoComponent,
    ReactiveFormsModule,
    CommonModule,
  ],
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
      declarations: [],
      imports: [
        TestHostComponent,
        ReactiveFormsModule,
        ResponsableInspeccionEnPuntoComponent,
        TituloComponent,
        CatalogoSelectComponent,
        HttpClientTestingModule,
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
    const FORMGROUP = component.grupoFormularioPadre.get(
      component.claveDeControl
    ) as FormGroup;
    expect(FORMGROUP).toBeTruthy();
    expect(FORMGROUP.get('nombre')).toBeTruthy();
    expect(FORMGROUP.get('primerapellido')).toBeTruthy();
    expect(FORMGROUP.get('segundoapellido')).toBeTruthy();
    expect(FORMGROUP.get('mercancia')).toBeTruthy();
    expect(FORMGROUP.get('tipocontenedor')).toBeTruthy();
  });

  it('should remove control on ngOnDestroy', () => {
    component.ngOnInit();
    expect(
      component.grupoFormularioPadre.contains(component.claveDeControl)
    ).toBe(true);
    component.ngOnDestroy();
    expect(
      component.grupoFormularioPadre.contains(component.claveDeControl)
    ).toBe(false);
  });

  it('should handle catalog selection correctly', () => {
    component.ngOnInit();
    const CATALOGO: Catalogo = {
      id: 1,
      descripcion: 'Tipo contenedor 1',
    };
    component.tipoContenedorSeleccion(CATALOGO);
    const FORMGROUP = component.grupoFormularioPadre.get(
      component.claveDeControl
    ) as FormGroup;
    expect(FORMGROUP.get('tipocontenedor')?.value).toBe('Tipo contenedor 1');
  });

  it('should call cargarDatosIniciales on inicializarFormulario', () => {
    const spy = jest.spyOn(component, 'cargarDatosIniciales');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
 });
