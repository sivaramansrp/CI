import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { DatosCertificadoComponent } from './datos-certificado.component';
import { Tramite110216Store } from '../../../../estados/tramites/tramite110216.store';
import { Tramite110216Query } from '../../../../estados/queries/tramite110216.query';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { CertificadosOrigenService } from '../../services/certificado-origen.service';

describe('DatosCertificadoComponent', () => {
  let component: DatosCertificadoComponent;
  let fixture: ComponentFixture<DatosCertificadoComponent>;
  let certificadosOrigenServiceMock: any;
  let tramite110216StoreMock: any;
  let tramite110216QueryMock: any;

  beforeEach(async () => {
    certificadosOrigenServiceMock = {
      obtenerIdioma: jest.fn().mockReturnValue(of({ datos: [{ id: 1, descripcion: 'Español' }] })),
      obtenerEntidadFederativa: jest.fn().mockReturnValue(of({ datos: [{ id: 1, descripcion: 'Entidad 1' }] })),
      obtenerRepresentacionFederal: jest.fn().mockReturnValue(of({ datos: [{ id: 1, descripcion: 'Representación 1' }] }))
    };

    tramite110216StoreMock = {
      setIdioma: jest.fn(),
      setEntidadFederativa: jest.fn(),
      setRepresentacionFederal: jest.fn()
    };

    tramite110216QueryMock = {
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
        { provide: CertificadosOrigenService, useValue: certificadosOrigenServiceMock },
        { provide: Tramite110216Store, useValue: tramite110216StoreMock },
        { provide: Tramite110216Query, useValue: tramite110216QueryMock }
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
    expect(certificadosOrigenServiceMock.obtenerIdioma).toHaveBeenCalled();
    expect(component.idiomas).toEqual([{ id: 1, descripcion: 'Español' }]);
  });

  it('should load entidadFederativas on cargarEntidadFederativa', () => {
    component.cargarEntidadFederativa();
    expect(certificadosOrigenServiceMock.obtenerEntidadFederativa).toHaveBeenCalled();
    expect(component.entidadFederativas).toEqual([{ id: 1, descripcion: 'Entidad 1' }]);
  });

  it('should load representacionFederal on cargarRepresentacionFederal', () => {
    component.cargarRepresentacionFederal();
    expect(certificadosOrigenServiceMock.obtenerRepresentacionFederal).toHaveBeenCalled();
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
    expect(certificadosOrigenServiceMock.obtenerIdioma).toHaveBeenCalled();
    expect(component.idiomas).toEqual([{ id: 1, descripcion: 'Español' }]);
  });

  it('should load entidadFederativas on cargarEntidadFederativa', () => {
    component.cargarEntidadFederativa();
    expect(certificadosOrigenServiceMock.obtenerEntidadFederativa).toHaveBeenCalled();
    expect(component.entidadFederativas).toEqual([{ id: 1, descripcion: 'Entidad 1' }]);
  });
});