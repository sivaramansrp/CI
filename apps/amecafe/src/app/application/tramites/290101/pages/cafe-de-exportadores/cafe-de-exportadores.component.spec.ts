import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable, of as observableOf } from 'rxjs';

import { Component } from '@angular/core';
import { CafeDeExportadoresComponent } from './cafe-de-exportadores.component';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { CatalogosService } from '../../servicios/catalogos.service';
import { TramiteStoreQuery } from '../../estados/tramite290101.query';
import { TramiteStore } from '../../estados/tramite290101.store';

@Injectable()
class MockRouter {
  navigate = jest.fn();
}

@Injectable()
class MockCatalogosService {
  cargarClasificacion = jest.fn().mockReturnValue(observableOf({ code: {}, data: {} }));
}

@Injectable()
class MockTramiteStoreQuery {
  selectSolicitudTramite$ = observableOf({ CafeExportFormState: {} });
}

@Injectable()
class MockTramiteStore {
  setCafExportTramite = jest.fn();
}

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom: any;
}

@Pipe({ name: 'translate' })
class TranslatePipe implements PipeTransform {
  transform(value: any) { return value; }
}

describe('CafeDeExportadoresComponent', () => {
  let fixture: ComponentFixture<CafeDeExportadoresComponent>;
  let component: CafeDeExportadoresComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
        FormsModule, 
        ReactiveFormsModule, 
        HttpClientTestingModule 
      ],
      declarations: [
        CafeDeExportadoresComponent,
        TranslatePipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Router, useClass: MockRouter },
        FormBuilder,
        { provide: CatalogosService, useClass: MockCatalogosService },
        { provide: TramiteStoreQuery, useClass: MockTramiteStoreQuery },
        { provide: TramiteStore, useClass: MockTramiteStore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CafeDeExportadoresComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit()', () => {
    const setCafExportTramiteSpy = jest.spyOn(
      component['tramiteStore'],  
      'setCafExportTramite'
    );
  
    fixture.detectChanges(); 
  
    expect(setCafExportTramiteSpy).toHaveBeenCalled();
  });
  
});
