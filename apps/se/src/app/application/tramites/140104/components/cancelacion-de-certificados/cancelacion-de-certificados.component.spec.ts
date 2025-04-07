import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { CancelacionDeCertificadosComponent } from './cancelacion-de-certificados.component';
import { FormBuilder } from '@angular/forms';
import { ServicioDeMensajesService } from '../../services/servicio-de-mensajes.service';

@Injectable()
class MockServicioDeMensajesService {
  establecerDatosDePermiso() {
    // Mock implementation
    return true; // Add a return value or behavior if needed
  }

  enviarMensaje() {
    // Mock implementation
  }

  enviarDevolverFacturasMensaje() {
    // Mock implementation
  }
}

describe('CancelacionDeCertificadosComponent', () => {
  let fixture: ComponentFixture<CancelacionDeCertificadosComponent>;
  let component: CancelacionDeCertificadosComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        CancelacionDeCertificadosComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: ServicioDeMensajesService, useClass: MockServicioDeMensajesService }
      ]
    }).overrideComponent(CancelacionDeCertificadosComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(CancelacionDeCertificadosComponent);
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

    component.ngOnInit();

  });



 



  



});