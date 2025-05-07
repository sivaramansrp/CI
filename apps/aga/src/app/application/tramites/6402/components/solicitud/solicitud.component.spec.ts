import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { SolicitudComponent } from './solicitud.component';
import { Tramite6402Store } from '../../estados/tramite6402.store';
import { Tramite6402Query } from '../../estados/tramite6402.query';
import { AutorizacionImportacionService } from '../../services/autorizacion-importacion.service';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { provideHttpClient } from '@angular/common/http'; 

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SolicitudComponent],
      providers: [FormBuilder, Tramite6402Store, Tramite6402Query, AutorizacionImportacionService, ValidacionesFormularioService, provideHttpClient()],
      declarations: []
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
  });

  it('should initialize the form', () => {
    component.inicializarFormulario();
    expect(component.solicitudFormulario).toBeDefined();
    expect(component.solicitudFormulario.controls['datosAduana']).toBeDefined();
    expect(component.solicitudFormulario.controls['datosPedimento']).toBeDefined();
    expect(component.solicitudFormulario.controls['datosMedioTransporte']).toBeDefined();
    expect(component.solicitudFormulario.controls['datosDestinoMercancia']).toBeDefined();
  });
});
describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, SolicitudComponent],
      providers: [FormBuilder, Tramite6402Store, Tramite6402Query, AutorizacionImportacionService, ValidacionesFormularioService],
      declarations: []
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
  });

  it('should initialize solicitudFormulario', () => {
    component.inicializarFormulario();
    expect(component.solicitudFormulario).toBeDefined();
    expect(component.solicitudFormulario.controls['datosAduana']).toBeDefined();
    expect(component.solicitudFormulario.controls['datosPedimento']).toBeDefined();
    expect(component.solicitudFormulario.controls['datosMedioTransporte']).toBeDefined();
    expect(component.solicitudFormulario.controls['datosDestinoMercancia']).toBeDefined();
  });

  it('should initialize mercanciaFormulario', () => {
    component.inicializarMercanciaFormulario();
    expect(component.mercanciaFormulario).toBeDefined();
    expect(component.mercanciaFormulario.controls['modalDescMercancia']).toBeDefined();
    expect(component.mercanciaFormulario.controls['espeMercancia']).toBeDefined();
    expect(component.mercanciaFormulario.controls['marcaMercancia']).toBeDefined();
    expect(component.mercanciaFormulario.controls['modeloMercancia']).toBeDefined();
    expect(component.mercanciaFormulario.controls['numSerieMercancia']).toBeDefined();
    expect(component.mercanciaFormulario.controls['numParteMercancia']).toBeDefined();
    expect(component.mercanciaFormulario.controls['tipoMercancia']).toBeDefined();
  });

  it('should disable checkProrroga when cveTipoDocumento is "Folio VUCEM"', () => {
    component.inicializarFormulario();
    component.datosPedimento.get('cveTipoDocumento')?.setValue('Folio VUCEM');
    component.cambiarTipoDocumento();
    expect(component.datosPedimento.get('checkProrroga')?.disabled).toBeTruthy();
    expect(component.datosPedimento.get('checkProrroga')?.value).toBe('');
  });

  it('should enable checkProrroga when cveTipoDocumento is not "Folio VUCEM"', () => {
    component.inicializarFormulario();
    component.datosPedimento.get('cveTipoDocumento')?.setValue('Other');
    component.cambiarTipoDocumento();
    expect(component.datosPedimento.get('checkProrroga')?.enabled).toBeTruthy();
  });

  it('should filter out selected rows when eliminarMercancia is called', () => {
    component.tablaDeDatos.datos = [{ id: 1 }, { id: 2 }, { id: 3 }] as any;
    component.filaSeleccionadaLista = [{ id: 2 }] as any;
    component.eliminarMercancia();
    expect(component.tablaDeDatos.datos).toEqual([{ id: 1 }, { id: 3 }]);
    expect(component.filaSeleccionadaLista).toEqual([]);
  });

  it('should emit destroyNotifier$ on ngOnDestroy', () => {
    const destroySpy = spyOn(component.destroyNotifier$, 'next');
    const completeSpy = spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
