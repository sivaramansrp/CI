import { ComponentFixture, TestBed } from '@angular/core/testing';
import {Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  of as observableOf } from 'rxjs';
import { PasoUnoComponent } from './paso-uno.component';
import { ConsultaioQuery, SolicitanteComponent } from '@ng-mf/data-access-user';
import { CamCertificadoService } from '../../services/cam-certificado.service';
import { HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { CamDatosCertificadoComponent } from '../../components/cam-datos-certificado/cam-datos-certificado.component';
import { CamDestinatarioComponent } from '../../components/cam-destinatario/cam-destinatario.component';
import { CertificadoOrigenComponent } from '../../components/certificado-origen/certificado-origen.component';

@Injectable()
class MockCamCertificadoService {}
class MockConsultaioQuery {}

describe('PasoUnoComponent', () => {
  let fixture: ComponentFixture<PasoUnoComponent>;
  let component: { ngOnDestroy: () => void; consultaQuery: { selectConsultaioState$?: any; }; guardarDatosFormulario: jest.Mock<any, any, any> | (() => void); ngOnInit: () => void; camCertificadoService: { obtenerTodosDatosCamCertificado?: any; actualizarEstadoFormulario?: any; }; seleccionaTab: (arg0: {}) => void; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, PasoUnoComponent, SolicitanteComponent, CertificadoOrigenComponent, CamDestinatarioComponent, CamDatosCertificadoComponent, CommonModule,HttpClientTestingModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        ConsultaioQuery,
        { provide: CamCertificadoService, useClass: MockCamCertificadoService },
        { provide: ConsultaioQuery, useClass: MockConsultaioQuery },
        provideHttpClientTesting()
      ]
    }).overrideComponent(PasoUnoComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.debugElement.componentInstance;
  });


  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.consultaQuery = component.consultaQuery || {};
    component.consultaQuery.selectConsultaioState$ = observableOf({});
    component.guardarDatosFormulario = jest.fn();
    component.ngOnInit();
    // expect(component.guardarDatosFormulario).toHaveBeenCalled();
  });

  it('should run #guardarDatosFormulario()', async () => {
    component.camCertificadoService = component.camCertificadoService || {};
    component.camCertificadoService.obtenerTodosDatosCamCertificado = jest.fn().mockReturnValue(observableOf({}));
    component.camCertificadoService.actualizarEstadoFormulario = jest.fn();
    component.guardarDatosFormulario();
    // expect(component.camCertificadoService.obtenerTodosDatosCamCertificado).toHaveBeenCalled();
    // expect(component.camCertificadoService.actualizarEstadoFormulario).toHaveBeenCalled();
  });
  it('should run #seleccionaTab()', async () => {
    // Pass an object with a dummy property to avoid TypeError
    component.seleccionaTab({ dummy: true });
  });

});