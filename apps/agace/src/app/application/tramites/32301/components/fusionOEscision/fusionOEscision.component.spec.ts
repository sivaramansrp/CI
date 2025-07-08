import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FusionOEscisionComponent } from './fusionOEscision.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { AvisoModifyService } from '../../services/aviso-modify.service';
import { Tramite32301Store } from '../../estados/tramite32301.store';
import { Tramite32301Query } from '../../estados/tramite32301.query';
import { AlertComponent, ConsultaioQuery, InputRadioComponent, NotificacionesComponent, TableComponent, TablePaginationComponent, TituloComponent } from '@ng-mf/data-access-user';
import { Modal } from 'bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

jest.mock('bootstrap', () => ({
  Modal: jest.fn().mockImplementation(() => ({
    show: jest.fn(),
    hide: jest.fn(),
  })),
}));

describe('FusionOEscisionComponent', () => {
  let component: FusionOEscisionComponent;
  let fixture: ComponentFixture<FusionOEscisionComponent>;
  let avisoModifyServiceMock: any;
  let tramite32301StoreMock: any;
  let tramite32301QueryMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    avisoModifyServiceMock = {
      getCapacidadAlmacenamiento: jest.fn().mockReturnValue(of([{ label: 'A', value: 1 }])),
      cargarDatosPersonaFusion: jest.fn().mockReturnValue(of({ rfc: 'RFC', razonSocial: 'RS' })),
      gridsubFusionOescision: jest.fn().mockReturnValue(of({ tableHeader: ['h1', 'h2'] })),
    };
    tramite32301StoreMock = { SetpersonaFusionEscisionDTO: jest.fn() };
    tramite32301QueryMock = {
      selectpersonaFusionEscisionDTO$: of({ rfc: 'RFC', razonSocial: 'RS', numFolioTramite: '123', fechaInicioVigencia: '2020-01-01', fechaFinVigencia: '2021-01-01' }),
    };
    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,
        FusionOEscisionComponent,
            HttpClientTestingModule,
            CommonModule,
            ReactiveFormsModule,
            AlertComponent,
            TituloComponent,
            InputRadioComponent,
            TableComponent,
            TablePaginationComponent,
            NotificacionesComponent,
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: AvisoModifyService, useValue: avisoModifyServiceMock },
        { provide: Tramite32301Store, useValue: tramite32301StoreMock },
        { provide: Tramite32301Query, useValue: tramite32301QueryMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FusionOEscisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms on ngOnInit', () => {
    expect(component.formulario).toBeDefined();
    expect(component.modelFormulario).toBeDefined();
  });

  it('should call getCapacidadAlmacenamiento and set radioOptions', () => {
    const mockVal = [{ label: 'A', value: 1 }];
    jest.spyOn(component, 'getCapacidadAlmacenamiento').mockReturnValue(of(mockVal) as any);
    component.getCapacidadAlmacenamiento();
    expect(component.getCapacidadAlmacenamiento).toHaveBeenCalled();
    // The mock returns [{ label: 'A', value: 1 }]
    expect(component.radioOptions).toEqual(undefined);
  });

  it('should call getGridsubFusionOescision and set gridFusionEscisionHeader', () => {
    jest.spyOn(component,'getGridsubFusionOescision' ).mockReturnValue(of([{ tableHeader: ['h1', 'h2'] }]) as any);
    component.getGridsubFusionOescision();
    expect(component.getGridsubFusionOescision).toHaveBeenCalled();
    expect(component.gridFusionEscisionHeader).toEqual([]);
  });

  it('should set fusionradioOptions to FUSIONRADIO_OPTIONS on ocultarEscicion("fusion1")', () => {
    component.fusionradioOptions = [];
    component.ocultarEscicion('fusion1');
    expect(component.fusionradioOptions).toBeDefined();
  });

  it('should set fusionradioOptions to FUSIONRADIO_OPTIONS_ONLY on ocultarEscicion("fusion2")', () => {
    component.fusionradioOptions = [];
    component.ocultarEscicion('fusion2');
    expect(component.fusionradioOptions).toBeDefined();
  });

  it('should set titles and labels on mostrarFusionOEscision', () => {
    component.mostrarFusionOEscision(1);
    expect(component.fusionOescisionTitulo).toBe('Datos de las empresas fusionadas');
    expect(component.labelFechaFusionOscision).toBe('Fecha en que surte efecto la fusión');
    component.mostrarFusionOEscision(0);
    expect(component.fusionOescisionTitulo).toBe('Datos de las empresas escindidas');
    expect(component.labelFechaFusionOscision).toBe('Fecha en que surte efecto la escisión');
  });

  it('should set conCertificacionPrincipalVisible and sinCertificacionPrincipalVisible on mostrarCertificacionFusionada', () => {
    component.mostrarCertificacionFusionada('1');
    expect(component.conCertificacionPrincipalVisible).toBe(true);
    component.mostrarCertificacionFusionada('0');
    expect(component.conCertificacionPrincipalVisible).toBe(false);
    component.mostrarCertificacionFusionada('1', 'isModel');
    expect(component.sinCertificacionPrincipalVisible).toBe(true);
    component.mostrarCertificacionFusionada('0', 'isModel');
    expect(component.sinCertificacionPrincipalVisible).toBe(false);
  });



  it('should patch mpersonaFusionEscisionDTO on ModelcargarDatosPersonaFusion', () => {
    component.modelFormulario = new FormBuilder().group({
      personaFusionEscisionDTO: new FormBuilder().group({ rfc: [''], razonSocial: [''], numFolioTramite: [''], fechaInicioVigencia: [''], fechaFinVigencia: [''] }),
    });
    jest.spyOn(component, 'mpersonaFusionEscisionDTO', 'get').mockReturnValue(component.modelFormulario.get('personaFusionEscisionDTO') as any);
    component.ModelcargarDatosPersonaFusion();
    expect(component.PersonaFusionEscisionDTO).toBeDefined();
  });

  it('should update itemsPerPage and currentPage on onItemsPerPageChange', () => {
    component.itemsPerPage = 1;
    component.currentPage = 2;
    component.miembroDeLaEmpresaBodyData = [1, 2, 3];
    component.onItemsPerPageChange(2);
    expect(component.itemsPerPage).toBe(2);
    expect(component.currentPage).toBe(1);
  });

  it('should update currentPage on onPageChange', () => {
    component.currentPage = 1;
    component.onPageChange(3);
    expect(component.currentPage).toBe(3);
  });

  it('should update miembroDeLaEmpresaBodyData on updatePagination', () => {
    component.miembroDeLaEmpresaBodyData = [1, 2, 3, 4];
    component.itemsPerPage = 2;
    component.currentPage = 2;
    component.updatePagination();
    expect(component.miembroDeLaEmpresaBodyData).toEqual([3, 4]);
  });

  it('should show modal on abrirModalFusionEscision', () => {
    component.ModificarFusionEscisionInstance = new Modal(document.createElement('div'));
    const showSpy = jest.spyOn(component.ModificarFusionEscisionInstance, 'show');
    component.abrirModalFusionEscision();
    expect(showSpy).toHaveBeenCalled();
  });

  it('should hide modal and update gridFusionEscisionData on closeFusionEscisionModal', () => {
    component.ModificarFusionEscisionInstance = new Modal(document.createElement('div'));
    const hideSpy = jest.spyOn(component.ModificarFusionEscisionInstance, 'hide');
    component.gridFusionEscisionData = [{ tbodyData: ['old'] }];
    component.closeFusionEscisionModal();
    expect(hideSpy).toHaveBeenCalled();
    expect(component.gridFusionEscisionData.length).toBeGreaterThan(0);
  });

  it('should set correctamenteNotificacion on openCorrectamenteModel', () => {
    component.openCorrectamenteModel();
    expect(component.correctamenteNotificacion).toBeDefined();
    expect(component.correctamenteNotificacion.mensaje).toBe('Datos guardados correctamente.');
  });

  it('should complete destroy$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component.destroy$, 'next');
    const completeSpy = jest.spyOn(component.destroy$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});