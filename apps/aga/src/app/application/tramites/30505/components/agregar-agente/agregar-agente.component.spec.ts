import { AgregarAgenteComponent } from './agregar-agente.component';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

describe('AgregarAgenteComponent', () => {
  let component: AgregarAgenteComponent;
  let tramite30505StoreMock: any;
  let tramite30505QueryMock: any;
  let locationMock: any;

  beforeEach(() => {
    tramite30505StoreMock = {
      setTipoFigura: jest.fn(),
      setNumPatenteModal: jest.fn(),
      // ...add other methods as needed for setValoresStore
    };
    tramite30505QueryMock = {
      selectSolicitud$: of({
        tipoFigura: '1',
        numPatenteModal: '1234',
        obligFisc: true,
        autPantente: true,
        patente2: 'P2'
      })
    };
    locationMock = { back: jest.fn() };
    component = new AgregarAgenteComponent(
      new FormBuilder(),
      tramite30505StoreMock,
      tramite30505QueryMock,
      locationMock
    );
    component.solicitudState = {
      tipoFigura: '1',
      numPatenteModal: '1234',
      obligFisc: true,
      autPantente: true,
      patente2: 'P2'
    } as any;
  });

  it('should initialize datosTramite on crearFormulario', () => {
    component.crearFormulario();
    expect(component.datosTramite).toBeDefined();
    expect(component.datosTramite.get('tipoFigura')).toBeTruthy();
    expect(component.datosTramite.get('numPatenteModal')).toBeTruthy();
  });

  it('should reset form and hide sections on limpiarSociedadesScc', () => {
    component.crearFormulario();
    component.mostrarAgente = true;
    component.mostrarAgencia = true;
    component.limpiarSociedadesScc();
    expect(component.datosTramite.pristine).toBe(true);
    expect(component.mostrarAgente).toBe(false);
    expect(component.mostrarAgencia).toBe(false);
  });

  it('should reset form and call back on cerrarDialogoSociedadesScc', () => {
    component.crearFormulario();
    component.cerrarDialogoSociedadesScc();
    expect(locationMock.back).toHaveBeenCalled();
  });

  it('should call store method in setValoresStore', () => {
    component.crearFormulario();
    component.datosTramite.get('tipoFigura')?.setValue('2');
    component.setValoresStore(component.datosTramite, 'tipoFigura', 'setTipoFigura');
    expect(tramite30505StoreMock.setTipoFigura).toHaveBeenCalledWith('2');
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
});
