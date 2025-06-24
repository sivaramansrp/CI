import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosCertificadoComponent } from './datos-certificado.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CertificadoTecnicoJaponService } from '../../service/certificadoTecnicoJapon.service';
import { Tramite110218Store } from '../../estados/tramites/tramite110218.store';
import { Tramite110218Query } from '../../estados/queries/tramite110218.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('DatosCertificadoComponent', () => {
  let component: DatosCertificadoComponent;
  let fixture: ComponentFixture<DatosCertificadoComponent>;
  let mockService: any;
  let mockStore: any;
  let mockQuery: any;
  let mockConsultaioQuery: any;

  beforeEach(async () => {
    mockService = {
      getDatosCertificado: jest.fn().mockReturnValue(of([]))
    };
    mockStore = {
      setTramite110218State: jest.fn()
    };
    mockQuery = {
      selectTramite110218State$: of({
        lugar: 'Tokio',
        observaciones: 'Observación',
      })
    };
    mockConsultaioQuery = {
      selectConsultaioState$: of({ readonly: false })
    };

    await TestBed.configureTestingModule({
      imports: [DatosCertificadoComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: CertificadoTecnicoJaponService, useValue: mockService },
        { provide: Tramite110218Store, useValue: mockStore },
        { provide: Tramite110218Query, useValue: mockQuery },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with values from estadoSeleccionado', () => {
    component.estadoSeleccionado = { lugar: 'Tokio', observaciones: 'Obs' } as any;
    component.inicializarFormulario();
    expect(component.datosDelCertificado.get('lugar')?.value).toBe('Tokio');
    expect(component.datosDelCertificado.get('observaciones')?.value).toBe('Obs');
  });

  it('should enable the form if esSoloLectura is false', () => {
    component.inicializarFormulario();
    component.esSoloLectura = false;
    component.habilitarDeshabilitarFormulario();
    expect(component.datosDelCertificado.enabled).toBe(true);
  });

  it('should disable the form if esSoloLectura is true', () => {
    component.inicializarFormulario();
    component.esSoloLectura = true;
    component.habilitarDeshabilitarFormulario();
    expect(component.datosDelCertificado.disabled).toBe(true);
  });

  it('should call getDatosCertificado and set datos as array', () => {
    mockService.getDatosCertificado.mockReturnValue(of([{ id: 1 }]));
    component.obtenerDatosDeTabla();
    expect(mockService.getDatosCertificado).toHaveBeenCalled();
    expect(Array.isArray(component.datos)).toBe(true);
  });

  it('should update filaSeleccionada on manejarFilaSeleccionada', () => {
    const fila = { id: 1, nombre: 'Fila' } as any;
    component.manejarFilaSeleccionada(fila);
    expect(component.filaSeleccionada).toBe(fila);
  });

  it('should emit modificarEventCertificado on enModificarFormulario if filaSeleccionada exists', () => {
    const spy = jest.spyOn(component.modificarEventCertificado, 'emit');
    component.filaSeleccionada = { id: 1 } as any;
    component.enModificarFormulario();
    expect(spy).toHaveBeenCalledWith(false);
  });

  it('should not emit modificarEventCertificado if filaSeleccionada does not exist', () => {
    const spy = jest.spyOn(component.modificarEventCertificado, 'emit');
    component.filaSeleccionada = undefined as any;
    component.enModificarFormulario();
    expect(spy).not.toHaveBeenCalled();
  });

  it('should update tramite110218Store with setValorStore', () => {
    component.inicializarFormulario();
    component.datosDelCertificado.get('lugar')?.setValue('Osaka');
    component.setValorStore(component.datosDelCertificado, 'lugar');
    expect(mockStore.setTramite110218State).toHaveBeenCalledWith({ lugar: 'Osaka' });
  });

  it('should update estadoSeleccionado on getValorStore', () => {
    component.getValorStore();
    expect(component.estadoSeleccionado).toEqual({ lugar: 'Tokio', observaciones: 'Observación' });
  });

  it('should clean up destroyed$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});