import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { PasoUnoComponent } from './paso-uno.component';
import { CertificadosLicenciasService } from '../../services/certificados-licencias.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let certificadosLicenciasSvcMock: any;
  let consultaQueryMock: any;

  beforeEach(async () => {
    certificadosLicenciasSvcMock = {
      getConsultaDatos: jest.fn(() => of({ test: 'data' })),
      actualizarEstadoFormulario: jest.fn()
    };

    consultaQueryMock = {
      selectConsultaioState$: of({ update: false })
    };

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      providers: [
        { provide: CertificadosLicenciasService, useValue: certificadosLicenciasSvcMock },
        { provide: ConsultaioQuery, useValue: consultaQueryMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería establecer el índice cuando se llama seleccionaTab', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
  });

  it('debería establecer consultaState en ngOnInit', () => {
    component.ngOnInit();
    expect(component.consultaState).toEqual({ update: false });
  });

  it('debería llamar actualizarEstadoFormulario cuando se llama guardarDatosFormulario y existe respuesta', () => {
    component.guardarDatosFormulario();
    expect(certificadosLicenciasSvcMock.actualizarEstadoFormulario).toHaveBeenCalledWith({ test: 'data' });
  });

  it('no debería lanzar error si guardarDatosFormulario no recibe respuesta', () => {
    certificadosLicenciasSvcMock.getConsultaDatos = jest.fn(() => of(null));
    expect(() => component.guardarDatosFormulario()).not.toThrow();
  });
});