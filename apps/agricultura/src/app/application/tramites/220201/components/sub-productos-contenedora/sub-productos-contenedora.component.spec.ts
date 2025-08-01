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

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe obtener datos del catálogo al inicializar', () => {
    expect(mockApiService.obtenerProductoRespuestaPorUrl).toHaveBeenCalledWith('productos.json');
  });

  it('debe actualizar el store cuando se llama agregarDatosFormulario', () => {
    const eventoEjemplo: any = {
      formulario: {
        id: 123,
        tipoRequisito: 'req',
        requisito: 'test',
        cantidadUMT: '5',
        cantidadUMC: '10'
      }
    };

    component.agregarDatosFormulario(eventoEjemplo);

    expect(mockStore.update).toHaveBeenCalledWith(expect.any(Function));
  });
});
