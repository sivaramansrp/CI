import { DatosDelTramiteComponent } from './datos-del-tramite.component';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { of, Subject } from 'rxjs';

describe('DatosDelTramiteComponent', () => {
  let component: DatosDelTramiteComponent;
  let mockConsultaioQuery: any;
  let mockImportadorExportadorService: any;
  let mockStore: any;
  let mockQuery: any;
  let mockValidacionesService: any;
  let mockSolicitud10301Service: any;

  beforeEach(() => {
    mockConsultaioQuery = {
      selectConsultaioState$: of({ readonly: false })
    };
    mockImportadorExportadorService = {
      getAno: jest.fn().mockReturnValue(of({ code: 200, data: ['2024', '2025'] })),
      getCondicion: jest.fn().mockReturnValue(of({ code: 200, data: ['Nueva', 'Usada'] })),
      getPais: jest.fn().mockReturnValue(of({ code: 200, data: ['México', 'USA'] })),
      getAduanaIngresara: jest.fn().mockReturnValue(of({ code: 200, data: ['Aduana1', 'Aduana2'] })),
      getFinesDeMercancia: jest.fn().mockReturnValue(of({ code: 200, data: ['F1', 'F2'] })),
      agregarMercancia: jest.fn().mockReturnValue(of({ success: true, datos: { id: 1 } }))
    };
    mockStore = {
      setAno: jest.fn(),
      setCondicion: jest.fn(),
      setPais: jest.fn(),
      setAduana: jest.fn(),
      setFechasSeleccionadas: jest.fn(),
      setValorSeleccionado: jest.fn(),
      setDatosMercancia: jest.fn(),
      setIsPopupOpen: jest.fn(),
      setIsPopupClose: jest.fn(),
      setShowTabla: jest.fn()
    };
    mockQuery = {
      selectSolicitud$: of({}),
      selectFechasSeleccionadas$: of([]),
      selectAduana$: of([]),
      selectAno$: of([]),
      selectCondicion$: of([]),
      selectPais$: of([])
    };
    mockValidacionesService = {
      isValid: jest.fn().mockReturnValue(true)
    };
    mockSolicitud10301Service = {
      obtenerDatosTableData: jest.fn().mockReturnValue(of([{ id: 1 }]))
    };

    component = new DatosDelTramiteComponent(
      mockConsultaioQuery,
      mockImportadorExportadorService,
      mockStore,
      mockQuery,
      new FormBuilder(),
      mockValidacionesService,
      mockSolicitud10301Service
    );

    component.tramiteForm = new FormBuilder().group({
      importadorExportador: new FormGroup({
        aduana: new FormControl(''),
        pais: new FormControl(''),
      }),
      fecha: new FormControl(''),
      fechaSeleccionada: new FormControl(''),
      fechasDatos: new FormControl([]),
      fechasSeleccionadas: new FormControl([]),
      valorSeleccionado: new FormControl('')
    });
    component.agregarMercanciasForm = new FormBuilder().group({
      datosMercancia: new FormGroup({
        finesElegidos: new FormControl(''),
        tipoMercancia: new FormControl(''),
        usoEspecifico: new FormControl(''),
        condicion: new FormControl(''),
        marca: new FormControl(''),
        ano: new FormControl(''),
        modelo: new FormControl(''),
        serie: new FormControl(''),
        fechasSeleccionadas: new FormArray([])
      })
    });
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize catalogues and call merge', () => {
    const spy = jest.spyOn(component, 'inicializaCatalogos');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should initialize the form in donanteDomicilio', () => {
    component.solicitudState = {
      aduana: 'Aduana1',
      nombre: 'Nombre',
      manifesto: 'Manifesto',
      calle: 'Calle',
      numeroExterior: '1',
      telefono: '1234567890',
      correoElectronico: 'test@mail.com',
      pais: 'México',
      codigoPostal: '12345',
      estado: 'Estado',
      colonia: 'Colonia'
    } as any;
    component.donanteDomicilio();
    expect(component.tramiteForm.get('importadorExportador')).toBeTruthy();
    expect(component.agregarMercanciasForm.get('datosMercancia')).toBeTruthy();
  });

  it('should disable tramiteForm if esFormularioSoloLectura is true', () => {
    component.tramiteForm = new FormBuilder().group({ test: [''] });
    component.esFormularioSoloLectura = true;
    const spy = jest.spyOn(component.tramiteForm, 'disable');
    component.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should enable tramiteForm if esFormularioSoloLectura is false', () => {
    component.tramiteForm = new FormBuilder().group({ test: [''] });
    component.esFormularioSoloLectura = false;
    const spy = jest.spyOn(component.tramiteForm, 'enable');
    component.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should call cargarDatosTablaData and set mercanciaDatos', () => {
    component.cargarDatosTablaData();
    expect(component.mercanciaDatos.length).toBeGreaterThan(0);
  });

  it('should call setValorSeleccionado when cambiarRadio is called', () => {
    component.cambiarRadio('sí');
    expect(mockStore.setValorSeleccionado).toHaveBeenCalledWith('sí');
  });

  it('should call setValoresStore and update value', () => {
    const form = new FormGroup({ campo: new FormControl('valor') });
    component.setValoresStore(form, 'campo', 'setAno');
    expect(mockStore.setAno).toHaveBeenCalledWith('valor');
  });

  it('should mark all controls as touched if tramiteForm is invalid', () => {
    component.tramiteForm = new FormBuilder().group({ test: [''] });
    jest.spyOn(component.tramiteForm, 'invalid', 'get').mockReturnValue(true);
    const spy = jest.spyOn(component.tramiteForm, 'markAllAsTouched');
    component.validarDestinatarioFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should call setCondicion in condicionSeleccion', () => {
    component.agregarMercanciasForm.get('datosMercancia.condicion')?.setValue('Usada');
    component.condicionSeleccion();
    expect(mockStore.setCondicion).toHaveBeenCalledWith('Usada');
  });

  it('should call setAduana in aduanaSeleccion', () => {
    component.tramiteForm.get('importadorExportador.aduana')?.setValue('Aduana1');
    component.aduanaSeleccion();
    expect(mockStore.setAduana).toHaveBeenCalledWith('Aduana1');
  });

  it('should call setAduana in anoSeleccion', () => {
    component.agregarMercanciasForm.get('datosMercancia.ano')?.setValue('2024');
    component.anoSeleccion();
    expect(mockStore.setAduana).toHaveBeenCalledWith('2024');
  });

  it('should call setAduana in paisSeleccion', () => {
    component.tramiteForm.get('importadorExportador.pais')?.setValue('México');
    component.paisSeleccion();
    expect(mockStore.setAduana).toHaveBeenCalledWith('México');
  });

  it('should reset agregarMercanciasForm in limpiarMercancias', () => {
    const spy = jest.spyOn(component.agregarMercanciasForm, 'reset');
    component.limpiarMercancias();
    expect(spy).toHaveBeenCalled();
  });

  it('should remove selected rows in eliminar', () => {
    component.mercanciaDatos = [{ id: 1 }, { id: 2 }] as any;
    component.filaSeleccionadas = [1];
    component.eliminar();
    expect(component.mercanciaDatos.length).toBe(1);
    expect(mockStore.setDatosMercancia).toHaveBeenCalled();
    expect(component.filaSeleccionadas.length).toBe(0);
  });

  it('should return FormArray from fechasSeleccionadas getter', () => {
    component.tramiteForm.setControl('fechasSeleccionadas', new FormArray([]));
    expect(component.fechasSeleccionadas).toBeInstanceOf(FormArray);
  });

  it('should return true if control is invalid and touched in isInvalid', () => {
    const group = component.agregarMercanciasForm.get('datosMercancia') as FormGroup;
    group.addControl('test', new FormControl('', Validators.required));
    group.get('test')?.markAsTouched();
    expect(component.isInvalid('test')).toBe(true);
  });

  it('should update fechasSeleccionadas in changeCrosslist', () => {
    const fechas = ['2024-01-01', '2024-01-02'];
    component.changeCrosslist(fechas);
    const arr = (component.agregarMercanciasForm.get('datosMercancia') as FormGroup).get('fechasSeleccionadas');
    expect(arr).toBeInstanceOf(FormArray);
    expect(mockStore.setFechasSeleccionadas).toHaveBeenCalledWith(fechas);
  });

  it('should unsubscribe all subscriptions on ngOnDestroy', () => {
    const sub1 = { unsubscribe: jest.fn() };
    const sub2 = { unsubscribe: jest.fn() };
    component.getAduanaIngresaraSubscription = sub1 as any;
    component.getAnoSubscription = sub1 as any;
    component.getPaisSubscription = sub1 as any;
    component.getCondicionSubscription = sub1 as any;
    component['subscriptions'] = [sub2 as any];
    component.ngOnDestroy();
    expect(sub1.unsubscribe).toHaveBeenCalled();
    expect(sub2.unsubscribe).toHaveBeenCalled();
  });

  it('should handle onSelectedRowsChange', () => {
    component.onSelectedRowsChange([{ id: 1 }, { id: 2 }] as any);
    expect(component.filaSeleccionadas).toEqual([1, 2]);
  });

  it('should call isValid using validacionesService', () => {
    const form = new FormGroup({ test: new FormControl('') });
    expect(component.isValid(form, 'test')).toBe(true);
    expect(mockValidacionesService.isValid).toHaveBeenCalledWith(form, 'test');
  });

  it('should set selectRangoDias in inicializaCatalogos', () => {
    component.inicializaCatalogos();
    expect(Array.isArray(component.selectRangoDias)).toBe(true);
  });

  it('should call cargarDatosTablaData in ngOnInit', () => {
    const spy = jest.spyOn(component, 'cargarDatosTablaData');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should show modal in agregarMercancia if all fields are filled', () => {
    component.agregarMercanciasForm.get('datosMercancia.finesElegidos')?.setValue('F1');
    component.agregarMercanciasForm.get('datosMercancia.tipoMercancia')?.setValue('T1');
    component.agregarMercanciasForm.get('datosMercancia.usoEspecifico')?.setValue('U1');
    component.agregarMercanciasForm.get('datosMercancia.condicion')?.setValue('C1');
    component.mercanciaDatos = [];
    component.modalConfirmacion = { nativeElement: {} } as any;
    (global as any).Modal = jest.fn().mockImplementation(() => ({ show: jest.fn() }));
    component.agregarMercancia();
    expect(mockStore.setDatosMercancia).toHaveBeenCalled();
  });

  it('should mark form as touched if agregarMercancia fields are missing', () => {
    const spy = jest.spyOn(component.agregarMercanciasForm, 'markAllAsTouched');
    component.agregarMercancia();
    expect(spy).toHaveBeenCalled();
  });
  
});