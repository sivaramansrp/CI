import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManifiestosYDeclaracionesComponent } from './manifiestos-y-declaraciones.component';
import { ReactiveFormsModule, FormBuilder, FormArray } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Tramite260703Store } from '../../estados/store/tramite260703.store';
import { Tramite260703Query } from '../../estados/query/tramite260703.query';
import { SolicitudPermisoService } from '../../services/solicitud-permiso.service';
import { of, Subject } from 'rxjs';

describe('ManifiestosYDeclaracionesComponent', () => {
  let component: ManifiestosYDeclaracionesComponent;
  let fixture: ComponentFixture<ManifiestosYDeclaracionesComponent>;
  let tramite260703StoreMock: any;
  let tramite260703QueryMock: any;
  let solicitudPermisoServiceMock: any;

  beforeEach(async () => {

    tramite260703StoreMock = {
      actualizarEstadoFormularioManifiestos: jest.fn(),
    };

  
    tramite260703QueryMock = {
      selectSolicitudPermiso$: of({
        manifiestosFormState: {
          seleccionadaManifiesto: [true, false],
          informacionConfidencial: 'No',
        },
      }),
    };


    solicitudPermisoServiceMock = {
      getManifiestos: jest.fn().mockReturnValue(
        of({
          data: [
            { id: 1, descripcion: 'Manifiesto 1' },
            { id: 2, descripcion: 'Manifiesto 2' },
          ],
        })
      ),
    };

    await TestBed.configureTestingModule({
      declarations: [ManifiestosYDeclaracionesComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Tramite260703Store, useValue: tramite260703StoreMock },
        { provide: Tramite260703Query, useValue: tramite260703QueryMock },
        { provide: SolicitudPermisoService, useValue: solicitudPermisoServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ManifiestosYDeclaracionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize solicitudPermisoState on ngOnInit', () => {
    component.ngOnInit();
    expect(component.solicitudPermisioState).toEqual({
      manifiestosFormState: {
        seleccionadaManifiesto: [true, false],
        informacionConfidencial: 'No',
      },
    });
  });

  it('should create the manifiestosForm on ngOnInit', () => {
    component.ngOnInit();
    expect(component.manifiestosForm).toBeDefined();
    expect(component.manifiestosForm.get('seleccionadaManifiesto')?.value).toEqual([true, false]);
    expect(component.manifiestosForm.get('informacionConfidencial')?.value).toBe('No');
  });

  it('should call obtenerManifiestos and populate manifiestos', () => {
    component.obtenerManifiestos();
    expect(solicitudPermisoServiceMock.getManifiestos).toHaveBeenCalled();
    expect(component.manifiestos).toEqual([
      { id: 1, descripcion: 'Manifiesto 1' },
      { id: 2, descripcion: 'Manifiesto 2' },
    ]);
  });

  it('should update the checkbox value and call setValoresStore', () => {
    component.ngOnInit();
    const spy = jest.spyOn(component, 'setValoresStore');
    const mockEvent = { target: { checked: true } } as unknown as Event;
    component.onManifiestoCheckboxCambiar(mockEvent, 1);
    expect(component.seleccionadaManifiesto.controls[1].value).toBe(true);
    expect(spy).toHaveBeenCalledWith('seleccionadaManifiesto');
  });

  it('should call actualizarEstadoFormularioManifiestos when setValoresStore is called', () => {
    component.ngOnInit();
    component.setValoresStore('informacionConfidencial');
    expect(tramite260703StoreMock.actualizarEstadoFormularioManifiestos).toHaveBeenCalledWith({
      informacionConfidencial: 'No',
    });
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destruirNotificador$'], 'next');
    const completeSpy = jest.spyOn(component['destruirNotificador$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});