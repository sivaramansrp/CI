import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { TipoPropietarioComponent } from './tipo-propietario.component';
import { Tramite630303Store } from '../../estados/tramite630303.store';
import { Tramite630303Query } from '../../estados/tramite630303.query';
import { RetornoImportacionTemporalService } from '../../services/retorno-importacion-temporal.service';
import { of } from 'rxjs';

describe('TipoPropietarioComponent', () => {
  let component: TipoPropietarioComponent;
  let fixture: ComponentFixture<TipoPropietarioComponent>;
  let mockStore: jest.Mocked<Tramite630303Store>;
  let mockQuery: jest.Mocked<Tramite630303Query>;
  let mockService: jest.Mocked<RetornoImportacionTemporalService>;

  beforeEach(async () => {
    mockStore = {
      setTramite630303State: jest.fn(),
    } as unknown as jest.Mocked<Tramite630303Store>;

    mockQuery = {
      selectTramite630303State$: of({
        propietario: 'Propietario 1',
        tipoDePropietario: '1',
        nombre: 'John',
        apellidoPaterno: 'Doe',
        apellidoMaterno: 'Smith',
        razonSocial: 'Empresa XYZ',
      }),
    } as unknown as jest.Mocked<Tramite630303Query>;

    mockService = {
      getPropietario: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Propietario 1' }])),
      getTipoDePropietario: jest.fn().mockReturnValue(of([{ id: 2, descripcion: 'Tipo 1' }])),
      getPais: jest.fn().mockReturnValue(of([{ id: 3, descripcion: 'País 1' }])),
    } as unknown as jest.Mocked<RetornoImportacionTemporalService>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, TipoPropietarioComponent],  
      providers: [
        FormBuilder,
        { provide: Tramite630303Store, useValue: mockStore },
        { provide: Tramite630303Query, useValue: mockQuery },
        { provide: RetornoImportacionTemporalService, useValue: mockService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TipoPropietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.tipoPropietarioFormulario.value).toEqual({
      propietario: 'Propietario 1',
      tipoDePropietario: '1',
      nombre: 'John',
      apellidoPaterno: 'Doe',
      apellidoMaterno: 'Smith',
      razonSocial: 'Empresa XYZ',
    });
  });

  it('should fetch propietario options from the service', () => {
    component.getPropietario();
    expect(mockService.getPropietario).toHaveBeenCalled();
    expect(component.propietarioOpciones).toEqual([{ id: 1, descripcion: 'Propietario 1' }]);
  });

  it('should fetch tipoDePropietario options from the service', () => {
    component.getTipoDePropietario();
    expect(mockService.getTipoDePropietario).toHaveBeenCalled();
    expect(component.tipoDePropietarioOpciones).toEqual([{ id: 2, descripcion: 'Tipo 1' }]);
  });

  it('should fetch pais options from the service', () => {
    component.getPais();
    expect(mockService.getPais).toHaveBeenCalled();
    const paisField = component.formularioDatosTipoPropietario.find((field) => field.id === 'pais');
    expect(paisField?.opciones).toEqual([{ id: 3, descripcion: 'País 1' }]);
  });

  it('should update the store when establecerCambioDeValor is called', () => {
    const mockEvent = { campo: 'propietario', valor: 'Nuevo Propietario' };
    component.establecerCambioDeValor(mockEvent);
    expect(mockStore.setTramite630303State).toHaveBeenCalledWith('propietario', 'Nuevo Propietario');
  });

  it('should set validators correctly when establecerValidadores is called', () => {
    const spy = jest.spyOn(component.tipoPropietarioFormulario.get('nombre')!, 'setValidators');
    component.establecerValidadores(['nombre'], Validators.required);
    expect(spy).toHaveBeenCalledWith(Validators.required);
  });

  it('should clear validators correctly when limpiarValidadores is called', () => {
    const spy = jest.spyOn(component.tipoPropietarioFormulario.get('nombre')!, 'clearValidators');
    component.limpiarValidadores(['nombre']);
    expect(spy).toHaveBeenCalled();
  });

  it('should adjust validators when tipoDePropietario is 1', () => {
    component.tipoPropietarioFormulario.patchValue({ tipoDePropietario: '1' });
    component.ajustarValidadoresSegunValor();
    const nombreField = component.tipoPropietarioFormulario.get('nombre');
    const apellidoPaternoField = component.tipoPropietarioFormulario.get('apellidoPaterno');
    const razonSocialField = component.tipoPropietarioFormulario.get('razonSocial');
    expect(nombreField?.hasValidator(Validators.required)).toBeTruthy();
    expect(apellidoPaternoField?.hasValidator(Validators.required)).toBeTruthy();
    expect(razonSocialField?.hasValidator(Validators.required)).toBeFalsy();
  });

  it('should adjust validators when tipoDePropietario is 2', () => {
    component.tipoPropietarioFormulario.patchValue({ tipoDePropietario: '2' });
    component.ajustarValidadoresSegunValor();
    const razonSocialField = component.tipoPropietarioFormulario.get('razonSocial');
    const nombreField = component.tipoPropietarioFormulario.get('nombre');
    const apellidoPaternoField = component.tipoPropietarioFormulario.get('apellidoPaterno');
    expect(razonSocialField?.hasValidator(Validators.required)).toBeTruthy();
    expect(nombreField?.hasValidator(Validators.required)).toBeFalsy();
    expect(apellidoPaternoField?.hasValidator(Validators.required)).toBeFalsy();
  });

  it('should call all initialization methods in ngOnInit', () => {
    const getValorStoreSpy = jest.spyOn(component, 'getValorStore');
    const inicializarFormularioSpy = jest.spyOn(component, 'inicializarFormulario');
    const getPropietarioSpy = jest.spyOn(component, 'getPropietario');
    const getTipoDePropietarioSpy = jest.spyOn(component, 'getTipoDePropietario');
    const getPaisSpy = jest.spyOn(component, 'getPais');
    const ajustarValidadoresSegunValorSpy = jest.spyOn(component, 'ajustarValidadoresSegunValor');
    component.ngOnInit();
    expect(getValorStoreSpy).toHaveBeenCalled();
    expect(inicializarFormularioSpy).toHaveBeenCalled();
    expect(getPropietarioSpy).toHaveBeenCalled();
    expect(getTipoDePropietarioSpy).toHaveBeenCalled();
    expect(getPaisSpy).toHaveBeenCalled();
    expect(ajustarValidadoresSegunValorSpy).toHaveBeenCalled();
  });

  it('should clean up subscriptions on destroy', () => {
    const spy = jest.spyOn((component as any).destroyed$, 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
