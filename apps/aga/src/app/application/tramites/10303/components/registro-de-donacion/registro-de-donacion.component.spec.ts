import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { AlertComponent, CatalogoSelectComponent, InputRadioComponent, TableComponent, TituloComponent } from '@ng-mf/data-access-user';
import { DonacionesExtranjerasService } from '../../services/donaciones-extranjeras/donaciones-extranjeras.service';
import { RegistroDeDonacionComponent } from './registro-de-donacion.component';
import { DatosDonanteExtranjeroComponent } from '../datos-donante-extranjero/datos-donante-extranjero.component';
import { DatosDonatarioComponent } from '../datos-donatario/datos-donatario.component';
import { DatosRepLegalDonatarioComponent } from '../datos-rep-legal-donatario/datos-rep-legal-donatario.component';
import { DatosRepLegalRecibirDonacionComponent } from '../datos-rep-legal-recibir-donacion/datos-rep-legal-recibir-donacion.component';
import { DatosPersonaOirRecibirComponent } from '../datos-persona-oir-recibir/datos-persona-oir-recibir.component';
import { ToastrModule } from 'ngx-toastr';

describe('RegistroDeDonacionComponent', () => {
  let component: RegistroDeDonacionComponent;
  let fixture: ComponentFixture<RegistroDeDonacionComponent>;
  let mockTramite10303Store: any;
  let donacionesExtranjerasService: jest.Mocked<DonacionesExtranjerasService>;

  beforeEach(async () => {
    const SPY = {
      getAduana: jest.fn().mockReturnValue(of({ data: [] })),
      getDestinoDonacion: jest.fn().mockReturnValue(of({ data: [] })),
      getTipoDeMercancia: jest.fn().mockReturnValue(of({ data: [] })),
      getUnidadMedida: jest.fn().mockReturnValue(of({ data: [] })),
      getUmt: jest.fn().mockReturnValue(of({ data: [] })),
      getProcedenciaOtro: jest.fn().mockReturnValue(of({ data: [] })),
      getCondicionMercancia: jest.fn().mockReturnValue(of({ data: [] })),
      getPaisOrigenMedicamento: jest.fn().mockReturnValue(of({ data: [] })),
      getPaisProcedenciaMedicamento: jest.fn().mockReturnValue(of({ data: [] })),
      getManifiestos: jest.fn().mockReturnValue(of({ data: [] })),
      getBasicoRequerimientos: jest.fn().mockReturnValue(of({ data: [] })),
      getPaises: jest.fn().mockReturnValue(of({ data: [] })),
      getDocumentoResidencia: jest.fn().mockReturnValue(of({ data: [] }))
    };

    mockTramite10303Store = {
      setCvePaisPersonaAutorizada: jest.fn(),
      setNumeroConsecutivo: jest.fn(),
      setDestinoDonacion: jest.fn(),
      setTipoDeMercancia: jest.fn(),
      setUnidadMedida: jest.fn(),
      setUMT: jest.fn(),
      setPaisProcedenciaOtro: jest.fn(),
      setCondicionMercancia: jest.fn(),
      setPaisOrigenMedicamento: jest.fn(),
      setPaisProcedenciaMedicamento: jest.fn(),
      setFechaCaducidad: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [
        RegistroDeDonacionComponent,
        DatosDonanteExtranjeroComponent,
        DatosDonatarioComponent,
        DatosRepLegalDonatarioComponent,
        DatosRepLegalRecibirDonacionComponent,
        DatosPersonaOirRecibirComponent
      ],
      imports: [
        ReactiveFormsModule,
        TituloComponent,
        CatalogoSelectComponent,
        AlertComponent,
        TableComponent,
        InputRadioComponent,
        ToastrModule.forRoot()
      ],
      providers: [{ provide: DonacionesExtranjerasService, useValue: SPY }]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroDeDonacionComponent);
    component = fixture.componentInstance;
    component.getMercanciaTableData = {
      mercanciaTable: {
        tableHeader: [],
        tableBody: []
      }
    };

    donacionesExtranjerasService = TestBed.inject(DonacionesExtranjerasService) as jest.Mocked<DonacionesExtranjerasService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show or hide collapsible panel', () => {
    component.panels = [{ label: 'Panel 1', isCollapsed: true }, { label: 'Panel 2', isCollapsed: true }];
    component.mostrar_colapsable(1);
    expect(component.panels[1].isCollapsed).toBeFalsy();
    expect(component.panels[0].isCollapsed).toBeTruthy();
  });

  it('should open modal', () => {
    component.modal = 'show';
    component.abrirDialogoMercancias();
    expect(component.modal).toBe('show');
  });

  it('should close modal', () => {
    jest.spyOn(component.closeModal.nativeElement, 'click');
    component.cerrarModal();
    expect(component.closeModal.nativeElement.click).toHaveBeenCalled();
  });

  it('should add mercancias and close modal', () => {
    jest.spyOn(component, 'cerrarModal');
    component.agregarMercanciasForm.setValue({
      datosMercancia: {
        numeroConsecutivo: '1',
        destinoDonacion: 'test',
        posibleFraccion: '',
        descripcionFraccion: '',
        solicitudDeInspeccion: false,
        justificacionMerca: 'test',
        descripcionMercanciaOtro: 'test',
        tipoDeMercancia: 'test',
        cantidadUMC: '1',
        cantidadUMT: '1',
        unidadMedida: 'test',
        UMT: 'test',
        paisProcedenciaOtro: 'test',
        condicionMercancia: 'test',

      },
      datosCofepris: {
        ingredienteActivo: 'test',
        tipoMedicamento: 'test',
        presentacionFarma: 'test',
        paisOrigenMedicamento: 'test',
        paisProcedenciaMedicamento: 'test',
        fechaCaducidad: ''
      }
    });
    component.agregarMercancias();
    expect(component.getMercanciaTableData.mercanciaTable.tableBody.length).toBe(1);
    expect(component.cerrarModal).toHaveBeenCalled();
  });

  it('should handle file change', () => {
    const EVENT = { target: { files: [{ name: 'test-file.txt' }] } };
    component.onCambioDeArchivo(EVENT as unknown as Event);
    expect(component.archivoMedicamentos?.name).toBe('test-file.txt');
    expect(component.etiquetaDeArchivo).toBe('test-file.txt');
  });

  it('should remove selected file', () => {
    component.archivoMedicamentos = new File([], 'test-file.txt');
    component.eliminacionMedicamento();
    expect(component.archivoMedicamentos).toBeNull();
    expect(component.etiquetaDeArchivo).toBe(component.TEXTOS.ETIQUETA_DE_ARCHIVO);
  });

  it('should activate file selection', () => {
    const INPUT = document.createElement('input');
    INPUT.id = 'archivoMedicamentos';
    INPUT.type = 'file';
    document.body.appendChild(INPUT);

    const realInput = document.getElementById('archivoMedicamentos') as HTMLInputElement;
    const clickSpy = jest.spyOn(realInput, 'click');

    component.activarSeleccionArchivo();

    expect(clickSpy).toHaveBeenCalled();

    document.body.removeChild(INPUT);
  });

  it('should not throw if setValoresStore is called with a non-existing field', () => {
    mockTramite10303Store.setNumeroConsecutivo = jest.fn();
    expect(() => {
      component.setValoresStore(component.agregarMercanciasForm, 'nonExistingField', 'setNumeroConsecutivo');
    }).not.toThrow();
  });

  it('should set the value of the FormArray control based on checkbox event', () => {
    const event = { target: { checked: true } } as unknown as Event;
    component.onBasicoRequirimentoCheckboxCambiar(event, 1);
    expect(component.seleccionadaBasicoRequerimiento.controls[1].value).toBe(true);
  });

  it('should call setValoresStore with correct arguments', () => {
    component.registroDonacionForm = new FormGroup({
      manifiesto: new FormGroup({
        seleccionadaBasicoRequerimiento: new FormArray([new FormControl([false])])
      })
    })
    component.setValoresStore = jest.fn();

    const event = { target: { checked: false } } as unknown as Event;
    component.onBasicoRequirimentoCheckboxCambiar(event, 0);
    expect(component.setValoresStore).toHaveBeenCalledWith(
      component.registroDonacionForm,
      'manifiesto.seleccionadaBasicoRequerimiento',
      'setSeleccionadaBasicoRequerimiento'
    );
  });

  it('should set the value of the FormArray control based on checkbox event', () => {
    const event = { target: { checked: true } } as unknown as Event;
    component.onManifiestoCheckboxCambiar(event, 1);
    expect(component.seleccionadaManifiesto.controls[1].value).toBe(true);
  });

  it('should call setValoresStore with correct arguments', () => {
    component.registroDonacionForm = new FormGroup({
      manifiesto: new FormGroup({
        seleccionadaManifiesto: new FormArray([new FormControl(false)])
      })
    });

    component.setValoresStore = jest.fn();

    const event = { target: { checked: false } } as unknown as Event;
    component.onManifiestoCheckboxCambiar(event, 0);
    expect(component.setValoresStore).toHaveBeenCalledWith(
      component.registroDonacionForm,
      'manifiesto.seleccionadaManifiesto',
      'setSeleccionadaManifiesto'
    );
  });

  it('should toggle the colapsable property', () => {
    component.colapsable = false;
    component.mostrar_colapsable_fabricante();
    expect(component.colapsable).toBe(true);
    component.mostrar_colapsable_fabricante();

    expect(component.colapsable).toBe(false);
  });

  it('should update fechaCaducidad in the form and store', () => {
    component.registroDonacionForm = new FormBuilder().group({
      fechaCaducidad: ['']
    });

    const mockValor = '2025-12-31';
    const control = component.registroDonacionForm.get('fechaCaducidad');
    const setValueSpy = jest.spyOn(control!, 'setValue');

    component.cambioFechaCaducidad(mockValor);

    expect(setValueSpy).toHaveBeenCalledWith(mockValor);
  });
});