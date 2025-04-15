import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { DatosDelTramiteComponent } from './datos-del-tramite.component';
import { DatosDelTramiteService } from '../../services/datos-del-tramite.service';
import { of } from 'rxjs';

describe('DatosDelTramiteComponent', () => {
  let component: DatosDelTramiteComponent;
  let fixture: ComponentFixture<DatosDelTramiteComponent>;
  let mockDatosDelTramiteService: any;

  beforeEach(async () => {
    mockDatosDelTramiteService = {
      setInitialValues: jest.fn(),
      getSolicitudState: jest.fn().mockReturnValue(
        of({
          cveFolioCaat: '12345',
          descTipoCaat: 'Naviero',
          descTipoAgente: 'Agente Naviero',
          directorGeneralNombre: 'John',
          primerApellido: 'Doe',
          segundoApellido: 'Smith',
        })
      ),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DatosDelTramiteComponent],
      declarations: [],
      providers: [
        {
          provide: DatosDelTramiteService,
          useValue: mockDatosDelTramiteService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form in establecerSolicitudForm', () => {
    component.establecerSolicitudForm();
    expect(component.solicitudForm).toBeDefined();
    expect(component.solicitudForm.get('cveFolioCaat')?.disabled).toBe(true);
    expect(
      component.solicitudForm.get('directorGeneralNombre')?.validator
    ).toBeTruthy();
  });

  it('should call setInitialValues on ngOnInit', () => {
    const setInitialValuesSpy = jest.spyOn(
      mockDatosDelTramiteService,
      'setInitialValues'
    );
    component.ngOnInit();
    expect(setInitialValuesSpy).toHaveBeenCalled();
  });

  it('should subscribe to state and patch form values in subscribeToState', () => {
    const patchValueSpy = jest.spyOn(component.solicitudForm, 'patchValue');
    component.suscribirseAlEstado();
    expect(patchValueSpy).toHaveBeenCalledWith({
      cveFolioCaat: '12345',
      descTipoCaat: 'Naviero',
      descTipoAgente: 'Agente Naviero',
      directorGeneralNombre: 'John',
      primerApellido: 'Doe',
      segundoApellido: 'Smith',
    });
  });

  it('should call destroy$.next() and destroy$.complete() on ngOnDestroy', () => {
    const destroyNextSpy = jest.spyOn(component['destroy$'], 'next');
    const destroyCompleteSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(destroyNextSpy).toHaveBeenCalled();
    expect(destroyCompleteSpy).toHaveBeenCalled();
  });

  it('should handle partial state in subscribeToState', () => {
    mockDatosDelTramiteService.getSolicitudState = jest
      .fn()
      .mockReturnValue(of({ directorGeneralNombre: 'Partial' }));
    const patchValueSpy = jest.spyOn(component.solicitudForm, 'patchValue');
    component.suscribirseAlEstado();
    expect(patchValueSpy).toHaveBeenCalledWith({
      directorGeneralNombre: 'Partial',
    });
  });

  it('should validate form controls correctly', () => {
    const directorGeneralNombreControl =
      component.solicitudForm.get('directorGeneralNombre');
    directorGeneralNombreControl?.setValue('');
    expect(directorGeneralNombreControl?.valid).toBeFalsy();
  
    directorGeneralNombreControl?.setValue('Valid Name');
    expect(directorGeneralNombreControl?.valid).toBeTruthy();
  });

  it('should handle empty state in subscribeToState', () => {
    mockDatosDelTramiteService.getSolicitudState = jest
      .fn()
      .mockReturnValue(of({}));
    const patchValueSpy = jest.spyOn(component.solicitudForm, 'patchValue');
    component.suscribirseAlEstado();
    expect(patchValueSpy).toHaveBeenCalledWith({});
  });
});
