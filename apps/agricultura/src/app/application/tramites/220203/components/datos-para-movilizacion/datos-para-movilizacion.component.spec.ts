import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosParaMovilizacionComponent } from './datos-para-movilizacion.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject, throwError } from 'rxjs';
import { CatalogoSelectComponent, TituloComponent, ConsultaioQuery } from '@ng-mf/data-access-user';
import { ImportacionDeAcuiculturaService } from '../../services/220203/importacion-de-acuicultura.service';
import { CommonModule } from '@angular/common';

describe('DatosParaMovilizacionComponent', () => {
  let component: DatosParaMovilizacionComponent;
  let fixture: ComponentFixture<DatosParaMovilizacionComponent>;

  let mockService: any;
  let mockQuery: any;

  const fakeCatalogos = [{ id: 1, descripcion: 'Camión' }];
  const fakeFormulario = {
    medioDeTransporte: 'Camión',
    identificacionTransporte: '123',
    puntoVerificacion: 'Punto1',
    nombreEmpresaTransportista: 'Empresa X'
  };

  beforeEach(async () => {
    mockService = {
      obtenerDatos: jest.fn().mockReturnValue(of({ formularioMovilizacion: fakeFormulario })),
      obtenerDetallesDelCatalogo: jest.fn().mockImplementation((file: string) => {
        return of({ data: fakeCatalogos });
      }),
      actualizarFormaValida: jest.fn(),
      actualizarFormularioMovilizacion: jest.fn()
    };

    mockQuery = {
      selectConsultaioState$: of({ readonly: true })
    };

    await TestBed.configureTestingModule({
      imports: [
        DatosParaMovilizacionComponent,
        ReactiveFormsModule,
        CommonModule,
        TituloComponent,
        CatalogoSelectComponent
      ],
      providers: [
        FormBuilder,
        { provide: ImportacionDeAcuiculturaService, useValue: mockService },
        { provide: ConsultaioQuery, useValue: mockQuery }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosParaMovilizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component and initialize form with values', () => {
    expect(component).toBeTruthy();
    expect(component.formularioMovilizacion.value.nombreEmpresaTransportista).toBe('Empresa X');
  });

  it('should fetch transport and verification point catalogs', () => {
    component.obtenerCatalogosTransporte();
    component.obtenerCatalogosPuntos();

    expect(mockService.obtenerDetallesDelCatalogo).toHaveBeenCalledWith('transporte.json');
    expect(mockService.obtenerDetallesDelCatalogo).toHaveBeenCalledWith('punto.json');
  });

  it('should handle catalog error gracefully', () => {
    mockService.obtenerDetallesDelCatalogo.mockReturnValueOnce(throwError(() => new Error('fail')));
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    component.obtenerCatalogosTransporte();
    expect(consoleSpy).toHaveBeenCalledWith('Error al obtener datos de transporte:', expect.any(Error));
    consoleSpy.mockRestore();
  });

  it('should disable form if readonly', () => {
    component.esFormularioSoloLectura = true;
    component.inicializarEstadoFormulario();
    expect(component.formularioMovilizacion.disabled).toBe(true);
  });

  it('should enable form if not readonly', () => {
    component.esFormularioSoloLectura = false;
    component.inicializarEstadoFormulario();
    expect(component.formularioMovilizacion.enabled).toBe(true);
  });


  it('should call actualizarFormularioMovilizacion with form values', () => {
    component.setValoresStore();
    expect(mockService.actualizarFormularioMovilizacion).toHaveBeenCalledWith(fakeFormulario);
  });

  it('should clean up on destroy', () => {
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should subscribe to form changes and handle error', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const formChanges = component.formularioMovilizacion.valueChanges as Subject<any>;
    formChanges.error('Test error');
    expect(spy).toHaveBeenCalledWith('Error en cambios de formulario:', 'Test error');
    spy.mockRestore();
  });

});
