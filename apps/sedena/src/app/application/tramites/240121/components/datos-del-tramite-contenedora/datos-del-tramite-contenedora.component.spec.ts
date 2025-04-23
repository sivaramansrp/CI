import { FormBuilder } from '@angular/forms';
import { TestBed } from '@angular/core/testing';
import { DatosDelTramiteContenedoraComponent } from './datos-del-tramite-contenedora.component';
import { of } from 'rxjs';
import { Tramite240121Query } from '../../estados/tramite240121Query.query';
import { Tramite240121Store } from '../../estados/tramite240121Store.store';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';

describe('DatosDelTramiteContenedoraComponent (Jest)', () => {
  let component: DatosDelTramiteContenedoraComponent;

  const mockTramiteQuery = {
    getMercanciaTablaDatos$: of<{ id: number }[]>([]), 
    getDatosDelTramite$: of({}), 
  };

  const mockTramiteStore = {
    updateDatosDelTramiteFormState: jest.fn(),
  };

  const mockValidacionesService = {
    isValid: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormBuilder,
        { provide: Tramite240121Query, useValue: mockTramiteQuery },
        { provide: Tramite240121Store, useValue: mockTramiteStore },
        {
          provide: ValidacionesFormularioService,
          useValue: mockValidacionesService,
        },
      ],
    });

    const fb = TestBed.inject(FormBuilder);
    component = new DatosDelTramiteContenedoraComponent(
      fb,
      mockTramiteQuery as any,
      mockTramiteStore as any,
      mockValidacionesService as any
    );
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    mockTramiteQuery.getMercanciaTablaDatos$ = of([]);
    mockTramiteQuery.getDatosDelTramite$ = of({}); 

    component.ngOnInit();

    expect(component.formCombinacion).toBeDefined();
  });

  it('should subscribe to getMercanciaTablaDatos$', () => {
    const mockData = [{ id: 1 }];
    mockTramiteQuery.getMercanciaTablaDatos$ = of(mockData);
    mockTramiteQuery.getDatosDelTramite$ = of({}); 

    component.ngOnInit();

    expect(component.datosMercanciaTabla).toEqual(mockData);
  });

  it('should subscribe to getDatosDelTramite$', () => {
    const formState = { campo: 'valor' };
    mockTramiteQuery.getDatosDelTramite$ = of(formState); 
    mockTramiteQuery.getMercanciaTablaDatos$ = of([]);

    component.ngOnInit();

    expect(component.datosDelTramiteFormState).toEqual(formState);
  });

  it('should call updateDatosDelTramiteFormulario()', () => {
    const event = { campo: 'nuevo valor' };
    component.updateDatosDelTramiteFormulario(event as any);
    expect(
      mockTramiteStore.updateDatosDelTramiteFormState
    ).toHaveBeenCalledWith(event);
  });

  it('should check form field validity using ValidacionesFormularioService', () => {
    component.crearFormCombinacion();
    mockValidacionesService.isValid.mockReturnValue(true);

    const result = component.isValid('campo');
    expect(mockValidacionesService.isValid).toHaveBeenCalledWith(
      component.formCombinacion,
      'campo'
    );
    expect(result).toBe(true);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['unsubscribe$'], 'next');
    const completeSpy = jest.spyOn(component['unsubscribe$'], 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
