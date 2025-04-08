import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { RegistroEmpresasTransporteComponent } from './registro-empresas-transporte.component';
import { Pasos } from '../../enums/registro-empresas-transporte.enum';

describe('RegistroEmpresasTransporteComponent', () => {
  let component: RegistroEmpresasTransporteComponent;
  let fixture: ComponentFixture<RegistroEmpresasTransporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, HttpClientTestingModule],
      declarations: [
        RegistroEmpresasTransporteComponent,
        PasoUnoComponent,
        PasoDosComponent,
        PasoTresComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroEmpresasTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pasos with RenovacionesPasos', () => {
    expect(component.pasos).toEqual(Pasos);
  });

  it('should initialize indice with 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should initialize datosPasos correctly', () => {
    expect(component.datosPasos).toEqual({
      nroPasos: component.pasos.length,
      indice: component.indice,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    });
  });

  it('should update indice and call wizardComponent.siguiente on getValorIndice with accion "cont"', () => {
    const SPY = jest.spyOn(component.wizardComponent, 'siguiente');
    component.getValorIndice({ accion: 'cont', valor: 2 });
    expect(component.indice).toBe(2);
    expect(SPY).toHaveBeenCalled();
  });

  it('should update indice and call wizardComponent.atras on getValorIndice with accion "atras"', () => {
    const SPY = jest.spyOn(component.wizardComponent, 'atras');
    component.getValorIndice({ accion: 'atras', valor: 0 });
    expect(component.indice).toBe(0);
    expect(SPY).toHaveBeenCalled();
  });

  it('should call ngOnInit and initialize variables correctly', () => {
    expect(component.datosPasos.nroPasos).toBe(component.pasos.length);
  });
});
