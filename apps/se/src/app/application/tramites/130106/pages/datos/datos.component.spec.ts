import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosComponent } from './datos.component';
import { of, Subject } from 'rxjs';
import { Solocitud130106Service } from '../../service/service130106.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConsultaioState } from '@ng-mf/data-access-user';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;

  const MOCK_STATE_TRUE: ConsultaioState = {
    procedureId: '1',
    parameter: 'param',
    department: 'dep',
    folioTramite: 'FOL123',
    tipoDeTramite: 'Tipo A',
    estadoDeTramite: 'Activo',
    readonly: false,
    create: true,
    update: true,
    consultaioSolicitante: null
  };

  const MOCK_STATE_FALSE: ConsultaioState = {
    ...MOCK_STATE_TRUE,
    update: false
  };

  const mockConsultaioQuery = {
    selectConsultaioState$: of(MOCK_STATE_TRUE)
  };

  const mockSolocitud130106Service = {
    getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of({ muestra: 'ok' })),
    actualizarEstadoFormulario: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [DatosComponent],
      providers: [
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
        { provide: Solocitud130106Service, useValue: mockSolocitud130106Service }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  it('should call guardarDatosFormulario when update is true', () => {
    const guardarSpy = jest.spyOn(component, 'guardarDatosFormulario');
    component.ngOnInit();
    expect(guardarSpy).toHaveBeenCalled();
  });

  it('should call service methods and set esDatosRespuesta to true when guardarDatosFormulario is called', () => {
    component.guardarDatosFormulario();
    expect(mockSolocitud130106Service.getRegistroTomaMuestrasMercanciasData).toHaveBeenCalled();
    expect(mockSolocitud130106Service.actualizarEstadoFormulario).toHaveBeenCalledWith({ muestra: 'ok' });
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should update the indice value on seleccionaTab', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });
});
