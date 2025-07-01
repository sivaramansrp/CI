import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { ManualAvisoComponent } from './manual-aviso.component';
import {
  CatalogosService,
  ConsultaioQuery,
  InputConfig,
  InputTypes,
  MenuConfig,
  BotonAccionesTipos,
} from '@ng-mf/data-access-user';
import { Tramite32504Store } from '../../estados/tramite32504.store';
import { ActionType } from '../../enum/aviso.enum';

describe('ManualAvisoComponent', () => {
  let component: ManualAvisoComponent;
  let fixture: ComponentFixture<ManualAvisoComponent>;

  // Stubs
  const catalogosServiceStub = {
    getCatalogo: jest.fn().mockReturnValue(of([{ label: 'opt', value: '1' }])),
  } as Partial<CatalogosService>;

  const consultaQueryStub = {
    selectConsultaioState$: of({ readonly: false }),
  } as Partial<ConsultaioQuery>;

  const storeStub = {
    setDatosQuienRecibe: jest.fn(),
    setDatosDomicilioLugar: jest.fn(),
    setDatosMercanciaSubmanufactura: jest.fn(),
  } as Partial<Tramite32504Store>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ManualAvisoComponent],
      providers: [
        { provide: CatalogosService, useValue: catalogosServiceStub },
        { provide: ConsultaioQuery, useValue: consultaQueryStub },
        { provide: Tramite32504Store, useValue: storeStub },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ManualAvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and initialize form with groups', () => {
    expect(component).toBeTruthy();
    expect(component.formulario.contains('datosQuienRecibe')).toBeTruthy();
    expect(component.formulario.contains('datosDomicilioLugar')).toBeTruthy();
    expect(
      component.formulario.contains('datosMercanciaSubmanufactura')
    ).toBeTruthy();
    expect(component.formulario.contains('manualDatos')).toBeTruthy();
  });

  it('static obtenerValidadores returns correct validators', () => {
    const vals = ManualAvisoComponent.obtenerValidadores([
      'required',
      'maxLength:3',
      'pattern:\\d+',
    ]);
    expect(vals.length).toBe(3);
    expect(typeof vals[0]).toBe('function');
  });

  it('fechaCambiado sets event property', () => {
    component.fechaCambiado('2025-01-01');
    expect(component.event).toBe('2025-01-01');
  });

  it('seleccionCatalogo updates form control value', () => {
    const fb = TestBed.inject(FormBuilder);
    (component.formulario as FormGroup).addControl('test', fb.control(''));
    const ctrlName = 'test';
    const event = 'value1' as any;
    component.seleccionCatalogo(ctrlName, event);
    expect((component.formulario as FormGroup).get(ctrlName)?.value).toBe(
      event
    );
  });

  it('cambioValorRadio sets radioSelectedValue in config', () => {
    const configIndex = 0;
    const menuIndex = 0;
    const value = 'radioVal';
    component.cambioValorRadio('ignored', configIndex, menuIndex, value);
    expect(
      component.configuracion[configIndex].menu[menuIndex].props
        .radioSelectedValue
    ).toBe(value);
  });

  it('accionesBotones FORM_ACTION Agregar emits and resets esAgregarClicked', () => {
    const spyEmit = jest.spyOn(component.emitButtonAction, 'emit');
    component.esAgregarClicked = true;
    component.accionesBotones(
      'FORM_ACTION' as ActionType,
      BotonAccionesTipos.AGREGAR
    );
    expect(spyEmit).toHaveBeenCalledWith(false);
    expect(component.esAgregarClicked).toBe(true);
  });

  it('accionesBotones TABLE_ACTION Agregar sets esAgregarClicked true and calls renderizadoGrupo', () => {
    component.esAgregarClicked = false;
    const spyRender = jest.spyOn(component, 'renderizadoGrupo');
    component.accionesBotones(
      'TABLE_ACTION' as ActionType,
      BotonAccionesTipos.AGREGAR
    );
    expect(component.esAgregarClicked).toBe(true);
    expect(spyRender).toHaveBeenCalledWith(component.configuracion_table);
  });

  it('botonDeTablaInfantilAccion CANCELAR sets esAgregarClicked false', () => {
    component.esAgregarClicked = true;
    component.botonDeTablaInfantilAccion(BotonAccionesTipos.CANCELAR);
    expect(component.esAgregarClicked).toBe(false);
  });

  it('ngOnDestroy completes destroyNotifier$', () => {
    const notifier = (component as any).destroyNotifier$;
    const nextSpy = jest.spyOn(notifier, 'next');
    const completeSpy = jest.spyOn(notifier, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
