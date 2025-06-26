import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';
import { SolicitudComponent } from './solicitud.component';
import { MediodetransporteService } from '../../services/medio-de-transporte.service';
import { Solicitud220402Store } from '../../estados/tramites/tramites220402.store';
import { Solicitud220402Query } from '../../estados/queries/tramites220402.query';
import { of, Subject } from 'rxjs';
import { Modal } from 'bootstrap';
import { CatalogoSelectComponent, TituloComponent, ValidacionesFormularioService } from '@ng-mf/data-access-user';


describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;
  let mediodetransporteServiceMock: any;
  let solicitud220402StoreMock: any;
  let solicitud220402QueryMock: any;
  let validacionesServiceMock: any;

  beforeEach(async () => {
    mediodetransporteServiceMock = {
      getMedioDeTransporte: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Opción 1' }])),
    };

    solicitud220402StoreMock = {
      setTipoDeCertificado: jest.fn(),
      setSeccionAduanera: jest.fn(),
      setPuntoDestino: jest.fn(),
      setPaisDeDestino: jest.fn(),
      setPaisDeProcedencia: jest.fn(),
      setFechaInicio: jest.fn(),
      setFechaFinal: jest.fn(),
    };

    solicitud220402QueryMock = {
      selectSolicitud$: of({
        tipoDeCertificado: 'Certificado 1',
        seccionAduanera: 'Aduana 1',
        puntoDestino: 'Destino 1',
        paisDeDestino: 'País 1',
        paisDeProcedencia: 'País 2',
        fechaInicio: '2023-01-01',
        fechaFinal: '2023-01-10',
      }),
    };

    validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(false),
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, TituloComponent, CatalogoSelectComponent, FormsModule, SolicitudComponent],
      providers: [
        FormBuilder,
        { provide: MediodetransporteService, useValue: mediodetransporteServiceMock },
        { provide: Solicitud220402Store, useValue: solicitud220402StoreMock },
        { provide: Solicitud220402Query, useValue: solicitud220402QueryMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.FormSolicitud).toBeDefined();
    expect(component.FormSolicitud.get('datosDelTramiteRealizar')).toBeDefined();
    expect(component.FormSolicitud.get('datosMercancia')).toBeDefined();
  });

  it('should fetch transport data on inicializaCatalogos', () => {
    component.inicializaCatalogos();
    expect(mediodetransporteServiceMock.getMedioDeTransporte).toHaveBeenCalled();
    expect(component.Opciones.length).toBe(1);
    expect(component.Opciones[0].descripcion).toBe('Opción 1');
  });

  it('should validate the form field using isValid method', () => {
    const isValid = component.isValid(component.FormSolicitud, 'datosDelTramiteRealizar.tipoDeCertificado');
    expect(validacionesServiceMock.isValid).toHaveBeenCalled();
    expect(isValid).toBe(false);
  });

  it('should call setValoresStore when updating a field', () => {
    const form = component.FormSolicitud;
    component.setValoresStore(form, 'datosDelTramiteRealizar.tipoDeCertificado', 'setTipoDeCertificado');
    expect(solicitud220402StoreMock.setTipoDeCertificado).toHaveBeenCalled();
  });

  it('should open the modal on agregar', () => {
    const modalElement = fixture.debugElement.nativeElement.querySelector('#modalGeneralesMercancia');
    component.modalGeneralesMercancia = { nativeElement: modalElement };
    const modalInstanceSpy = jest.spyOn(Modal.prototype, 'show');
    component.agregar();
    expect(modalInstanceSpy).toHaveBeenCalled();
  });

  it('should add data to datosGeneralesArr on agregarModel', () => {
    component.generalesMercanciaForm = component.fb.group({
      datosGenerales: component.fb.group({
        nombreComun: ['Nombre común'],
        nombreCientifico: ['Nombre científico'],
        descripcionProducto: ['Descripción'],
        fraccionArancelaria: ['12345678'],
        descdelaFraccion: ['Fracción'],
        cantidadUMT: ['10'],
        UMT: ['Kilogramo'],
        cantidadUMC: ['20'],
        UMC: ['Unidad'],
        paisdeOrigen: ['País 1'],
        marcasDistintivas: ['Marca'],
        USO: ['Uso'],
      }),
      numeroDescDeLosEmpaques: component.fb.group({
        numero: ['1'],
        empaques: ['Caja'],
      }),
    });

    component.Opciones = [
      { id: 1, descripcion: 'Unidad' },
      { id: 2, descripcion: 'País 1' },
    ];

    component.agregarModel();
    expect(component.datosGeneralesArr.length).toBe(1);
  });

  it('should reset the form on limpiar', () => {
    component.limpiar();
    expect(component.generalesMercanciaForm.get('datosGenerales.nombreComun')?.value).toBe("");
    expect(component.origenArr.length).toBe(0);
  });
});