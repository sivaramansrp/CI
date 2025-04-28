import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsumosComponent } from './insumos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { SolicitudDeRegistroTplService } from '../../services/solicitud-de-registro-tpl.service';
import { ServicioDeFormularioService } from '../../services/forma-servicio/servicio-de-formulario.service';
import { Tramite120101Store } from '../../../../estados/tramites/tramite120101.store';
import { Tramite120101Query } from '../../../../estados/queries/tramite120101.query';
import { InsumosTabla } from '../../models/insumos.model';

describe('InsumosComponent', () => {
  let component: InsumosComponent;
  let fixture: ComponentFixture<InsumosComponent>;
  let solicitudDeRegistroTplServiceMock: any;
  let servicioDeFormularioServiceMock: any;
  let tramite120101StoreMock: any;
  let tramite120101QueryMock: any;

  beforeEach(async () => {
    solicitudDeRegistroTplServiceMock = {
      obtenerDatosTablaInsumos: jest.fn().mockReturnValue(of([])),
      obtenerDatosFraccionArancelaria: jest.fn().mockReturnValue(of([])),
      obtenerDatosEstados: jest.fn().mockReturnValue(of([])),
    };

    servicioDeFormularioServiceMock = {
      registerForm: jest.fn(),
      setFormValue: jest.fn(),
      establecerTablaInsumos: jest.fn(),
      obtenerTablaInsumos: jest.fn().mockReturnValue([]),
    };

    tramite120101StoreMock = {
      setDynamicFieldValue: jest.fn(),
    };

    tramite120101QueryMock = {
      selectSolicitudDeRegistroTpl$: of({}),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [InsumosComponent],
      providers: [
        { provide: SolicitudDeRegistroTplService, useValue: solicitudDeRegistroTplServiceMock },
        { provide: ServicioDeFormularioService, useValue: servicioDeFormularioServiceMock },
        { provide: Tramite120101Store, useValue: tramite120101StoreMock },
        { provide: Tramite120101Query, useValue: tramite120101QueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the component and call required methods', () => {
    const obtenerDatosTablaInsumosSpy = jest.spyOn(component, 'obtenerDatosTablaInsumos');
    const obtenerDatosFraccionArancelariaSpy = jest.spyOn(component, 'obtenerDatosFraccionArancelaria');
    const obtenerDatosEstadosSpy = jest.spyOn(component, 'obtenerDatosEstados');

    component.ngOnInit();

    expect(obtenerDatosTablaInsumosSpy).toHaveBeenCalled();
    expect(obtenerDatosFraccionArancelariaSpy).toHaveBeenCalled();
    expect(obtenerDatosEstadosSpy).toHaveBeenCalled();
    expect(servicioDeFormularioServiceMock.registerForm).toHaveBeenCalledWith('insumosForm', component.ninoFormGroup);
  });

  it('should fetch and set tablaInsumos when obtenerDatosTablaInsumos is called', () => {
    const mockData: InsumosTabla[] = [{ DescripcionDelInsumo: 'Test Insumo', FraccionArancelaria: '123', PaisDeOrigen: 'Mexico' }];
    solicitudDeRegistroTplServiceMock.obtenerDatosTablaInsumos.mockReturnValue(of(mockData));

    component.obtenerDatosTablaInsumos();

    expect(component.tablaInsumos).toEqual(mockData);
  });

  it('should handle empty response in obtenerDatosTablaInsumos', () => {
    solicitudDeRegistroTplServiceMock.obtenerDatosTablaInsumos.mockReturnValue(of([]));

    component.obtenerDatosTablaInsumos();

    expect(component.tablaInsumos).toEqual([]);
  });

  it('should fetch and set fraccionArancelaria options when obtenerDatosFraccionArancelaria is called', () => {
    const mockData = [{ id: 1, descripcion: 'Test Fracción' }];
    solicitudDeRegistroTplServiceMock.obtenerDatosFraccionArancelaria.mockReturnValue(of(mockData));

    component.obtenerDatosFraccionArancelaria();

    const fraccionField = component.insumosFormData.find((field) => field.campo === 'descfraccion');
    expect(fraccionField?.opciones).toEqual([{ id: 1, descripcion: 'Test Fracción' }]);
  });

  it('should handle empty response in obtenerDatosFraccionArancelaria', () => {
    solicitudDeRegistroTplServiceMock.obtenerDatosFraccionArancelaria.mockReturnValue(of([]));

    component.obtenerDatosFraccionArancelaria();

    const fraccionField = component.insumosFormData.find((field) => field.campo === 'descfraccion');
    expect(fraccionField?.opciones).toBeUndefined();
  });

  it('should fetch and set paisDeOrigen options when obtenerDatosEstados is called', () => {
    const mockData = [{ id: 1, descripcion: 'Mexico' }];
    solicitudDeRegistroTplServiceMock.obtenerDatosEstados.mockReturnValue(of(mockData));

    component.obtenerDatosEstados();

    const paisField = component.insumosFormData.find((field) => field.campo === 'Pais');
    expect(paisField?.opciones).toEqual([{ id: 1, descripcion: 'Mexico' }]);
  });

  it('should handle empty response in obtenerDatosEstados', () => {
    solicitudDeRegistroTplServiceMock.obtenerDatosEstados.mockReturnValue(of([]));

    component.obtenerDatosEstados();

    const paisField = component.insumosFormData.find((field) => field.campo === 'Pais');
    expect(paisField?.opciones).toBeUndefined();
  });

  it('should add a new insumo to tablaInsumos when agregarInsumo is called', () => {
    component.ninoFormGroup.setValue({
      descripcionInsumo: 'Test Descripción',
      fraccion: 'Test Fracción',
      Pais: 'Test País',
    });

    component.agregarInsumo();

    expect(component.tablaInsumos).toEqual([
      {
        DescripcionDelInsumo: 'Test Descripción',
        FraccionArancelaria: 'Test Fracción',
        PaisDeOrigen: 'Test País',
      },
    ]);
    expect(servicioDeFormularioServiceMock.establecerTablaInsumos).toHaveBeenCalledWith(component.tablaInsumos);
  });

  it('should not add a new insumo if the form is invalid', () => {
    component.ninoFormGroup.setValue({
      descripcionInsumo: '',
      fraccion: '',
      Pais: '',
    });

    component.agregarInsumo();

    expect(component.tablaInsumos).toEqual([]);
    expect(servicioDeFormularioServiceMock.establecerTablaInsumos).not.toHaveBeenCalled();
  });

  it('should call setDynamicFieldValue and setFormValue when establecerCambioDeValor is called', () => {
    const event = { campo: 'testCampo', valor: 'testValor' };

    component.establecerCambioDeValor(event);

    expect(tramite120101StoreMock.setDynamicFieldValue).toHaveBeenCalledWith(event.campo, event.valor);
    expect(servicioDeFormularioServiceMock.setFormValue).toHaveBeenCalledWith('insumosForm', {
      [event.campo]: event.valor,
    });
  });

  it('should do nothing if establecerCambioDeValor is called with null', () => {
    const setDynamicFieldValueSpy = jest.spyOn(tramite120101StoreMock, 'setDynamicFieldValue');
    const setFormValueSpy = jest.spyOn(servicioDeFormularioServiceMock, 'setFormValue');

    component.establecerCambioDeValor(null as any);

    expect(setDynamicFieldValueSpy).not.toHaveBeenCalled();
    expect(setFormValueSpy).not.toHaveBeenCalled();
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});