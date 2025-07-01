import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { PagoDeDerechosService } from '../../services/pago-de-derechos.service';
import { Tramite260212Store } from '../../estados/tramite260212.store';
import { Tramite260212Query } from '../../estados/tramite260212.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

describe('PagoDeDerechosComponent', () => {
  let component: PagoDeDerechosComponent;
  let fixture: ComponentFixture<PagoDeDerechosComponent>;
  let mockPagoDeDerechosService: any;
  let mockTramite260212Store: any;
  let mockTramite260212Query: any;
  let mockConsultaioQuery: any;

  beforeEach(async () => {
    mockPagoDeDerechosService = {
      getData: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Banco 1' }]))
    };
    mockTramite260212Store = {
      setClaveDeReferncia: jest.fn(),
      setCadenaDeLaDependencia: jest.fn(),
      setLlaveDePago: jest.fn(),
      setFechaDePago: jest.fn(),
      setImporteDePago: jest.fn(),
      setBanco: jest.fn()
    };
    mockTramite260212Query = {
      selectedBanco$: of('Banco 1'),
      selectedClaveDeReferncia$: of('clave123'),
      selectedCadenaDeLaDependencia$: of('cadenaABC'),
      selectedLlaveDePago$: of('llaveXYZ'),
      selectedFechaDePago$: of('2024-06-01'),
      selectedImporteDePago$: of('1000')
    };
    mockConsultaioQuery = {
      selectConsultaioState$: of({ readonly: true })
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, PagoDeDerechosComponent],
      providers: [
        FormBuilder,
        { provide: PagoDeDerechosService, useValue: mockPagoDeDerechosService },
        { provide: Tramite260212Store, useValue: mockTramite260212Store },
        { provide: Tramite260212Query, useValue: mockTramite260212Query },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario con los controles requeridos', () => {
    expect(component.pagoDerechos.contains('claveDeReferncia')).toBe(true);
    expect(component.pagoDerechos.contains('cadenaDeLaDependencia')).toBe(true);
    expect(component.pagoDerechos.contains('banco')).toBe(true);
    expect(component.pagoDerechos.contains('llaveDePago')).toBe(true);
    expect(component.pagoDerechos.contains('fechaDePago')).toBe(true);
    expect(component.pagoDerechos.contains('importeDePago')).toBe(true);
  });

  // it('should set esFormularioSoloLectura from consultaioQuery', () => {
  //   expect(component.esFormularioSoloLectura).toBe(true);
  // });

  it('should call guardarDatosFormulario if esFormularioSoloLectura is true', () => {
    const spy = jest.spyOn(component, 'guardarDatosFormulario');
    component.esFormularioSoloLectura = true;
    component.pagoDerechos = component['fb'].group({
      claveDeReferncia: [''],
      cadenaDeLaDependencia: [''],
      banco: [''],
      llaveDePago: [''],
      fechaDePago: [''],
      importeDePago: ['']
    });
    component.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('debe llamar a actualizarEstado si esFormularioSoloLectura es false', () => {
    const spy = jest.spyOn(component, 'actualizarEstado');
    component.esFormularioSoloLectura = false;
    component.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('debe deshabilitar el formulario en guardarDatosFormulario cuando es solo lectura', () => {
    component.pagoDerechos.enable();
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.pagoDerechos.disabled).toBe(true);
  });

  it('debe habilitar el formulario en guardarDatosFormulario cuando no es solo lectura', () => {
    component.pagoDerechos.disable();
    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
    expect(component.pagoDerechos.enabled).toBe(true);
  });

  it('debe actualizar dropdownData y valores del formulario en actualizarEstado', () => {
    component.pagoDerechos.patchValue({
      banco: '',
      claveDeReferncia: '',
      cadenaDeLaDependencia: '',
      llaveDePago: '',
      fechaDePago: '',
      importeDePago: ''
    });
    component.actualizarEstado();
    expect(component.dropdownData.length).toBeGreaterThan(0);
    expect(component.pagoDerechos.get('banco')?.value).toBe('Banco 1');
    expect(component.pagoDerechos.get('claveDeReferncia')?.value).toBe('clave123');
    expect(component.pagoDerechos.get('cadenaDeLaDependencia')?.value).toBe('cadenaABC');
    expect(component.pagoDerechos.get('llaveDePago')?.value).toBe('llaveXYZ');
    expect(component.pagoDerechos.get('fechaDePago')?.value).toBe('2024-06-01');
    expect(component.pagoDerechos.get('importeDePago')?.value).toBe('1000');
  });

  it('debe llamar a setClaveDeReferncia en actualizarClaveDeReferncia', () => {
    component.pagoDerechos.get('claveDeReferncia')?.setValue('testClave');
    component.actualizarClaveDeReferncia();
    expect(mockTramite260212Store.setClaveDeReferncia).toHaveBeenCalledWith('testClave');
  });

  it('debe llamar a setCadenaDeLaDependencia en actualizarCadenaDeLaDependencia', () => {
    component.pagoDerechos.get('cadenaDeLaDependencia')?.setValue('testCadena');
    component.actualizarCadenaDeLaDependencia();
    expect(mockTramite260212Store.setCadenaDeLaDependencia).toHaveBeenCalledWith('testCadena');
  });

  it('debe llamar a setLlaveDePago en actualizarLlaveDePago', () => {
    component.pagoDerechos.get('llaveDePago')?.setValue('testLlave');
    component.actualizarLlaveDePago();
    expect(mockTramite260212Store.setLlaveDePago).toHaveBeenCalledWith('testLlave');
  });

  it('debe llamar a setFechaDePago en actualizarFechaDePago', () => {
    component.pagoDerechos.get('fechaDePago')?.setValue('2024-06-01');
    component.actualizarFechaDePago();
    expect(mockTramite260212Store.setFechaDePago).toHaveBeenCalledWith('2024-06-01');
  });

  it('debe llamar a setImporteDePago en actualizarImporteDePago', () => {
    component.pagoDerechos.get('importeDePago')?.setValue('2000');
    component.actualizarImporteDePago();
    expect(mockTramite260212Store.setImporteDePago).toHaveBeenCalledWith('2000');
  });

  it('should call setBanco on getMunicipios', () => {
    component.pagoDerechos.get('banco')?.setValue('Banco 2');
    component.obtenerBanco();
    expect(mockTramite260212Store.setBanco).toHaveBeenCalledWith('Banco 2');
  });

  it('should clean up on ngOnDestroy', () => {
    const spy = jest.spyOn((component as any).destroy$, 'next');
    const spy2 = jest.spyOn((component as any).destroy$, 'complete');
    
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
    
  });

  it('no debe llamar a guardarDatosFormulario si pagoDerechos es undefined', () => {
    const spy = jest.spyOn(component, 'guardarDatosFormulario');
    component.pagoDerechos = undefined as any;
    component.esFormularioSoloLectura = true;
    component.inicializarEstadoFormulario();
    expect(spy).not.toHaveBeenCalled();
  });

  it('no debe establecer valores del formulario si los observables emiten falsy', () => {
    mockTramite260212Query.selectedBanco$ = of('');
    mockTramite260212Query.selectedClaveDeReferncia$ = of(null);
    mockTramite260212Query.selectedCadenaDeLaDependencia$ = of(undefined);
    mockTramite260212Query.selectedLlaveDePago$ = of('');
    mockTramite260212Query.selectedFechaDePago$ = of(null);
    mockTramite260212Query.selectedImporteDePago$ = of(undefined);
    component = new PagoDeDerechosComponent(
      TestBed.inject(FormBuilder),
      mockPagoDeDerechosService,
      mockTramite260212Store,
      mockTramite260212Query,
      mockConsultaioQuery
    );
    component.pagoDerechos = component['fb'].group({
      claveDeReferncia: [''],
      cadenaDeLaDependencia: [''],
      banco: [''],
      llaveDePago: [''],
      fechaDePago: [''],
      importeDePago: ['']
    });
    component.actualizarEstado();
    expect(component.pagoDerechos.get('banco')?.value).toBe('');
    expect(component.pagoDerechos.get('claveDeReferncia')?.value).toBe('');
    expect(component.pagoDerechos.get('cadenaDeLaDependencia')?.value).toBe('');
    expect(component.pagoDerechos.get('llaveDePago')?.value).toBe('');
    expect(component.pagoDerechos.get('fechaDePago')?.value).toBe('');
    expect(component.pagoDerechos.get('importeDePago')?.value).toBe('');
  });

  it('debe manejar actualizarClaveDeReferncia con valor vacío', () => {
    component.pagoDerechos.get('claveDeReferncia')?.setValue('');
    component.actualizarClaveDeReferncia();
    expect(mockTramite260212Store.setClaveDeReferncia).toHaveBeenCalledWith('');
  });

  it('debe manejar actualizarCadenaDeLaDependencia con valor vacío', () => {
    component.pagoDerechos.get('cadenaDeLaDependencia')?.setValue('');
    component.actualizarCadenaDeLaDependencia();
    expect(mockTramite260212Store.setCadenaDeLaDependencia).toHaveBeenCalledWith('');
  });

  it('debe manejar actualizarLlaveDePago con valor vacío', () => {
    component.pagoDerechos.get('llaveDePago')?.setValue('');
    component.actualizarLlaveDePago();
    expect(mockTramite260212Store.setLlaveDePago).toHaveBeenCalledWith('');
  });

  it('debe manejar actualizarFechaDePago con valor vacío', () => {
    component.pagoDerechos.get('fechaDePago')?.setValue('');
    component.actualizarFechaDePago();
    expect(mockTramite260212Store.setFechaDePago).toHaveBeenCalledWith('');
  });

  it('debe manejar actualizarImporteDePago con valor vacío', () => {
    component.pagoDerechos.get('importeDePago')?.setValue('');
    component.actualizarImporteDePago();
    expect(mockTramite260212Store.setImporteDePago).toHaveBeenCalledWith('');
  });

  it('should handle getMunicipios with empty value', () => {
    component.pagoDerechos.get('banco')?.setValue('');
    component.obtenerBanco();
    expect(mockTramite260212Store.setBanco).toHaveBeenCalledWith('');
  });

  it('debe llamar a actualizarEstado incluso si pagoDerechos es undefined', () => {
    component.pagoDerechos = undefined as any;
    expect(() => component.actualizarEstado()).not.toThrow();
  });

  it('debe llamar a guardarDatosFormulario y habilitar/deshabilitar el formulario correctamente', () => {
    component.pagoDerechos = component['fb'].group({
      claveDeReferncia: [''],
      cadenaDeLaDependencia: [''],
      banco: [''],
      llaveDePago: [''],
      fechaDePago: [''],
      importeDePago: ['']
    });
    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
      expect(component.pagoDerechos.enabled).toBe(true);
  
      component.esFormularioSoloLectura = true;
      component.guardarDatosFormulario();
      expect(component.pagoDerechos.disabled).toBe(true);
    });
  
  });

  // it('should construct with readonly false and call actualizarEstado', () => {
  //   mockConsultaioQuery.selectConsultaioState$ = of({ readonly: false });
  //   const spy = jest.spyOn(PagoDeDerechosComponent.prototype, 'inicializarEstadoFormulario');
  //   const cmp = new PagoDeDerechosComponent(
  //     TestBed.inject(FormBuilder),
  //     mockPagoDeDerechosService,
  //     mockTramite260212Store,
  //     mockTramite260212Query,
  //     mockConsultaioQuery
  //   );
  //   expect(spy).toHaveBeenCalled();
  //   spy.mockRestore();
  // });
