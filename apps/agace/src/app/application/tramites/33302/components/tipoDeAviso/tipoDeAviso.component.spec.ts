// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { TipoDeAvisoComponent } from './tipoDeAviso.component';
import { FormBuilder } from '@angular/forms';
import { Solicitud32301Service } from '../../services/solicitud.service';
import { Tramite33302Store } from '../../estados/tramite33302.store';
import { Tramite33302Query } from '../../estados/tramite33302.query';
import { HttpClient, HttpClientModule } from '@angular/common/http';
@Injectable()
class MockSolicitud32301Service {}

@Injectable()
class MockTramite33302Store {}

@Injectable()
class MockTramite33302Query {}

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

describe('TipoDeAvisoComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, TipoDeAvisoComponent,HttpClientModule ],
      declarations: [
        
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: Solicitud32301Service, useClass: MockSolicitud32301Service },
        { provide: Tramite33302Store, useClass: MockTramite33302Store },
        { provide: Tramite33302Query, useClass: MockTramite33302Query }
      ]
    }).overrideComponent(TipoDeAvisoComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(TipoDeAvisoComponent);
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
    component.inicializamiFormulario = jest.fn();
    component.Tramite32301Query = component.Tramite32301Query || {};
    component.Tramite32301Query.select = jest.fn().mockReturnValue(observableOf({}));
    component.crearFormMiFormulario = jest.fn();
    component.ngOnInit();
     });

  it('should run #inicializamiFormulario()', async () => {
    component.AvisoModifyService = component.AvisoModifyService || {};
    component.AvisoModifyService.getAvisoModify = jest.fn().mockReturnValue(observableOf({}));
    component.store = component.store || {};
    component.store.setModalidadCertificacion = jest.fn();
    component.inicializamiFormulario();
   });

  it('should run #crearFormMiFormulario()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.tipoDevAviso = component.tipoDevAviso || {};
    component.tipoDevAviso.modalidadCertificacion = 'modalidadCertificacion';
    component.tipoDevAviso.foreignClientsSuppliers = 'foreignClientsSuppliers';
    component.tipoDevAviso.nationalSuppliers = 'nationalSuppliers';
    component.tipoDevAviso.modificationsMembers = 'modificationsMembers';
    component.tipoDevAviso.changesToLegalDocuments = 'changesToLegalDocuments';
    component.tipoDevAviso.mergerOrSplitNotice = 'mergerOrSplitNotice';
    component.tipoDevAviso.additionFractions = 'additionFractions';
    component.tipoDevAviso.acepto253 = 'acepto253';
    component.tipoDevAviso.presenten = 'presenten';
    component.tipoDevAviso.contratados = 'contratados';
    component.tipoDevAviso.expirado = 'expirado';
    component.tipoDevAviso.derechos = 'derechos';
    component.crearFormMiFormulario();
  
  });

  it('should run #aiEnviar()', async () => {
    component.tabEnabledData = component.tabEnabledData || {};
    component.tabEnabledData.emit = jest.fn();
    component.miFormulario = component.miFormulario || {};
    component.miFormulario.value = 'value';
    component.aiEnviar();
    
  });

  it('should run #setClientesProveedoresExtranjeros()', async () => {
    component.miFormulario = component.miFormulario || {};
    component.miFormulario.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.store = component.store || {};
    component.store.setClientesProveedoresExtranjeros = jest.fn();
    component.setClientesProveedoresExtranjeros();
    });

  it('should run #setProveedoresNacionales()', async () => {
    component.miFormulario = component.miFormulario || {};
    component.miFormulario.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.store = component.store || {};
    component.store.setProveedoresNacionales = jest.fn();
    component.setProveedoresNacionales();
    // expect(component.miFormulario.get).toHaveBeenCalled();
    // expect(component.store.setProveedoresNacionales).toHaveBeenCalled();
  });

  it('should run #setModificacionesMiembros()', async () => {
    component.miFormulario = component.miFormulario || {};
    component.miFormulario.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.store = component.store || {};
    component.store.setModificacionesMiembros = jest.fn();
    component.setModificacionesMiembros();
    // expect(component.miFormulario.get).toHaveBeenCalled();
    // expect(component.store.setModificacionesMiembros).toHaveBeenCalled();
  });

  it('should run #setCambiosDocumentosLegales()', async () => {
    component.miFormulario = component.miFormulario || {};
    component.miFormulario.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.store = component.store || {};
    component.store.setCambiosDocumentosLegales = jest.fn();
    component.setCambiosDocumentosLegales();
    // expect(component.miFormulario.get).toHaveBeenCalled();
    // expect(component.store.setCambiosDocumentosLegales).toHaveBeenCalled();
  });

  it('should run #setNotifiFusionOescision()', async () => {
    component.miFormulario = component.miFormulario || {};
    component.miFormulario.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.store = component.store || {};
    component.store.setNotifiFusionOescision = jest.fn();
    component.setNotifiFusionOescision();
    // expect(component.miFormulario.get).toHaveBeenCalled();
    // expect(component.store.setNotifiFusionOescision).toHaveBeenCalled();
  });

  it('should run #setAdicionalesFractions()', async () => {
    component.miFormulario = component.miFormulario || {};
    component.miFormulario.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.store = component.store || {};
    component.store.setAdicionalesFractions = jest.fn();
    component.setAdicionalesFractions();
     });

  it('should run #setPresenten()', async () => {
    component.miFormulario = component.miFormulario || {};
    component.miFormulario.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.store = component.store || {};
    component.store.setPresenten = jest.fn();
    component.setPresenten();
   
  });

  it('should run #setContratados()', async () => {
    component.miFormulario = component.miFormulario || {};
    component.miFormulario.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.store = component.store || {};
    component.store.setContratados = jest.fn();
    component.setContratados();
     expect(component.miFormulario.get).toHaveBeenCalled();
     expect(component.store.setContratados).toHaveBeenCalled();
  });

  it('should run #setExpirado()', async () => {
    component.miFormulario = component.miFormulario || {};
    component.miFormulario.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.store = component.store || {};
    component.store.setExpirado = jest.fn();
    component.setExpirado();
    expect(component.miFormulario.get).toHaveBeenCalled();
    expect(component.store.setExpirado).toHaveBeenCalled();
  });

  it('should run #setDerechos()', async () => {
    component.miFormulario = component.miFormulario || {};
    component.miFormulario.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.store = component.store || {};
    component.store.setDerechos = jest.fn();
    component.setDerechos();
    expect(component.miFormulario.get).toHaveBeenCalled();
     expect(component.store.setDerechos).toHaveBeenCalled();
  });

  it('should run #setAceptacion253()', async () => {
    component.miFormulario = component.miFormulario || {};
    component.miFormulario.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.store = component.store || {};
    component.store.setAceptacion253 = jest.fn();
    component.setAceptacion253();
     expect(component.miFormulario.get).toHaveBeenCalled();
    expect(component.store.setAceptacion253).toHaveBeenCalled();
  });

  it('should run #handleValores()', async () => {
    component.tabEnabledData = component.tabEnabledData || {};
    component.tabEnabledData.emit = jest.fn();
    component.handleValores();
   expect(component.tabEnabledData.emit).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroy$ = component.destroy$ || {};
    component.destroy$.next = jest.fn();
    component.destroy$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.destroy$.next).toHaveBeenCalled();
    expect(component.destroy$.complete).toHaveBeenCalled();
  });

});