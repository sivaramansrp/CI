import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasoUnoComponent, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize indice to 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should set consultaState and esDatosRespuesta correctly in constructor', () => {
    expect(component.consultaState).toBeDefined();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('should update indice when seleccionaTab is called', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should emit and complete destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should set esDatosRespuesta to true and call actualizarEstadoFormulario on guardarDatosFormulario', () => {
    const actualizarEstadoFormularioSpy = jest.spyOn(
      component.permisoSanitarioImportacionMedicamentosService,
      'actualizarEstadoFormulario'
    );
    const mockResponse = { someData: 'test' };
    jest.spyOn(component.permisoSanitarioImportacionMedicamentosService, 'getTramiteDatos').mockReturnValue({
      pipe: jest.fn().mockReturnValue({
        subscribe: (callback: (resp: any) => void) => callback(mockResponse),
      }),
    } as any);

    component.guardarDatosFormulario();
    expect(component.esDatosRespuesta).toBe(true);
    expect(actualizarEstadoFormularioSpy).toHaveBeenCalledWith(mockResponse);
  });
});
