import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ZoosanitarioStore } from '../../estados/220201/zoosanitario.store';
import { CapturarSolicitud } from '../../models/220201/capturar-solicitud.model';
import { ZoosanitarioQuery } from '../../queries/220201/zoosanitario.query';
import { AgriculturaApiService } from '../../services/220201/agricultura-api.service';
import { SubProductosContenedoraComponent } from './sub-productos-contenedora.component';

describe('SubProductosContenedoraComponent', () => {
  let component: SubProductosContenedoraComponent;
  let fixture: ComponentFixture<SubProductosContenedoraComponent>;

  const mockCapturarSolicitud: CapturarSolicitud = {
    datosDeLaSolicitud: {} as any,
    datosParaMovilizacionNacional: {} as any,
    pagoDeDerechos: {} as any,
    tercerosRelacionados: [],
    validarEnvio: {} as any,
    tablaDatos: [],
    selectedDatos: [],
    datos: {} as any,
    datosForma: [],
    seletedTerceros: {} as any,
    seletedExdora: {} as any,
  };

  let mockApiService: Partial<AgriculturaApiService>;
  let mockStore: Partial<ZoosanitarioStore>;
  let mockQuery: Partial<ZoosanitarioQuery>;

  beforeEach(async () => {
    mockApiService = {
      obtenerProductoRespuestaPorUrl: jest.fn().mockReturnValue(of({}))
    };

    mockQuery = {
      seleccionarState$: of({
        datosDeLaSolicitud: {} as any,
        datosParaMovilizacionNacional: {} as any,
        pagoDeDerechos: {} as any,
        tercerosRelacionados: [],
        validarEnvio: {} as any,
        tablaDatos: [],
        selectedDatos: [],
        datos: {} as any,
        datosForma: [],
        seletedTerceros: {} as any,
        seletedExdora: {} as any,
      })
    };


    mockStore = {
      update: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [SubProductosContenedoraComponent],
      providers: [
        { provide: AgriculturaApiService, useValue: mockApiService },
        { provide: ZoosanitarioQuery, useValue: mockQuery },
        { provide: ZoosanitarioStore, useValue: mockStore }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SubProductosContenedoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch catalog data on init', () => {
    expect(mockApiService.obtenerProductoRespuestaPorUrl).toHaveBeenCalledWith('productos.json');
  });

  it('should update store when agregarDatosFormulario is called', () => {
    const sampleEvent: any = {
      formulario: {
        id: 123,
        tipoRequisito: 'req',
        requisito: 'test',
        cantidadUMT: '5',
        cantidadUMC: '10'
        // ... add other required fields as needed
      }
    };

    component.agregarDatosFormulario(sampleEvent);

    expect(mockStore.update).toHaveBeenCalledWith(expect.any(Function));
  });
});
