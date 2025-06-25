// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { PasoUnoComponent } from './paso-uno.component';
import { Tramite6402Store } from '../../estados/tramite6402.store';
import { Tramite6402Query } from '../../estados/tramite6402.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { AutorizacionImportacionService } from '../../services/autorizacion-importacion.service';

@Injectable()
class MockTramite6402Store {}

@Injectable()
class MockTramite6402Query {}

@Injectable()
class MockAutorizacionImportacionService {}

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom;
}

@Pipe({name: 'translate'})
class TranslatePipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({name: 'phoneNumber'})
class PhoneNumberPipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({name: 'safeHtml'})
class SafeHtmlPipe implements PipeTransform {
  transform(value) { return value; }
}

describe('PasoUnoComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ PasoUnoComponent, FormsModule, ReactiveFormsModule ],
      declarations: [
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Tramite6402Store, useClass: MockTramite6402Store },
        { provide: Tramite6402Query, useClass: MockTramite6402Query },
        ConsultaioQuery,
        { provide: AutorizacionImportacionService, useClass: MockAutorizacionImportacionService }
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

  it('should run #ngOnInit()', async () => {
    component.tramiteQuery = component.tramiteQuery || {};
    component.tramiteQuery.selectSolicitud$ = observableOf({});
    component.consultaioQuery = component.consultaioQuery || {};
    component.consultaioQuery.selectConsultaioState$ = observableOf({});
    component.fetchGetDatosConsulta = jest.fn();
    component.ngOnInit();
    expect(component.fetchGetDatosConsulta).toHaveBeenCalled();
  });

  it('should run #fetchGetDatosConsulta()', async () => {
    component.autorizacionImportacionService = component.autorizacionImportacionService || {};
    component.autorizacionImportacionService.getDatosConsulta = jest.fn().mockReturnValue(observableOf({
      success: {},
      datos: {}
    }));
    component.store = component.store || {};
    component.store.setCveAduana = jest.fn();
    component.store.setCveSeccionAduanal = jest.fn();
    component.store.setCveRecintoFiscalizado = jest.fn();
    component.store.setCveTipoDocumento = jest.fn();
    component.store.setEstadoTipoDocumento = jest.fn();
    component.store.setAduana = jest.fn();
    component.store.setPatente = jest.fn();
    component.store.setPedimento = jest.fn();
    component.store.setFolioImportacionTemporal = jest.fn();
    component.store.setFolioFormatoOficial = jest.fn();
    component.store.setCheckProrroga = jest.fn();
    component.store.setFolioOficialProrroga = jest.fn();
    component.store.setFechaImportacionTemporal = jest.fn();
    component.store.setFechaVencimiento = jest.fn();
    component.store.setDescMercancia = jest.fn();
    component.store.setMarca = jest.fn();
    component.store.setModelo = jest.fn();
    component.store.setNumeroSerie = jest.fn();
    component.store.setTipo = jest.fn();
    component.store.setCveMedioTrasporte = jest.fn();
    component.store.setGuiaMaster = jest.fn();
    component.store.setGuiaBl = jest.fn();
    component.store.setNumeroBl = jest.fn();
    component.store.setRfcEmpresaTransportista = jest.fn();
    component.store.setEstadoMedioTransporte = jest.fn();
    component.store.setCartaPorte = jest.fn();
    component.store.setCvePaisProcedencia = jest.fn();
    component.store.setGuiaHouse = jest.fn();
    component.store.setNumeroBuque = jest.fn();
    component.store.setNumeroEquipo = jest.fn();
    component.store.setFechaCartaPorte = jest.fn();
    component.store.setTipContenedor = jest.fn();
    component.store.setTranporteMarca = jest.fn();
    component.store.setTranporteModelo = jest.fn();
    component.store.setTranportePlaca = jest.fn();
    component.store.setObservaciones = jest.fn();
    component.store.setConDestino = jest.fn();
    component.store.setCveTipoDestino = jest.fn();
    component.store.setCveTipoDocumentoReemplazada = jest.fn();
    component.store.setNumeroActaDescruccion = jest.fn();
    component.store.setCveAduanaDestino = jest.fn();
    component.store.setCvePatenteDestino = jest.fn();
    component.store.setCvePedimentoDestino = jest.fn();
    component.store.setFolioVucemRetorno = jest.fn();
    component.store.setFolioFormatoOficialDestino = jest.fn();
    component.store.setFechaDescruccionDestino = jest.fn();
    component.store.setEstadoTipoDocumentoDestino = jest.fn();
    component.store.setAutoridadPresentoAvisoDestruccion = jest.fn();
    component.fetchGetDatosConsulta();
    expect(component.autorizacionImportacionService.getDatosConsulta).toHaveBeenCalled();
    expect(component.store.setCveAduana).toHaveBeenCalled();
    expect(component.store.setCveSeccionAduanal).toHaveBeenCalled();
    expect(component.store.setCveRecintoFiscalizado).toHaveBeenCalled();
    expect(component.store.setCveTipoDocumento).toHaveBeenCalled();
    expect(component.store.setEstadoTipoDocumento).toHaveBeenCalled();
    expect(component.store.setAduana).toHaveBeenCalled();
    expect(component.store.setPatente).toHaveBeenCalled();
    expect(component.store.setPedimento).toHaveBeenCalled();
    expect(component.store.setFolioImportacionTemporal).toHaveBeenCalled();
    expect(component.store.setFolioFormatoOficial).toHaveBeenCalled();
    expect(component.store.setCheckProrroga).toHaveBeenCalled();
    expect(component.store.setFolioOficialProrroga).toHaveBeenCalled();
    expect(component.store.setFechaImportacionTemporal).toHaveBeenCalled();
    expect(component.store.setFechaVencimiento).toHaveBeenCalled();
    expect(component.store.setDescMercancia).toHaveBeenCalled();
    expect(component.store.setMarca).toHaveBeenCalled();
    expect(component.store.setModelo).toHaveBeenCalled();
    expect(component.store.setNumeroSerie).toHaveBeenCalled();
    expect(component.store.setTipo).toHaveBeenCalled();
    expect(component.store.setCveMedioTrasporte).toHaveBeenCalled();
    expect(component.store.setGuiaMaster).toHaveBeenCalled();
    expect(component.store.setGuiaBl).toHaveBeenCalled();
    expect(component.store.setNumeroBl).toHaveBeenCalled();
    expect(component.store.setRfcEmpresaTransportista).toHaveBeenCalled();
    expect(component.store.setEstadoMedioTransporte).toHaveBeenCalled();
    expect(component.store.setCartaPorte).toHaveBeenCalled();
    expect(component.store.setCvePaisProcedencia).toHaveBeenCalled();
    expect(component.store.setGuiaHouse).toHaveBeenCalled();
    expect(component.store.setNumeroBuque).toHaveBeenCalled();
    expect(component.store.setNumeroEquipo).toHaveBeenCalled();
    expect(component.store.setFechaCartaPorte).toHaveBeenCalled();
    expect(component.store.setTipContenedor).toHaveBeenCalled();
    expect(component.store.setTranporteMarca).toHaveBeenCalled();
    expect(component.store.setTranporteModelo).toHaveBeenCalled();
    expect(component.store.setTranportePlaca).toHaveBeenCalled();
    expect(component.store.setObservaciones).toHaveBeenCalled();
    expect(component.store.setConDestino).toHaveBeenCalled();
    expect(component.store.setCveTipoDestino).toHaveBeenCalled();
    expect(component.store.setCveTipoDocumentoReemplazada).toHaveBeenCalled();
    expect(component.store.setNumeroActaDescruccion).toHaveBeenCalled();
    expect(component.store.setCveAduanaDestino).toHaveBeenCalled();
    expect(component.store.setCvePatenteDestino).toHaveBeenCalled();
    expect(component.store.setCvePedimentoDestino).toHaveBeenCalled();
    expect(component.store.setFolioVucemRetorno).toHaveBeenCalled();
    expect(component.store.setFolioFormatoOficialDestino).toHaveBeenCalled();
    expect(component.store.setFechaDescruccionDestino).toHaveBeenCalled();
    expect(component.store.setEstadoTipoDocumentoDestino).toHaveBeenCalled();
    expect(component.store.setAutoridadPresentoAvisoDestruccion).toHaveBeenCalled();
  });

  it('should run #seleccionaTab()', async () => {
    component.store = component.store || {};
    component.store.setPestanaActiva = jest.fn();
    component.seleccionaTab({}, {});
    expect(component.store.setPestanaActiva).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.complete).toHaveBeenCalled();
  });

});