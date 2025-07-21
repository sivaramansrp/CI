import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponsableInspeccionEnPuntoComponent } from './responsable-inspeccion-en-punto.component';
import { ControlContainer, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { Solicitud220503Store } from '../../estados/tramites220503.store';
import { Solicitud220503Query } from '../../estados/tramites220503.query';
import { SolicitudPantallasService } from '../../services/solicitud-pantallas.service';
import { CatalogoSelectComponent, ConsultaioQuery, TituloComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';

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
  
  let mockSolicitud220503Store: any;
  let mockSolicitud220503Query: any;
  let mockSolicitudPantallasService: any;
  let mockConsultaioQuery: any;
  let formGroup: FormGroup;

  beforeEach(async () => {
    mockSolicitud220503Store = {};
    mockSolicitud220503Query = {
      selectSolicitud$: of({
        nombre: 'Juan',
        primerapellido: 'Perez',
        segundoapellido: 'Lopez',
        mercancia: 'Maiz',
        tipocontenedor: 'Caja'
      })
    };
    mockSolicitudPantallasService = {
      getDataResponsableInspeccion: jest.fn().mockReturnValue(of({
        tipoContenedor: { 1: 'Caja', 2: 'Bolsa' }
      }))
    };
    mockConsultaioQuery = {
      selectConsultaioState$: of({ readonly: false })
    };
    formGroup = new FormGroup({});

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule,
          RouterModule,
          ReactiveFormsModule,
          TituloComponent,
          CatalogoSelectComponent,
        ResponsableInspeccionEnPuntoComponent,
        TestHostComponent,
        HttpClientTestingModule
      ],
      declarations: [],
      providers: [
        { provide: Solicitud220503Store, useValue: mockSolicitud220503Store },
        { provide: Solicitud220503Query, useValue: mockSolicitud220503Query },
        { provide: SolicitudPantallasService, useValue: mockSolicitudPantallasService },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
        { provide: ControlContainer, useValue: { control: formGroup } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    const hostComponent = fixture.componentInstance;
    // Access the child component instance via the debugElement
    component = fixture.debugElement.children[0].componentInstance;
    component.claveDeControl = 'testControl';
    fixture.detectChanges();
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

  it('should initialize form group on ngOnInit', () => {
    component.ngOnInit();
    expect(component.grupoFormularioPadre.contains('testControl')).toBe(true);
  });

  it('should patch form values from store', () => {
    component.ngOnInit();
    const group = component.grupoFormularioPadre.get('testControl') as FormGroup;
    expect(group.value.nombre).toBe('Juan');
    expect(group.value.primerapellido).toBe('Perez');
    expect(group.value.segundoapellido).toBe('Lopez');
    expect(group.value.mercancia).toBe('Maiz');
    expect(group.value.tipocontenedor).toBe('Caja');
  });
  it('should not throw or change control state if grupoFormularioPadre does not have the control', () => {
    component.claveDeControl = 'nonExistentControl';
    component.esFormularioSoloLectura = true;
    expect(() => component.guardarDatosFormulario()).not.toThrow();
    expect(component.grupoFormularioPadre.get('nonExistentControl')).toBeNull();
  });

  it('should disable control in readonly mode', () => {
    component.esFormularioSoloLectura = true;
    component.inicializarFormulario();
    component.guardarDatosFormulario();
    const control = component.grupoFormularioPadre.get('testControl');
    expect(control?.disabled).toBe(true);
  });

  it('should enable control in edit mode', () => {
    component.esFormularioSoloLectura = false;
    component.inicializarFormulario();
    component.guardarDatosFormulario();
    const control = component.grupoFormularioPadre.get('testControl');
    expect(control?.enabled).toBe(true);
  });

  it('should patch tipocontenedor on tipoContenedorSeleccion', () => {
    component.inicializarFormulario();
    component.tipoContenedorSeleccion({ descripcion: 'Bolsa' } as any);
    const group = component.grupoFormularioPadre.get('testControl') as FormGroup;
    expect(group.value.tipocontenedor).toBe('Bolsa');
  });

  it('should call cargarDatosIniciales and set tipoContenedor', () => {
    component.cargarDatosIniciales();
    expect(component.tipoContenedor).toEqual({ 1: 'Caja', 2: 'Bolsa' });
  });

  it('should update Solicitud220503State on setNombre', () => {
    const event = { target: { value: 'Carlos' } } as any;
    component.setNombre(event);
    expect(component.Solicitud220503State.nombre).toBe('Carlos');
  });

  it('should update Solicitud220503State on setPrimerapellido', () => {
    const event = { target: { value: 'Ramirez' } } as any;
    component.setPrimerapellido(event);
    expect(component.Solicitud220503State.primerapellido).toBe('Ramirez');
  });

  it('should update Solicitud220503State on setSegundoapellido', () => {
    const event = { target: { value: 'Gomez' } } as any;
    component.setSegundoapellido(event);
    expect(component.Solicitud220503State.segundoapellido).toBe('Gomez');
  });

  it('should update Solicitud220503State on setMercancia', () => {
    const event = { target: { value: 'Trigo' } } as any;
    component.setMercancia(event);
    expect(component.Solicitud220503State.mercancia).toBe('Trigo');
  });

  it('should update Solicitud220503State on setTipoContenedor', () => {
    component.setTipoContenedor({ id: 5 } as any);
    expect(component.Solicitud220503State.tipocontenedor).toBe(5);
  });

  it('should remove control on ngOnDestroy', () => {
    component.inicializarFormulario();
    expect(component.grupoFormularioPadre.contains('testControl')).toBe(true);
    component.ngOnDestroy();
    expect(component.grupoFormularioPadre.contains('testControl')).toBe(false);
  });
  it('should patch tipocontenedor when tipoContenedorSeleccion is called and control exists', () => {
    component.ngOnInit();
    const catalogo = { id: 2, descripcion: 'Caja' };
    component.tipoContenedorSeleccion(catalogo as any);
    const group = component.grupoFormularioPadre.get(component.claveDeControl) as FormGroup;
    expect(group.get('tipocontenedor')?.value).toBe('Caja');
  });

  it('should not throw if tipoContenedorSeleccion is called and control does not exist', () => {
    component.claveDeControl = 'nonexistent';
    expect(() => {
      component.tipoContenedorSeleccion({ id: 3, descripcion: 'Bolsa' } as any);
    }).not.toThrow();
  });
  it('should complete destroyed$ subject on ngOnDestroy', () => {
    const spy = jest.spyOn((component as any).destroyed$, 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
   // Define Catalogo type for testing if not imported
   type Catalogo = { id: number; descripcion: string };

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
});