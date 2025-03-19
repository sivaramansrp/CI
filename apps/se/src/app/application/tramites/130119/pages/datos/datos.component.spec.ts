import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosComponent } from './datos.component';
import { WizardComponent } from '@libs/shared/data-access-user/src';
import { AccionBoton } from '../../modelos/aviso-importacion-maquinas.model';
import { PASOS } from '../../constants/aviso-importacion-maquinas.enum';

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosComponent],
      providers: [
        { provide: WizardComponent, useValue: { siguiente: jest.fn(), atras: jest.fn() } }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pantallasPasos with PASOS', () => {
    expect(component.pantallasPasos).toEqual(PASOS);
  });

  it('should initialize indice with default value 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should initialize datosPasos with correct values', () => {
    expect(component.datosPasos).toEqual({
      nroPasos: PASOS.length,
      indice: 1,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar'
    });
  });

  it('should update indice and call wizardComponent.siguiente when getValorIndice is called with accion "cont"', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn()
    } as unknown as WizardComponent;

    component.getValorIndice({ valor: 2, accion: 'cont' } as AccionBoton);
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should update indice and call wizardComponent.atras when getValorIndice is called with accion "atras"', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn()
    } as unknown as WizardComponent;

    component.getValorIndice({ valor: 2, accion: 'atras' } as AccionBoton);
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('should not update indice or call wizardComponent methods when getValorIndice is called with invalid valor', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn()
    } as unknown as WizardComponent;

    component.getValorIndice({ valor: 5, accion: 'cont' } as AccionBoton);
    expect(component.indice).toBe(1);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });
});