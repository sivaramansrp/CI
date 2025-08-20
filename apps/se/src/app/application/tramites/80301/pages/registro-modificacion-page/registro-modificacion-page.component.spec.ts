import { TestBed } from '@angular/core/testing';
import { RegistroModificacionPageComponent } from './registro-modificacion-page.component';
import { BtnContinuarComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { PASOS_EXPORTACION } from '../../constantes/elegibilidad-de-textiles.enums';
import { PasoUnoComponent } from './paso-uno/paso-uno.component';
import { PasoTresComponent } from './paso-tres/paso-tres.component';
import { PasoDosComponent } from './paso-dos/paso-dos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr/toastr/toastr.service';
import { ToastrModule } from 'ngx-toastr';
import { of } from 'rxjs';

describe('RegistroModificacionPageComponent', () => {
  let component: RegistroModificacionPageComponent;
  let fixture: any;
  let wizardComponentSpy: jest.Mocked<WizardComponent>;

  beforeEach(async () => {
    wizardComponentSpy = {
      siguiente: jest.fn(() => of()),
      atras: jest.fn(() => of()),
    } as any;

    await TestBed.configureTestingModule({
      imports: [
        RegistroModificacionPageComponent,
        WizardComponent,
        PasoUnoComponent,
        PasoTresComponent,
        PasoDosComponent,
        BtnContinuarComponent,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
      ],
      providers:[]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroModificacionPageComponent);
    component = fixture.componentInstance;
    (component as any).wizardComponent = wizardComponentSpy;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pasosSolicitar from PASOS_EXPORTACION', () => {
    expect(component.pasosSolicitar).toBe(PASOS_EXPORTACION);
  });

  it('should initialize datosPasos correctly', () => {
    expect(component.datosPasos.nroPasos).toBe(PASOS_EXPORTACION.length);
    expect(component.datosPasos.indice).toBe(1);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should update indice and call wizardComponent.siguiente on "cont" action', () => {
    const accion = { valor: 2, accion: 'cont' };
    component.wizardComponent = {
      siguiente: jest.fn(() => of()),
      atras: jest.fn(() => of()),
    } as any;
    component.getValorIndice(accion);
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });

  it('should update indice and call wizardComponent.atras on "ant" action', () => {
    const accion = { valor: 1, accion: 'ant' };
    component.wizardComponent = {
      siguiente: jest.fn(() => of()),
      atras: jest.fn(() => of()),
    } as any;
    component.getValorIndice(accion);
    expect(component.indice).toBe(1);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  });

  it('should not update indice or call wizardComponent if valor is out of range', () => {
    const initialIndice = component.indice;
    component.wizardComponent = {
      siguiente: jest.fn(() => of()),
      atras: jest.fn(() => of()),
    } as any;
    component.getValorIndice({ valor: 0, accion: 'cont' });
    expect(component.indice).toBe(initialIndice);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();

    component.getValorIndice({
      valor: PASOS_EXPORTACION.length + 1,
      accion: 'ant',
    });
    expect(component.indice).toBe(initialIndice);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });

  it('should call wizardComponent.siguiente only when accion is "cont" and valor is valid', () => {
    const accion = { valor: 2, accion: 'cont' };
    component.wizardComponent = {
      siguiente: jest.fn(() => of()),
      atras: jest.fn(() => of()),
    } as any;
    component.getValorIndice(accion);
    expect(component.wizardComponent.siguiente).toHaveBeenCalledTimes(1);
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });

  it('should call wizardComponent.atras only when accion is not "cont" and valor is valid', () => {
    const accion = { valor: 2, accion: 'ant' };
    component.wizardComponent = {
      siguiente: jest.fn(() => of()),
      atras: jest.fn(() => of()),
    } as any;
    component.getValorIndice(accion);
    expect(component.wizardComponent.atras).toHaveBeenCalledTimes(1);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  });

  it('should not call wizardComponent methods if valor is less than 1', () => {
    component.wizardComponent = {
      siguiente: jest.fn(() => of()),
      atras: jest.fn(() => of()),
    } as any;
    component.getValorIndice({ valor: 0, accion: 'cont' });
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });

  it('should not call wizardComponent methods if valor is greater than nroPasos', () => {
     component.wizardComponent = {
      siguiente: jest.fn(() => of()),
      atras: jest.fn(() => of()),
    } as any;
    component.getValorIndice({ valor: PASOS_EXPORTACION.length + 1, accion: 'cont' });
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });

  it('should update indice to the correct value when valor is valid', () => {
    component.wizardComponent = {
      siguiente: jest.fn(() => of()),
      atras: jest.fn(() => of()),
    } as any;
    component.getValorIndice({ valor: 3, accion: 'cont' });
    expect(component.indice).toBe(3);
  });

  it('should not update indice when valor is invalid', () => {
    const initialIndice = component.indice;
    component.wizardComponent = {
      siguiente: jest.fn(() => of()),
      atras: jest.fn(() => of()),
    } as any;
    component.getValorIndice({ valor: -1, accion: 'cont' });
    expect(component.indice).toBe(initialIndice);
  });

  it('should handle edge case when valor is exactly 1', () => {
    component.wizardComponent = {
      siguiente: jest.fn(() => of()),
      atras: jest.fn(() => of()),
    } as any;
    component.getValorIndice({ valor: 1, accion: 'cont' });
    expect(component.indice).toBe(1);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should handle edge case when valor is exactly nroPasos', () => {
    const lastStep = PASOS_EXPORTACION.length;
    component.wizardComponent = {
      siguiente: jest.fn(() => of()),
      atras: jest.fn(() => of()),
    } as any;
    component.getValorIndice({ valor: lastStep, accion: 'cont' });
    expect(component.indice).toBe(lastStep);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });
});
