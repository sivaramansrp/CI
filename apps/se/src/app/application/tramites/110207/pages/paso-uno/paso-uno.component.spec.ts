import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { RegistroService } from '../../services/registro.service';
import { ConsultaioQuery, SolicitanteComponent } from '@ng-mf/data-access-user';
import { of, ReplaySubject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let registroServiceMock: any;
  let consultaQueryMock: any;

  beforeEach(async () => {
    registroServiceMock = {
      getCatalogoById: jest.fn().mockReturnValue(of({ data: JSON.stringify({ domicilioFiscal: { entidadFederativa: { id: 1, descripcion: 'Entidad' } } }) })),
      getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of({})),
      actualizarEstadoFormulario: jest.fn(),
    };
    consultaQueryMock = {
      selectConsultaioState$: of({ update: false }),
    };

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      imports: [SolicitanteComponent,HttpClientTestingModule],
      providers: [
        { provide: RegistroService, useValue: registroServiceMock },
        { provide: ConsultaioQuery, useValue: consultaQueryMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    component.consultaState = { update: false } as any;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set consultaState and esDatosRespuesta in ngOnInit when update is false', () => {
    component.consultaState = { update: false } as any;
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should call guardarDatosFormularios in ngOnInit when update is true', () => {
    component.consultaState = { update: true } as any;
    const guardarSpy = jest.spyOn(component, 'guardarDatosFormularios');
    component.ngOnInit();
    expect(guardarSpy).toHaveBeenCalled();
  });

  it('should call registro.getCatalogoById and set entidadFederativa in ngOnInit', () => {
    component.consultaState = { update: false } as any;
    component.ngOnInit();
    expect(registroServiceMock.getCatalogoById).toHaveBeenCalledWith(21);
    expect(component.entidadFederativa).toEqual({ id: 1, descripcion: 'Entidad' });
  });

  it('should call actualizarEstadoFormulario and set esDatosRespuesta in guardarDatosFormularios', () => {
    component.esDatosRespuesta = false;
    component.guardarDatosFormularios();
    expect(component.esDatosRespuesta).toBe(true);
    expect(registroServiceMock.actualizarEstadoFormulario).toHaveBeenCalled();
  });

  it('should set persona, domicilioFiscal and call solicitante.obtenerTipoPersona in ngAfterViewInit', () => {
    component.solicitante = {
      obtenerTipoPersona: jest.fn(),
    } as any;
    component.ngAfterViewInit();
    expect(component.persona).toBeDefined();
    expect(component.domicilioFiscal).toBeDefined();
    expect(component.solicitante.obtenerTipoPersona).toHaveBeenCalled();
  });

  it('should set indice in seleccionaTab', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should complete destroyed$ in ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });
});