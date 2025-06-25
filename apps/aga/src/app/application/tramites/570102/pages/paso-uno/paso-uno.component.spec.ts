import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { FormBuilder } from '@angular/forms';
import { ReplaySubject, of } from 'rxjs';
import { ConsultaioQuery, SolicitanteComponent } from '@ng-mf/data-access-user';
import { SolicitudService } from '../../service/solicitud.service';
import { EventEmitter } from '@angular/core';

const PERSONA_MORAL_NACIONAL = [{ campo: 'nombre' }];
const DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL = [{ campo: 'domicilio' }];
const TIPO_PERSONA = { MORAL_NACIONAL: 1 };

class MockSolicitanteComponent {
  obtenerTipoPersona = jest.fn();
}

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let consultaQueryMock: any;
  let solicitudServiceMock: any;

  beforeEach(async () => {
    consultaQueryMock = {
      selectConsultaioState$: of({ update: true })
    };
    solicitudServiceMock = {
      getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of({ folio: 'f', motivoDelDes: 'm' })),
      actualizarEstadoFormulario: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      imports: [SolicitanteComponent],
      providers: [
        FormBuilder,
        { provide: ConsultaioQuery, useValue: consultaQueryMock },
        { provide: SolicitudService, useValue: solicitudServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    (component as any).persona = PERSONA_MORAL_NACIONAL;
    (component as any).domicilioFiscal = DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL;
    (component as any).solicitante = new MockSolicitanteComponent();
    component.indiceNombre = new EventEmitter<number>();
    component.destroyed$ = new ReplaySubject(1);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set persona, domicilioFiscal and call obtenerTipoPersona on ngAfterViewInit', () => {
    component.ngAfterViewInit();
    expect(component.persona).toEqual(PERSONA_MORAL_NACIONAL);
    expect(component.domicilioFiscal).toEqual(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL);
    expect(component.solicitante.obtenerTipoPersona).toHaveBeenCalledWith(TIPO_PERSONA.MORAL_NACIONAL);
  });

  it('should emit indice and set indice on seleccionaTab', () => {
    const emitSpy = jest.spyOn(component.indiceNombre, 'emit');
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
    expect(emitSpy).toHaveBeenCalledWith(3);
  });

  it('should set consultaState and call guardarDatosFormularios if update is true in ngOnInit', () => {
    const guardarSpy = jest.spyOn(component, 'guardarDatosFormularios');
    component.ngOnInit();
    expect(component.consultaState).toBeDefined();
    expect(guardarSpy).toHaveBeenCalled();
  });

  it('should set esDatosRespuesta to true if update is false in ngOnInit', () => {
    consultaQueryMock.selectConsultaioState$ = of({ update: false });
    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    component.indiceNombre = new EventEmitter<number>();
    component.destroyed$ = new ReplaySubject(1);
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('guardarDatosFormularios should set esDatosRespuesta and call actualizarEstadoFormulario', () => {
    component.esDatosRespuesta = false;
    component.guardarDatosFormularios();
    expect(component.esDatosRespuesta).toBe(true);
    expect(solicitudServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith({ folio: 'f', motivoDelDes: 'm' });
  });

  it('should complete destroyed$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component.destroyed$, 'next');
    const completeSpy = jest.spyOn(component.destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });
});