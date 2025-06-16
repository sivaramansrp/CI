import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PantallasComponent } from './pantallas.component';
import { WizardComponent } from '@libs/shared/data-access-user/src';
import { PANTA_PASOS } from '@ng-mf/data-access-user';
import { AccionBoton } from '@ng-mf/data-access-user';
import { ValidacionDeFormularioService } from '../../services/forma-servicio/validacion-de-formulario.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'; 

describe('PantallasComponent', () => {
  let component: PantallasComponent;
  let fixture: ComponentFixture<PantallasComponent>;
  let validacionDeFormularioServiceMock: any;
  let consultaQueryMock: any;

  beforeEach(async () => {
    validacionDeFormularioServiceMock = {
      isFormValid: jest.fn().mockReturnValue(true)
    };
    consultaQueryMock = {
      selectConsultaioState$: of({ update: false })
    };

    await TestBed.configureTestingModule({
      declarations: [PantallasComponent],
      providers: [
        { provide: ValidacionDeFormularioService, useValue: validacionDeFormularioServiceMock },
        { provide: ConsultaioQuery, useValue: consultaQueryMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] 
    }).compileComponents();

    fixture = TestBed.createComponent(PantallasComponent);
    component = fixture.componentInstance;
   
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as unknown as WizardComponent;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pantallasPasos with PANTA_PASOS', () => {
    expect(component.pantallasPasos).toBe(PANTA_PASOS);
  });

  it('should have a default index value of 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should set indiceDePestanaSeleccionada to event value on pestanaCambiado', () => {
    component.pestanaCambiado(3);
    expect(component.indiceDePestanaSeleccionada).toBe(3);
  });

  it('should reset indiceDePestanaSeleccionada to 1 if event is invalid', () => {
    component.indiceDePestanaSeleccionada = 5;
    component.pestanaCambiado(undefined as any);
    expect(component.indiceDePestanaSeleccionada).toBe(1);
  });

  it('should update indice and call wizardComponent.siguiente for accion "cont"', () => {
    const accionBoton: AccionBoton = { accion: 'cont', valor: 2 };
    component.getValorIndice(accionBoton);
    expect(component.indice).toBe(2);
    expect(component.datosPasos.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should update indice and call wizardComponent.atras for accion not "cont"', () => {
    const accionBoton: AccionBoton = { accion: 'ant', valor: 2 };
    component.getValorIndice(accionBoton);
    expect(component.indice).toBe(2);
    expect(component.datosPasos.indice).toBe(2);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('should not update indice if valor is out of range', () => {
    component.indice = 1;
    component.getValorIndice({ accion: 'cont', valor: 0 });
    expect(component.indice).toBe(1);
    component.getValorIndice({ accion: 'cont', valor: 99 });
    expect(component.indice).toBe(1);
  });

  it('should reset indiceDePestanaSeleccionada to 1 if valor !== 1', () => {
    component.indiceDePestanaSeleccionada = 5;
    component.getValorIndice({ accion: 'cont', valor: 2 });
    expect(component.indiceDePestanaSeleccionada).toBe(1);
  });

  it('should not reset indiceDePestanaSeleccionada if valor === 1', () => {
    component.indiceDePestanaSeleccionada = 5;
    component.getValorIndice({ accion: 'cont', valor: 1 });
    expect(component.indiceDePestanaSeleccionada).toBe(5);
  });

  it('should return programaSeleccionadoFormValid as true if form is valid', () => {
    validacionDeFormularioServiceMock.isFormValid.mockReturnValue(true);
    expect(component.programaSeleccionadoFormValid).toBe(true);
  });

  it('should return programaSeleccionadoFormValid as false if form is invalid', () => {
    validacionDeFormularioServiceMock.isFormValid.mockReturnValue(false);
    expect(component.programaSeleccionadoFormValid).toBe(false);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should subscribe to consultaQuery.selectConsultaioState$ on ngOnInit', () => {
    component.consultaState = undefined as any;
    component.ngOnInit();
    expect(component.consultaState).toEqual({ update: false });
  });
});