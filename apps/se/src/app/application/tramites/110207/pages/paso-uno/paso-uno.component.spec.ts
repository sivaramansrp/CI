import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { RegistroService } from '../../services/registro.service';
import { ConsultaioQuery, TIPO_PERSONA } from '@ng-mf/data-access-user';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let registroServiceMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    registroServiceMock = {
      getCatalogoById: jest.fn().mockReturnValue(of({ data: JSON.stringify({ domicilioFiscal: { entidadFederativa: ['DURANGO'] } }) })),
      getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of({})),
      actualizarEstadoFormulario: jest.fn()
    };
    consultaioQueryMock = {
      selectConsultaioState$: of({ update: false })
    };

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      providers: [
        { provide: RegistroService, useValue: registroServiceMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set esDatosRespuesta to true if consultaState.update is false in ngOnInit', () => {
    component.consultaState = { update: false } as any;
    jest.spyOn(registroServiceMock, 'getCatalogoById');
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
    expect(registroServiceMock.getCatalogoById).toHaveBeenCalledWith(21);
  });

  it('should call guardarDatosFormularios if consultaState.update is true in ngOnInit', () => {
    component.consultaState = { update: true } as any;
    jest.spyOn(component, 'guardarDatosFormularios');
    component.ngOnInit();
    expect(component.guardarDatosFormularios).toHaveBeenCalled();
  });

  it('should parse entidadFederativa from catalogo response in ngOnInit', () => {
    component.consultaState = { update: false } as any;
    component.ngOnInit();
    expect(component.entidadFederativa).toEqual(['DURANGO']);
  });

  it('should set esDatosRespuesta and call actualizarEstadoFormulario in guardarDatosFormularios', () => {
    const resp = { test: 'value' };
    registroServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(resp));
    component.esDatosRespuesta = false;
    component.guardarDatosFormularios();
    expect(component.esDatosRespuesta).toBe(true);
    expect(registroServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith(resp);
  });

  it('should set persona, domicilioFiscal and call obtenerTipoPersona in ngAfterViewInit', () => {
    component.solicitante = { obtenerTipoPersona: jest.fn() } as any;
    component.ngAfterViewInit();
    expect(component.persona).toBeDefined();
    expect(component.domicilioFiscal).toBeDefined();
    expect(component.solicitante.obtenerTipoPersona).toHaveBeenCalledWith(TIPO_PERSONA.MORAL_NACIONAL);
  });

  it('should set indice in seleccionaTab', () => {
    component.indice = 1;
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should complete destroyed$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });
});