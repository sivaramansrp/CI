import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FechaDeImportacionComponent } from './fecha-de-importacion.component';

describe('FechaDeImportacionComponent', () => {
  let component: FechaDeImportacionComponent;
  let fixture: ComponentFixture<FechaDeImportacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FechaDeImportacionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FechaDeImportacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a getValorStore e inizializarFormulario en ngOnInit', () => {
    const getValorStoreSpy = jest.spyOn(component, 'getValorStore');
    const inizializarFormularioSpy = jest.spyOn(component, 'inizializarFormulario');

    component.ngOnInit();

    expect(getValorStoreSpy).toHaveBeenCalled();
    expect(inizializarFormularioSpy).toHaveBeenCalled();
  });

  it('debería inicializar el formulario con valores por defecto en inizializarFormulario', () => {
    component.estadoSeleccionado = { fechaLimiteRetorno: '2023-01-01', cuentaProrroga: '2' } as any;

    component.inizializarFormulario();

    expect(component.FechaDeImportacionTemporalFormulario.value).toEqual({
      fechaLimiteRetorno: '2023-01-01',
      cuentaProrroga: '2',
    });
  });

  it('debería actualizar estadoSeleccionado cuando getValorStore emite un valor', () => {
    const mockState = { fechaLimiteRetorno: '2023-01-01', cuentaProrroga: '2' } as any;
    jest.spyOn(component['tramite630104Query'].selectTramite630104State$, 'pipe').mockReturnValue({
      subscribe: (callback: (data: any) => void) => callback(mockState),
    } as any);

    component.getValorStore();

    expect(component.estadoSeleccionado).toEqual(mockState);
  });

  it('debería actualizar el store correctamente en establecerCambioDeValor para valores tipo objeto', () => {
    const setTramite630104StateSpy = jest.spyOn(component['tramite630104Store'], 'setTramite630104State');
    const event = { campo: 'testCampo', valor: { id: '123' } };

    component.establecerCambioDeValor(event);

    expect(setTramite630104StateSpy).toHaveBeenCalledWith('testCampo', '123');
  });

  it('debería actualizar el store correctamente en establecerCambioDeValor para valores primitivos', () => {
    const setTramite630104StateSpy = jest.spyOn(component['tramite630104Store'], 'setTramite630104State');
    const event = { campo: 'testCampo', valor: 'testValue' };

    component.establecerCambioDeValor(event);

    expect(setTramite630104StateSpy).toHaveBeenCalledWith('testCampo', 'testValue');
  });

  it('debería completar destroyed$ al ejecutar ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
