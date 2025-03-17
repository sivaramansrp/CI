import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudComponent } from './solicitud.component';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

// Create test stub components for the child components
@Component({
  selector: 'app-detos-del-tramite',
  template: '<div>Detalles del Trámite</div>'
})
class DetosTramiteStubComponent {}

@Component({
  selector: 'app-datos-de-la-mercacia',
  template: '<div>Datos de la Mercancía</div>'
})
class DatosMercanciaStubComponent {}

@Component({
  selector: 'app-pais-procendencia',
  template: '<div>País de Procedencia</div>'
})
class PaisProcedenciaStubComponent {}

@Component({
  selector: 'app-representacion',
  template: '<div>Representación</div>'
})
class RepresentacionStubComponent {}

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        SolicitudComponent, 
        DetosTramiteStubComponent,
        DatosMercanciaStubComponent,
        PaisProcedenciaStubComponent,
        RepresentacionStubComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should contain app-detos-del-tramite component', () => {
    const detosTramiteElement = fixture.debugElement.query(By.directive(DetosTramiteStubComponent));
    expect(detosTramiteElement).toBeTruthy();
  });

  it('should contain app-datos-de-la-mercacia component', () => {
    const datosMercanciaElement = fixture.debugElement.query(By.directive(DatosMercanciaStubComponent));
    expect(datosMercanciaElement).toBeTruthy();
  });

  it('should contain app-pais-procendencia component', () => {
    const paisProcedenciaElement = fixture.debugElement.query(By.directive(PaisProcedenciaStubComponent));
    expect(paisProcedenciaElement).toBeTruthy();
  });

  it('should contain app-representacion component', () => {
    const representacionElement = fixture.debugElement.query(By.directive(RepresentacionStubComponent));
    expect(representacionElement).toBeTruthy();
  });

  it('should render all child components in the correct order', () => {
    const compiled = fixture.nativeElement;
    const elements = compiled.children;
    
    expect(elements.length).toBe(4);
    expect(elements[0].tagName.toLowerCase()).toBe('app-detos-del-tramite');
    expect(elements[1].tagName.toLowerCase()).toBe('app-datos-de-la-mercacia');
    expect(elements[2].tagName.toLowerCase()).toBe('app-pais-procendencia');
    expect(elements[3].tagName.toLowerCase()).toBe('app-representacion');
  });
});