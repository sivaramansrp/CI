import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PartidasDeLaComponent } from './partidas-de-la.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Tramite130109Query } from '../../estados/queries/tramite130109.query';
import { Tramite130109Store } from '../../estados/tramites/tramites130109.store';
import { of, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('PartidasDeLaComponent', () => {
  let component: PartidasDeLaComponent;
  let fixture: ComponentFixture<PartidasDeLaComponent>;
  let mockRouter: any;
  let mockTramite130109Query: any;
  let mockTramite130109Store: any;

  beforeEach(async () => {
 
    mockRouter = { navigate: jest.fn() };

    mockTramite130109Query = {
      selectSolicitud$: new Subject(),
    };

   
    mockTramite130109Store = {
      storeTableValues: jest.fn(),
    };

    
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule, PartidasDeLaComponent],
      providers: [
        FormBuilder,
        { provide: Router, useValue: mockRouter },
        { provide: Tramite130109Query, useValue: mockTramite130109Query },
        { provide: Tramite130109Store, useValue: mockTramite130109Store },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PartidasDeLaComponent);
    component = fixture.componentInstance;

   
    component.getEstablecimientoTableData = {
      tableHeader: ['Column1', 'Column2', 'Column3'],
      tableBody: [
        { tbodyData: ['10', '', '', 'Description1', '', '100'] },
        { tbodyData: ['20', '', '', 'Description2', '', '200'] },
      ],
    };

    
    component.getEstablecimiento();

    
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debería inicializar los formularios correctamente', () => {
    expect(component.form).toBeDefined();
    expect(component.formForTotalCount).toBeDefined();
  });

  it('Debería deshabilitar los controles del formulario de recuento total en la inicialización', () => {
    expect(component.formForTotalCount.get('cantidadTotal')?.disabled).toBe(true);
    expect(component.formForTotalCount.get('valorTotalUSD')?.disabled).toBe(true);
  });

  it('Debería calcular los totales correctamente', () => {
    component.calculateTotals();
    expect(component.formForTotalCount.get('cantidadTotal')?.value).toBe(30); 
    expect(component.formForTotalCount.get('valorTotalUSD')?.value).toBe(300); 
  });

  it('debe actualizar el formulario con los datos de las filas de la tabla cuando se llama a handleListaDeFilaSeleccionada', () => {
    const filaSeleccionada = { tbodyData: ['10', '', '', 'Sample description', '', '50'] };
    component.handleListaDeFilaSeleccionada([filaSeleccionada]);

    expect(component.filaSeleccionada).toEqual(filaSeleccionada);
    expect(mockTramite130109Store.storeTableValues).toHaveBeenCalledWith(filaSeleccionada);
  });

  it('No se debe actualizar el formulario cuando no hay ninguna fila seleccionada en handleListaDeFilaSeleccionada', () => {
    component.handleListaDeFilaSeleccionada([]);
    expect(component.filaSeleccionada).toBeNull();
  });

  it('Debería navegar a la página de carga de archivos cuando se llama a browseToCargarArchivo', () => {
    component.navigateToCargarArchivo();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/pago/importacion/carger-archivo']);
  });

  it('debe navegar para modificar la página con la fila seleccionada cuando se llama navegarParaModificarPartida', () => {
    component.filaSeleccionada = { data: 'mockRow' };
    component.navegarParaModificarPartida();

    expect(mockRouter.navigate).toHaveBeenCalledWith(
      ['/pago/importacion/modificar-partida'],
      { state: { filaSeleccionada: component.filaSeleccionada } }
    );
  });

  it('No debe navegar para modificar la página si no hay ninguna fila seleccionada', () => {
    component.filaSeleccionada = null;
    component.navegarParaModificarPartida();

    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('debe validar el formulario correctamente', () => {
    component.form.setValue({
      cantidad: '',
      descripcion: '',
      valorPartidaUSD: '',
    });

    expect(component.form.invalid).toBe(true);
    component.validarYEnviarFormulario();
    expect(component.mostrarTabla).toBe(false);
  });

  it('Debe mostrar la tabla cuando el formulario sea válido', () => {
    component.form.setValue({
      cantidad: '10',
      descripcion: 'Test description',
      valorPartidaUSD: '100.00',
    });

    component.validarYEnviarFormulario();
    expect(component.mostrarTabla).toBe(true);
  });

  it('debe determinar si un control de formulario no es válido', () => {
    component.form.get('cantidad')?.setValue('');
    component.form.get('cantidad')?.markAsTouched();

    expect(component.esInvalido('cantidad')).toBe(true);
  });

  afterEach(() => {
    component['destroyed$'].next();
    component['destroyed$'].complete();
  });
});
