import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudPasoComponent } from './solicitud-paso.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WizardComponent } from '@libs/shared/data-access-user/src';
import { PASOS } from '@libs/shared/data-access-user/src/core/enums/31616/modificacion.enum';
import { AccionBoton } from '@libs/shared/data-access-user/src';


@Component({
  selector: 'app-wizard',
  standalone: true,
  template: ''
})
class MockWizardComponent {
  siguiente = jest.fn();
  atras = jest.fn();
  @Input() listaPasos: any;
}

@Component({ selector: 'app-paso-uno', template: '' })
class MockPasoUnoComponent {}

@Component({ selector: 'app-paso-dos', template: '' })
class MockPasoDosComponent {}

@Component({ selector: 'app-paso-tres', template: '' })
class MockPasoTresComponent {}

@Component({
  selector: 'btn-continuar',
  template: ''
})
class MockBtnContinuarComponent {
  @Input() datos: any;
  @Output() continuarEvento = new EventEmitter<AccionBoton>();
}

describe('SolicitudPasoComponent', () => {
  let component: SolicitudPasoComponent;
  let fixture: ComponentFixture<SolicitudPasoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SolicitudPasoComponent,
        MockPasoUnoComponent,
        MockPasoDosComponent,
        MockPasoTresComponent,
        MockBtnContinuarComponent
      ],
      imports: [HttpClientTestingModule, MockWizardComponent] 
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudPasoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize indice to 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should initialize pasos with PASOS', () => {
    expect(component.pasos).toEqual(PASOS);
  });

  it('should initialize datosPasos correctly', () => {
    expect(component.datosPasos.nroPasos).toBe(PASOS.length);
    expect(component.datosPasos.indice).toBe(1);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should call wizardComponent.siguiente when getValorIndice is called with accion "cont"', () => {
    const wizardMock = {
      siguiente: jest.fn(),
      atras: jest.fn()
    };

    component.wizardComponent = wizardMock as any;

    component.getValorIndice({ accion: 'cont', valor: 2 });
    expect(component.indice).toBe(2);
    expect(wizardMock.siguiente).toHaveBeenCalled();
  });

  it('should call wizardComponent.atras when getValorIndice is called with accion "atras"', () => {
    const wizardMock = {
      siguiente: jest.fn(),
      atras: jest.fn()
    };

    component.wizardComponent = wizardMock as any;

    component.getValorIndice({ accion: 'atras', valor: 1 });
    expect(component.indice).toBe(1);
    expect(wizardMock.atras).toHaveBeenCalled();
  });

  it('should not update indice if valor is out of range', () => {
    const initialIndice = component.indice;
    component.getValorIndice({ accion: 'cont', valor: 0 });
    expect(component.indice).toBe(initialIndice);

    component.getValorIndice({ accion: 'cont', valor: 5 }); 
    expect(component.indice).toBe(initialIndice);
  });
});
