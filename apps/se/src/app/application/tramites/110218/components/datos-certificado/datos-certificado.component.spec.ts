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
      getDatosCertificado: jest.fn().mockReturnValue(of([])),
      getUnidadMedida: jest.fn().mockReturnValue(of([])),
      getTipodeFctura: jest.fn().mockReturnValue(of([]))
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

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería inicializar el formulario con valores de estadoSeleccionado', () => {
    component.estadoSeleccionado = { lugar: 'Tokio', observaciones: 'Obs' } as any;
    component.inicializarFormulario();
    expect(component.datosDelCertificado.get('lugar')?.value).toBe('Tokio');
    expect(component.datosDelCertificado.get('observaciones')?.value).toBe('Obs');
  });

  it('debería habilitar el formulario si esSoloLectura es falso', () => {
    component.inicializarFormulario();
    component.esSoloLectura = false;
    component.habilitarDeshabilitarFormulario();
    expect(component.datosDelCertificado.enabled).toBe(true);
  });

  it('debería deshabilitar el formulario si esSoloLectura es verdadero', () => {
    component.inicializarFormulario();
    component.esSoloLectura = true;
    component.habilitarDeshabilitarFormulario();
    expect(component.datosDelCertificado.disabled).toBe(true);
  });

  it('debería llamar a getDatosCertificado y establecer datos como array', () => {
    mockService.getDatosCertificado.mockReturnValue(of([{ id: 1 }]));
    component.obtenerDatosDeTabla();
    expect(mockService.getDatosCertificado).toHaveBeenCalled();
    expect(Array.isArray(component.datos)).toBe(true);
  });

  it('debería actualizar filaSeleccionada al manejarFilaSeleccionada', () => {
    const fila = { id: 1, nombre: 'Fila' } as any;
    component.manejarFilaSeleccionada(fila);
    expect(component.filaSeleccionada).toBe(fila);
  });

   it('debería actualizar filaSeleccionada al manejarFilaSeleccionada', () => {
    const fila = { id: 1, nombre: 'Fila' } as any;
    component.manejarFilaSeleccionada(fila);
    expect(component.filaSeleccionada).toBe(fila);
  });


  it('debería actualizar tramite110218Store con setValorStore', () => {
    component.inicializarFormulario();
    component.datosDelCertificado.get('lugar')?.setValue('Osaka');
    component.setValorStore(component.datosDelCertificado, 'lugar');
    expect(mockStore.setTramite110218State).toHaveBeenCalledWith({ lugar: 'Osaka' });
  });

  it('debería actualizar tramite110218Store con setValorStore', () => {
    component.inicializarFormulario();
    component.datosDelCertificado.get('lugar')?.setValue('Osaka');
    component.setValorStore(component.datosDelCertificado, 'lugar');
    expect(mockStore.setTramite110218State).toHaveBeenCalledWith({ lugar: 'Osaka' });
  });

  it('debería actualizar estadoSeleccionado en getValorStore', () => {
    component.getValorStore();
    expect(component.estadoSeleccionado).toEqual({ lugar: 'Tokio', observaciones: 'Observación' });
  });

  it('debería limpiar destroyed$ en ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});