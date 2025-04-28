import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosComponent } from './datos.component';
import { BtnContinuarComponent, SolicitanteComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { AccionBoton } from '../../modelos/aviso-importacion-maquinas.model';
import { PASOS } from '../../constants/aviso-importacion-maquinas.enum';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosComponent,PasoUnoComponent],
      imports: [WizardComponent,BtnContinuarComponent,SolicitanteComponent,HttpClientModule],
      providers: [
        { provide: WizardComponent, useValue: { siguiente: jest.fn(), atras: jest.fn() } }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear', () => {
    expect(component).toBeTruthy();
  });

  it('Debería inicializar pantallasPasos con PASOS', () => {
    expect(component.pantallasPasos).toEqual(PASOS);
  });

  it('debe inicializar el índice con el valor predeterminado 1', () => {
    expect(component.indice).toBe(1);
  });

  it('Debería inicializar datosPasos con valores correctos', () => {
    expect(component.datosPasos).toEqual({
      nroPasos: PASOS.length,
      indice: 1,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar'
    });
  });

  it('debe actualizar el índice y llamar a wizardComponent.siguiente cuando se llama a getValorIndice con la acción "cont"', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn()
    } as unknown as WizardComponent;

    component.getValorIndice({ valor: 2, accion: 'cont' } as AccionBoton);
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
  });

  it('debe actualizar el índice y llamar a wizardComponent.atras cuando se llama a getValorIndice con la acción "atras"', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn()
    } as unknown as WizardComponent;

    component.getValorIndice({ valor: 2, accion: 'atras' } as AccionBoton);
    expect(component.indice).toBe(2);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

  it('no se debe actualizar el índice ni llamar a los métodos wizardComponent cuando se llama a getValorIndice con un valor no válido', () => {
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