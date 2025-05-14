import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosSolitudeComponent } from './datos-solicitude.component';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Tramite260703Store } from '../../estados/store/tramite260703.store';
import { Tramite260703Query } from '../../estados/query/tramite260703.query';

describe('DatosSolitudeComponent', () => {
  let component: DatosSolitudeComponent;
  let fixture: ComponentFixture<DatosSolitudeComponent>;
  let tramite260703StoreMock: any;
  let tramite260703QueryMock: any;

  beforeEach(async () => {
    tramite260703StoreMock = {
      updatePreOperativeFormState: jest.fn(),
    };

    tramite260703QueryMock = {
      selectSolicitudPermiso$: of({
        preOperativFormState: {
          ideGenerica1: '12345',
          observaciones: 'Initial observation',
        },
      }),
    };

    await TestBed.configureTestingModule({
      declarations: [DatosSolitudeComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Tramite260703Store, useValue: tramite260703StoreMock },
        { provide: Tramite260703Query, useValue: tramite260703QueryMock },
      ],
      schemas: [NO_ERRORS_SCHEMA], 
    }).compileComponents();

    fixture = TestBed.createComponent(DatosSolitudeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize solicitudPermisoState on ngOnInit', () => {
    component.ngOnInit();
    expect(component.solicitudPermisoState.preOperativFormState).toEqual({
      preOperativFormState: {
        ideGenerica1: '12345',
        observaciones: 'Initial observation',
      },
    });
  });

  it('should create the preOperativeForm on ngOnInit', () => {
    component.ngOnInit();
    expect(component.preOperativeForm).toBeDefined();
    expect(component.preOperativeForm.get('ideGenerica1')?.value).toBe('12345');
    expect(component.preOperativeForm.get('observaciones')?.value).toBe('Initial observation');
  });

  it('should call updatePreOperativeFormState when setValoresStore is called', () => {
    component.ngOnInit();
    component.setValoresStore('observaciones');
    expect(tramite260703StoreMock.updatePreOperativeFormState).toHaveBeenCalledWith({
      observaciones: 'Initial observation',
    });
  });

  it('should update the form value and call setValoresStore', () => {
    component.ngOnInit();
    const spy = jest.spyOn(component, 'setValoresStore');
    component.preOperativeForm.get('observaciones')?.setValue('Updated observation');
    component.setValoresStore('observaciones');
    expect(spy).toHaveBeenCalledWith('observaciones');
    expect(tramite260703StoreMock.updatePreOperativeFormState).toHaveBeenCalledWith({
      observaciones: 'Updated observation',
    });
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destruirNotificacion$'], 'next');
    const completeSpy = jest.spyOn(component['destruirNotificacion$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});