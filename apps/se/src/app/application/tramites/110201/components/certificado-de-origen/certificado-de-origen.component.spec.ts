// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Pipe,
  PipeTransform,
  Injectable,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Directive,
  Input,
  Output,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { CertificadoDeOrigenComponent } from './certificado-de-origen.component';
import { RegistroService } from '../../services/registro.service';
import { FormBuilder } from '@angular/forms';
import { Tramite110201Store } from '../../state/Tramite110201.store';
import { Tramite110201Query } from '../../state/Tramite110201.query';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';

@Injectable()
class MockRegistroService {}

@Injectable()
class MockTramite110201Store {}

@Injectable()
class MockTramite110201Query {}

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom;
}

@Pipe({ name: 'translate' })
class TranslatePipe implements PipeTransform {
  transform(value) {
    return value;
  }
}

@Pipe({ name: 'phoneNumber' })
class PhoneNumberPipe implements PipeTransform {
  transform(value) {
    return value;
  }
}

@Pipe({ name: 'safeHtml' })
class SafeHtmlPipe implements PipeTransform {
  transform(value) {
    return value;
  }
}

describe('CertificadoDeOrigenComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, CertificadoDeOrigenComponent],
      declarations: [
        TranslatePipe,
        PhoneNumberPipe,
        SafeHtmlPipe,
        MyCustomDirective,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: RegistroService, useClass: MockRegistroService },
        FormBuilder,
        { provide: Tramite110201Store, useClass: MockTramite110201Store },
        { provide: Tramite110201Query, useClass: MockTramite110201Query },
        ValidacionesFormularioService,
      ],
    })
      .overrideComponent(CertificadoDeOrigenComponent, {})
      .compileComponents();
    fixture = TestBed.createComponent(CertificadoDeOrigenComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    if (fixture) {
      fixture.destroy();
    }
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run GetterDeclaration #validacionForm', async () => {
    component.registroForm = component.registroForm || {};
    component.registroForm.get = jest.fn();
    const validacionForm = component.validacionForm;
    expect(component.registroForm.get).toHaveBeenCalled();
  });

  it('should run GetterDeclaration #validacionMercanciaForm', async () => {
    component.mercanciaForm = component.mercanciaForm || {};
    component.mercanciaForm.get = jest.fn();
    const validacionMercanciaForm = component.validacionMercanciaForm;
    expect(component.mercanciaForm.get).toHaveBeenCalled();
  });

  it('should run #validarDestinatarioFormulario()', async () => {
    component.registroForm = component.registroForm || {};
    component.registroForm.invalid = 'invalid';
    component.registroForm.markAllAsTouched = jest.fn();
    component.validarDestinatarioFormulario();
    expect(component.registroForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should run #validarmercanciaForm()', async () => {
    component.mercanciaForm = component.mercanciaForm || {};
    component.mercanciaForm.invalid = 'invalid';
    component.mercanciaForm.markAllAsTouched = jest.fn();
    component.validarmercanciaForm();
    expect(component.mercanciaForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should run #ngOnInit()', async () => {
    component.mercanciaDisponsible = jest.fn();
    component.mercanciaSeleccionadas = jest.fn();
    component.mercanciatable = jest.fn();
    component.getTratado = jest.fn();
    component.getPais = jest.fn();
    component.getUMC = jest.fn();
    component.getUnidadMedida = jest.fn();
    component.getTipoFactura = jest.fn();
    component.query = component.query || {};
    component.query.selectSolicitud$ = observableOf({});
    component.query.selectTratado$ = observableOf({
      catalogos: {},
    });
    component.query.selectPais$ = observableOf({});
    component.query.selectUMC$ = observableOf({});
    component.query.selectUnidadMedida$ = observableOf({
      catalogos: {},
    });
    component.query.selectTipoFactura$ = observableOf({});
    component.donanteDomicilio = jest.fn();
    component.subscriptions = component.subscriptions || {};
    component.subscriptions.push = jest.fn();
    component.tratado = component.tratado || {};
    component.tratado.catalogos = 'catalogos';
    component.unidadMedida = component.unidadMedida || {};
    component.unidadMedida.catalogos = 'catalogos';
    component.ngOnInit();
    expect(component.mercanciaDisponsible).toHaveBeenCalled();
    expect(component.mercanciaSeleccionadas).toHaveBeenCalled();
    expect(component.mercanciatable).toHaveBeenCalled();
    expect(component.getTratado).toHaveBeenCalled();
    expect(component.getPais).toHaveBeenCalled();
    expect(component.getUMC).toHaveBeenCalled();
    expect(component.getUnidadMedida).toHaveBeenCalled();
    expect(component.getTipoFactura).toHaveBeenCalled();
    expect(component.donanteDomicilio).toHaveBeenCalled();
    expect(component.subscriptions.push).toHaveBeenCalled();
  });

  it('should run #buscarMercancias()', async () => {
    component.Tratadodescripcion = component.Tratadodescripcion || {};
    component.Tratadodescripcion.includes = jest.fn(1);
    component.buscarMercancias();
    expect(component.Tratadodescripcion.includes).toHaveBeenCalled();
  });

  it('should run #buscarMercancias()', async () => {
    component.Tratadodescripcion = component.Tratadodescripcion || {};
    component.Tratadodescripcion.includes = jest.fn();
    component.buscarMercancias();
    expect(component.Tratadodescripcion.includes).toHaveBeenCalled();
  });

  it('should run #agregar()', async () => {
    component.getTratado = jest.fn();
    component.getPais = jest(fn);
    component.agregar();
    expect(component.getTratado).toHaveBeenCalled();
    expect(component.getPais).toHaveBeenCalled();

    component.mercanciaForm = component.mercanciaForm || {};
    component.mercanciaForm.valid = 'valid';
    component.mercanciaForm.value = {
      validacionMercanciaForm: {
        fraccionMercanArancelaria: {},
        cantidad: {},
        unidadMedida: {},
        valordelamercancia: {},
        tipoFactura: {},
        nFactura: {},
        complementodeladescripcion: {},
        fecha: {},
      },
    };
    component.tableSeleccionadas = component.tableSeleccionadas || {};
    component.tableSeleccionadas.data = {
      push: function () {},
    };
    component.agregar();
  });

  it('should run #mercanciaDisponsible()', async () => {
    component.getMercanciaDisponsibleTableData =
      component.getMercanciaDisponsibleTableData || {};
    component.getMercanciaDisponsibleTableData.tableHeader = 'tableHeader';
    component.mercanciaDisponsible();
  });

  it('should run #mercanciaSeleccionadas()', async () => {
    component.getmercanciaSeleccionadasTable =
      component.getmercanciaSeleccionadasTable || {};
    component.getmercanciaSeleccionadasTable.tableHeader = 'tableHeader';
    component.mercanciaSeleccionadas();
  });

  it('should run #mercanciatable()', async () => {
    component.getMercanciaTable = component.getMercanciaTable || {};
    component.getMercanciaTable.tableHeader = 'tableHeader';
    component.getMercanciaTable.tableBody = 'tableBody';
    component.mercanciatable();
  });

  it('should run #cargaArchivo()', async () => {
    component.cargaArchivo();
  });

  it('should run #giveError()', async () => {
    component.giveError();
  });

  it('should call agregar when the form is valid', () => {
    const agregarSpy = jest.spyOn(component, 'agregar');
    component.mercanciaForm = component.fb.group({
      validacionMercanciaForm: component.fb.group({
        fraccionMercanArancelaria: ['123456789', Validators.required],
        cantidad: ['10', Validators.required],
        unidadMedida: ['kg', Validators.required],
        valordelamercancia: ['100.00', Validators.required],
        tipoFactura: ['Factura A', Validators.required],
        nFactura: ['12345', Validators.required],
        complementoDescripcion: ['Descripción', Validators.required],
        fecha: ['2025-03-20', Validators.required],
      }),
    });
    component.agregar();
    expect(agregarSpy).toHaveBeenCalled();
  });

  it('should run #modificar()', async () => {
    component.getUMC = jest.fn();
    component.getTipoFactura = jest(fn);
    component.getUnidadMedida = jest.fn();
    component.modificar();
    expect(component.getUMC).toHaveBeenCalled();
    expect(component.getTipoFactura).toHaveBeenCalled();
  });

  it('should run #handleClick()', async () => {
    component.handleClick();
  });

  it('should run #getTratado()', async () => {
    component.registroService = component.registroService || {};
    component.registroService.getTratado = jest.fn().mockReturnValue(
      observableOf({
        code: {},
        data: {},
      })
    );
    component.store = component.store || {};
    component.store.setTratado = jest.fn();
    component.getTratado();
    expect(component.registroService.getTratado).toHaveBeenCalled();
    expect(component.store.setTratado).toHaveBeenCalled();
  });

  it('should run #getPais()', async () => {
    component.registroService = component.registroService || {};
    component.registroService.getPais = jest.fn().mockReturnValue(
      observableOf({
        code: {},
        data: {},
      })
    );
    component.store = component.store || {};
    component.store.setPais = jest.fn();
    component.getPais();
    expect(component.registroService.getPais).toHaveBeenCalled();
    expect(component.store.setPais).toHaveBeenCalled();
  });

  it('should run #getUMC()', async () => {
    component.registroService = component.registroService || {};
    component.registroService.getUMC = jest.fn().mockReturnValue(
      observableOf({
        code: {},
        data: {},
      })
    );
    component.store = component.store || {};
    component.store.setUMC = jest.fn();
    component.getUMC();
    expect(component.registroService.getUMC).toHaveBeenCalled();
    expect(component.store.setUMC).toHaveBeenCalled();
  });

  it('should run #getUnidadMedida()', async () => {
    component.registroService = component.registroService || {};
    component.registroService.getUnidadMedida = jest.fn().mockReturnValue(
      observableOf({
        code: {},
        data: {},
      })
    );
    component.store = component.store || {};
    component.store.setUnidadMedida = jest.fn();
    component.getUnidadMedida();
    expect(component.registroService.getUnidadMedida).toHaveBeenCalled();
    expect(component.store.setUnidadMedida).toHaveBeenCalled();
  });

  it('should run #getTipoFactura()', async () => {
    component.registroService = component.registroService || {};
    component.registroService.getTipoFactura = jest.fn().mockReturnValue(
      observableOf({
        code: {},
        data: {},
      })
    );
    component.store = component.store || {};
    component.store.setTipoFactura = jest.fn();
    component.getTipoFactura();
    expect(component.registroService.getTipoFactura).toHaveBeenCalled();
    expect(component.store.setTipoFactura).toHaveBeenCalled();
  });

  it('should run #cerrarAdjuntarArchivoMercancias()', async () => {
    component.cerrarAdjuntarArchivoMercancias();
  });

  it('should run #alSeleccionarArchivo()', async () => {
    component.alSeleccionarArchivo({
      target: {
        files: {
          0: {
            name: {},
          },
        },
      },
    });
  });

  it('should run #onSubmit()', async () => {
    component.registroForm = component.registroForm || {};
    component.registroForm.valid = 'valid';
    component.onSubmit();
  });

  it('should run #isValid()', async () => {
    component.validacionesService = component.validacionesService || {};
    component.validacionesService.isValid = jest.fn();
    component.isValid({}, {});
    expect(component.validacionesService.isValid).toHaveBeenCalled();
  });

  it('should run #setValoresStore()', async () => {
    component.store = component.store || {};
    component.store.metodoNombre = jest.fn();
    component.setValoresStore(
      {
        get: function () {
          return {
            value: {},
          };
        },
      },
      {},
      {}
    );
    expect(component.store.metodoNombre).toHaveBeenCalled();
  });

  it('should run #donanteDomicilio()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.solicitudState = component.solicitudState || {};
    component.solicitudState.tratado = 'tratado';
    component.solicitudState.pais = 'pais';
    component.solicitudState.fraccionArancelaria = 'fraccionArancelaria';
    component.solicitudState.numRegistro = 'numRegistro';
    component.solicitudState.nomComercial = 'nomComercial';
    component.solicitudState.fechInicioB = 'fechInicioB';
    component.solicitudState.fechFinB = 'fechFinB';
    component.solicitudState.archivo = 'archivo';
    component.solicitudState.fraccionMercanArancelaria =
      'fraccionMercanArancelaria';
    component.solicitudState.nombretecnico = 'nombretecnico';
    component.solicitudState.nombrecomercialdelamercancia =
      'nombrecomercialdelamercancia';
    component.solicitudState.criterioparaconferir = 'criterioparaconferir';
    component.solicitudState.nomreeningles = 'nomreeningles';
    component.solicitudState.marca = 'marca';
    component.solicitudState.cantidad = 'cantidad';
    component.solicitudState.umc = 'umc';
    component.solicitudState.valordelamercancia = 'valordelamercancia';
    component.solicitudState.complementodeladescripcion =
      'complementodeladescripcion';
    component.solicitudState.masabruta = 'masabruta';
    component.solicitudState.unidadMedida = 'unidadMedida';
    component.solicitudState.tipoFactura = 'tipoFactura';
    component.solicitudState.fecha = 'fecha';
    component.solicitudState.nFactura = 'nFactura';
    component.donanteDomicilio();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.getTratadoSubscription = component.getTratadoSubscription || {};
    component.getTratadoSubscription.unsubscribe = jest.fn();
    component.getPaisSubscription = component.getPaisSubscription || {};
    component.getPaisSubscription.unsubscribe = jest.fn();
    component.getUMCSubscription = component.getUMCSubscription || {};
    component.getUMCSubscription.unsubscribe = jest.fn();
    component.getUnidadMedidaSubscription =
      component.getUnidadMedidaSubscription || {};
    component.getUnidadMedidaSubscription.unsubscribe = jest.fn();
    component.getTipoFacturaSubscription =
      component.getTipoFacturaSubscription || {};
    component.getTipoFacturaSubscription.unsubscribe = jest.fn();
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.ngOnDestroy();
    expect(component.getTratadoSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.getPaisSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.getUMCSubscription.unsubscribe).toHaveBeenCalled();
    expect(
      component.getUnidadMedidaSubscription.unsubscribe
    ).toHaveBeenCalled();
    expect(component.getTipoFacturaSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
  });
});
