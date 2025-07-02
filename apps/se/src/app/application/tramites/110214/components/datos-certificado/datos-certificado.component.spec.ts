import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { DatosCertificadoComponent } from './datos-certificado.component';
import { Tramite110214Store } from '../../../../estados/tramites/tramite110214.store';
import { Tramite110214Query } from '../../../../estados/queries/tramite110214.query';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { ValidarInicialmenteCertificadoService } from '../../services/validar-inicialmente-certificado.service';

describe('DatosCertificadoComponent', () => {
  let component: DatosCertificadoComponent;
  let fixture: ComponentFixture<DatosCertificadoComponent>;
  let validarInicialmenteCertificadoServiceMock: any;
  let tramite110214StoreMock: any;
  let tramite110214QueryMock: any;

  beforeEach(async () => {
    validarInicialmenteCertificadoServiceMock = {
      obtenerIdioma: jest.fn().mockReturnValue(of({ datos: [{ id: 1, descripcion: 'Español' }] })),
      obtenerEntidadFederativa: jest.fn().mockReturnValue(of({ datos: [{ id: 1, descripcion: 'Entidad 1' }] })),
      obtenerRepresentacionFederal: jest.fn().mockReturnValue(of({ datos: [{ id: 1, descripcion: 'Representación 1' }] }))
    };

    tramite110214StoreMock = {
      setIdioma: jest.fn(),
      setEntidadFederativa: jest.fn(),
      setRepresentacionFederal: jest.fn()
    };

    tramite110214QueryMock = {
      selectSolicitud$: of({
        observaciones: 'Observaciones de prueba',
        idioma: 1,
        entidadFederativa: 1,
        representacionFederal: 1
      })
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        TituloComponent,
        CatalogoSelectComponent,
        DatosCertificadoComponent
      ],
      providers: [
        ToastrService,
        provideToastr({
          positionClass: 'toast-top-right',
        }),
        FormBuilder,
        { provide: ValidarInicialmenteCertificadoService, useValue: validarInicialmenteCertificadoServiceMock },
        { provide: Tramite110214Store, useValue: tramite110214StoreMock },
        { provide: Tramite110214Query, useValue: tramite110214QueryMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.formDatosCertificado).toBeDefined();
    expect(component.formDatosCertificado.get('observaciones')?.value).toBe('Observaciones de prueba');
    expect(component.formDatosCertificado.get('idioma')?.value).toBe(1);
    expect(component.formDatosCertificado.get('entidadFederativa')?.value).toBe(1);
    expect(component.formDatosCertificado.get('representacionFederal')?.value).toBe(1);
  });

  it('should call setValoresStore when idiomaSeleccion is called', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    component.idiomaSeleccion();
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.formDatosCertificado, 'idioma', 'setIdioma');
  });

  it('should call setValoresStore when entidadFederativaSeleccion is called', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    component.entidadFederativaSeleccion();
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.formDatosCertificado, 'entidadFederativa', 'setEntidadFederativa');
  });

  it('should call setValoresStore when representacionFederalSeleccion is called', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    component.representacionFederalSeleccion();
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.formDatosCertificado, 'representacionFederal', 'setRepresentacionFederal');
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should load idiomas on cargarIdioma', () => {
    component.cargarIdioma();
    expect(validarInicialmenteCertificadoServiceMock.obtenerIdioma).toHaveBeenCalled();
    expect(component.idiomas).toEqual([{ id: 1, descripcion: 'Español' }]);
  });

  it('should load entidadFederativas on cargarEntidadFederativa', () => {
    component.cargarEntidadFederativa();
    expect(validarInicialmenteCertificadoServiceMock.obtenerEntidadFederativa).toHaveBeenCalled();
    expect(component.entidadFederativas).toEqual([{ id: 1, descripcion: 'Entidad 1' }]);
  });

  it('should load representacionFederal on cargarRepresentacionFederal', () => {
    component.cargarRepresentacionFederal();
    expect(validarInicialmenteCertificadoServiceMock.obtenerRepresentacionFederal).toHaveBeenCalled();
    expect(component.representacionFederal).toEqual([{ id: 1, descripcion: 'Representación 1' }]);
  });
  it('should call setValoresStore for representacionFederalSeleccion', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    component.representacionFederalSeleccion();
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.formDatosCertificado, 'representacionFederal', 'setRepresentacionFederal');
  });

  it('should call setValoresStore for entidadFederativaSeleccion', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    component.entidadFederativaSeleccion();
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.formDatosCertificado, 'entidadFederativa', 'setEntidadFederativa');
  });

  it('should call setValoresStore for idiomaSeleccion', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    component.idiomaSeleccion();
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.formDatosCertificado, 'idioma', 'setIdioma');
  });

  it('should load idiomas on cargarIdioma', () => {
    component.cargarIdioma();
    expect(validarInicialmenteCertificadoServiceMock.obtenerIdioma).toHaveBeenCalled();
    expect(component.idiomas).toEqual([{ id: 1, descripcion: 'Español' }]);
  });

  it('should load entidadFederativas on cargarEntidadFederativa', () => {
    component.cargarEntidadFederativa();
    expect(validarInicialmenteCertificadoServiceMock.obtenerEntidadFederativa).toHaveBeenCalled();
    expect(component.entidadFederativas).toEqual([{ id: 1, descripcion: 'Entidad 1' }]);
  });

  it('should disable the form when soloLectura is true', () => {
    component.soloLectura = true;
    component.inicializarEstadoFormulario();
    expect(component.formDatosCertificado.disabled).toBe(true);
  });

  it('should enable the form when soloLectura is false', () => {
    component.soloLectura = false;
    component.inicializarEstadoFormulario();
    expect(component.formDatosCertificado.enabled).toBe(true);
  });
});