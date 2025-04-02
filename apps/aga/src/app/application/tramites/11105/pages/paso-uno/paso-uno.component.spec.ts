import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { BtnContinuarComponent } from '@ng-mf/data-access-user';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { DatosGeneralesDeLaSolicitudComponent } from '../../components/datos-generales-de-la-solicitud/datos-generales-de-la-solicitud.component';
import { DesistimientoComponent } from '../../components/desistimiento/desistimiento.component';
import { PasoUnoComponent } from './paso-uno.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DatosGeneralesDeLaSolicitudComponent,
        DesistimientoComponent,
        SolicitanteComponent,
        BtnContinuarComponent,
        PasoUnoComponent,
        HttpClientTestingModule
      ],
      declarations: [],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.indice).toBe(1);
    expect(component.tipoPersona).toBeUndefined();
    expect(component.persona).toEqual([]);
    expect(component.domicilioFiscal).toEqual([]);
  });

  it('should update the selected tab index when seleccionaTab is called', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
  });

  it('should emit continuarEvento when continuar is called', () => {
    const spy = jest.spyOn(component.continuarEvento, 'emit');
    component.continuar();
    expect(spy).toHaveBeenCalledWith('');
  });

  it('should update the wizard index and call siguiente when getValorIndice is called with "cont"', () => {
    const wizardSpy = jest.spyOn(component.wizardComponent, 'siguiente');
    component.getValorIndice({ accion: 'cont', valor: 2 });
    expect(component.indice).toBe(2);
    expect(wizardSpy).toHaveBeenCalled();
  });

  it('should update the wizard index and call atras when getValorIndice is called with "ant"', () => {
    const wizardSpy = jest.spyOn(component.wizardComponent, 'atras');
    component.getValorIndice({ accion: 'ant', valor: 1 });
    expect(component.indice).toBe(1);
    expect(wizardSpy).toHaveBeenCalled();
  });

  it('should not update the wizard index if the value is out of bounds in getValorIndice', () => {
    const wizardSpyNext = jest.spyOn(component.wizardComponent, 'siguiente');
    const wizardSpyBack = jest.spyOn(component.wizardComponent, 'atras');
    component.getValorIndice({ accion: 'cont', valor: 6 });
    expect(component.indice).toBe(1); // Index should remain unchanged
    expect(wizardSpyNext).not.toHaveBeenCalled();
    expect(wizardSpyBack).not.toHaveBeenCalled();
  });
});