import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, Subject } from 'rxjs';
import { DatosSolicitudComponent } from './datos-solicitud.component';
import { Tramite130121Store } from '../../estados/tramites/tramites130121.store';
import { Tramite130121Query } from '../../estados/queries/tramite130121.query';
import { PermisoDeHidrocarburosService } from '../../services/permiso-de-hidrocarburos.service';

describe('DatosSolicitudComponent', () => {
  let component: DatosSolicitudComponent;
  let tramite130121Store: Tramite130121Store;
  let tramite130121Query: Tramite130121Query;
  let permisodehidrocarburosService: PermisoDeHidrocarburosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      declarations: [DatosSolicitudComponent],
      providers: [
        FormBuilder,
        Tramite130121Store,
        Tramite130121Query,
        PermisoDeHidrocarburosService,
      ],
    });

    tramite130121Store = TestBed.inject(Tramite130121Store);
    tramite130121Query = TestBed.inject(Tramite130121Query);
    permisodehidrocarburosService = TestBed.inject(PermisoDeHidrocarburosService);

    component = TestBed.createComponent(DatosSolicitudComponent).componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize forms and subscribe to observables', () => {
      const mostrarTablaSpy = jest.spyOn(tramite130121Query, 'mostrarTabla$', 'get').mockReturnValue(of(true));
      const selectSolicitudSpy = jest.spyOn(tramite130121Query, 'selectSolicitud$' as any).mockReturnValue(of({}));

      component.ngOnInit();

      expect(mostrarTablaSpy).toHaveBeenCalled();
      expect(selectSolicitudSpy).toHaveBeenCalled();
      expect(component.mostrarTabla).toBe(true);
    });
  });

  describe('inicializarFormularios', () => {
    it('should initialize all forms', () => {
      component.inicializarFormularios();

      expect(component.formDelTramite).toBeDefined();
      expect(component.mercanciaForm).toBeDefined();
      expect(component.partidasDelaMercanciaForm).toBeDefined();
      expect(component.paisForm).toBeDefined();
      expect(component.frmRepresentacionForm).toBeDefined();
    });
  });

  describe('validarYEnviarFormulario', () => {
    it('should mark form as touched and hide table if invalid', () => {
      component.partidasDelaMercanciaForm = new FormBuilder().group({
        cantidadModificar: [''],
      });

      component.validarYEnviarFormulario();

      expect(component.partidasDelaMercanciaForm.touched).toBe(true);
      expect(component.mostrarTabla).toBe(false);
    });

    it('should show table if form is valid', () => {
      component.partidasDelaMercanciaForm = new FormBuilder().group({
        cantidadModificar: ['123', []],
      });

      component.validarYEnviarFormulario();

      expect(component.mostrarTabla).toBe(true);
    });
  });

  describe('opcionesDeBusqueda', () => {
    it('should fetch solicitude and product options', () => {
      const getSolicitudeOptionsSpy = jest
        .spyOn(permisodehidrocarburosService, 'getSolicitudeOptions')
        .mockReturnValue(
          of({
        options: [
          { label: 'option1', value: '1' },
          { label: 'option2', value: '2' },
        ],
        defaultSelect: 'option1', // Adjusted to match the expected type
          })
        );
  
      const getProductoOptionsSpy = jest
        .spyOn(permisodehidrocarburosService, 'getProductoOptions')
        .mockReturnValue(
          of({
            options: [
              { label: 'product1', value: 'product1' },
              { label: 'product2', value: 'product2' },
            ],
            defaultSelect: 'product1',
          })
        );
  
      component.opcionesDeBusqueda();
  
      expect(getSolicitudeOptionsSpy).toHaveBeenCalled();
      expect(getProductoOptionsSpy).toHaveBeenCalled();
      expect(component.opcionesSolicitud).toEqual([
        { label: 'option1', value: '1' },
        { label: 'option2', value: '2' },
      ]);
      expect(component.productoOpciones).toEqual([
        { label: 'product1', value: 'product1' },
        { label: 'product2', value: 'product2' },
      ]);
    });
  });

  describe('obtenerTablaDatos', () => {
    it('should fetch table data and update formForTotalCount', () => {
      const mockData = [
        {
          cantidad: '10', // Changed to string to match the expected type
          totalUSD: 100,
          unidadDeMedida: 'kg',
          fraccionFrancelaria: '1234',
          descripcion: 'Test description',
          precioUnitarioUSD: '10', // Changed to string to match the expected type
        },
      ];
  
      jest.spyOn(permisodehidrocarburosService, 'getTablaDatos').mockReturnValue(
        of([
          {
        cantidad: '10', // Changed to string to match the expected type
        totalUSD: '100', // Changed to string to match the expected type
        unidadDeMedida: 'kg',
        fraccionFrancelaria: '1234',
        descripcion: 'Test description',
        precioUnitarioUSD: '10', // Changed to string to match the expected type
          },
        ])
      );
  
      component.obtenerTablaDatos();
  
      expect(component.tableBodyData).toEqual(mockData);
      expect(component.formForTotalCount.get('cantidadTotal')?.value).toBe(10); // Ensure this matches the logic in your component
      expect(component.formForTotalCount.get('valorTotalUSD')?.value).toBe(100);
    });
  });


  describe('manejarlaFilaSeleccionada', () => {
    it('should update filaSeleccionada and store table values', () => {
      const storeTableValuesSpy = jest.spyOn(tramite130121Store, 'storeTableValues');
      const mockRow: any = [{ id: 1, descripcion: 'test', cantidad: 1, unidadDeMedida: 'kg', fraccionFrancelaria: '1234', precioUnitarioUSD: 10, totalUSD: 10 }];
      component.manejarlaFilaSeleccionada(mockRow);

      expect(component.filaSeleccionada).toEqual(mockRow);
      expect(storeTableValuesSpy).toHaveBeenCalledWith(mockRow);
    });
  });

  describe('ngOnDestroy', () => {
    it('should complete destroyed$ subject', () => {
      const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
      const completeSpy = jest.spyOn(component['destroyed$'], 'complete');

      component.ngOnDestroy();

      expect(destroyedSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });

  describe('disabledModificar', () => {
    it('should return true if no rows are selected', () => {
      component.filaSeleccionada = [];
      expect(component.disabledModificar()).toBe(true);
    });

    it('should return false if rows are selected', () => {
      component.filaSeleccionada = [
        {
          cantidad: '10',
          totalUSD: '100',
          unidadDeMedida: 'kg',
          fraccionFrancelaria: '1234',
          descripcion: 'Test description',
          precioUnitarioUSD: '10',
        },
      ]; // Match the expected type
      expect(component.disabledModificar()).toBe(false);
    });
  });
});