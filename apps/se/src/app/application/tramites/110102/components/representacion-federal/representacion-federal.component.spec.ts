import { TestBed } from '@angular/core/testing';
import { RepresentacionFederalComponent } from './representacion-federal.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RepresentacionfederalService } from '@ng-mf/data-access-user';
import { Tramite110102Store } from '../../estados/store/tramite110102.store';
import { Tramite110102Query } from '../../estados/queries/tramite110102.query';
import { of } from 'rxjs';

describe('RepresentacionFederalComponent', () => {
  let component: RepresentacionFederalComponent;
  let mockService: any;
  let mockStore: any;
  let mockQuery: any;

  beforeEach(async () => {
    mockService = {
      getEntidadFederativa: jest.fn().mockReturnValue(of([{ id: '01', nombre: 'Entidad 1' }])),
      getRepresentacionfederal: jest.fn().mockReturnValue(of([{ id: 'RF1', nombre: 'Representación 1' }]))
    };
    mockStore = { establecerDatos: jest.fn() };
    mockQuery = { selectTramite110102$: of({
      solicitudEntidadFederativaEntidadClave: '01',
      unidadAdministrativaClave: 'RF1',
      protestoDecirVerdad: true
    }) };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,RepresentacionFederalComponent],
      providers: [
        FormBuilder,
        { provide: RepresentacionfederalService, useValue: mockService },
        { provide: Tramite110102Store, useValue: mockStore },
        { provide: Tramite110102Query, useValue: mockQuery }
      ]
    }).compileComponents();

    const FIXTURE = TestBed.createComponent(RepresentacionFederalComponent);
    component = FIXTURE.componentInstance;
    FIXTURE.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit debe cargar entidades de frontera y valores del store', () => {
    const SPY_ENTIDADES = jest.spyOn(component, 'cargarEntidadesFrontera');
    const SPY_VALORES = jest.spyOn(component, 'getValorsStore');
    component.ngOnInit();
    expect(SPY_ENTIDADES).toHaveBeenCalled();
    expect(SPY_VALORES).toHaveBeenCalled();
  });

  it('cargarEntidadesFrontera debe llenar entidadesFrontera', () => {
    component.cargarEntidadesFrontera();
    expect(component.entidadesFrontera).toEqual([{ id: '01', nombre: 'Entidad 1' }]);
  });

  it('onEntidadFederativaChange debe llamar a recuperarRepresentacionFederalSE y setValoresStore si valor es distinto de -1', () => {
    const SPY_RECUPERAR = jest.spyOn(component, 'recuperarRepresentacionFederalSE');
    const SPY_SET_VALORES = jest.spyOn(component, 'setValoresStore');
    component.onEntidadFederativaChange({ id: '01' });
    expect(SPY_RECUPERAR).toHaveBeenCalledWith('01');
    expect(SPY_SET_VALORES).toHaveBeenCalledWith(component.formularioRepresentacionFederalForm, 'solicitudEntidadFederativaEntidadClave');
  });

  it('onEntidadFederativaChange debe limpiar representacionFederalOptions si valor es -1', () => {
    component.representacionFederalOptions = [{ id: 1, descripcion: 'Representación 1' }];
    component.onEntidadFederativaChange('-1');
    expect(component.representacionFederalOptions).toEqual([]);
  });

  it('recuperarRepresentacionFederalSE debe llenar representacionFederalOptions', () => {
    component.recuperarRepresentacionFederalSE('01');
    expect(component.representacionFederalOptions).toEqual([{ id: 'RF1', nombre: 'Representación 1' }]);
  });

  it('setValoresStore debe llamar a establecerDatos en el store', () => {
    component.formularioRepresentacionFederalForm.get('solicitudEntidadFederativaEntidadClave')?.setValue('01');
    component.setValoresStore(component.formularioRepresentacionFederalForm, 'solicitudEntidadFederativaEntidadClave');
    expect(mockStore.establecerDatos).toHaveBeenCalledWith({ solicitudEntidadFederativaEntidadClave: '01' });
  });

  it('getValorsStore debe actualizar el formulario con valores del store', () => {
    component.formularioRepresentacionFederalForm.patchValue({
      solicitudEntidadFederativaEntidadClave: '',
      unidadAdministrativaClave: '',
      protestoDecirVerdad: false
    });
    component.getValorsStore();
    expect(component.formularioRepresentacionFederalForm.get('solicitudEntidadFederativaEntidadClave')?.value).toBe('01');
    expect(component.formularioRepresentacionFederalForm.get('unidadAdministrativaClave')?.value).toBe('RF1');
    expect(component.formularioRepresentacionFederalForm.get('protestoDecirVerdad')?.value).toBe(true);
  });

  it('ngOnDestroy debe completar el subject destroyed$', () => {
    const SPY_NEXT = jest.spyOn((component as any).destroyed$, 'next');
    const SPY_COMPLETE = jest.spyOn((component as any).destroyed$, 'complete');
    component.ngOnDestroy();
    expect(SPY_NEXT).toHaveBeenCalled();
    expect(SPY_COMPLETE).toHaveBeenCalled();
  });
});