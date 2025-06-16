import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantallasComponent } from './pantallas.component';
import { AccionBoton, AlertComponent, BtnContinuarComponent, DatosPasos, PASOS, SolicitanteComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { PasoDosComponent } from '../../../103/pages/paso-dos/paso-dos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { DatosComponent } from '../datos/datos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PantallasComponent', () => {
  let component: PantallasComponent;
  let fixture: ComponentFixture<PantallasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PantallasComponent, DatosComponent, PasoTresComponent],
      imports: [WizardComponent, BtnContinuarComponent, AlertComponent, PasoDosComponent, HttpClientTestingModule, SolicitanteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PantallasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set ADVERTENCIA constants correctly', () => {
    expect(component.ADVERTENCIA).toBeTruthy(); 
  });

  it('should initialize pantallasPasos correctly', () => {
    expect(component.pantallasPasos).toEqual(PASOS);
  });

  it('should initialize indice as 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should initialize datosPasos correctly', () => {
    const expectedDatos: DatosPasos = {
      nroPasos: PASOS.length,
      indice: 1,
      txtBtnAnt: 'Anterior',
      txtBtnSig: 'Continuar',
    };
    expect(component.datosPasos).toEqual(expectedDatos);
  });
});
