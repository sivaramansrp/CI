import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosComponent } from './datos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SolicitanteOctavaTemporalComponent } from '../../component/solicitante-octava-temporal/solicitante-octava-temporal.component';
import { Solicitante130102Component } from '../solicitante/solicitante.component';

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosComponent, Solicitante130102Component],
      imports: [HttpClientTestingModule, SolicitanteOctavaTemporalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
    component.consultaState = {
      update: false,
    } as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call guardarDatosFormulario if consultaState.update is true', () => {
    const guardarDatosFormularioSpy = jest.spyOn(component, 'guardarDatosFormulario');
    component.consultaState = { update: true } as any;
    component.ngOnInit();
    expect(guardarDatosFormularioSpy).toHaveBeenCalled();
  });

  it('should set esDatosRespuesta to true if consultaState.update is false', () => {
    component.consultaState = { update: false } as any;
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyNotifier$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should update indice when seleccionaTab is called', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

});
