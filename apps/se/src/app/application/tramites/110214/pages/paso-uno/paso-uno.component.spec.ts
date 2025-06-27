import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { CommonModule } from '@angular/common';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { HistoricoProductoresComponent } from '../../components/historico-productores/historico-productores.component';
import { DestinatarioComponent } from '../../components/destinatario/destinatario.component';
import { DatosCertificadoComponent } from '../../components/datos-certificado/datos-certificado.component';
import { provideHttpClient } from '@angular/common/http';
import { ValidarInicialmenteCertificadoService } from '../../services/validar-inicialmente-certificado.service';
import { Tramite110214Store } from '../../../../estados/tramites/tramite110214.store';
import { of } from 'rxjs';
import { Tramite110214Query } from '../../../../estados/queries/tramite110214.query';


describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let validarInicialmenteCertificadoServiceMock: any;
  let tramiteStoreMock: any;
  let tramiteQueryMock: any;


  beforeEach(async () => {
    validarInicialmenteCertificadoServiceMock = {
      getDatosConsulta: jest.fn().mockReturnValue(
        of({
          success: true,
          datos: {
            observaciones: 'Test Observaciones',
            idioma: 'Español',
            entidadFederativa: 'Entidad Test',
            representacionFederal: 'Representación Test',
            grupoReceptor: { nombre: 'Receptor Test' },
            grupoDeDirecciones: { direccion: 'Dirección Test' },
            grupoRepresentativo: { representante: 'Representante Test' },
            tercerOperador: true,
            blnPeriodo: false,
            grupoTratado: { tratado: 'Tratado Test' },
            mercanciaSeleccionadasTablaDatos: [{ id: 1, descripcion: 'Mercancia Seleccionada' }],
            mercanciaDisponsiblesTablaDatos: [{ id: 2, descripcion: 'Mercancia Disponible' }],
            datosConfidencialesProductor: { confidencial: true },
            productorMismoExportador: true,
            productoresExportador: [{ id: 3, nombre: 'Productor Exportador' }],
            historicoMercanciaSeleccionadasTablaDatos: [{ id: 4, descripcion: 'Historico Mercancia' }],
          },
        })
      ),
      obtenerIdioma: jest.fn().mockReturnValue(of({ datos: [{ id: 1, descripcion: 'Español' }] })),
      obtenerEntidadFederativa: jest.fn().mockReturnValue(of({ datos: [{ id: 1, descripcion: 'Entidad 1' }] })),
      obtenerRepresentacionFederal: jest.fn().mockReturnValue(of({ datos: [{ id: 1, descripcion: 'Representación 1' }] }))
    };

    tramiteStoreMock = {
      setObservaciones: jest.fn(),
      setPestanaActiva: jest.fn(),
      setIdioma: jest.fn(),
      setEntidadFederativa: jest.fn(),
      setRepresentacionFederal: jest.fn(),
      setGrupoReceptor: jest.fn(),
      setGrupoDeDirecciones: jest.fn(),
      setGrupoRepresentativo: jest.fn(),
      setTercerOperador: jest.fn(),
      setPeriodo: jest.fn(),
      setGrupoTratado: jest.fn(),
      setMercanciaTablaDatos: jest.fn(),
      setMercanciaDisponsiblesTablaDatos: jest.fn(),
      setDatosConfidencialesProductor: jest.fn(),
      setProductorMismoExportador: jest.fn(),
      setProductoresExportador: jest.fn(),
      setHistoricoMercanciaSeleccionadasTablaDatos: jest.fn(),
    };
    tramiteQueryMock = {
      selectSolicitud$: of({
        observaciones: 'Observaciones de prueba',
        idioma: 1,
        entidadFederativa: 1,
        representacionFederal: 1
      }),
    };
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        SolicitanteComponent,
        HistoricoProductoresComponent,
        DestinatarioComponent,
        DatosCertificadoComponent,
        PasoUnoComponent
      ],
      providers: [provideHttpClient(),
      { provide: ValidarInicialmenteCertificadoService, useValue: validarInicialmenteCertificadoServiceMock },
      { provide: Tramite110214Store, useValue: tramiteStoreMock },
      { provide: Tramite110214Query, useValue: tramiteQueryMock },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set the active tab to 1 when seleccionaTab(1) is called', () => {
    component.seleccionaTab(1);
    expect(component.indice).toBe(1);
  });

  it('should set the active tab to 3 when seleccionaTab(3) is called', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should render the SolicitanteComponent when indice is 1', () => {
    component.indice = 1;
    fixture.detectChanges();
    const solicitanteElement = fixture.debugElement.nativeElement.querySelector('solicitante');
    expect(solicitanteElement).toBeTruthy();
  });

  it('should render the HistoricoProductoresComponent when indice is 3', () => {
    component.indice = 3;
    fixture.detectChanges();
    const historicoProductoresElement = fixture.debugElement.nativeElement.querySelector('app-historico-productores');
    expect(historicoProductoresElement).toBeTruthy();
  });

  it('should render the DestinatarioComponent when indice is 4', () => {
    component.indice = 4;
    fixture.detectChanges();
    const destinatarioElement = fixture.debugElement.nativeElement.querySelector('app-destinatario');
    expect(destinatarioElement).toBeTruthy();
  });

  it('should render the DatosCertificadoComponent when indice is 5', () => {
    component.indice = 5;
    fixture.detectChanges();
    const datosCertificadoElement = fixture.debugElement.nativeElement.querySelector('app-datos-certificado');
    expect(datosCertificadoElement).toBeTruthy();
  });

  it('should fetch data and update the store when fetchGetDatosConsulta is called', () => {
    component.fetchGetDatosConsulta();
    expect(validarInicialmenteCertificadoServiceMock.getDatosConsulta).toHaveBeenCalled();
    expect(tramiteStoreMock.setObservaciones).toHaveBeenCalledWith('Test Observaciones');
    expect(tramiteStoreMock.setIdioma).toHaveBeenCalledWith('Español');
    expect(tramiteStoreMock.setEntidadFederativa).toHaveBeenCalledWith('Entidad Test');
    expect(tramiteStoreMock.setRepresentacionFederal).toHaveBeenCalledWith('Representación Test');
    expect(tramiteStoreMock.setGrupoReceptor).toHaveBeenCalledWith({ nombre: 'Receptor Test' });
    expect(tramiteStoreMock.setGrupoDeDirecciones).toHaveBeenCalledWith({ direccion: 'Dirección Test' });
    expect(tramiteStoreMock.setGrupoRepresentativo).toHaveBeenCalledWith({ representante: 'Representante Test' });
    expect(tramiteStoreMock.setTercerOperador).toHaveBeenCalledWith(true);
    expect(tramiteStoreMock.setPeriodo).toHaveBeenCalledWith(false);
    expect(tramiteStoreMock.setGrupoTratado).toHaveBeenCalledWith({ tratado: 'Tratado Test' });
    expect(tramiteStoreMock.setMercanciaTablaDatos).toHaveBeenCalledWith([{ id: 1, descripcion: 'Mercancia Seleccionada' }]);
    expect(tramiteStoreMock.setMercanciaDisponsiblesTablaDatos).toHaveBeenCalledWith([{ id: 2, descripcion: 'Mercancia Disponible' }]);
    expect(tramiteStoreMock.setDatosConfidencialesProductor).toHaveBeenCalledWith({ confidencial: true });
    expect(tramiteStoreMock.setProductorMismoExportador).toHaveBeenCalledWith(true);
    expect(tramiteStoreMock.setProductoresExportador).toHaveBeenCalledWith([{ id: 3, nombre: 'Productor Exportador' }]);
    expect(tramiteStoreMock.setHistoricoMercanciaSeleccionadasTablaDatos).toHaveBeenCalledWith([{ id: 4, descripcion: 'Historico Mercancia' }]);
    expect(component.esDatosRespuesta).toBe(true);
  });
});