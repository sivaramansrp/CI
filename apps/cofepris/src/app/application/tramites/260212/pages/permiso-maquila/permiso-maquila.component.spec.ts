import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PermisoMaquilaComponent } from './permiso-maquila.component';
import { PERMISO_MAQUILA } from '../../constantes/permiso-maquila.enum';
import { AlertComponent, BtnContinuarComponent, SolicitanteComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { Datos260212Component } from '../datos-260212/datos-260212.component';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PermisoMaquilaComponent', () => {
  let component: PermisoMaquilaComponent;
  let fixture: ComponentFixture<PermisoMaquilaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PermisoMaquilaComponent, Datos260212Component],
      imports: [WizardComponent, BtnContinuarComponent, AlertComponent, PasoDosComponent, PasoTresComponent, HttpClientTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PermisoMaquilaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize pantallasPasos with PERMISO_MAQUILA', () => {
    expect(component.pantallasPasos).toEqual(PERMISO_MAQUILA);
  });

  it('should have initial indice value set to 1', () => {
    expect(component.indice).toBe(1);
  });
});
