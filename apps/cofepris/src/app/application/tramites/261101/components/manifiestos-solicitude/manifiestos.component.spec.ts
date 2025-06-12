import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ManifiestosComponent } from './manifiestos.component';
import { By } from '@angular/platform-browser';
import { InputRadioComponent } from '@libs/shared/data-access-user/src';
import { DatosProcedureQuery } from '../../../../estados/queries/tramites261101.query';
import { DatosProcedureStore } from '../../../../estados/tramites/tramites261101.store';
import { of, Subject } from 'rxjs';

describe('ManifiestosComponent', () => {
  let component: ManifiestosComponent;
  let fixture: ComponentFixture<ManifiestosComponent>;
  let queryMock: jest.Mocked<DatosProcedureQuery>;
  let storeMock: jest.Mocked<DatosProcedureStore>;

  beforeEach(async () => {
    queryMock = {
      selectProrroga$: jest.fn(),
    } as unknown as jest.Mocked<DatosProcedureQuery>;

    storeMock = {
      establecerDatos: jest.fn(),
    } as unknown as jest.Mocked<DatosProcedureStore>;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, ManifiestosComponent, InputRadioComponent],
      providers: [
        FormBuilder,
        { provide: DatosProcedureQuery, useValue: queryMock },
        { provide: DatosProcedureStore, useValue: storeMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManifiestosComponent);
    component = fixture.componentInstance;

    component.radioOptions = [
      { label: 'Option 1', value: 'Option 1' },
      { label: 'Option 2', value: 'Option 2' },
    ];
    component.declaracionEstaMarcado = true;
    component.Aduana = new FormBuilder().group({
      aduanas: [false],
      informacionConfidencial: [''],
    });

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should bind the checkbox to the form control', () => {
    const checkbox = fixture.debugElement.query(By.css('input[type="checkbox"]')).nativeElement;
    expect(checkbox.checked).toBe(true);
    checkbox.click();
    fixture.detectChanges();
    expect(component.Aduana.get('aduanas')?.value).toBe(false);
  });

  it('should bind the radio options to the form control', () => {
    const radioComponent = fixture.debugElement.query(By.directive(InputRadioComponent)).componentInstance;
    expect(radioComponent.radioOptions).toEqual(['Option 1', 'Option 2']);
  });

  it('should call setValoresStore on radio change', () => {
    const spy = jest.spyOn(component, 'setValoresStore');
    const radioComponent = fixture.debugElement.query(By.directive(InputRadioComponent)).componentInstance;
    radioComponent.change.emit('Option 1');
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledWith(component.Aduana, 'informacionConfidencial');
  });

  it('should initialize the form and disable it if esFormularioSoloLectura is true', () => {
    component.esFormularioSoloLectura = true;
    jest.spyOn(component, 'obtenerDatosFormulario').mockImplementation();
    jest.spyOn(component.Aduana, 'disable');

    component.inicializarEstadoFormulario();

    expect(component.obtenerDatosFormulario).toHaveBeenCalled();
    expect(component.Aduana.disable).toHaveBeenCalled();
  });

  it('should initialize the form and enable it if esFormularioSoloLectura is false', () => {
    component.esFormularioSoloLectura = false;
    jest.spyOn(component, 'obtenerDatosFormulario').mockImplementation();
    jest.spyOn(component.Aduana, 'enable');
    jest.spyOn(component, 'mercanciasData');

    component.inicializarEstadoFormulario();

    expect(component.obtenerDatosFormulario).toHaveBeenCalledTimes(2);
    expect(component.Aduana.enable).toHaveBeenCalled();
    expect(component.mercanciasData).toHaveBeenCalled();
  });

  it('should call ngOnDestroy and complete destroy$', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should call setValoresStore and update the store', () => {
    component.setValoresStore(component.Aduana, 'aduanas');
    expect(storeMock.establecerDatos).toHaveBeenCalledWith({ aduanas: false });
  });

  it('should call mercanciasData and initialize the form correctly', () => {
    component.mercanciasData();

    expect(component.Aduana.get('aduanas')?.value).toBe('test');
    expect(component.Aduana.get('informacionConfidencial')?.value).toBe('confidential');
  });
});