import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvisoComponent } from './aviso.component';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Subject, of } from 'rxjs';
import { Tramite32506Store } from '../../estados/tramite32506.store';
import { Tramite32506Query } from '../../estados/tramite32506.query';
import { Modal } from 'bootstrap';
import { AvisoTabla, PedimentoTabla } from "../../models/aviso-destruccion.model";
import { provideHttpClient } from '@angular/common/http';



describe('AvisoComponent', () => {
  let component: AvisoComponent;
  let fixture: ComponentFixture<AvisoComponent>;
  let tramiteStoreMock: any;
  let tramiteQueryMock: any;
  let tablaDeDatos: AvisoTabla[];
  let tablaDeMercancia: PedimentoTabla[];


  beforeEach(async () => {
    tramiteStoreMock = {
      setAvisoFormularioTipoAviso: jest.fn(),
      setAvisoFormularioFechaTranslado: jest.fn(),
    };

    tramiteQueryMock = {
      selectSolicitud$: of({
        datosAviso: {
          tipoAviso: 'inicial',
          idTransaccion: '',
          motivoProrroga: '',
        },
      }),
    };

    tablaDeDatos = [
      {
        "id": 1,
        "nombreComercial": "NOMBRE COMERCIAL",
        "entidadFederativa": "ENTIDAD FEDERATIVA",
        "alcaldioOMuncipio": "ALCALDIA O MUNICIPIO",
        "colonia": "COLONIA",
        "horaDestruccion": "00:00",
        "fechaDestruccion": "2023-10-01"
      }
    ];
    tablaDeMercancia = [
      {
        "id": 1,
        "patenteAutorizacion": "2452",
        "pedimento": "5254782",
        "claveAduanaPedimento": "ALTAMIRA",
        "claveFraccionArancelariaPedimento": "certificado",
        "nicoPedimento": "02",
        "cantidadPedimento": "25",
        "claveUnidadMedidaPedimento": "Litro"
      }
    ]
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,AvisoComponent],
      declarations: [],
      providers: [
        provideHttpClient(), Tramite32506Store, Tramite32506Query,
        FormBuilder,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize tramiteState on ngOnInit', () => {
    component.ngOnInit();
    expect(component.tramiteState).toEqual({
      datosAviso: {
        tipoAviso: 'inicial',
        idTransaccion: '',
        motivoProrroga: '',
      },
    });
  });

  it('should call setAvisoFormularioTipoAviso when verificaTipoAviso is called', () => {
    component.avisoFormulario = new FormGroup({});
    component.verificaTipoAviso();
    expect(tramiteStoreMock.setAvisoFormularioTipoAviso).toHaveBeenCalled();
  });

  it('should disable idTransaccion and motivoProrroga when tipoAviso is "inicial"', () => {
    component.avisoFormulario = new FormGroup({
      datosAviso: new FormGroup({
        tipoAviso: new FormBuilder().control('inicial'),
        idTransaccion: new FormBuilder().control(''),
        motivoProrroga: new FormBuilder().control(''),
      }),
    });
    component.verificaTipoAviso();
    expect(component.avisoFormulario.get('datosAviso.idTransaccion')?.disabled).toBeTruthy();
    expect(component.avisoFormulario.get('datosAviso.motivoProrroga')?.disabled).toBeTruthy();
  });

  it('should open the domicilio modal when abiertoDomicilio is called', () => {
    const modalElement = fixture.debugElement.nativeElement.querySelector('#modalDomicilio');
    component.modalDomicilio = { nativeElement: modalElement };
    const modalInstanceSpy = jest.spyOn(Modal.prototype, 'show');
    component.abiertoDomicilio();
    expect(modalInstanceSpy).toHaveBeenCalled();
  });

  it('should open the mercancia modal when abiertoMercancia is called', () => {
    const modalElement = fixture.debugElement.nativeElement.querySelector('#modalPedimento');
    component.modalPedimento = { nativeElement: modalElement };
    const modalInstanceSpy = jest.spyOn(Modal.prototype, 'show');
    component.abiertoPedimento();
    expect(modalInstanceSpy).toHaveBeenCalled();
  });

  it('should filter out selected rows when eliminarDomicilio is called', () => {
    component.tablaDeDatos.datos = tablaDeDatos
    component.filaSeleccionadaLista = [tablaDeDatos[1]];
    component.eliminarDomicilio();
    expect(component.tablaDeDatos.datos).toEqual([tablaDeDatos[0]]);
    expect(component.filaSeleccionadaLista).toEqual([]);
  });

  it('should filter out selected rows when eliminarMercancia is called', () => {
    component.tablaPedimento.datos = tablaDeMercancia
    component.filaSeleccionadaPedimentoLista = [tablaDeMercancia[1]];
    component.eliminarPedimento();
    expect(component.tablaPedimento.datos).toEqual([tablaDeMercancia[0]]);
    expect(component.filaSeleccionadaPedimentoLista).toEqual([]);
  });

  it('should call setAvisoFormularioFechaTranslado when cambioFechaIngreso is called', () => {
    const nuevoValor = '2025-04-10';
    component.cambioFechaIngreso(nuevoValor);
    expect(tramiteStoreMock.setAvisoFormularioFechaTranslado).toHaveBeenCalledWith(nuevoValor);
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});