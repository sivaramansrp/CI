import { DatosSolicitudComponent } from './datos-solicitud.component';
import { FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';

describe('DatosSolicitudComponent - ngOnInit', () => {
  let component: DatosSolicitudComponent;
  let fb: FormBuilder;
  let query: any;

  beforeEach(() => {
    fb = new FormBuilder();
    query = {
      mostrarTabla$: of(true),
      selectSolicitud$: of({
        cantidadPartidasDeLaMercancia: '10',
        valorPartidaUSDPartidasDeLaMercancia: '100.00',
        descripcionPartidasDeLaMercancia: 'Test description',
      }),
      fraccion$: of('Test fraccion'),
      unidadMedida$: of('Test unidad'),
    };

    component = new DatosSolicitudComponent(fb, {} as any, {} as any, query, {} as any);
    component['destroyed$'] = new Subject<void>();
    component.partidasDelaMercanciaForm = fb.group({
      cantidadPartidasDeLaMercancia: [''],
      valorPartidaUSDPartidasDeLaMercancia: [''],
      descripcionPartidasDeLaMercancia: [''],
      fraccion: [''],
      unidadMedida: [''],
    });
  });

  afterEach(() => {
    component['destroyed$'].next();
    component['destroyed$'].complete();
  });

  it('should initialize forms and subscriptions', () => {
    const inicializarFormulariosSpy = jest.spyOn(component, 'inicializarFormularios');
    const configuracionFormularioSuscripcionesSpy = jest.spyOn(component, 'configuracionFormularioSuscripciones');
    const opcionesDeBusquedaSpy = jest.spyOn(component, 'opcionesDeBusqueda');
    const formularioTotalCountSpy = jest.spyOn(component, 'formularioTotalCount');
    const getEstablecimientoSpy = jest.spyOn(component, 'getEstablecimiento');
    const calcularTotalesSpy = jest.spyOn(component, 'calcularTotales');
    const fetchEntidadFederativaSpy = jest.spyOn(component, 'fetchEntidadFederativa');
    const fetchRepresentacionFederalSpy = jest.spyOn(component, 'fetchRepresentacionFederal');
    const listaDePaisesDisponiblesSpy = jest.spyOn(component, 'listaDePaisesDisponibles');

    component.ngOnInit();

    expect(inicializarFormulariosSpy).toHaveBeenCalled();
    expect(configuracionFormularioSuscripcionesSpy).toHaveBeenCalled();
    expect(opcionesDeBusquedaSpy).toHaveBeenCalled();
    expect(formularioTotalCountSpy).toHaveBeenCalled();
    expect(getEstablecimientoSpy).toHaveBeenCalled();
    expect(calcularTotalesSpy).toHaveBeenCalled();
    expect(fetchEntidadFederativaSpy).toHaveBeenCalled();
    expect(fetchRepresentacionFederalSpy).toHaveBeenCalled();
    expect(listaDePaisesDisponiblesSpy).toHaveBeenCalled();
  });

  it('should update mostrarTabla from mostrarTabla$ observable', () => {
    component.ngOnInit();
    expect(component.mostrarTabla).toBe(true);
  });

  it('should patch partidasDelaMercanciaForm from selectSolicitud$ observable', () => {
    const patchValueSpy = jest.spyOn(component.partidasDelaMercanciaForm, 'patchValue');

    component.ngOnInit();

    expect(patchValueSpy).toHaveBeenCalledWith({
      cantidadPartidasDeLaMercancia: '10',
      valorPartidaUSDPartidasDeLaMercancia: '100.00',
      descripcionPartidasDeLaMercancia: 'Test description',
    });
  });

  it('should patch fraccion from fraccion$ observable', () => {
    const patchValueSpy = jest.spyOn(component.partidasDelaMercanciaForm, 'patchValue');

    component.ngOnInit();

    expect(patchValueSpy).toHaveBeenCalledWith({ fraccion: 'Test fraccion' }, { emitEvent: false });
  });

  it('should patch unidadMedida from unidadMedida$ observable and update its validity', () => {
    const patchValueSpy = jest.spyOn(component.partidasDelaMercanciaForm, 'patchValue');
    const updateValueAndValiditySpy = jest.spyOn(
      component.partidasDelaMercanciaForm.get('unidadMedida')!,
      'updateValueAndValidity'
    );

    component.ngOnInit();

    expect(patchValueSpy).toHaveBeenCalledWith({ unidadMedida: 'Test unidad' }, { emitEvent: false });
    expect(updateValueAndValiditySpy).toHaveBeenCalled();
  });
});