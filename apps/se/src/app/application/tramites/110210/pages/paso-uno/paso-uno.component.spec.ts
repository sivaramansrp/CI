import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  PERSONA_MORAL_NACIONAL,
  DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL,
  TIPO_PERSONA
} from '@ng-mf/data-access-user';


@Component({
  selector: 'solicitante',
  template: ''
})
class SolicitanteComponent {
  obtenerTipoPersona = jest.fn();
}

describe('PasoUnoComponent (mocked SolicitanteComponent)', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let solicitanteInstance: SolicitanteComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent, SolicitanteComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;

  
    component.indice = 1;

    fixture.detectChanges(); 

    
    const solicitanteDebug = fixture.debugElement.query(By.directive(SolicitanteComponent));
    solicitanteInstance = solicitanteDebug.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize persona and domicilioFiscal', () => {
    expect(component.persona).toEqual(PERSONA_MORAL_NACIONAL);
    expect(component.domicilioFiscal).toEqual(DOMICILIO_FISCAL_PERSONA_MORAL_O_FISICA_NACIONAL);
  });

  it('should call obtenerTipoPersona on solicitante in ngAfterViewInit', () => {
    expect(solicitanteInstance.obtenerTipoPersona).toHaveBeenCalledWith(TIPO_PERSONA.MORAL_NACIONAL);
  });

  it('should update indice when seleccionaTab is called', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });
});
