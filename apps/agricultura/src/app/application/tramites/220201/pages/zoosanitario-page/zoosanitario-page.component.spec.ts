import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ZoosanitarioPageComponent } from './zoosanitario-page.component';
import { BtnContinuarComponent, WizardComponent } from '@ng-mf/data-access-user';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';

describe('ZoosanitarioPageComponent', () => {
  let component: ZoosanitarioPageComponent;
  let fixture: ComponentFixture<ZoosanitarioPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ZoosanitarioPageComponent, // ✅ standalone component must go here
        WizardComponent,
        BtnContinuarComponent,
        PasoUnoComponent,
        PasoDosComponent,
        PasoTresComponent,
        HttpClientTestingModule,
        CommonModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ZoosanitarioPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct step index and title', () => {
    expect(component.indice).toBe(1);
    expect(component.tituloMensaje).toBe('Zoosanitario para importación');
    expect(component.datosPasos.nroPasos).toBe(component.pasos.length);
  });

  it('should update index and call siguiente when accion is "cont"', () => {
    const wizardSpy = jest.spyOn(component.wizardComponent, 'siguiente');
    component.getValorIndice({ accion: 'cont', valor: 2 });
    expect(component.indice).toBe(2);
    expect(wizardSpy).toHaveBeenCalled();
  });

  it('should update index and call atras when accion is "atras"', () => {
    const wizardSpy = jest.spyOn(component.wizardComponent, 'atras');
    component.getValorIndice({ accion: 'atras', valor: 2 });
    expect(component.indice).toBe(2);
    expect(wizardSpy).toHaveBeenCalled();
  });

  it('should not update index or call wizardComponent if value out of bounds', () => {
    const siguienteSpy = jest.spyOn(component.wizardComponent, 'siguiente');
    const atrasSpy = jest.spyOn(component.wizardComponent, 'atras');
    component.getValorIndice({ accion: 'cont', valor: 10 });
    expect(component.indice).not.toBe(10);
    expect(siguienteSpy).not.toHaveBeenCalled();
    expect(atrasSpy).not.toHaveBeenCalled();
  });

  it('should set correct title for each tab', () => {
    component.enTabChange(1);
    expect(component.tituloMensaje).toBe('Zoosanitario para importación');

    component.enTabChange(2);
    expect(component.tituloMensaje).toBe('Captura del certificado zoosanitario para importación');

    component.enTabChange(3);
    expect(component.tituloMensaje).toBe('Zoosanitario para importación');

    component.enTabChange(4);
    expect(component.tituloMensaje).toBe('Zoosanitario para importación');

    component.enTabChange(5);
    expect(component.tituloMensaje).toBe('Captura del certificado zoosanitario para importación');

    component.enTabChange(999); // invalid case
    expect(component.tituloMensaje).toBe('Zoosanitario para importación');
  });
});
