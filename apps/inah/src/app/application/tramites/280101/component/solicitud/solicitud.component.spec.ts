import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudComponent } from './solicitud.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CatalogoSelectComponent, InputRadioComponent, TituloComponent } from '@libs/shared/data-access-user/src';
import { PermisoDeExportacionService } from '../../services/permiso-de-exportacion.service';
import { Tramite280101Store } from '../../../../estados/tramite/tramite280101.store';
import { Tramite280101Query } from '../../../../estados/queries/tramite280101.query';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;
  let serviceMock: any;
  let storeMock: any;
  let queryMock: any;

  beforeEach(async () => {
    serviceMock = {
      getAduana: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Aduana 1' }])),
    };
    storeMock = {
      setModalidad: jest.fn(),
      setExposicionOpcion: jest.fn(),
      setNombre: jest.fn(),
      setAduana: jest.fn(),
      setAduanaEntrada: jest.fn(),
      setDescripcionClobGenerica: jest.fn(),
      setCantMonumentos: jest.fn(),
    };
    queryMock = {
      selectSolicitud$: of({
        modalidadOpcion: 'mod1',
        exposicionOpcion: 'expo1',
        nombre: 'Juan',
        aduana: 'aduana1',
        aduanaEntrada: 'entrada1',
        descripcionClobGenerica: 'desc',
        cantMonumentos: 2
      })
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        CatalogoSelectComponent,
        InputRadioComponent,
        TituloComponent,
        SolicitudComponent,
        HttpClientTestingModule
      ],
      providers: [
        FormBuilder,
        { provide: PermisoDeExportacionService, useValue: serviceMock },
        { provide: Tramite280101Store, useValue: storeMock },
        { provide: Tramite280101Query, useValue: queryMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize solicitudForm with correct values in establecerValoresFormulario', () => {
    component['solicitudState'] = {
      modalidadOpcion: 'mod1',
      exposicionOpcion: 'expo1',
      nombre: 'Juan',
      aduana: 'aduana1',
      aduanaEntrada: 'entrada1',
      descripcionClobGenerica: 'desc',
      cantMonumentos: 2
    } as any;
    component.establecerValoresFormulario();
    expect(component.solicitudForm.get('modalidadOpcion')?.value).toBe('mod1');
    expect(component.solicitudForm.get('exposicionOpcion')?.value).toBe('expo1');
    expect(component.solicitudForm.get('nombre')?.value).toBe('Juan');
    expect(component.solicitudForm.get('aduana')?.value).toBe('aduana1');
    expect(component.solicitudForm.get('aduanaEntrada')?.value).toBe('entrada1');
    expect(component.solicitudForm.get('descripcionClobGenerica')?.value).toBe('desc');
    expect(component.solicitudForm.get('cantMonumentos')?.value).toBe(2);
  });

  it('should disable nombre if exposicionOpcion is "false"', () => {
    component['solicitudState'] = {
      modalidadOpcion: 'mod1',
      exposicionOpcion: 'false',
      nombre: 'Juan',
      aduana: 'aduana1',
      aduanaEntrada: 'entrada1',
      descripcionClobGenerica: 'desc',
      cantMonumentos: 2
    } as any;
    component.establecerValoresFormulario();
    expect(component.solicitudForm.get('nombre')?.disabled).toBe(true);
  });

  it('should disable the form if soloLectura is true', () => {
    component.soloLectura = true;
    component['solicitudState'] = {
      modalidadOpcion: 'mod1',
      exposicionOpcion: 'expo1',
      nombre: 'Juan',
      aduana: 'aduana1',
      aduanaEntrada: 'entrada1',
      descripcionClobGenerica: 'desc',
      cantMonumentos: 2
    } as any;
    component.establecerValoresFormulario();
    expect(component.solicitudForm.disabled).toBe(true);
  });

  it('should call the correct store method in setValoresStore', () => {
    const form = component.solicitudForm;
    form.patchValue({ modalidadOpcion: 'mod1' });
    storeMock.setModalidad = jest.fn();
    component.setValoresStore(form, 'modalidadOpcion', 'setModalidad');
    expect(storeMock.setModalidad).toHaveBeenCalledWith('mod1');
  });

  it('should enable nombre if exposicionOpcion is set to "true" in setValoresStore', () => {
    component.solicitudForm.get('nombre')?.disable();
    component.solicitudForm.patchValue({ exposicionOpcion: 'true' });
    component.setValoresStore(component.solicitudForm, 'exposicionOpcion', 'setExposicionOpcion');
    expect(component.solicitudForm.get('nombre')?.enabled).toBe(true);
  });

  it('should set aduana as array if getAduana returns a single object', () => {
    serviceMock.getAduana.mockReturnValueOnce(of({ id: 2, descripcion: 'Aduana 2' }));
    component.getAduana();
    expect(Array.isArray(component.aduana)).toBe(true);
    expect(component.aduana[0]).toEqual({ id: 2, descripcion: 'Aduana 2' });
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should call getAduana, subscribe to selectSolicitud$, and call establecerValoresFormulario on ngOnInit', () => {
    const getAduanaSpy = jest.spyOn(component, 'getAduana');
    const establecerValoresFormularioSpy = jest.spyOn(component, 'establecerValoresFormulario');
    component.ngOnInit();
    expect(getAduanaSpy).toHaveBeenCalled();
    expect(component['solicitudState']).toBeDefined();
    expect(establecerValoresFormularioSpy).toHaveBeenCalled();
  });
});
