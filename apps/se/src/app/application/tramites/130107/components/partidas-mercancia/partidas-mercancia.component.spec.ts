import { TestBed } from '@angular/core/testing';
import { PartidasDeLaMercanciaComponent } from './partidas-mercancia.component';
import { ImportacionesAgropecuariasStore } from '../../estados/importaciones-agropecuarias.store';
import { ImportacionesAgropecuariasQuery } from '../../estados/importaciones-agropecuarias.query';
import { ServicioDeFormularioService } from '../../services/formulario-validacion.service';
import { of } from 'rxjs';

describe('PartidasDeLaMercanciaComponent', () => {
  let component: PartidasDeLaMercanciaComponent;
  let importacionesStoreMock: jest.Mocked<ImportacionesAgropecuariasStore>;
  let importacionesQueryMock: jest.Mocked<ImportacionesAgropecuariasQuery>;
  let formularioServiceMock: jest.Mocked<ServicioDeFormularioService>;

  beforeEach(() => {
    importacionesStoreMock = {
      setDynamicFieldValue: jest.fn(),
    } as unknown as jest.Mocked<ImportacionesAgropecuariasStore>;

    importacionesQueryMock = {
      selectSolicitudDeRegistroTpl$: of({}),
    } as unknown as jest.Mocked<ImportacionesAgropecuariasQuery>;

    formularioServiceMock = {
      setFormValue: jest.fn(),
    } as unknown as jest.Mocked<ServicioDeFormularioService>;

    TestBed.configureTestingModule({
      providers: [
        PartidasDeLaMercanciaComponent,
        { provide: ImportacionesAgropecuariasStore, useValue: importacionesStoreMock },
        { provide: ImportacionesAgropecuariasQuery, useValue: importacionesQueryMock },
        { provide: ServicioDeFormularioService, useValue: formularioServiceMock },
      ],
    });

    component = TestBed.inject(PartidasDeLaMercanciaComponent);
    component.consultaState = { readonly: false } as any;
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar solicitudDeRegistroState en ngOnInit', () => {
    const mockState = { key: 'value' };
    importacionesQueryMock.selectSolicitudDeRegistroTpl$ = of(mockState);

    component.ngOnInit();

    expect(component.solicitudDeRegistroState).toEqual(mockState);
  });

  it('debe llamar establecerCambioDeValor y actualizar el store y el formulario', () => {
    const mockEvent = { campo: 'campo1', valor: 'valor1' };

    component.establecerCambioDeValor(mockEvent);

    expect(importacionesStoreMock.setDynamicFieldValue).toHaveBeenCalledWith('campo1', 'valor1');
    expect(formularioServiceMock.setFormValue).toHaveBeenCalledWith('partidasForm', { campo1: 'valor1' });
  });

 

  it('debe completar destroy$ al llamar ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});