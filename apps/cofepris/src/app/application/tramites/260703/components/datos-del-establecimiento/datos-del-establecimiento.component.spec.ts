import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelEstablecimientoComponent } from './datos-del-establecimiento.component';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Tramite260703Store } from '../../estados/store/tramite260703.store';
import { Tramite260703Query } from '../../estados/query/tramite260703.query';

describe('DatosDelEstablecimientoComponent', () => {
  let component: DatosDelEstablecimientoComponent;
  let fixture: ComponentFixture<DatosDelEstablecimientoComponent>;
  let tramite260703StoreMock: any;
  let tramite260703QueryMock: any;

  beforeEach(async () => {
  
    tramite260703StoreMock = {
      actualizarDatosDelFormularioDelEstablecimiento: jest.fn(),
    };

    tramite260703QueryMock = {
      selectSolicitudPermiso$: of({
        datosDelEstablecimientoFormState: {
          razonSocial: 'Empresa XYZ',
          correoElectronico: 'empresa@xyz.com',
        },
      }),
    };

    await TestBed.configureTestingModule({
      declarations: [DatosDelEstablecimientoComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Tramite260703Store, useValue: tramite260703StoreMock },
        { provide: Tramite260703Query, useValue: tramite260703QueryMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelEstablecimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar solicitudPermisoState en ngOnInit', () => {
    component.ngOnInit();
    expect(component.solicitudPermisoState).toEqual({
      datosDelEstablecimientoFormState: {
        razonSocial: 'Empresa XYZ',
        correoElectronico: 'empresa@xyz.com',
      },
    });
  });

  it('debería crear el datosDelEstablecimientoForm en ngOnInit', () => {
    component.ngOnInit();
    expect(component.datosDelEstablecimientoForm).toBeDefined();
    expect(component.datosDelEstablecimientoForm.get('razonSocial')?.value).toBe('Empresa XYZ');
    expect(component.datosDelEstablecimientoForm.get('correoElectronico')?.value).toBe('empresa@xyz.com');
  });

  it('debería llamar a actualizarDatosDelFormularioDelEstablecimiento cuando se llama setValoresStore', () => {
    component.ngOnInit();
    component.setValoresStore('razonSocial');
    expect(tramite260703StoreMock.actualizarDatosDelFormularioDelEstablecimiento).toHaveBeenCalledWith({
      razonSocial: 'Empresa XYZ',
    });
  });

  it('debería actualizar el valor del formulario y llamar setValoresStore', () => {
    component.ngOnInit();
    const spy = jest.spyOn(component, 'setValoresStore');
    component.datosDelEstablecimientoForm.get('razonSocial')?.setValue('Nueva Empresa');
    component.setValoresStore('razonSocial');
    expect(spy).toHaveBeenCalledWith('razonSocial');
    expect(tramite260703StoreMock.actualizarDatosDelFormularioDelEstablecimiento).toHaveBeenCalledWith({
      razonSocial: 'Nueva Empresa',
    });
  });

  it('debería limpiar las suscripciones en ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destruirNotificacion$'], 'next');
    const completeSpy = jest.spyOn(component['destruirNotificacion$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});