import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosMercanciaContenedoraComponent } from './datos-mercancia-contenedora.component';
import { FormBuilder } from '@angular/forms';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DatosMercanciaContenedoraComponent', () => {
  let component: DatosMercanciaContenedoraComponent;
  let fixture: ComponentFixture<DatosMercanciaContenedoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [HttpClientTestingModule, DatosMercanciaContenedoraComponent],
      providers: [FormBuilder, DatosSolicitudService, { provide: Location, useValue: {} }],
    }).compileComponents();
    fixture = TestBed.createComponent(DatosMercanciaContenedoraComponent);
    component = fixture.componentInstance;
    component.idProcedimiento = 260201;
    component.mercanciaFormState = {} as any;
    component.datoSeleccionado = {} as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.mercanciaForm).toBeTruthy();
  });

  it('should reset form', () => {
    component.crearMercanciaForm();
    component.mercanciaForm.get('clasificacionProducto')?.setValue('test');
    component.resetForm();
    expect(component.mercanciaForm.get('clasificacionProducto')?.value).toBeNull();
  });

  it('should emit agregarMercancia if form is valid', () => {
    component.crearMercanciaForm();
    component.mercanciaForm.patchValue({
      clasificacionProducto: 'A',
      especificarClasificacionProducto: 'B',
      denominacionEspecificaProducto: 'C',
      denominacionDistintiva: 'D',
      denominacionComun: 'E',
      tipoProducto: 'F',
      formaFarmaceutica: 'G',
      estadoFisico: 'H',
      fraccionArancelaria: 'I',
      descripcionFraccion: 'J',
      cantidadUmtValor: '1',
      cantidadUmt: '2',
      cantidadUmcValor: '3',
      cantidadUmc: '4',
      presentacion: 'K',
      numeroRegistroSanitario: 'L',
      fechaCaducidad: '2025-01-01',
      paisDeOriginDatos: ['MX'],
      paisDeProcedenciaDatos: ['MX'],
      usoEspecifico: ['Uso'],
    });
    jest.spyOn(component.agregarMercancia, 'emit');
    component.onAgregarMercancia();
    expect(component.agregarMercancia.emit).toHaveBeenCalled();
  });

  it('should mark all as touched if form is invalid', () => {
    component.crearMercanciaForm();
    jest.spyOn(component.mercanciaForm, 'markAllAsTouched');
    component.onAgregarMercancia();
    expect(component.mercanciaForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should emit cancelarMercanciaModal on cerrarMercanciaModal', () => {
    jest.spyOn(component.cancelarMercanciaModal, 'emit');
    component.cerrarMercanciaModal();
    expect(component.cancelarMercanciaModal.emit).toHaveBeenCalled();
  });

  it('should validate elements for idProcedimiento', () => {
    component.idProcedimiento = 260102;
    component.validarElementos();
    expect(component.elementosNoValidos.length).toBeGreaterThan(0);
  });

  it('should add and remove clave', () => {
    component.crearMercanciaForm();
    component.mercanciaForm.patchValue({
      claveDeLos: 'clave',
      fechaDeFabricacio: '2025-01-01',
      fechaDeCaducidad: '2026-01-01',
    });
    component.agregarClave();
    expect(component.claveConfig.datos.length).toBe(1);
    component.claveLista = [{ clave: 'clave', fabricacion: '2025-01-01', caducidad: '2026-01-01' }];
    component.eliminarClave();
    expect(component.claveConfig.datos.length).toBe(0);
  });

  it('should patch value on claveListaFn', () => {
    component.crearMercanciaForm();
    component.claveConfig.datos = [{ clave: 'clave', fabricacion: '2025-01-01', caducidad: '2026-01-01' }];
    component.claveListaFn([{ clave: 'clave', fabricacion: '2025-01-01', caducidad: '2026-01-01' }]);
    expect(component.mercanciaForm.get('claveDeLos')?.value).toBe('clave');
  });

  it('should handle paisDeOriginSeleccionadasChange', () => {
    component.crearMercanciaForm();
    component.paisDeOriginSeleccionadasChange(['MX']);
    expect(component.mercanciaForm.get('paisDeOriginDatos')?.value).toEqual(['MX']);
  });

  it('should handle paisDeProcedenciaSeleccionadasChange', () => {
    component.crearMercanciaForm();
    component.paisDeProcedenciaSeleccionadasChange(['MX']);
    expect(component.mercanciaForm.get('paisDeProcedenciaDatos')?.value).toEqual(['MX']);
  });

  it('should handle usoEspesificoSeleccionadasChange', () => {
    component.crearMercanciaForm();
    component.usoEspesificoSeleccionadasChange(['Uso']);
    expect(component.mercanciaForm.get('usoEspecifico')?.value).toEqual(['Uso']);
  });

  it('should toggle mostrarColapsable', () => {
    component.mostrarColapsable(1);
    expect(component.paisDeOriginColapsable).toBe(true);
    component.mostrarColapsable(2);
    expect(component.paisDeProcedenciaColapsable).toBe(true);
    component.mostrarColapsable(3);
    expect(component.usoEspesificoColapsable).toBe(true);
  });

  it('should limpiarMercancia', () => {
    component.crearMercanciaForm();
    component.limpiarMercancia();
    expect(component.seleccionadasUsoEspesificoDatos).toEqual([]);
    expect(component.seleccionadasPaisDeOriginDatos).toEqual([]);
    expect(component.seleccionadasPaisDeProcedenciaDatos).toEqual([]);
  });

  it('should set nuevaNotificacion on cancelar', () => {
    component.cancelar();
    expect(component.nuevaNotificacion).toBeTruthy();
    expect(component.nuevaNotificacion.mensaje).toBe('Cancelado');
  });

  it('should cambiarFraccionArancelaria and abrirModal', () => {
    component.crearMercanciaForm();
    component.mercanciaForm.get('fraccionArancelaria')?.setValue('test');
    jest.spyOn(component, 'abrirModal');
    component.mercanciaForm.get('cantidadUmt')?.disable();
    component.cambiarFraccionArancelaria();
    expect(component.abrirModal).toHaveBeenCalled();
  });

  it('should eliminarPedimento', () => {
    component.pedimentos = [{}, {}, {}] as any;
    component.elementoParaEliminar = 1;
    component.eliminarPedimento(true);
    expect(component.pedimentos.length).toBe(2);
  });

  it('should abrirModal', () => {
    component.abrirModal(0);
    expect(component.nuevaNotificacion).toBeTruthy();
    expect(component.elementoParaEliminar).toBe(0);
  });

  it('should get value from obtenerValor', () => {
    component.mercanciaFormState = { testField: 'testValue' } as any;
    expect(component.obtenerValor('testField' as any)).toBe('testValue');
  });

  it('should validate isValid', () => {
    component.crearMercanciaForm();
    const control = component.mercanciaForm.get('clasificacionProducto')!;
    control.markAsTouched();
    control.setErrors({ required: true });
    expect(component.isValid(control)).toBe(true);
  });
});
