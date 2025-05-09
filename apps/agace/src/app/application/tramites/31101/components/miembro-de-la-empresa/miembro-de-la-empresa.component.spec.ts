import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiembroDeLaEmpresaComponent } from './miembro-de-la-empresa.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud31101Store } from '../../estados/solicitud31101.store';
import { Solicitud31101Query } from '../../estados/solicitud31101.query';
import { of, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  CatalogoSelectComponent,
  InputRadioComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MiembroDeLaEmpresaComponent', () => {
  let component: MiembroDeLaEmpresaComponent;
  let fixture: ComponentFixture<MiembroDeLaEmpresaComponent>;
  let solicitudServiceMock: any;
  let solicitud31101StoreMock: any;
  let solicitud31101QueryMock: any;

  beforeEach(async () => {
    solicitudServiceMock = {
      conseguirDatosGeneralesCatologo: jest.fn().mockReturnValue(
        of({
          enSuCaracterDe: {
            labelNombre: 'En su caracter de',
            required: true,
            primerOpcion: 'Selecciona un tipo',
            catalogos: [
              {
                id: 1,
                descripcion: 'Accionista',
              },
              {
                id: 2,
                descripcion: 'Accionista - 1',
              },
            ],
          },
          nacionalidad: {
            labelNombre: 'Nacionalidad',
            required: true,
            primerOpcion: 'Selecciona un tipo',
            catalogos: [
              {
                id: 1,
                descripcion: 'AZERBAIJAN (REPUBLICA AZERBAIJANI)',
              },
              {
                id: 2,
                descripcion: 'AZERBAIJAN (REPUBLICA AZERBAIJANI) - 1',
              },
            ],
          },
          tipoDePersona: {
            labelNombre: 'Tipo de Persona',
            required: true,
            primerOpcion: 'Selecciona un tipo',
            catalogos: [
              {
                id: 1,
                descripcion: 'Física',
              },
              {
                id: 2,
                descripcion: 'Moral',
              },
            ],
          },
        })
      ),
      conseguirDatosGeneralesOpcionDeRadio: jest.fn().mockReturnValue(
        of({
          requisitos: {
            radioOptions: [
              {
                label: 'Sí',
                value: 1,
              },
              {
                label: 'No',
                value: 2,
              },
            ],
            isRequired: true,
          },
        })
      ),
    };

    solicitud31101StoreMock = {
      actualizarMiembroCaracterDe: jest.fn(),
      actualizarMiembroTributarMexico: jest.fn(),
      actualizarMiembroNacionalidad: jest.fn(),
      actualizarMiembroRFC: jest.fn(),
      actualizarMiembroTipoPersonaMuestra: jest.fn(),
      actualizarMiembroNombre: jest.fn(),
      actualizarMiembroApellidoPaterno: jest.fn(),
      actualizarMiembroApellidoMaterno: jest.fn(),
      actualizarMiembroNombreEmpresa: jest.fn(),
      actualizarMiembroRegistroFederal: jest.fn(),
      actualizarMiembroNombreCompleto: jest.fn(),
    };

    solicitud31101QueryMock = {
      selectSolicitud$: of({
        miembroCaracterDe: '',
        miembroTributarMexico: '',
        miembroNacionalidad: '',
        miembroRfc: '',
        miembroRegistroFederal: '',
        miembroNombreCompleto: '',
        miembroTipoPersonaMuestra: '',
        miembroNombre: '',
        miembroApellidoPaterno: '',
        miembroApellidoMaterno: '',
        miembroNombreEmpresa: '',
      }),
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        MiembroDeLaEmpresaComponent,
        CommonModule,
        TituloComponent,
        CatalogoSelectComponent,
        InputRadioComponent,
        HttpClientTestingModule,
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: SolicitudService, useValue: solicitudServiceMock },
        { provide: Solicitud31101Store, useValue: solicitud31101StoreMock },
        { provide: Solicitud31101Query, useValue: solicitud31101QueryMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiembroDeLaEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    expect(component.miembroEmpresaForm).toBeDefined();
    expect(
      component.miembroEmpresaForm.controls['miembroCaracterDe']
    ).toBeDefined();
  });

  it('should call conseguirDatosGeneralesCatologo on initialization', () => {
    expect(
      solicitudServiceMock.conseguirDatosGeneralesCatologo
    ).toHaveBeenCalled();
  });

  it('should call conseguirDatosGeneralesOpcionDeRadio on initialization', () => {
    expect(
      solicitudServiceMock.conseguirDatosGeneralesOpcionDeRadio
    ).toHaveBeenCalled();
  });

  it('should emit eventoCerrarModal when cerrarModal is called', () => {
    jest.spyOn(component.eventoCerrarModal, 'emit');
    component.cerrarModal();
    expect(component.eventoCerrarModal.emit).toHaveBeenCalled();
  });

  it('should update miembroCaracterDe when actualizarMiembroCaracterDe is called', () => {
    const mockCatalogo = { id: 1 };
    component.actualizarMiembroCaracterDe(mockCatalogo as any);
    expect(
      solicitud31101StoreMock.actualizarMiembroCaracterDe
    ).toHaveBeenCalledWith(1);
  });

  it('should update miembroTributarMexico when actualizarMiembroTributarMexico is called', () => {
    component.actualizarMiembroTributarMexico(1);
    expect(
      solicitud31101StoreMock.actualizarMiembroTributarMexico
    ).toHaveBeenCalledWith(1);
  });

  it('should update miembroNacionalidad when actualizarMiembroNacionalidad is called', () => {
    const mockCatalogo = { id: 2 };
    component.actualizarMiembroNacionalidad(mockCatalogo as any);
    expect(
      solicitud31101StoreMock.actualizarMiembroNacionalidad
    ).toHaveBeenCalledWith(2);
  });

  it('should update miembroRFC when actualizarMiembroRFC is called', () => {
    const mockEvent = { target: { value: 'RFC123' } } as any;
    component.actualizarMiembroRFC(mockEvent);
    expect(solicitud31101StoreMock.actualizarMiembroRFC).toHaveBeenCalledWith(
      'RFC123'
    );
  });

  it('should update miembroNombre when actualizarMiembroNombre is called', () => {
    const mockEvent = { target: { value: 'John' } } as any;
    component.actualizarMiembroNombre(mockEvent);
    expect(
      solicitud31101StoreMock.actualizarMiembroNombre
    ).toHaveBeenCalledWith('John');
  });

  it('should emit eventoActualizarMiembro when aceptarModal is called', () => {
    jest.spyOn(component.eventoActualizarMiembro, 'emit');
    component.aceptarModal();
    expect(component.eventoActualizarMiembro.emit).toHaveBeenCalled();
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
