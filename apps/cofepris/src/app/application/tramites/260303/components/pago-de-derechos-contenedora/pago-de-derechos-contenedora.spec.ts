import { TestBed } from '@angular/core/testing';
import { PagoDeDerechosContenedoraComponent } from './pago-de-derechos-contenedora';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { CertificadosLicenciasPermisosService } from '../../services/certificados-licencias-permisos.service';
import { Tramite260303Store } from '../../../../estados/tramites/260303/tramite260303.store';
import { Tramite260303Query } from '../../../../estados/queries/260303/tramite260303.query';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
 
describe('PagoDeDerechosContenedoraComponent', () => {
  let component: PagoDeDerechosContenedoraComponent;
  let fixture: any;
  let certificadosLicenciasSvcMock: any;
  let tramite260303StoreMock: any;
  let tramite260303QueryMock: any;
 
  // Mock completo para ConsultaioState
  const consultaStateMock = {
    readonly: false,
    procedureId: '',
    parameter: '',
    department: '',
    folioTramite: '',
    tipoTramite: '',
    tipoModalidad: '',
    tipoSolicitud: '',
    tipoPersona: '',
    tipoDeTramite: '',
    estadoDeTramite: '',
    create: false,
    update: false,
    action_id: '',
    current_user: '',
    id_solicitud: '',
    nombre_pagina: '',
    consultaioSolicitante: {
      folioDelTramite: '',
      fechaDeInicio: '',
      estadoDelTramite: '',
      tipoDeTramite: ''
    },
  };
 
  beforeEach(async () => {
    certificadosLicenciasSvcMock = {
      getBancoDatos: jest.fn().mockReturnValue(of({ data: [{ id: 1, nombre: 'Banco Test' }] }))
    };
    tramite260303StoreMock = {
      setFechaDePago: jest.fn(),
      setClaveDeReferencia: jest.fn()
    };
    tramite260303QueryMock = {
      selectSolicitud$: of({
        claveDeReferencia: '123',
        cadenaDaLaDependencia: 'cadena',
        banco: 'BANAMEX',
        laveDePago: 'clave',
        fechaDePago: '2024-01-01',
        importeDePago: 100
      })
    };
 
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, PagoDeDerechosContenedoraComponent],
      providers: [
        FormBuilder,
        { provide: CertificadosLicenciasPermisosService, useValue: certificadosLicenciasSvcMock },
        { provide: Tramite260303Store, useValue: tramite260303StoreMock },
        { provide: Tramite260303Query, useValue: tramite260303QueryMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
 
    fixture = TestBed.createComponent(PagoDeDerechosContenedoraComponent);
    component = fixture.componentInstance;
    component.consultaState = { ...consultaStateMock };
    fixture.detectChanges();
  });
 
  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe tener consultaState correctamente seteado', () => {
    expect(component.consultaState).toEqual(consultaStateMock);
  });

  it('debe tener esFormularioSoloLectura en false por defecto', () => {
    expect(component.esFormularioSoloLectura).toBe(false);
  });

  it('debe limpiar destroyNotifier$ en ngOnDestroy', () => {
    (component as any).destroyNotifier$ = { next: jest.fn(), complete: jest.fn() };
    component.ngOnDestroy();
    expect((component as any).destroyNotifier$.next).toHaveBeenCalled();
    expect((component as any).destroyNotifier$.complete).toHaveBeenCalled();
  });
});
 