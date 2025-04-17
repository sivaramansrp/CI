import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvisoComponent } from './aviso.component';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

import { Tramite32503Store } from '../../../../estados/tramites/tramite32503.store';
import { Tramite32503Query } from '../../../../estados/queries/tramite32503.query';
import { Modal } from 'bootstrap';
import { AvisoTabla, MercanciaTabla } from "../../models/aviso-traslado.model";
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';



describe('AvisoComponent', () => {
  let component: AvisoComponent;
  let fixture: ComponentFixture<AvisoComponent>;
  let tramiteStoreMock: any;
  let tramiteQueryMock: any;
  let tablaDeDatos: AvisoTabla[];
  let tablaDeMercancia: MercanciaTabla[];


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
        "idTransaccionVUCEM": "12345",
        "cantidad": "10",
        "pesoKg": "25.5",
        "descripcionUnidadMedida": "Kilogramos",
        "descripcion": "Producto A"
      },
      {
        "idTransaccionVUCEM": "67890",
        "cantidad": "5",
        "pesoKg": "12.3",
        "descripcionUnidadMedida": "Litros",
        "descripcion": "Producto B"
      },
      {
        "idTransaccionVUCEM": "11223",
        "cantidad": "20",
        "pesoKg": "50.0",
        "descripcionUnidadMedida": "Cajas",
        "descripcion": "Producto C"
      }
    ]
 
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, AvisoComponent],
      declarations: [],
      providers: [
        provideHttpClient(),
        { provide: Tramite32503Store, useValue: tramiteStoreMock },
        { provide: Tramite32503Query, useValue: tramiteQueryMock },
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




  it('should open the domicilio modal when abiertoDomicilio is called', () => {
    const modalElement = fixture.debugElement.nativeElement.querySelector('#modalDomicilio');
    component.modalDomicilio = { nativeElement: modalElement };
    const modalInstanceSpy = jest.spyOn(Modal.prototype, 'show');
    component.abiertoDomicilio();
    expect(modalInstanceSpy).toHaveBeenCalled();
  });



  it('should filter out selected rows when eliminarDomicilio is called', () => {
    component.tablaDeDatos.datos = tablaDeDatos
    component.filaSeleccionadaLista = [tablaDeDatos[1]];
    component.eliminarDomicilio();
    expect(component.tablaDeDatos.datos).toEqual([tablaDeDatos[0]]);
    expect(component.filaSeleccionadaLista).toEqual([]);
  });



 

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});