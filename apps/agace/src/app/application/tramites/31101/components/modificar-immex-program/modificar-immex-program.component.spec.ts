import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarImmexProgramComponent } from './modificar-immex-program.component';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud31101Store } from '../../estados/solicitud31101.store';
import { Solicitud31101Query } from '../../estados/solicitud31101.query';
import { of } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  Catalogo,
  CatalogoSelectComponent,
  InputRadioComponent,
} from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ModificarImmexProgramComponent', () => {
  let component: ModificarImmexProgramComponent;
  let fixture: ComponentFixture<ModificarImmexProgramComponent>;
  let solicitudService: SolicitudService;
  let solicitud31101Store: Solicitud31101Store;
  let solicitud31101Query: Solicitud31101Query;

  beforeEach(async () => {
    const solicitudServiceMock = {
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
      conseguirDatosGeneralesCatologo: jest.fn().mockReturnValue(
        of({
          tipoDeInstalacion: {
            labelNombre: 'Tipo de instalación',
            required: true,
            primerOpcion: 'Selecciona un tipo de instalación',
            catalogos: [
              {
                id: 1,
                descripcion: 'Planta Productiva',
              },
              {
                id: 2,
                descripcion: 'Planta Productiva -1',
              },
            ],
          },
        })
      ),
    };

    const solicitud31101StoreMock = {
      actualizarInstalacionesPrincipales: jest.fn(),
      actualizarMunicipio: jest.fn(),
      actualizarTipoDeInstalacion: jest.fn(),
      actualizarFederativa: jest.fn(),
      actualizarRegistroSE: jest.fn(),
      actualizarDesceripe: jest.fn(),
      actualizarCodigoPostal: jest.fn(),
      actualizarProcesoProductivo: jest.fn(),
    };

    const solicitud31101QueryMock = {
      selectSolicitud$: of({
        instalacionesPrincipales: '',
        municipio: '',
        tipoDeInstalacion: '',
        federativa: '',
        registroSE: '',
        desceripe: '',
        codigoPostal: '',
        procesoProductivo: '',
      }),
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        CatalogoSelectComponent,
        InputRadioComponent,
        ModificarImmexProgramComponent,
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

    fixture = TestBed.createComponent(ModificarImmexProgramComponent);
    component = fixture.componentInstance;
    solicitudService = TestBed.inject(SolicitudService);
    solicitud31101Store = TestBed.inject(Solicitud31101Store);
    solicitud31101Query = TestBed.inject(Solicitud31101Query);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.modificarImmexProgramForm).toBeDefined();
    expect(
      component.modificarImmexProgramForm.controls['instalacionesPrincipales']
    ).toBeDefined();
  });

  it('should call conseguirDatosGeneralesCatologo on initialization', () => {
    const spy = jest.spyOn(solicitudService, 'conseguirDatosGeneralesCatologo');
    solicitudService.conseguirDatosGeneralesCatologo();
    expect(spy).toHaveBeenCalled();
  });

  it('should emit modificarImmexValor when aceptarImmexProgram is called', () => {
    const spy = jest.spyOn(component.modificarImmexValor, 'emit');
    component.aceptarImmexProgram();
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('should return true if a form control is invalid and touched', () => {
    component.modificarImmexProgramForm.controls[
      'instalacionesPrincipales'
    ].setErrors({ required: true });
    component.modificarImmexProgramForm.controls[
      'instalacionesPrincipales'
    ].markAsTouched();
    expect(component.noEsValido('instalacionesPrincipales')).toBe(false);
  });

  it('should call actualizarInstalacionesPrincipales in the store', () => {
    const spy = jest.spyOn(
      solicitud31101Store,
      'actualizarInstalacionesPrincipales'
    );
    component.actualizarInstalacionesPrincipales('value');
    expect(spy).toHaveBeenCalledWith('value');
  });

  it('should call actualizarMunicipio in the store', () => {
    const spy = jest.spyOn(solicitud31101Store, 'actualizarMunicipio');
    const event = { target: { value: 'municipio' } } as unknown as Event;
    component.actualizarMunicipio(event);
    expect(spy).toHaveBeenCalledWith('municipio');
  });

  it('should call actualizarTipoDeInstalacion in the store', () => {
    const spy = jest.spyOn(solicitud31101Store, 'actualizarTipoDeInstalacion');
    component.actualizarTipoDeInstalacion({
      id: 1,
      descripcion: 'Test',
    } as Catalogo);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should call actualizarFederativa in the store', () => {
    const spy = jest.spyOn(solicitud31101Store, 'actualizarFederativa');
    const event = { target: { value: 'federativa' } } as unknown as Event;
    component.actualizarFederativa(event);
    expect(spy).toHaveBeenCalledWith('federativa');
  });

  it('should call actualizarRegistroSE in the store', () => {
    const spy = jest.spyOn(solicitud31101Store, 'actualizarRegistroSE');
    const event = { target: { value: 'registroSE' } } as unknown as Event;
    component.actualizarRegistroSE(event);
    expect(spy).toHaveBeenCalledWith('registroSE');
  });

  it('should call actualizarDesceripe in the store', () => {
    const spy = jest.spyOn(solicitud31101Store, 'actualizarDesceripe');
    const event = { target: { value: 'desceripe' } } as unknown as Event;
    component.actualizarDesceripe(event);
    expect(spy).toHaveBeenCalledWith('desceripe');
  });

  it('should call actualizarCodigoPostal in the store', () => {
    const spy = jest.spyOn(solicitud31101Store, 'actualizarCodigoPostal');
    const event = { target: { value: '12345' } } as unknown as Event;
    component.actualizarCodigoPostal(event);
    expect(spy).toHaveBeenCalledWith('12345');
  });

  it('should call actualizarProcesoProductivo in the store', () => {
    const spy = jest.spyOn(solicitud31101Store, 'actualizarProcesoProductivo');
    component.actualizarProcesoProductivo('value');
    expect(spy).toHaveBeenCalledWith('value');
  });

  it('should complete destroy$ on ngOnDestroy', () => {
    const spy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
