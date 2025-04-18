import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepresentanteLegalComponent } from './representanteLegal.component';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModeloDeFormaDinamica } from '@libs/shared/data-access-user/src';
import { of } from 'rxjs';
import { Tramite261702Store } from 'apps/cofepris/src/app/application/estados/tramites/tramite261702.store';
import { Tramite261702Query } from 'apps/cofepris/src/app/application/estados/queries/tramite261702.query';

describe('RepresentanteLegalComponent', () => {
  let component: RepresentanteLegalComponent;
  let fixture: ComponentFixture<RepresentanteLegalComponent>;
  let mockTramite261702Store: jest.Mocked<Tramite261702Store>;
  let mockTramite261702Query: jest.Mocked<Tramite261702Query>;

  beforeEach(async () => {
    mockTramite261702Store = {
          setDynamicFieldValue: jest.fn(),
        } as unknown as jest.Mocked<Tramite261702Store>;
    
    mockTramite261702Query = {
      selectRetiros$: of({
        rfc: 'rfc',
      }),
    } as unknown as jest.Mocked<Tramite261702Query>;

    await TestBed.configureTestingModule({
      imports: [RepresentanteLegalComponent, HttpClientModule],
      providers: [
        { provide: Tramite261702Query, useValue: mockTramite261702Query },
        { provide: Tramite261702Store, useValue: mockTramite261702Store },
      ],
  
    }).compileComponents();

    fixture = TestBed.createComponent(RepresentanteLegalComponent);
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

  it('should update form controls and call store on button click', () => {
    const event: ModeloDeFormaDinamica = {
      id: 'consultarIDC',
      labelNombre: 'Buscar',
      campo: 'buscar',
      clase: 'col-md-8',
      tipoInput: 'button',
      desactivado: false,
      marginTop: 5,
    };
  
    component.alHacerClicEnElBoton(event);
    const ninoFormGroup = component.forma.get('ninoFormGroup') as FormGroup;
    ninoFormGroup.addControl('nombre', new FormGroup({}));
    ninoFormGroup.addControl('apellidoPaterno', new FormGroup({}));
    ninoFormGroup.addControl('apellidoMaterno', new FormGroup({}));

    expect(ninoFormGroup.get('nombre')?.value).toEqual(47875);
    expect(ninoFormGroup.get('apellidoPaterno')?.value).toEqual('Paterno');
    expect(ninoFormGroup.get('apellidoMaterno')?.value).toEqual('Materno');
  });

  it('should subscribe to selectRetiros$ on ngOnInit', () => {
    const spy = jest.spyOn(mockTramite261702Query.selectRetiros$, 'subscribe');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
    expect(component.retirosState).toEqual({ rfc: 'rfc' });
  });

  it('should trigger valueChanges and update store', () => {
    const ninoFormGroup = component.ninoFormGroup;
    ninoFormGroup.addControl('testField', new FormBuilder().control('initialValue'));
    ninoFormGroup.get('testField')?.setValue('newValue');
    expect(mockTramite261702Store.setDynamicFieldValue).toHaveBeenCalledWith('testField', 'newValue');
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
    ninoFormGroup.addControl('rfc', new FormBuilder().control(''));
    ninoFormGroup.get('rfc')?.setValidators([Validators.required]);
    ninoFormGroup.get('rfc')?.updateValueAndValidity();
    expect(ninoFormGroup.get('rfc')?.validator).toBeDefined();
    ninoFormGroup.get('rfc')?.setValidators([]);
    ninoFormGroup.get('rfc')?.updateValueAndValidity();
    expect(ninoFormGroup.get('rfc')?.validator).toBeNull();
  });
  
});
