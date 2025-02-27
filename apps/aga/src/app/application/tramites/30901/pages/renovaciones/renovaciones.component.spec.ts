import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { RenovacionesComponent } from './renovaciones.component';
import { BtnContinuarComponent, RenovacionesPasos, WizardComponent } from '@ng-mf/data-access-user';


describe('RenovacionesComponent', () => {
  let component: RenovacionesComponent;
  let fixture: ComponentFixture<RenovacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HttpClientTestingModule
      ],
      declarations: [
        RenovacionesComponent,
        WizardComponent,
        BtnContinuarComponent,
        PasoUnoComponent,
        PasoDosComponent,
        PasoTresComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RenovacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pasos with RenovacionesPasos', () => {
    expect(component.pasos).toEqual(RenovacionesPasos);
  });

  it('should initialize indice with 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should initialize datosPasos correctly', () => {
    expect(component.datosPasos).toEqual({
      nroPasos: component.pasos.length,
      indice: component.indice,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar'
    });
  });

  it('should update indice and call wizardComponent.siguiente on getValorIndice with accion "cont"', () => {
    const spy = jest.spyOn(component.wizardComponent, 'siguiente');
    component.getValorIndice({ accion: 'cont', valor: 2 });
    expect(component.indice).toBe(2);
    expect(spy).toHaveBeenCalled();
  });

  it('should update indice and call wizardComponent.atras on getValorIndice with accion "atras"', () => {
    const spy = jest.spyOn(component.wizardComponent, 'atras');
    component.getValorIndice({ accion: 'atras', valor: 0 });
    expect(component.indice).toBe(0);
    expect(spy).toHaveBeenCalled();
  });

  it('should call ngOnInit and initialize variables correctly', () => {
    expect(component.datosPasos.nroPasos).toBe(component.pasos.length);
  });

  // it('should call continuar when btnContinuar is clicked', () => {
  //   const spy = jest.spyOn(component, 'continuar');
  //   component.continuar();
  //   expect(spy).toHaveBeenCalled();
  // });

  // it('should call retroceder when btnAtras is clicked', () => {
  //   const spy = jest.spyOn(component, 'retroceder');
  //   component.retroceder();
  //   expect(spy).toHaveBeenCalled();
  // });
});
