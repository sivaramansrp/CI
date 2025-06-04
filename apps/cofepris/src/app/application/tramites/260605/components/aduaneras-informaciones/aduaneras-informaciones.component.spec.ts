import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepresentanteComponent } from '../representante/representante.component';
import { FormBuilder, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Tramite260605Store } from '../../../../estados/tramites/tramite260605.store';
import { Tramite260605Query } from '../../../../estados/queries/tramite260605.query';
import { ModificatNoticeService } from '../../services/modificat-notice.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';

describe('RepresentanteComponent', () => {
  let component: RepresentanteComponent;
  let fixture: ComponentFixture<RepresentanteComponent>;
  let tramite260605StoreMock: jest.Mocked<Tramite260605Store>;
  let tramite260605QueryMock: any;
  let modificatNoticeServiceMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    tramite260605StoreMock = {
      setRfc: jest.fn(),
      setNombre: jest.fn(),
      setApellidoPaterno: jest.fn(),
      setApellidoMaterno: jest.fn(),
    } as any;

    tramite260605QueryMock = {
      selectSolicitud$: of({
        rfc: 'RFC123',
        nombre: 'Juan',
        apellidoPaterno: 'Pérez',
        apellidoMaterno: 'Gómez',
      }),
    };

    modificatNoticeServiceMock = {
      ObtenerReprestantanteData: jest.fn().mockReturnValue(of({
        nombre: 'Juan',
        apellidoPaterno: 'Pérez',
        apellidoMaterno: 'Gómez',
      })),
    };

    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [RepresentanteComponent],
      providers: [
        FormBuilder,
        { provide: Tramite260605Store, useValue: tramite260605StoreMock },
        { provide: Tramite260605Query, useValue: tramite260605QueryMock },
        { provide: ModificatNoticeService, useValue: modificatNoticeServiceMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RepresentanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario con los valores del store', () => {
    component.inicializarFormulario();
    expect(component.representante.value).toEqual({
      rfc: 'RFC123',
      nombre: 'Juan',
      apellidoPaterno: 'Pérez',
      apellidoMaterno: 'Gómez',
    });
    expect(component.representante.get('nombre')?.disabled).toBe(true);
    expect(component.representante.get('apellidoPaterno')?.disabled).toBe(true);
    expect(component.representante.get('apellidoMaterno')?.disabled).toBe(true);
  });

  it('debe deshabilitar el formulario si es solo lectura en guardarDatosFormulario', () => {
    component.esFormularioSoloLectura = true;
    component.inicializarFormulario();
    component.guardarDatosFormulario();
    expect(component.representante.disabled).toBe(true);
  });

  it('debe habilitar el formulario si no es solo lectura en guardarDatosFormulario', () => {
    component.esFormularioSoloLectura = false;
    component.inicializarFormulario();
    component.guardarDatosFormulario();
    expect(component.representante.enabled).toBe(true);
  });

  it('debe llamar a guardarDatosFormulario si es solo lectura en inicializarEstadoFormulario', () => {
    const spy = jest.spyOn(component, 'guardarDatosFormulario');
    component.esFormularioSoloLectura = true;
    component.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('debe llamar a inicializarFormulario si no es solo lectura en inicializarEstadoFormulario', () => {
    const spy = jest.spyOn(component, 'inicializarFormulario');
    component.esFormularioSoloLectura = false;
    component.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('debe inicializar el formulario al llamar ngOnInit', () => {
    const spy = jest.spyOn(component, 'inicializarEstadoFormulario');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('debe obtener los datos del representante y actualizar el formulario', () => {
    component.inicializarFormulario();
    component.obtenerAduanasDisponiblesDatos();
    expect(modificatNoticeServiceMock.ObtenerReprestantanteData).toHaveBeenCalled();
    expect(component.representante.get('nombre')?.value).toBe('Juan');
    expect(component.representante.get('apellidoPaterno')?.value).toBe('Pérez');
    expect(component.representante.get('apellidoMaterno')?.value).toBe('Gómez');
  });

  it('debe llamar al método correspondiente del store en setValoresStore', () => {
    component.inicializarFormulario();
    component.representante.get('rfc')?.setValue('RFC999');
    component.setValoresStore(component.representante, 'rfc', 'setRfc');
    expect(tramite260605StoreMock.setRfc).toHaveBeenCalledWith('RFC999');
  });

  it('debe limpiar el subject al destruir el componente', () => {
    const spy = jest.spyOn((component as any).destroyNotifier$, 'next');
    const spy2 = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });
});