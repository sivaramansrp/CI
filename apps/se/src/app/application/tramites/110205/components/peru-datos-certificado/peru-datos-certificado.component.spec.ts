import { ComponentFixture, TestBed } from '@angular/core/testing';
import {Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of as observableOf } from 'rxjs';
import { PeruDatosCertificadoComponent } from './peru-datos-certificado.component';
import { FormBuilder } from '@angular/forms';
import { PeruCertificadoService } from '../../services/peru-certificado.service';
import { Tramite110205Store } from '../../estados/tramite110205.store';
import { Tramite110205Query } from '../../estados/tramite110205.query';

@Injectable()
class MockPeruCertificadoService {}

@Injectable()
class MockTramite110205Store {}

@Injectable()
class MockTramite110205Query {
  selectCam$ = observableOf({});
  selectmercanciaTabla$ = observableOf({});
  formDatosCertificado$ = observableOf({});
}

describe('PeruDatosCertificadoComponent', () => {
  let fixture: ComponentFixture<PeruDatosCertificadoComponent>;
  let component: PeruDatosCertificadoComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        PeruDatosCertificadoComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: PeruCertificadoService, useClass: MockPeruCertificadoService },
        { provide: Tramite110205Store, useClass: MockTramite110205Store },
        { provide: Tramite110205Query, useClass: MockTramite110205Query }
      ]
    }).overrideComponent(PeruDatosCertificadoComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(PeruDatosCertificadoComponent);
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
    component.idiomOpcion = jest.fn();
    component.entidadFederativasOpcion = jest.fn();
    component.representacionFederalOpcion = jest.fn();
    component.ngOnInit();
    expect(component.idiomOpcion).toHaveBeenCalled();
    expect(component.entidadFederativasOpcion).toHaveBeenCalled();
    expect(component.representacionFederalOpcion).toHaveBeenCalled();
  });

});