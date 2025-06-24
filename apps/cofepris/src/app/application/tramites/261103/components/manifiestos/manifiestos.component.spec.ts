import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ManifiestosComponent } from './manifiestos.component';
import { By } from '@angular/platform-browser';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { DatosProcedureQuery } from '../../../../estados/queries/tramites261103.query';
import { DatosProcedureStore } from '../../../../estados/tramites/tramites261103.store';

describe('ManifiestosComponent', () => {
  let COMPONENT: ManifiestosComponent;
  let FIXTURE: ComponentFixture<ManifiestosComponent>;
  let QUERY_MOCK: jest.Mocked<DatosProcedureQuery>;
  let STORE_MOCK: jest.Mocked<DatosProcedureStore>;

  beforeEach(async () => {
    QUERY_MOCK = {
      selectProrroga$: jest.fn(),
    } as unknown as jest.Mocked<DatosProcedureQuery>;

    STORE_MOCK = {
      establecerDatos: jest.fn(),
    } as unknown as jest.Mocked<DatosProcedureStore>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ManifiestosComponent, InputRadioComponent],
      providers: [
        FormBuilder,
        { provide: DatosProcedureQuery, useValue: QUERY_MOCK },
        { provide: DatosProcedureStore, useValue: STORE_MOCK },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    FIXTURE = TestBed.createComponent(ManifiestosComponent);
    COMPONENT = FIXTURE.componentInstance;

    COMPONENT.radioOptions = [
      { label: 'Option 1', value: 'Option 1' },
      { label: 'Option 2', value: 'Option 2' },
    ];
    COMPONENT.declaracionEstaMarcado = true;
    COMPONENT.Aduana = new FormBuilder().group({
      aduanas: [false],
      informacionConfidencial: [''],
    });

    FIXTURE.detectChanges();
  });

  it('should create the component', () => {
    expect(COMPONENT).toBeTruthy();
  });

  it('should bind the checkbox to the form control', () => {
    const CHECKBOX = FIXTURE.debugElement.query(By.css('input[type="checkbox"]')).nativeElement;
    expect(CHECKBOX.checked).toBe(true);
    CHECKBOX.click();
    FIXTURE.detectChanges();
    expect(COMPONENT.Aduana.get('aduanas')?.value).toBe(false);
  });

  it('should bind the radio options to the form control', () => {
    const RADIO_COMPONENT = FIXTURE.debugElement.query(By.directive(InputRadioComponent)).componentInstance;
    expect(RADIO_COMPONENT.radioOptions).toEqual(['Option 1', 'Option 2']);
  });

  it('should call setValoresStore on radio change', () => {
    const SPY = jest.spyOn(COMPONENT, 'setValoresStore');
    const RADIO_COMPONENT = FIXTURE.debugElement.query(By.directive(InputRadioComponent)).componentInstance;
    RADIO_COMPONENT.change.emit('Option 1');
    FIXTURE.detectChanges();
    expect(SPY).toHaveBeenCalledWith(COMPONENT.Aduana, 'informacionConfidencial');
  });

  it('should initialize the form and disable it if esFormularioSoloLectura is true', () => {
    COMPONENT.esFormularioSoloLectura = true;
    jest.spyOn(COMPONENT, 'obtenerDatosFormulario').mockImplementation();
    jest.spyOn(COMPONENT.Aduana, 'disable');

    COMPONENT.inicializarEstadoFormulario();

    expect(COMPONENT.obtenerDatosFormulario).toHaveBeenCalled();
    expect(COMPONENT.Aduana.disable).toHaveBeenCalled();
  });

  it('should initialize the form and enable it if esFormularioSoloLectura is false', () => {
    COMPONENT.esFormularioSoloLectura = false;
    jest.spyOn(COMPONENT, 'obtenerDatosFormulario').mockImplementation();
    jest.spyOn(COMPONENT.Aduana, 'enable');
    jest.spyOn(COMPONENT, 'mercanciasData');

    COMPONENT.inicializarEstadoFormulario();

    expect(COMPONENT.obtenerDatosFormulario).toHaveBeenCalledTimes(2);
    expect(COMPONENT.Aduana.enable).toHaveBeenCalled();
    expect(COMPONENT.mercanciasData).toHaveBeenCalled();
  });

  it('should call ngOnDestroy and complete destroy$', () => {
    const DESTROY_SPY = jest.spyOn(COMPONENT['destroy$'], 'next');
    const COMPLETE_SPY = jest.spyOn(COMPONENT['destroy$'], 'complete');

    COMPONENT.ngOnDestroy();

    expect(DESTROY_SPY).toHaveBeenCalled();
    expect(COMPLETE_SPY).toHaveBeenCalled();
  });

  it('should call setValoresStore and update the store', () => {
    COMPONENT.setValoresStore(COMPONENT.Aduana, 'aduanas');
    expect(STORE_MOCK.establecerDatos).toHaveBeenCalledWith({ aduanas: false });
  });

  it('should call mercanciasData and initialize the form correctly', () => {
    COMPONENT.mercanciasData();

    expect(COMPONENT.Aduana.get('aduanas')?.value).toBe('test');
    expect(COMPONENT.Aduana.get('informacionConfidencial')?.value).toBe('confidential');
  });
});