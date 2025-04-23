import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TipoPropietarioComponent } from './tipo-propietario.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Tramite630303Store } from '../../estados/tramite630303.store';
import { Tramite630303Query } from '../../estados/tramite630303.query';
import { RetornoImportacionTemporalService } from '../../services/retorno-importacion-temporal.service';
import { FORMULARIO_DATOS_PROPIETARIO_NOMBRE } from '../../enum/retorno-importacion-temporal.enum';

describe('TipoPropietarioComponent', () => {
  let component: TipoPropietarioComponent;
  let fixture: ComponentFixture<TipoPropietarioComponent>;
  let storeMock: Partial<Tramite630303Store>;
  let queryMock: Partial<Tramite630303Query>;
  let serviceMock: Partial<RetornoImportacionTemporalService>;

  beforeEach(async () => {
    storeMock = {
      setTramite630303State: jest.fn(),
    };

    queryMock = {
      selectTramite630303State$: of({
        propietario: '1',
        tipoDePropietario: '2',
      }),
    };

    serviceMock = {
      getPropietario: jest.fn().mockReturnValue(of([{ id: '1', descripcion: 'Persona' }])),
      getTipoDePropietario: jest.fn().mockReturnValue(of([{ id: '1', descripcion: 'Física' }])),
      getPais: jest.fn().mockReturnValue(of([{ id: 'MX', descripcion: 'México' }])),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,TipoPropietarioComponent],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: Tramite630303Store, useValue: storeMock },
        { provide: Tramite630303Query, useValue: queryMock },
        { provide: RetornoImportacionTemporalService, useValue: serviceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TipoPropietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with data from state', () => {
    expect(component.tipoPropietarioFormulario.value).toEqual({
      propietario: '1',
      tipoDePropietario: '2',
    });
  });

  it('should call getPropietario and populate propietarioOpciones', () => {
    expect(component.propietarioOpciones.length).toBeGreaterThan(0);
  });

  it('should call getTipoDePropietario and populate tipoDePropietarioOpciones', () => {
    expect(component.tipoDePropietarioOpciones.length).toBeGreaterThan(0);
  });

  it('should update field visibility in cambiarTipoPropietario()', () => {
    component.tipoPropietarioFormulario.get('tipoDePropietario')?.setValue('1');
    component.formularioDatosPropietarioNombre = structuredClone(FORMULARIO_DATOS_PROPIETARIO_NOMBRE);
    component.cambiarTipoPropietario();

    const nombreCampo = component.formularioDatosPropietarioNombre.find(c => c.id === 'nombre');
    expect(nombreCampo?.mostrar).toBe(true);
  });

  it('should toggle mostrarTipoPropietario and mostrarSolicitante in cambiarPropietario()', () => {
    component.tipoPropietarioFormulario.get('propietario')?.setValue('2');
    component.cambiarPropietario();
    expect(component.mostrarSolicitante).toBe(true);
    expect(component.mostrarTipoPropietario).toBe(false);
  });

  it('should set value in store with establecerCambioDeValor (primitive)', () => {
    component.establecerCambioDeValor({ campo: 'propietario', valor: '1' });
    expect(storeMock.setTramite630303State).toHaveBeenCalledWith('propietario', '1');
  });

  it('should set value in store with establecerCambioDeValor (object with id)', () => {
    component.establecerCambioDeValor({ campo: 'tipoDePropietario', valor: { id: 5 } });
    expect(storeMock.setTramite630303State).toHaveBeenCalledWith('tipoDePropietario', '5');
  });

  it('should complete destroyed$ on destroy', () => {
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
});
