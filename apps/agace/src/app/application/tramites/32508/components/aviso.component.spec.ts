import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { AvisoComponent } from './aviso.component';
import { AdaceService } from '../services/adace.service';
import { Tramite32508Store } from '../state/Tramite32508.store';
import { Tramite32508Query } from '../state/Tramite32508.query';
import { Pedimento, ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { HttpClientTestingModule } from '@angular/common/http/testing';
interface TestPedimento extends Pedimento {
  id: number; // Add the id property for testing purposes
}
describe('AvisoComponent', () => {
  let component: AvisoComponent;
  let fixture: ComponentFixture<AvisoComponent>;
  let adaceService: AdaceService;
  let store: Tramite32508Store;
  let query: Tramite32508Query;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule,AvisoComponent],
      declarations: [],
      providers: [
        FormBuilder,
        AdaceService,
        Tramite32508Store,
        Tramite32508Query,
        ValidacionesFormularioService,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AvisoComponent);
    component = fixture.componentInstance;
    adaceService = TestBed.inject(AdaceService);
    store = TestBed.inject(Tramite32508Store);
    query = TestBed.inject(Tramite32508Query);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form in donanteDomicilio', () => {
    component.solicitudState = {
      claveFiscalizado: 'test',
      tipoDictamen: 'test',
      rfc: 'test',
      numeroInscripcion: 'test',
      ano: null,
      mes: null,
      radioParcial: '',
      radioTotal: '',
      saldoPendiente: '',
      aprovechamiento: '',
      disminucionAplicada: '',
      saldoPendienteDisminuir: '',
      cantidad: '',
      llaveDePago: '',
      archivo: [],
      fechaPago: '',
      fechaElaboracion: '',
    };
    component.donanteDomicilio();
    expect(component.avisoForm).toBeDefined();
    expect(component.avisoForm.get('claveFiscalizado')?.value).toBe('test');
  });

  it('should call obtenerDatosAnoPeriodo and update anoCatalogo', () => {
    const mockResponse = [{ id: 1, descripcion: '2023' }];
    jest.spyOn(adaceService, 'obtenerDatosAno').mockReturnValue(of(mockResponse));
    component.obtenerDatosAnoPeriodo();
    expect(component.anoCatalogo.catalogos).toEqual(mockResponse);
  });

  it('should call obtenerDatosMesPeriodo and update mesCatalogo', () => {
    const mockResponse = [{ id: 1, descripcion: 'Enero' }];
    jest.spyOn(adaceService, 'obtenerDatosMes').mockReturnValue(of(mockResponse));
    component.obtenerDatosMesPeriodo();
    expect(component.mesCatalogo.catalogos).toEqual(mockResponse);
  });

  it('should update archivo form control and nombreArchivo in alSeleccionarArchivo', () => {
    const mockFile = new File(['content'], 'test-file.txt', { type: 'text/plain' });
    const event = { target: { files: [mockFile] } } as unknown as Event;
    component.alSeleccionarArchivo(event);
    expect(component.nombreArchivo).toBe('test-file.txt');
    expect(component.avisoForm.get('archivo')?.value).toBe(mockFile);
  });

  it('should set cargarArchivo to true and call abrirModal in cargaArchivo', () => {
    jest.spyOn(component, 'abrirModal');
    component.cargaArchivo();
    expect(component.cargarArchivo).toBe(true);
    expect(component.abrirModal).toHaveBeenCalled();
  });

  it('should remove pedimento in eliminarPedimento', () => {
    component.pedimentos = [
      { id: 1, patente: 123, pedimento: 456, aduana: 789, idTipoPedimento: 1, descTipoPedimento: 'Test', numero: '12345', comprobanteValor: 'Test', pedimentoValidado: true } as TestPedimento,
    ];
    component.elementoParaEliminar = 0;
    component.eliminarPedimento(true);
    expect(component.pedimentos.length).toBe(0);
  });

  it('should call setValoresStore and update fechaPago in cambioFechaPago', () => {
    jest.spyOn(component, 'setValoresStore');
    component.cambioFechaPago('2023-01-01');
    expect(component.avisoForm.get('fechaPago')?.value).toBe('2023-01-01');
    expect(component.setValoresStore).toHaveBeenCalledWith(
      component.avisoForm,
      'fechaPago',
      'setFechaPago'
    );
  });

  it('should call setValoresStore and update fechaElaboracion in cambioFechaInitial', () => {
    jest.spyOn(component, 'setValoresStore');
    component.cambioFechaInitial('2023-01-01');
    expect(component.avisoForm.get('fechaElaboracion')?.value).toBe('2023-01-01');
    expect(component.setValoresStore).toHaveBeenCalledWith(
      component.avisoForm,
      'fechaElaboracion',
      'setFechaElaboracion'
    );
  });

  it('should mark all fields as touched if form is invalid in validarDestinatarioFormulario', () => {
    jest.spyOn(component.avisoForm, 'markAllAsTouched');
    component.avisoForm.get('claveFiscalizado')?.setValue(null); // Make form invalid
    component.validarDestinatarioFormulario();
    expect(component.avisoForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should call validacionesService.isValid in esValido', () => {
    const spy = jest.spyOn(TestBed.inject(ValidacionesFormularioService), 'isValid');
    component.esValido(component.avisoForm, 'claveFiscalizado');
    expect(spy).toHaveBeenCalledWith(component.avisoForm, 'claveFiscalizado');
  });

  it('should call store method in setValoresStore', () => {
    jest.spyOn(store, 'setArchivo');
    const mockFile = new File(['content'], 'test-file.txt', { type: 'text/plain' });
    component.avisoForm.patchValue({ archivo: mockFile });
    component.setValoresStore(component.avisoForm, 'archivo', 'setArchivo');
    expect(store.setArchivo).toHaveBeenCalledWith(mockFile);
  });

  it('should complete destroyed$ on ngOnDestroy', () => {
    const spy = jest.spyOn(component['destroyed$'], 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalledWith(true);
  });
});