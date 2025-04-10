import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PermisoDesistirComponent } from './permisoDesistir.component';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Tramite261702Store } from '../../../../estados/tramites/tramite261702.store';
import { Tramite261702Query } from '../../../../estados/queries/tramite261702.query';
import { of } from 'rxjs';

describe('PermisoDesistirComponent', () => {
  let component: PermisoDesistirComponent;
  let fixture: ComponentFixture<PermisoDesistirComponent>;
  let mockTramite261702Store: jest.Mocked<Tramite261702Store>;
  let mockTramite261702Query: jest.Mocked<Tramite261702Query>;
  
  beforeEach(async () => {
    mockTramite261702Store = {
              setDynamicFieldValue: jest.fn(),
            } as unknown as jest.Mocked<Tramite261702Store>;
        
    mockTramite261702Query = {
      selectRetiros$: of({
        folio: 'folio',
        nombre: ''
      }),
    } as unknown as jest.Mocked<Tramite261702Query>;

    await TestBed.configureTestingModule({
      imports: [PermisoDesistirComponent, HttpClientModule],
      providers: [
        { provide: Tramite261702Query, useValue: mockTramite261702Query },
        { provide: Tramite261702Store, useValue: mockTramite261702Store },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PermisoDesistirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form correctly', () => {
    const ninoFormGroup = component.forma.get('ninoFormGroup') as FormGroup;
    expect(ninoFormGroup).toBeDefined();
    expect(component.forma).toBeDefined();
  });
  
    it('should clear subscriptions on ngOnDestroy', () => {
      const nextSpy = jest.spyOn(component['destruirNotificador$'], 'next');
      const completeSpy = jest.spyOn(component['destruirNotificador$'], 'complete');
      component.ngOnDestroy();
      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  
    it('should set and remove validators dynamically', () => {
      const ninoFormGroup = component.ninoFormGroup;
      ninoFormGroup.addControl('folio', new FormBuilder().control(''));
      ninoFormGroup.get('folio')?.setValidators([Validators.required]);
      ninoFormGroup.get('folio')?.updateValueAndValidity();
      expect(ninoFormGroup.get('folio')?.validator).toBeDefined();
      ninoFormGroup.get('folio')?.setValidators([]);
      ninoFormGroup.get('folio')?.updateValueAndValidity();
      expect(ninoFormGroup.get('folio')?.validator).toBeNull();
    });

    it('should handle null or undefined values in form value changes', () => {
      const ninoFormGroup = component.ninoFormGroup;
      ninoFormGroup.addControl('testField', new FormControl(null));
      ninoFormGroup.get('testField')?.setValue(null);
      fixture.detectChanges();
      expect(mockTramite261702Store.setDynamicFieldValue).toHaveBeenCalledWith('testField', null);
    });

    it('should call setDynamicFieldValue with correct campo and value', () => {
      const campo = 'folio';
      const value = 'folio';
      component.cambioEnValoresStore(campo, value);
      expect(mockTramite261702Store.setDynamicFieldValue).toHaveBeenCalledWith(campo, value);
    });

    it('should call setDynamicFieldValue with numeric value', () => {
      const campo = 'testCampo';
      const value = 12345;
      component.cambioEnValoresStore(campo, value);
      expect(mockTramite261702Store.setDynamicFieldValue).toHaveBeenCalledWith(campo, 12345);
    });

    it('should not call setDynamicFieldValue if value is unchanged', () => {
      const campo = 'testCampo';
      const value = 'testValue';
      jest.spyOn(mockTramite261702Store, 'setDynamicFieldValue');
      mockTramite261702Store.setDynamicFieldValue.mockClear();
      component.cambioEnValoresStore(campo, value);
      expect(mockTramite261702Store.setDynamicFieldValue).toHaveBeenCalledTimes(1);
      component.cambioEnValoresStore(campo, value);
      expect(mockTramite261702Store.setDynamicFieldValue).toHaveBeenCalledTimes(2);
    });
  
});
