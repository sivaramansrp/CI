import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { TipoMovimientoComponent } from './tipo-movimiento.component';
import { TipoMovimientoService } from '../../services/tipo-movimiento.service';
import { Tramite250101Store } from '../../estados/tramite250101.store';
import { Tramite250101Query } from '../../estados/tramite250101.query';

class Tramite250101QueryMock {
  tipoAduana$ = of([]);
  tipoInspectoria$ = of([]);
  tipoMunicipio$ = of([]);
  destinatarioDenominacion$ = of([]);
  selectSolicitud$ = of({});
}

describe('TipoMovimientoComponent', () => {
  let component: TipoMovimientoComponent;
  let fixture: ComponentFixture<TipoMovimientoComponent>;
  let tipoMovimientoServiceMock: any;
  let tramite250101StoreMock: any;

  beforeEach(async () => {
    tipoMovimientoServiceMock = {
      getAduanaData: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Aduana 1' }])),
      getInspectoriaData: jest.fn().mockReturnValue(of([{ id: 2, descripcion: 'Inspectoria 1' }])),
      getAlcaldiaData: jest.fn().mockReturnValue(of([{ id: 3, descripcion: 'Municipio 1' }])),
    };

    tramite250101StoreMock = {
      establecerTipoAduana: jest.fn(),
      establecerTipoInspectoria: jest.fn(),
      establecerTipoMunicipio: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,TipoMovimientoComponent],
      declarations: [],
      providers: [
        { provide: TipoMovimientoService, useValue: tipoMovimientoServiceMock },
        { provide: Tramite250101Store, useValue: tramite250101StoreMock },
        { provide: Tramite250101Query, useClass: Tramite250101QueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TipoMovimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form and fetch data on ngOnInit', () => {
    expect(component.tipoMovimientoForm).toBeDefined();
    expect(tipoMovimientoServiceMock.getAduanaData).toHaveBeenCalled();
    expect(tipoMovimientoServiceMock.getInspectoriaData).toHaveBeenCalled();
    expect(tipoMovimientoServiceMock.getAlcaldiaData).toHaveBeenCalled();
    expect(component.aduanaData).toEqual([{ id: 1, descripcion: 'Aduana 1' }]);
    expect(component.inspectoriaData).toEqual([{ id: 2, descripcion: 'Inspectoria 1' }]);
    expect(component.municipioData).toEqual([{ id: 3, descripcion: 'Municipio 1' }]);
  });

  it('should set default values in the form', () => {
    const formValue = component.tipoMovimientoForm.value;
    expect(formValue.tipoMovimiento).toBe('');
    expect(formValue.tipoAduana).toBe('');
    expect(formValue.tipoInspectoria).toBe('');
    expect(formValue.tipoMunicipio).toBe('');
  });

  it('should call establecerTipoAduana when actualizarAduana is called', () => {
    component.tipoMovimientoForm.patchValue({ tipoAduana: 'Aduana 1' });
    component.actualizarAduana();
    expect(tramite250101StoreMock.establecerTipoAduana).toHaveBeenCalledWith('Aduana 1');
  });

  it('should call establecerTipoInspectoria when actualizarInspectoria is called', () => {
    component.tipoMovimientoForm.patchValue({ tipoInspectoria: 'Inspectoria 1' });
    component.actualizarInspectoria();
    expect(tramite250101StoreMock.establecerTipoInspectoria).toHaveBeenCalledWith('Inspectoria 1');
  });

  it('should call establecerTipoMunicipio when actualizarMunicipio is called', () => {
    component.tipoMovimientoForm.patchValue({ tipoMunicipio: 'Municipio 1' });
    component.actualizarMunicipio();
    expect(tramite250101StoreMock.establecerTipoMunicipio).toHaveBeenCalledWith('Municipio 1');
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  
  it('should disable the form if esFormularioSoloLectura is true', () => {
    component.esFormularioSoloLectura = true;
    component.tipoMovimientoForm.enable(); // ensure it's enabled first
    component.inicializarEstadoFormulario();
    expect(component.tipoMovimientoForm.disabled).toBe(true);
  });

  it('should enable the form if esFormularioSoloLectura is false', () => {
    component.esFormularioSoloLectura = false;
    component.tipoMovimientoForm.disable(); // ensure it's disabled first
    component.inicializarEstadoFormulario();
    expect(component.tipoMovimientoForm.enabled).toBe(true);
  });

  it('should handle empty data from services gracefully', () => {
    tipoMovimientoServiceMock.getAduanaData.mockReturnValueOnce(of([]));
    tipoMovimientoServiceMock.getInspectoriaData.mockReturnValueOnce(of([]));
    tipoMovimientoServiceMock.getAlcaldiaData.mockReturnValueOnce(of([]));
    component.ngOnInit();
    expect(component.aduanaData).toEqual([]);
    expect(component.inspectoriaData).toEqual([]);
    expect(component.municipioData).toEqual([]);
  });
});
