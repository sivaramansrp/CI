import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, Subject } from 'rxjs';
import { InstrumentoCupoTPLForm } from '../../../120201/models/cupos.model';
import { SolicitudDeRegistroTplService } from '../../services/solicitud-de-registro-tpl.service';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let mockService: jest.Mocked<SolicitudDeRegistroTplService>;

  beforeEach(async () => {
    const solicitudServiceMock = {
      getSolicitudRegistroData: jest.fn(),
      actualizarEstadoFormulario: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: SolicitudDeRegistroTplService, useValue: solicitudServiceMock }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    mockService = TestBed.inject(SolicitudDeRegistroTplService) as jest.Mocked<SolicitudDeRegistroTplService>;
  });

  it('debería crear', () => {
    expect(component).toBeTruthy();
  });


  it('debería establecer esDatosRespuesta en true si consultaState.update es false', () => {
    component.consultaState = { update: false } as any;
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('debería obtener datos y actualizar el estado del formulario en guardarDatosFormulario()', () => {
    const mockResponse = { campo1: 'valor1', campo2: 'valor2' };
    mockService.getSolicitudRegistroData.mockReturnValue(of(mockResponse));
    component['destroyNotifier$'] = new Subject<void>();

    component.guardarDatosFormulario();

    expect(mockService.getSolicitudRegistroData).toHaveBeenCalled();
    expect(component.esDatosRespuesta).toBe(true);
    expect(mockService.actualizarEstadoFormulario).toHaveBeenCalledWith('campo1', 'valor1');
    expect(mockService.actualizarEstadoFormulario).toHaveBeenCalledWith('campo2', 'valor2');
  });

  it('debería emitir índice y actualizar pestaña seleccionada en seleccionaTab()', () => {
    const emitSpy = jest.spyOn(component.pestanaCambiado, 'emit');
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
    expect(emitSpy).toHaveBeenCalledWith(2);
  });

  it('debería establecer elementoDeTablaSeleccionado en archivoHagaClicControlador()', () => {
    const mockItem = { id: 123, nombre: 'Prueba' } as unknown as InstrumentoCupoTPLForm;
    component.archivoHagaClicControlador(mockItem);
    expect(component.elementoDeTablaSeleccionado).toBe(mockItem);
  });

  it('debería limpiar destroyNotifier$ en ngOnDestroy()', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
