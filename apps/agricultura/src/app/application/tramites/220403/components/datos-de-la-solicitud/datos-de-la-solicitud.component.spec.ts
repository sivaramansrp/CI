import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of as observableOf } from 'rxjs';

import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import {
  CatalogosService,
  SeccionLibStore,
  SeccionLibQuery,
  TituloComponent,
  AlertComponent,
  TablaDinamicaComponent,
  InputRadioComponent,
  InputFechaComponent,
  CatalogoSelectComponent,
} from '@ng-mf/data-access-user';
import { ExportaccionAcuicolaService } from '../../services/exportaccion-acuicola.service';
import { Tramite220403Query } from '../../estados/tramite220403.query';
import { Tramite220403Store } from '../../estados/tramite220403.store';
import { HttpClientModule } from '@angular/common/http';

@Injectable()
class MockExportaccionAcuicolaService {
  getDatos() {
    return observableOf([]);
  }

  obtenerMenuDesplegable() {
    return observableOf([]);
  }

  actualizarFormaValida() {}
}

@Injectable()
class MockTramite220403Query {
  setDatosRealizar$ = observableOf({});
  setCombinacionRequerida$ = observableOf({});
}

@Injectable()
class MockTramite220403Store {
  setDatosRealizar() {}
  setCombinacionRequerida() {}
  setDatosRealizarValidada() {}
  setCombinacionRequeridaValidada() {}
}

describe('DatosDeLaSolicitudComponent', () => {
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let component: DatosDeLaSolicitudComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DatosDeLaSolicitudComponent,
        TituloComponent,
        AlertComponent,
        TablaDinamicaComponent,
        InputRadioComponent,
        InputFechaComponent,
        CatalogoSelectComponent,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        CatalogosService,
        { provide: ExportaccionAcuicolaService, useClass: MockExportaccionAcuicolaService },
        { provide: Tramite220403Query, useClass: MockTramite220403Query },
        { provide: Tramite220403Store, useClass: MockTramite220403Store },
        SeccionLibStore,
        SeccionLibQuery
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy();
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the form when esFormularioSoloLectura is true', () => {
    component.formulario = new FormBuilder().group({ test: [''] });
    component.esFormularioSoloLectura = true;
    const disableSpy = jest.spyOn(component.formulario, 'disable');
    component.inicializarEstadoFormulario();
    expect(disableSpy).toHaveBeenCalled();
  });

  it('should update radioSelectedValue in cambioValorRadio', () => {
    component.configuracion = [
      {
        menu: [
          { props: { radioSelectedValue: '' } }
        ]
      } as any
    ];
    component.cambioValorRadio('clave', 0, 0, 'nuevoValor');
    expect(component.configuracion[0].menu[0].props.radioSelectedValue).toBe('nuevoValor');
  });

  it('should return correct validators from getValidators', () => {
    const validators = DatosDeLaSolicitudComponent.getValidators([
      'required',
      'maxLength:10',
      'pattern:^[a-zA-Z]+$'
    ]);
    expect(validators.length).toBe(3);
  });
});
