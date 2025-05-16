import { PasoUnoComponent } from './paso-uno.component';
import { Solicitud30505Store } from '../../../../core/estados/tramites/tramites30505.store';
import { Solicitud30505Query } from '../../../../core/queries/tramites30505.query';
import { of, Subject } from 'rxjs';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let storeMock: any;
  let queryMock: any;

  beforeEach(() => {
    storeMock = {} as Solicitud30505Store;
    queryMock = {
      selectSolicitud$: of({ selectedCheckbox: ['a', 'b'] })
    } as any;
    component = new PasoUnoComponent(storeMock, queryMock);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set indice on seleccionaTab', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should update selectedCheckboxes on toggleDataVisibility', () => {
    component.toggleDataVisibility(['x', 'y']);
    expect(component.selectedCheckboxes).toEqual(['x', 'y']);
  });

  it('should clean up on destroy', () => {
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should subscribe and set AvisoState and selectedCheckboxes on ngOnInit', () => {
    component.ngOnInit();
    expect(component.AvisoState).toBeDefined();
    expect(component.selectedCheckboxes).toEqual(['a', 'b']);
  });
});
