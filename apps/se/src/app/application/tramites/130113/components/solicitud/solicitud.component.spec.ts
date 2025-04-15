import { TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Tramite130113Query } from '../../estados/queries/tramite130113.query';
import { Tramite130113Store } from '../../estados/tramites/tramites130113.store';
import { SolicitudComponent } from './solicitud.component';
import { ImportacionEquipoAnticontaminanteService } from '../../services/importacion-equipo-anticontaminante-.service';


describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let store: Tramite130113Store;
  let query: Tramite130113Query;
  let service: ImportacionEquipoAnticontaminanteService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        Tramite130113Store,
        Tramite130113Query,
        ImportacionEquipoAnticontaminanteService,
      ],
    }).compileComponents();

    component = TestBed.createComponent(SolicitudComponent).componentInstance;
    store = TestBed.inject(Tramite130113Store);
    query = TestBed.inject(Tramite130113Query);
    service = TestBed.inject(ImportacionEquipoAnticontaminanteService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms on ngOnInit', () => {
    const spy = spyOn(component, 'inicializarFormularios');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });


  it('should initialize mercanciaForm with default values', () => {
    expect(component.mercanciaForm.get('producto')?.value).toBe('Nuevo');
    expect(component.mercanciaForm.get('descripcion')?.value).toBe('');
  });

  it('should validate mercanciaForm fields', () => {
    const descripcionControl = component.mercanciaForm.get('descripcion');
    descripcionControl?.setValue('');
    expect(descripcionControl?.valid).toBe(false);

    descripcionControl?.setValue('Descripción válida');
    expect(descripcionControl?.valid).toBe(true);
  });

  it('should call getEstablecimiento and set table data', () => {
    component.getEstablecimiento();
    expect(component.tableHeaderData.length).toBeGreaterThan(0);
    expect(component.tableBodyData.length).toBeGreaterThan(0);
  });

  it('should calculate totals correctly', () => {
    component.tableBodyData = [
      { tbodyData: ['10', '', '', '', '', '100'] },
      { tbodyData: ['20', '', '', '', '', '200'] },
    ];
    component.calcularTotales();
    expect(component.formForTotalCount.get('cantidadTotal')?.value).toBe(30);
    expect(component.formForTotalCount.get('valorTotalUSD')?.value).toBe(300);
  });

  it('should handle manejarlaFilaSeleccionada correctly', () => {
    const fila = { id: 1, name: 'Test' };
    component.manejarlaFilaSeleccionada([fila]);
    expect(component.filaSeleccionada).toEqual(fila);

    component.manejarlaFilaSeleccionada([]);
    expect(component.filaSeleccionada).toBeNull();
  });

  it('should validate and show table on validarYEnviarFormulario', () => {
    component.partidasDelaMercanciaForm.patchValue({
      cantidadPartidasDeLaMercancia: '10',
      fraccionTigiePartidasDeLaMercancia: '123',
      descripcionPartidasDeLaMercancia: 'Test',
      valorPartidaUSDPartidasDeLaMercancia: '100',
    });
    component.validarYEnviarFormulario();
    expect(component.mostrarTabla).toBe(true);
  });

  it('should fetch entidad federativa', () => {
    const mockData = [{ id: 1, descripcion: 'Entidad 1' }];
    spyOn(service, 'getEntidadFederativa').and.returnValue(of(mockData));
    component.fetchEntidadFederativa();
    expect(component.entidadFederativa).toEqual(mockData);
  });

  it('should fetch representacion federal', () => {
    const mockData = [{ id: 1, descripcion: 'Representación 1' }];
    spyOn(service, 'getRepresentacionFederal').and.returnValue(of(mockData));
    component.fetchRepresentacionFederal();
    expect(component.representacionFederal).toEqual(mockData);
  });

  it('should fetch lista de países disponibles', () => {
    const mockData = [{ id: 1, descripcion: 'País 1' }];
    spyOn(service, 'getListaDePaisesDisponibles').and.returnValue(of(mockData));
    component.listaDePaisesDisponibles();
    expect(component.elementosDeBloque).toEqual(mockData);
  });

  it('should fetch fraccion descripcion', () => {
    const mockData = [{ id: 1, descripcion: 'Fracción 1' }];
    spyOn(service, 'getFraccionDescripcionPartidasDeLaMercancia').and.returnValue(of(mockData));
    component.listaDeFraccionDescripcion();
    expect(component.fraccionDescription).toEqual(mockData);
  });

  it('should fetch paises por bloque', () => {
    const mockData = [{ id: 1, descripcion: 'País 1' }];
    spyOn(service, 'getPaisesPorBloque').and.returnValue(of(mockData));
    component.fetchPaisesPorBloque(1);
    expect(component.paisesPorBloque).toEqual(mockData);
  });

  it('should handle enCambioDeBloque correctly', () => {
    const spy = spyOn(component, 'fetchPaisesPorBloque');
    component.enCambioDeBloque(1);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should update store values on setValoresStore', () => {
    const spy = spyOn(store, 'updateSolicitud');
    component.setValoresStore({
      form: component.formDelTramite,
      campo: 'solicitud',
      metodoNombre: 'updateSolicitud',
    });
    expect(spy).toHaveBeenCalled();
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const spy = spyOn(component['destroyed$'], 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});