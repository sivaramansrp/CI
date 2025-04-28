import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpresasTerciarizadasComponent } from './empresas-terciarizadas.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Tramite80210Store } from '../../estados/tramites80210.store';
import { Tramite80210Query } from '../../estados/tramites80210.query';
import { registroSolicitudImmexService } from '../../services/registro-solicitud-immex.service';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { mock } from 'node:test';
import { Plantas } from '../../modelos/registro-solicitud-immex.model';

@Component({
  selector: 'app-catalogo-select',
  template: '<div></div>',
})
class MockCatalogoSelectComponent {}

describe('EmpresasTerciarizadasComponent', () => {
  let component: EmpresasTerciarizadasComponent;
  let fixture: ComponentFixture<EmpresasTerciarizadasComponent>;
  let tramite80210StoreMock: Partial<Tramite80210Store>;
  let tramite80210QueryMock: Partial<Tramite80210Query>;
  let registroSolicitudServiceMock: Partial<registroSolicitudImmexService>;
  let mockDatos: Plantas[];
  beforeEach(async () => {
    tramite80210StoreMock = {
      setPlantasDisponibles: jest.fn(),
      setPlantasSeleccionada: jest.fn(),
      setShowPlantas: jest.fn(),
      setRFC: jest.fn(),
    };

    tramite80210QueryMock = {
      selectTramite80210$: of({
        estados: '123',
        rfc: '432333',
        plantasDisponibles: [],
        plantasSeleccionadas: [],
        showPlantas: false,
      }),
    };
    mockDatos = [{
      id: 1,
      calle: '',
      numeroExterio: '',
      numeroInterio: '',
      codiogoPostal: '',
      colonia: '',
      municipio: '',
      entidadFederativa: '',
      pais: '',
      registroFederal: '',
      domicilio: '',
      razon: ''
    }, {
      id: 2,
      calle: '',
      numeroExterio: '',
      numeroInterio: '',
      codiogoPostal: '',
      colonia: '',
      municipio: '',
      entidadFederativa: '',
      pais: '',
      registroFederal: '',
      domicilio: '',
      razon: ''
    }]

    registroSolicitudServiceMock = {
      obtenerEstados: jest.fn(),
      obtenerFormularioDatos: jest.fn().mockReturnValue(of({ modalidad: 'A', folio: '123', ano: '2025' })),
      obtenerPlantasDatos: jest.fn().mockReturnValue(of({ datos: [{ id: 1, nombre: 'Planta 1' }] })),
    };

    await TestBed.configureTestingModule({
      declarations: [EmpresasTerciarizadasComponent],
      imports: [ReactiveFormsModule, CatalogoSelectComponent],
      providers: [
        FormBuilder,
        { provide: Tramite80210Store, useValue: tramite80210StoreMock },
        { provide: Tramite80210Query, useValue: tramite80210QueryMock },
        { provide: registroSolicitudImmexService, useValue: registroSolicitudServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresasTerciarizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the reactive form', () => {
    expect(component.empresasForm).toBeDefined();
    expect(component.empresasForm.get('rfc')).toBeDefined();
    expect(component.empresasForm.get('estado')).toBeDefined();
  });

  it('should update the form with provided data', () => {
    const datos = { modalidad: 'A', folio: '123', ano: '2025' };
    component.actualizarFormulario(datos);
    expect(component.empresasForm.get('modalidad')?.value).toBe('A');
    expect(component.empresasForm.get('folio')?.value).toBe('123');
    expect(component.empresasForm.get('ano')?.value).toBe('2025');
  });

  it('should search controladoras and update the state of plants', () => {
    component.empresasForm.get('rfc')?.setValue('RFC123');
    component.empresasForm.get('estado')?.setValue('Estado1');
    component.buscarControladoras();
    expect(component.showPlantas).toBe(true);
    expect(tramite80210StoreMock.setPlantasDisponibles).toHaveBeenCalledWith([]);
    expect(tramite80210StoreMock.setShowPlantas).toHaveBeenCalledWith(true);
    expect(component.empresasForm.get('rfc')?.value).toBeNull();
    expect(component.empresasForm.get('estado')?.value).toBe('1');
  });

  it('should segregate available and selected plants', () => {
    component.tramites80210State = {
      rfc: 'RFC123',
      estados: 'Estado1',
      plantasDisponibles: [mockDatos[0]],
      plantasSeleccionadas: [mockDatos[1]],
      showPlantas: true,
    };
    component.segregatePlantasDatos();
    expect(component.plantasDisponibles).toEqual([
      mockDatos[0]
    ]);
    expect(component.plantasSeleccionadas).toEqual([mockDatos[1]]);
  });

  it('should add selected plants avoiding duplicates', () => {
    component.listaFilaDisponibles = [mockDatos[0]];
    component.plantasSeleccionadas = [mockDatos[1]];
    component.plantasDisponibles = [mockDatos[0]];
  
    component.agregarPlantas();
  
    expect(component.plantasSeleccionadas).toEqual([mockDatos[1], mockDatos[0]]);
    expect(component.plantasDisponibles).toEqual([]);
    expect(tramite80210StoreMock.setPlantasSeleccionada).toHaveBeenCalledWith([
      mockDatos[1],
      mockDatos[0],
    ]);
  });

  it('should remove selected plants avoiding duplicates', () => {
    component.listaFilaSeleccionada = [mockDatos[1]];
    component.plantasSeleccionadas = mockDatos;
    component.plantasDisponibles = [];
  
    component.eliminarPlantas();
  
    expect(component.plantasSeleccionadas).toEqual([mockDatos[0]]);
    expect(component.plantasDisponibles).toEqual([mockDatos[1]]);
    expect(tramite80210StoreMock.setPlantasDisponibles).toHaveBeenCalledWith([
      mockDatos[1],
    ]);
  });

  it('should set values in the global state from the form', () => {
    component.empresasForm.get('rfc')?.setValue('RFC123');
    component.setValoresStore('rfc', 'setRFC');
    expect(tramite80210StoreMock.setRFC).toHaveBeenCalledWith('RFC123');
  });

  it('should clean up observables on component destroy', () => {
    const destroySpy = jest.spyOn(component.destoryNotification$, 'next');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
  });
});
