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

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should set esDatosRespuesta to true if consultaState.update is false', () => {
    component.consultaState = { update: false } as any;
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should fetch data and update form state in guardarDatosFormulario()', () => {
    const mockResponse = { campo1: 'valor1', campo2: 'valor2' };
    mockService.getSolicitudRegistroData.mockReturnValue(of(mockResponse));
    component['destroyNotifier$'] = new Subject<void>();

    component.guardarDatosFormulario();

    expect(mockService.getSolicitudRegistroData).toHaveBeenCalled();
    expect(component.esDatosRespuesta).toBe(true);
    expect(mockService.actualizarEstadoFormulario).toHaveBeenCalledWith('campo1', 'valor1');
    expect(mockService.actualizarEstadoFormulario).toHaveBeenCalledWith('campo2', 'valor2');
  });

  it('should emit index and update selected tab in seleccionaTab()', () => {
    const emitSpy = jest.spyOn(component.pestanaCambiado, 'emit');
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
    expect(emitSpy).toHaveBeenCalledWith(2);
  });

  it('should set elementoDeTablaSeleccionado on archivoHagaClicControlador()', () => {
    const mockItem = { id: 123, nombre: 'Prueba' } as unknown as InstrumentoCupoTPLForm;
    component.archivoHagaClicControlador(mockItem);
    expect(component.elementoDeTablaSeleccionado).toBe(mockItem);
  });

  it('should clean up destroyNotifier$ on ngOnDestroy()', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
