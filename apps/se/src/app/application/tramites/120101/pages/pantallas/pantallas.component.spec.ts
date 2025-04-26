import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PantallasComponent } from './pantallas.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import {
  AccionBoton,
  AlertComponent,
  BtnContinuarComponent,
  WizardComponent,
} from '@libs/shared/data-access-user/src';
import { DatosGeneralesComponent } from '../../components/datos-generales/datos-generales.component';
import { DomicilioFiscalComponent } from '../../components/domicilio-fiscal/domicilio-fiscal.component';
import { ConsultarCupoComponent } from '../../components/consultar-cupo/consultar-cupo.component';
import { DescripcionDelCupoComponent } from '../../components/descripcion-del-cupo/descripcion-del-cupo.component';
import { RepresentacionFederalComponent } from '../../components/representacion-federal/representacion-federal.component';
import { BienFinalComponent } from '../../components/bien-final/bien-final.component';
import { ServicioDeFormularioService } from '../../services/forma-servicio/servicio-de-formulario.service';
import { CUPOS_PASOS } from '../../constantes/solicitud-de-registro-tpl.enum';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';

describe('PantallasComponent', () => {
  let component: PantallasComponent;
  let fixture: ComponentFixture<PantallasComponent>;
  let mockServicioDeFormularioService: any;

  beforeEach(async () => {
    mockServicioDeFormularioService = {
      isFormValid: jest.fn().mockReturnValue(true),
      registerForm: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [PantallasComponent, PasoUnoComponent, PasoDosComponent],
      imports: [
        WizardComponent,
        AlertComponent,
        BtnContinuarComponent,
        DatosGeneralesComponent,
        DomicilioFiscalComponent,
        ConsultarCupoComponent,
        DescripcionDelCupoComponent,
        RepresentacionFederalComponent,
        BienFinalComponent,
      ],
      providers: [
        { provide: ServicioDeFormularioService, useValue: mockServicioDeFormularioService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PantallasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should initialize component properties correctly', () => {
    expect(component.pantallasPasos).toEqual(CUPOS_PASOS);
    expect(component.indice).toBe(1);
    expect(component.datosPasos.nroPasos).toBe(component.pantallasPasos.length);
    expect(component.datosPasos.indice).toBe(1);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should return true if all forms are valid in verificarLaValidezDelFormulario', () => {
    mockServicioDeFormularioService.isFormValid.mockReturnValue(true);
    const result = component.verificarLaValidezDelFormulario();
    expect(result).toBe(true);
  });

  it('should return false if any form is invalid in verificarLaValidezDelFormulario', () => {
    mockServicioDeFormularioService.isFormValid
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true);
    const result = component.verificarLaValidezDelFormulario();
    expect(result).toBe(false);
  });

  it('should update indice and call wizardComponent.siguiente() when "cont" action is triggered and form is valid', fakeAsync(() => {
    const accionBoton: AccionBoton = { valor: 2, accion: 'cont' };
    component.getValorIndice(accionBoton);
    tick();
    expect(component.indice).toBe(2);
    expect(component.datosPasos.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  }));

  it('should not update indice and not call wizardComponent.siguiente() when form is invalid', fakeAsync(() => {
    mockServicioDeFormularioService.isFormValid.mockReturnValue(false);
    const accionBoton: AccionBoton = { valor: 2, accion: 'cont' };
    component.getValorIndice(accionBoton);
    tick();
    expect(component.indice).toBe(1);
    expect(component.datosPasos.indice).toBe(1);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  }));

});
