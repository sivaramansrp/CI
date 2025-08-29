import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { CommonModule } from '@angular/common';
import { HistoricoProductoresComponent } from '../../components/historico-productores/historico-productores.component';
import { DestinatarioComponent } from '../../components/destinatario/destinatario.component';
import { DatosCertificadoComponent } from '../../components/datos-certificado/datos-certificado.component';
import { CertificadoOrigenComponent } from '../../components/certificado-origen/certificado-origen.component';
import { provideHttpClient } from '@angular/common/http';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';

// Mock SolicitanteComponent
@Component({
  selector: 'solicitante',
  template: '<div>Mock Solicitante</div>',
  standalone: true
})
class MockSolicitanteComponent {}


describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MockSolicitanteComponent,
        PasoUnoComponent
      ],
      providers: [provideHttpClient()],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the active tab to 1 when seleccionaTab(1) is called', () => {
    component.seleccionaTab(1);
    expect(component.indice).toBe(1);
  });

  it('should set the active tab to 3 when seleccionaTab(3) is called', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should render the SolicitanteComponent when indice is 1', () => {
    component.indice = 1;
    fixture.detectChanges();
    const solicitanteElement = fixture.debugElement.nativeElement.querySelector('solicitante');
    expect(solicitanteElement).toBeTruthy();
  });

  it('should render the CertificadoOrigenComponent when indice is 2', () => {
    component.indice = 2;
    fixture.detectChanges();
    const certificadoOrigenElement = fixture.debugElement.nativeElement.querySelector('app-certificado-origen');
    expect(certificadoOrigenElement).toBeTruthy();
  });

  it('should render the HistoricoProductoresComponent when indice is 3', () => {
    component.indice = 3;
    fixture.detectChanges();
    const historicoProductoresElement = fixture.debugElement.nativeElement.querySelector('app-historico-productores');
    expect(historicoProductoresElement).toBeTruthy();
  });

  it('should render the DestinatarioComponent when indice is 4', () => {
    component.indice = 4;
    fixture.detectChanges();
    const destinatarioElement = fixture.debugElement.nativeElement.querySelector('app-destinatario');
    expect(destinatarioElement).toBeTruthy();
  });

  it('should render the DatosCertificadoComponent when indice is 5', () => {
    component.indice = 5;
    fixture.detectChanges();
    const datosCertificadoElement = fixture.debugElement.nativeElement.querySelector('app-datos-certificado');
    expect(datosCertificadoElement).toBeTruthy();
  });
});