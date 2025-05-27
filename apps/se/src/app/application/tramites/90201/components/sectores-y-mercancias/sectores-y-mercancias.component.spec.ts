import { SectoresYMercanciasComponent } from './sectores-y-mercancias.component';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

describe('SectoresYMercanciasComponent', () => {
  let component: SectoresYMercanciasComponent;
  let expansionDeProductoresServiceMock: any;
  let tramite90201StoreMock: any;
  let tramite90201QueryMock: any;
  let consultaioQueryMock: any;
  let fb: FormBuilder;

  beforeEach(() => {
    expansionDeProductoresServiceMock = {
      getSectorCatalog: jest.fn().mockReturnValue(of({ data: [{ id: 1, nombre: 'Sector1' }] }))
    };
    tramite90201StoreMock = {
      setSector: jest.fn(),
      setFraccion: jest.fn()
    };
    tramite90201QueryMock = {
      selectSolicitud$: of({
        sector: 'SectorX',
        fraccion: '12345678'
      })
    };
    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false })
    };
    fb = new FormBuilder();
    component = new SectoresYMercanciasComponent(
      expansionDeProductoresServiceMock,
      fb,
      tramite90201StoreMock,
      tramite90201QueryMock,
      consultaioQueryMock
    );
    component.solicitudState = {
      sector: 'SectorX',
      fraccion: '12345678'
    } as any;
  });

  it('should initialize sectoresForm with correct values on establecerFormSectores', () => {
    component.establecerFormSectores();
    expect(component.sectoresForm).toBeDefined();
    expect(component.sectoresForm.get('sector')?.value).toBe('SectorX');
    expect(component.sectoresForm.get('fraccion')?.value).toBe('12345678');
  });

  it('should disable form when esFormularioSoloLectura is true in guardarDatosFormulario', () => {
    component.establecerFormSectores();
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
    expect(component.sectoresForm.disabled).toBe(true);
  });

  it('should enable form when esFormularioSoloLectura is false in guardarDatosFormulario', () => {
    component.establecerFormSectores();
    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
    expect(component.sectoresForm.enabled).toBe(true);
  });

  it('should call store method in setValoresStore', () => {
    component.establecerFormSectores();
    component.sectoresForm.get('sector')?.setValue('SectorY');
    component.setValoresStore(component.sectoresForm, 'sector', 'setSector');
    expect(tramite90201StoreMock.setSector).toHaveBeenCalledWith('SectorY');
  });

  it('should set sectorCatalogo on inicializaCatalogos', () => {
    component.sectorCatalogo = [];
    component['inicializaCatalogos']();
    expect(component.sectorCatalogo).toEqual([{ id: 1, nombre: 'Sector1' }]);
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
});
