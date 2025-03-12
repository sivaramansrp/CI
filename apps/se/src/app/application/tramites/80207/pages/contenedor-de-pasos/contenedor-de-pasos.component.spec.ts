import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContenedorDePasosComponent } from './contenedor-de-pasos.component';
import {
  BtnContinuarComponent,
  SolicitanteComponent,
  WizardComponent,
} from '@ng-mf/data-access-user';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { HttpClientModule } from '@angular/common/http';

describe('ContenedorDePasosComponent', () => {
  let component: ContenedorDePasosComponent;
  let fixture: ComponentFixture<ContenedorDePasosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContenedorDePasosComponent,PasoUnoComponent],
      imports: [WizardComponent, BtnContinuarComponent, SolicitanteComponent,HttpClientModule],
    }).compileComponents();
    fixture = TestBed.createComponent(ContenedorDePasosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.indice).toBe(1);
    expect(component.pasos.length).toBeGreaterThan(0);
    expect(component.datosPasos.nroPasos).toBe(component.pasos.length);
    expect(component.datosPasos.indice).toBe(component.indice);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should update indice and call wizardComponent.siguiente() on getValorIndice with accion "cont"', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as any;

    const accionBoton = { accion: 'cont', valor: 2 };
    component.getValorIndice(accionBoton);

    expect(component.indice).toBe(accionBoton.valor);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('should update indice and call wizardComponent.atras() on getValorIndice with accion "atras"', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as any;

    const accionBoton = { accion: 'atras', valor: 2 };
    component.getValorIndice(accionBoton);

    expect(component.indice).toBe(accionBoton.valor);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('should not update indice or call wizardComponent methods if valor is out of range', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as any;

    const accionBoton = { accion: 'cont', valor: 5 };
    component.getValorIndice(accionBoton);

    expect(component.indice).not.toBe(accionBoton.valor);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });
});
