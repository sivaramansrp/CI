import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { CancelacionDeCertificadoComponent } from '../../components/cancelacion-de-certificado/cancelacion-de-certificado.component';
import { CertificadoDeOrigenComponent } from '../../components/certificado-de origen/certificado-de-origen.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let cdrSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        CommonModule,
        SolicitanteComponent,
        CancelacionDeCertificadoComponent,
        CertificadoDeOrigenComponent,PasoUnoComponent
      ],
      providers: [ChangeDetectorRef, provideHttpClient(),
              provideHttpClientTesting(),],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;

    // Initialize the spy for ChangeDetectorRef.detectChanges
    cdrSpy = jest.spyOn(component['cdr'], 'detectChanges');
    fixture.detectChanges();
  });
  it('should run #ngAfterViewInit()', async () => {
    component.solicitante = component.solicitante || {};
    component.solicitante.obtenerTipoPersona = jest.fn();
    component.ngAfterViewInit();
    expect(component.solicitante.obtenerTipoPersona).toHaveBeenCalled();
  });


  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngAfterViewInit', () => {
    it('should initialize persona and domicilioFiscal and call detectChanges', () => {
      const solicitanteSpy = jest.spyOn(component.solicitante, 'obtenerTipoPersona');
      component.ngAfterViewInit();

      expect(component.persona).toEqual(expect.any(Array));
      expect(component.domicilioFiscal).toEqual(expect.any(Array));
      expect(solicitanteSpy).toHaveBeenCalledWith(1); // Assuming `TIPO_PERSONA.MORAL_NACIONAL` is 1
      expect(cdrSpy).toHaveBeenCalled();
    });
  });

  describe('seleccionaTab', () => {
    it('should update the indice and emit the event', () => {
      const miEventoSpy = jest.spyOn(component.miEvento, 'emit');
      component.seleccionaTab(2);

      expect(component.indice).toBe(2);
      expect(miEventoSpy).toHaveBeenCalledWith(2);
    });
  });

  describe('emitirCancelacion', () => {
    it('should emit the event and update the indice', () => {
      const eventoDatosHijoSpy = jest.spyOn(component.eventoDatosHijo, 'emit');
      const seleccionaTabSpy = jest.spyOn(component, 'seleccionaTab');

      component.emitirCancelacion(3);

      expect(eventoDatosHijoSpy).toHaveBeenCalledWith(3);
      expect(component.indice).toBe(3);
      expect(seleccionaTabSpy).toHaveBeenCalledWith(3);
    });
  });

  it('should run #ngAfterViewInit()', async () => {
    component.solicitante = component.solicitante || {};
    component.solicitante.obtenerTipoPersona = jest.fn();
    component.ngAfterViewInit();
    expect(component.solicitante.obtenerTipoPersona).toHaveBeenCalled();
  });



  it('should run #emitirCancelacion()', async () => {
    component.eventoDatosHijo = component.eventoDatosHijo || {};
    component.eventoDatosHijo.emit = jest.fn();
    component.seleccionaTab = jest.fn();
    component.emitirCancelacion(3);
    expect(component.eventoDatosHijo.emit).toHaveBeenCalled();
    expect(component.seleccionaTab).toHaveBeenCalled();
  });

});