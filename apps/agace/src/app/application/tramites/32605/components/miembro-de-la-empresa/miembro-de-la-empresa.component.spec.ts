import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiembroDeLaEmpresaComponent } from './miembro-de-la-empresa.component';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud32605Store } from '../../estados/solicitud32605.store';
import { Solicitud32605Query } from '../../estados/solicitud32605.query';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import {
  Catalogo,
  CatalogoSelectComponent,
  CatalogosSelect,
  InputRadioComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { InputRadio } from '../../models/solicitud.model';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MiembroDeLaEmpresaComponent', () => {
  let component: MiembroDeLaEmpresaComponent;
  let fixture: ComponentFixture<MiembroDeLaEmpresaComponent>;
  let solicitudService: SolicitudService;
  let solicitud32605Store: Solicitud32605Store;
  let solicitud32605Query: Solicitud32605Query;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        MiembroDeLaEmpresaComponent,
        CommonModule,
        ReactiveFormsModule,
        TituloComponent,
        CatalogoSelectComponent,
        InputRadioComponent,
        HttpClientTestingModule,
      ],
      providers: [
        FormBuilder,
        {
          provide: SolicitudService,
          useValue: {
            conseguirSolicitudCatologoSelectLista: jest.fn(() =>
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
            conseguirOpcionDeRadio: jest.fn(() =>
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
          },
        },
        {
          provide: Solicitud32605Store,
          useValue: {
            actualizarMiembroCaracterDe: jest.fn(() => of('Test')),
            actualizarMiembroTributarMexico: jest.fn(),
            actualizarMiembroNacionalidad: jest.fn(),
            actualizarMiembroRFC: jest.fn(() => of('RFC123')),
            actualizarMiembroTipoPersonaMuestra: jest.fn(() => of('Física')),
            actualizarMiembroNombre: jest.fn(),
            actualizarMiembroApellidoPaterno: jest.fn(),
            actualizarMiembroApellidoMaterno: jest.fn(),
            actualizarMiembroNombreEmpresa: jest.fn(),
            actualizarMiembroRegistroFederal: jest.fn(),
            actualizarMiembroNombreCompleto: jest.fn(() => of('John Doe')),
          },
        },
        {
          provide: Solicitud32605Query,
          useValue: {
            selectSolicitud$: of({}),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MiembroDeLaEmpresaComponent);
    component = fixture.componentInstance;
    solicitudService = TestBed.inject(SolicitudService);
    solicitud32605Store = TestBed.inject(Solicitud32605Store);
    solicitud32605Query = TestBed.inject(Solicitud32605Query);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.miembroEmpresaForm).toBeDefined();
    expect(component.miembroEmpresaForm.get('miembroCaracterDe')).toBeTruthy();
  });

  it('should call conseguirSolicitudCatologoSelectLista on initialization', () => {
    const spy = jest.spyOn(
      solicitudService,
      'conseguirSolicitudCatologoSelectLista'
    );
    component.conseguirSolicitudCatologoSelectLista();
    expect(spy).toHaveBeenCalled();
  });

  it('should call conseguirOpcionDeRadio on initialization', () => {
    const spy = jest.spyOn(solicitudService, 'conseguirOpcionDeRadio');
    component.conseguirOpcionDeRadio();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit eventoCerrarModal when cerrarModal is called', () => {
    const spy = jest.spyOn(component.eventoCerrarModal, 'emit');
    component.cerrarModal();
    expect(spy).toHaveBeenCalled();
  });

  it('should call actualizarMiembroCaracterDe with correct value', () => {
    const spy = jest.spyOn(solicitud32605Store, 'actualizarMiembroCaracterDe');
    component.actualizarMiembroCaracterDe({ id: 1 } as Catalogo);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should call actualizarMiembroTributarMexico with correct value', () => {
    const spy = jest.spyOn(
      solicitud32605Store,
      'actualizarMiembroTributarMexico'
    );
    component.actualizarMiembroTributarMexico(1);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should call actualizarMiembroNacionalidad with correct value', () => {
    const spy = jest.spyOn(
      solicitud32605Store,
      'actualizarMiembroNacionalidad'
    );
    component.actualizarMiembroNacionalidad({ id: 1 } as Catalogo);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should call actualizarMiembroRFC with correct value', () => {
    const spy = jest.spyOn(solicitud32605Store, 'actualizarMiembroRFC');
    const event = { target: { value: 'RFC123' } } as unknown as Event;
    component.actualizarMiembroRFC(event);
    expect(spy).toHaveBeenCalledWith('RFC123');
  });

  it('should call buscarRFCDatos and update store values', () => {
    component.miembroEmpresaForm.get('miembroRfc')?.setValue('RFC123');
    const spyRegistro = jest.spyOn(
      solicitud32605Store,
      'actualizarMiembroRegistroFederal'
    );
    const spyNombre = jest.spyOn(
      solicitud32605Store,
      'actualizarMiembroNombreCompleto'
    );
    component.buscarRFCDatos();
    expect(spyRegistro).toHaveBeenCalledWith('MAVL621207C95');
    expect(spyNombre).toHaveBeenCalledWith(
      'EUROFOODS DE MEXICO GONZALEZ PINAL'
    );
  });

  it('should mark a form field as invalid when noEsValido is called', () => {
    component.miembroEmpresaForm
      .get('miembroCaracterDe')
      ?.setErrors({ required: true });
    component.miembroEmpresaForm.get('miembroCaracterDe')?.markAsTouched();
    expect(component.noEsValido('miembroCaracterDe')).toBe(true);
  });

  it('should complete destroy$ on ngOnDestroy', () => {
    const spy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
