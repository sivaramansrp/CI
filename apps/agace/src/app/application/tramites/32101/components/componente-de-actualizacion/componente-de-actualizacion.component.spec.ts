// @ts-nocheck
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Observable, of as observableOf } from 'rxjs';
import { ComponenteDeActualizacionComponent } from './componente-de-actualizacion.component';
import { ConsultaAvisoAcreditacionService } from '../../services/consulta-aviso-acreditacion.service';
import { Tramite32101Store } from '../../../../estados/tramites/tramite32101.store';
import { Tramite32101Query } from '../../../../estados/queries/tramite32101.query';
import { Router } from '@angular/router';

@Injectable()
class MockConsultaAvisoAcreditacionService {
  getListaDeDocumentos = jest.fn().mockReturnValue(observableOf({ data: [] }));
  setUpdatedRow = jest.fn();
}

@Injectable()
class MockTramite32101Store {
  setDatosDelContenedor = jest.fn();
}

@Injectable()
class MockTramite32101Query {
  selectSolicitud$ = observableOf({ abc: { id: 1 } });
}

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom;
}

describe('ComponenteDeActualizacionComponent', () => {
  let fixture: ComponentFixture<ComponenteDeActualizacionComponent>;
  let component: ComponenteDeActualizacionComponent;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteDeActualizacionComponent, FormsModule, ReactiveFormsModule],
      declarations: [MyCustomDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        { provide: ConsultaAvisoAcreditacionService, useClass: MockConsultaAvisoAcreditacionService },
        { provide: Tramite32101Store, useClass: MockTramite32101Store },
        { provide: Tramite32101Query, useClass: MockTramite32101Query },
        {
          provide: Router,
          useValue: {
            url: '/agace/consulta-aviso-acreditacion/solicitud',
            navigate: jest.fn()
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ComponenteDeActualizacionComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    component.ngOnDestroy();
    fixture.destroy();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should run ngOnInit()', () => {
    jest.spyOn(component, 'initForm');
    jest.spyOn(component, 'fetchListaDeDocumentos');
    jest.spyOn(component, 'fetchListaDeInversion');
    component.ngOnInit();
    expect(component.initForm).toHaveBeenCalled();
    expect(component.fetchListaDeDocumentos).toHaveBeenCalled();
    expect(component.fetchListaDeInversion).toHaveBeenCalled();
  });

  it('should run initForm()', () => {
    component.solicitudState = {
      abc: {
        tipoDeInversion: 1,
        descripcionGeneral: 'desc',
        valorEnPesos: 1000,
        formaAdquisicion: 2,
      }
    };
    component.initForm();
    expect(component.modificarFormulario).toBeTruthy();
    expect(component.modificarFormulario.value.descripcionGeneral).toEqual('desc');
  });

  it('should run fetchListaDeDocumentos()', () => {
    component.solicitudState = { abc: { tipoDeInversion: 'tipo' } };
    component.modificarFormulario = component.fb.group({ tipoDeInversion: [''] });

    const mockData = [{ id: 1, descripcion: 'tipo' }];
    component.consultaAvisoAcreditacionService.getListaDeDocumentos = jest.fn().mockReturnValue(observableOf({
      data: mockData
    }));

    component.fetchListaDeDocumentos();

    expect(component.modificarFormulario.get('tipoDeInversion')?.value).toEqual(1);
  });

  it('should run fetchListaDeInversion()', () => {
    component.solicitudState = { abc: { formaAdquisicion: 'forma' } };

    const mockCatalog = [{ id: 5, descripcion: 'forma' }];
    component.consultaAvisoAcreditacionService.getListaDeDocumentos = jest.fn().mockReturnValue(
      observableOf({ data: mockCatalog })
    );

    component.modificarFormulario = component.fb.group({ formaAdquisicion: [''] });

    component.fetchListaDeInversion();

    expect(component.modificarFormulario.get('formaAdquisicion')?.value).toEqual(5);
  });

  it('should return label from getDropdownLabel()', () => {
    const result = ComponenteDeActualizacionComponent.getDropdownLabel(2, [
      { id: 1, descripcion: 'Uno' },
      { id: 2, descripcion: 'Dos' }
    ]);
    expect(result).toBe('Dos');
  });

  it('should return empty string from getDropdownLabel() when not found', () => {
    const result = ComponenteDeActualizacionComponent.getDropdownLabel(99, [
      { id: 1, descripcion: 'Uno' },
      { id: 2, descripcion: 'Dos' }
    ]);
    expect(result).toBe('');
  });

  it('should run onGuardarCambios() and call service/store', () => {
  jest.useFakeTimers();

  component.solicitudState = { abc: { id: 123 } };
  component.tramiteList.catalogos = [{ id: 1, descripcion: 'Inversión' }];
  component.aduana.catalogos = [{ id: 2, descripcion: 'Adquisición' }];
  component.modificarFormulario = component.fb.group({
    tipoDeInversion: [1],
    descripcionGeneral: ['test desc'],
    valorEnPesos: [500],
    formaAdquisicion: [2]
  });

  component.configuracionTablaDatos = [];

  const spyNavigate = jest.spyOn(router, 'navigate');

  component.onGuardarCambios();

  expect(component.configuracionTablaDatos.length).toBe(1);
  expect(component.configuracionTablaDatos[0].tipoDeInversion).toBe('Inversión');
  expect(component.configuracionTablaDatos[0].formaAdquisicion).toBe('Adquisición');

  jest.advanceTimersByTime(100);

  expect(spyNavigate).toHaveBeenCalledWith(['/agace/consulta-aviso-acreditacion/solicitud']);

  jest.useRealTimers();
});
});
