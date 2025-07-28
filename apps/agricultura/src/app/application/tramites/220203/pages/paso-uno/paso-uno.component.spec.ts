import { ComponentFixture, TestBed } from '@angular/core/testing';
import {  Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  of as observableOf } from 'rxjs';
import { PasoUnoComponent } from './paso-uno.component';
import { ImportacionDeAcuiculturaService } from '../../services/220203/importacion-de-acuicultura.service';
import { ConsultaioQuery, SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { DatosDeLaSolicitudComponent } from '../../components/datos-de-la-solicitud/datos-de-la-solicitud.component';
import { DatosParaMovilizacionComponent } from '../../components/datos-para-movilizacion/datos-para-movilizacion.component';
import { PagoDeDerechosComponent } from '../../components/pago-de-derechos/pago-de-derechos.component';
import { CommonModule } from '@angular/common';
import { TercerospageComponent } from '../../components/tercerospage/tercerospage.component';

@Injectable()
class MockImportacionDeAcuiculturaService {}



describe('PasoUnoComponent', () => {
  let fixture: ComponentFixture<PasoUnoComponent>;
  let component: { ngOnDestroy: () => void; seleccionaTab: (arg0: {}) => void; consultaQuery: { selectConsultaioState$?: any; }; guardarDatosFormulario: jest.Mock<any, any, any> | (() => void); ngOnInit: () => void; importacionDeAcuiculturaService: { getAcuiculturaData?: any; actualizarEstadoFormulario?: any; }; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ SolicitanteComponent, TercerospageComponent, ReactiveFormsModule, DatosDeLaSolicitudComponent, DatosParaMovilizacionComponent, PagoDeDerechosComponent, CommonModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: ImportacionDeAcuiculturaService, useClass: MockImportacionDeAcuiculturaService },
        ConsultaioQuery
      ]
    }).overrideComponent(PasoUnoComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #seleccionaTab()', async () => {

    component.seleccionaTab({});

  });

  it('should run #ngOnInit()', async () => {
    component.consultaQuery = component.consultaQuery || {};
    component.consultaQuery.selectConsultaioState$ = observableOf({
      update: {}
    });
    component.guardarDatosFormulario = jest.fn();

    // expect(component.guardarDatosFormulario).toHaveBeenCalled();
  });

  it('should run #guardarDatosFormulario()', async () => {
    component.importacionDeAcuiculturaService = component.importacionDeAcuiculturaService || {};
    component.importacionDeAcuiculturaService.getAcuiculturaData = jest.fn().mockReturnValue(observableOf({}));
    component.importacionDeAcuiculturaService.actualizarEstadoFormulario = jest.fn();
    component.guardarDatosFormulario();
    // expect(component.importacionDeAcuiculturaService.getAcuiculturaData).toHaveBeenCalled();
    // expect(component.importacionDeAcuiculturaService.actualizarEstadoFormulario).toHaveBeenCalled();
  });

});