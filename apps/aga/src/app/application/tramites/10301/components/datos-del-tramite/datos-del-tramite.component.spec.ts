import { DatosDelTramiteComponent } from './datos-del-tramite.component';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { of, Subject } from 'rxjs';

describe('DatosDelTramiteComponent', () => {
  let component: DatosDelTramiteComponent;
  let mockConsultaioQuery: any;
  let mockImportadorExportadorService: any;
  let mockStore: any;
  let mockQuery: any;
  let mockValidacionesService: any;

  beforeEach(() => {
    mockConsultaioQuery = {
      selectConsultaioState$: of({ readonly: false })
    };
    mockImportadorExportadorService = {
      getAno: jest.fn().mockReturnValue(of({ code: 200, data: ['2024', '2025'] })),
      getCondicion: jest.fn().mockReturnValue(of({ code: 200, data: ['Nueva', 'Usada'] })),
      getPais: jest.fn().mockReturnValue(of({ code: 200, data: ['México', 'USA'] })),
      getAduanaIngresara: jest.fn().mockReturnValue(of({ code: 200, data: ['Aduana1', 'Aduana2'] }))
    };
    mockStore = {
      setAno: jest.fn(),
      setCondicion: jest.fn(),
      setPais: jest.fn(),
      setAduana: jest.fn(),
      setFechasSeleccionadas: jest.fn(),
      setValorSeleccionado: jest.fn(),
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

    component = new DatosDelTramiteComponent(
      mockConsultaioQuery,
      mockImportadorExportadorService,
      mockStore,
      mockQuery,
      new FormBuilder(),
      mockValidacionesService
    );
    component.tramiteForm = new FormBuilder().group({
      fecha: new FormControl(''),
      fechaSeleccionada: new FormControl(''),
      fechasDatos: new FormControl([]),
      fechasSeleccionadas: new FormControl([]),
      valorSeleccionado: new FormControl('')
    });
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should mark all controls as touched if form is invalid', () => {
    component.tramiteForm = new FormBuilder().group({
      test: ['']
    });
    jest.spyOn(component.tramiteForm, 'invalid', 'get').mockReturnValue(true);
    const spy = jest.spyOn(component.tramiteForm, 'markAllAsTouched');
    component.validarDestinatarioFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should call setFechasSeleccionadas when agregar is called', () => {
    component.fechasDatos = [{ id: 1 }, { id: 2 }] as any;
    component.fechasSeleccionadas = [];
    component.fecha.setValue(1);
    component.agregar('');
    expect(mockStore.setFechasSeleccionadas).toHaveBeenCalled();
  });

  it('should call setFechasSeleccionadas when quitar is called', () => {
    component.fechasSeleccionadas = [{ id: 1 }] as any;
    component.fechasDatos = [];
    component.fechaSeleccionada.setValue(1);
    component.quitar('');
    expect(mockStore.setFechasSeleccionadas).toHaveBeenCalled();
  });

  it('should call setValorSeleccionado when cambiarRadio is called', () => {
    component.cambiarRadio('sí');
    expect(mockStore.setValorSeleccionado).toHaveBeenCalledWith('sí');
  });

  it('should call setAno when getAno is called and response is 200', () => {
    component.getAno();
    expect(mockStore.setAno).toHaveBeenCalled();
  });

  it('should call setCondicion when getCondicion is called and response is 200', () => {
    component.getCondicion();
    expect(mockStore.setCondicion).toHaveBeenCalled();
  });

  it('should call setPais when getPais is called and response is 200', () => {
    component.getPais();
    expect(mockStore.setPais).toHaveBeenCalled();
  });

  it('should call setAduana when getAduanaIngresara is called and response is 200', () => {
    component.getAduanaIngresara();
    expect(mockStore.setAduana).toHaveBeenCalled();
  });

  it('should disable tramiteForm if esFormularioSoloLectura is true in guardarDatosDelFormulario', () => {
    component.tramiteForm = new FormBuilder().group({
      test: ['']
    });
    component.esFormularioSoloLectura = true;
    const spy = jest.spyOn(component.tramiteForm, 'disable');
    component.guardarDatosDelFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should enable tramiteForm if esFormularioSoloLectura is false in guardarDatosDelFormulario', () => {
    component.tramiteForm = new FormBuilder().group({
      test: ['']
    });
    component.esFormularioSoloLectura = false;
    const spy = jest.spyOn(component.tramiteForm, 'enable');
    component.guardarDatosDelFormulario();
    expect(spy).toHaveBeenCalled();
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

  it('should open the popup and update the store', () => {
    component.openPopup();

    expect(component.isPopupOpen).toBe(true);
    expect(mockStore.setIsPopupOpen).toHaveBeenCalledWith(true);
  });

  it('should close the popup and update the store', () => {
    component.closePopup();

    expect(component.isPopupOpen).toBe(false);
    expect(component.isPopupClose).toBe(false);
    expect(mockStore.setIsPopupOpen).toHaveBeenCalledWith(false);
    expect(mockStore.setIsPopupClose).toHaveBeenCalledWith(false);
  });

  it('should hide the current table and update the store', () => {
    component.nextTabla();

    expect(component.showTabla).toBe(false);
    expect(mockStore.setShowTabla).toHaveBeenCalledWith(false);
  });

  it('should return true if the form field is valid', () => {
    const form = new FormGroup({});
    const fieldName = 'someField';

    (mockValidacionesService.isValid as jest.Mock).mockReturnValue(true);

    const result = component.isValid(form, fieldName);

    expect(mockValidacionesService.isValid).toHaveBeenCalledWith(form, fieldName);
    expect(result).toBe(true);
  });

  it('should call data fetch methods and subscribe to query streams', () => {
    component.esFormularioSoloLectura = false;

    jest.spyOn(component, 'getAduanaIngresara');
    jest.spyOn(component, 'getAno');
    jest.spyOn(component, 'getCondicion');
    jest.spyOn(component, 'getPais');
    jest.spyOn(component, 'donanteDomicilio');
    jest.spyOn(component, 'guardarDatosDelFormulario');

    component.ngOnInit();

    expect(component.getAduanaIngresara).toHaveBeenCalled();
    expect(component.getAno).toHaveBeenCalled();
    expect(component.getCondicion).toHaveBeenCalled();
    expect(component.getPais).toHaveBeenCalled();

    expect(component.donanteDomicilio).toHaveBeenCalled();
    expect(component.guardarDatosDelFormulario).not.toHaveBeenCalled();
  });

  it('should call guardarDatosDelFormulario if esFormularioSoloLectura is true', () => {
    component.esFormularioSoloLectura = true;
    jest.spyOn(component, 'donanteDomicilio');
    jest.spyOn(component, 'guardarDatosDelFormulario');
    component.ngOnInit();

    expect(component.guardarDatosDelFormulario).toHaveBeenCalled();
    expect(component.donanteDomicilio).not.toHaveBeenCalled();
  });

});