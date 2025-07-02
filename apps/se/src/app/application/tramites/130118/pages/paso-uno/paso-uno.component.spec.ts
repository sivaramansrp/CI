import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { ChangeDetectorRef } from '@angular/core';
import { of, Subject } from 'rxjs';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { HttpClientModule } from '@angular/common/http';
import { PeximService } from '../../service/pexim.service';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { SolicitudComponent } from '../../components/solicitud/solicitud.component';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let consultaQueryMock: any;
  let peximServiceMock: any;
  let cdrMock: any;

  beforeEach(async () => {
    consultaQueryMock = {
      selectConsultaioState$: of({ update: false })
    };
    peximServiceMock = {
      getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of({ foo: 'bar' })),
      actualizarEstadoFormulario: jest.fn()
    };
    cdrMock = { detectChanges: jest.fn() };

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent, SolicitudComponent],
      imports:[ SolicitanteComponent, HttpClientModule],
      providers: [
        { provide: ConsultaioQuery, useValue: consultaQueryMock },
        { provide: PeximService, useValue: peximServiceMock },
        { provide: ChangeDetectorRef, useValue: cdrMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    (component as any).cargaArchivosEvento = new Subject();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set consultaState and esDatosRespuesta=true if update is false', () => {
    component.ngOnInit();
    expect(component.consultaState).toEqual({ update: false });
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should call guardarDatosFormularios if update is true', () => {
    consultaQueryMock.selectConsultaioState$ = of({ update: true });
    const guardarSpy = jest.spyOn(component, 'guardarDatosFormularios');
    component.ngOnInit();
    expect(guardarSpy).toHaveBeenCalled();
  });

  it('should call peximService.actualizarEstadoFormulario and set esDatosRespuesta in guardarDatosFormularios', () => {
    component.esDatosRespuesta = false;
    peximServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of({ foo: 'bar' }));
    component.guardarDatosFormularios();
    expect(component.esDatosRespuesta).toBe(true);
    expect(peximServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith({ foo: 'bar' });
  });

  it('should not call actualizarEstadoFormulario if resp is falsy in guardarDatosFormularios', () => {
    peximServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(null));
    component.esDatosRespuesta = false;
    component.guardarDatosFormularios();
    expect(component.esDatosRespuesta).toBe(false);
    expect(peximServiceMock.actualizarEstadoFormulario).not.toHaveBeenCalled();
  });

  it('should set persona, domicilioFiscal and call obtenerTipoPersona and detectChanges in ngAfterViewInit', () => {
    component.solicitante = {
      obtenerTipoPersona: jest.fn()
    } as any;
    jest.useFakeTimers();
    component.ngAfterViewInit();
    jest.runAllTimers();
    expect(component.persona).toBeDefined();
    expect(component.domicilioFiscal).toBeDefined();
    expect(component.solicitante.obtenerTipoPersona).toHaveBeenCalled();
    jest.useRealTimers();
  });

  it('should update indice in seleccionaTab', () => {
    component.indice = 1;
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  
});