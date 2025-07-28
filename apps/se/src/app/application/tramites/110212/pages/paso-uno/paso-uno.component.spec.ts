import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { CommonModule } from '@angular/common';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { DestinatarioComponent } from '../../components/destinatario/destinatario.component';
import { DatosCertificadoComponent } from '../../components/datos-certificado/datos-certificado.component';
import { provideHttpClient } from '@angular/common/http';
import { ValidacionPosterioriService } from '../../service/validacion-posteriori.service';
import { Tramite110212Store } from '../../../../estados/tramites/tramite110212.store';
import { of } from 'rxjs';
import { Tramite110212Query } from '../../../../estados/queries/tramite110212.query';


describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let validacionPosterioriServiceMock: any;
  let tramiteStoreMock: any;
  let tramiteQueryMock: any;

  beforeEach(async () => {
    validacionPosterioriServiceMock = {
      getDatosConsulta: jest.fn().mockReturnValue(
        of({
          success: true,
          datos: {
            tercerOperador: true,
            grupoOperador: { nombre: 'Operador Test' },
            grupoTratado: { tratado: 'Tratado Test' },
            mercanciaSeleccionadasTablaDatos: [{ id: 1, descripcion: 'Mercancia Seleccionada' }],
            mercanciaDisponsiblesTablaDatos: [{ id: 2, descripcion: 'Mercancia Disponible' }],
            observaciones: 'Test Observaciones',
            idioma: 'Español',
            entidadFederativa: 'Entidad Test',
            representacionFederal: 'Representación Test',
            grupoReceptor: { nombre: 'Receptor Test' },
            grupoDeDirecciones: { direccion: 'Dirección Test' },
            grupoRepresentativo: { representante: 'Representante Test' },
          },
        })
      ),
      obtenerIdioma: jest.fn().mockReturnValue(of({ datos: [{ id: 1, descripcion: 'Español' }] })),
      obtenerEntidadFederativa: jest.fn().mockReturnValue(of({ datos: [{ id: 1, descripcion: 'Entidad 1' }] })),
      obtenerRepresentacionFederal: jest.fn().mockReturnValue(of({ datos: [{ id: 1, descripcion: 'Representación 1' }] }))
    };

    tramiteStoreMock = {
      setTercerOperador: jest.fn(),
      setPestanaActiva: jest.fn(),
      setGrupoOperador: jest.fn(),
      setGrupoTratado: jest.fn(),
      setMercanciaTablaDatos: jest.fn(),
      setMercanciaDisponsiblesTablaDatos: jest.fn(),
      setObservaciones: jest.fn(),
      setIdioma: jest.fn(),
      setEntidadFederativa: jest.fn(),
      setRepresentacionFederal: jest.fn(),
      setGrupoReceptor: jest.fn(),
      setGrupoDeDirecciones: jest.fn(),
      setGrupoRepresentativo: jest.fn(),
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
        DestinatarioComponent,
        DatosCertificadoComponent,
        PasoUnoComponent
      ],
      providers: [provideHttpClient(),
      { provide: ValidacionPosterioriService, useValue: validacionPosterioriServiceMock },
      { provide: Tramite110212Store, useValue: tramiteStoreMock },
      { provide: Tramite110212Query, useValue: tramiteQueryMock },
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



  it('should render the DestinatarioComponent when indice is 3', () => {
    component.indice = 3;
    component.esDatosRespuesta = true;
    fixture.detectChanges();
    const destinatarioElement = fixture.debugElement.nativeElement.querySelector('app-destinatario');
    expect(destinatarioElement).toBeTruthy();
  });

  it('should render the DatosCertificadoComponent when indice is 4', () => {
    component.indice = 4;
    component.esDatosRespuesta = true;
    fixture.detectChanges();
    const datosCertificadoElement = fixture.debugElement.nativeElement.querySelector('app-datos-certificado');
    expect(datosCertificadoElement).toBeTruthy();
  });
  it('should fetch data and update the store when fetchGetDatosConsulta is called', () => {
    component.fetchGetDatosConsulta();
    expect(validacionPosterioriServiceMock.getDatosConsulta).toHaveBeenCalled();
    expect(tramiteStoreMock.setTercerOperador).toHaveBeenCalledWith(true);
    expect(tramiteStoreMock.setGrupoOperador).toHaveBeenCalledWith({ nombre: 'Operador Test' });
    expect(tramiteStoreMock.setGrupoTratado).toHaveBeenCalledWith({ tratado: 'Tratado Test' });
    expect(tramiteStoreMock.setMercanciaTablaDatos).toHaveBeenCalledWith([{ id: 1, descripcion: 'Mercancia Seleccionada' }]);
    expect(tramiteStoreMock.setMercanciaDisponsiblesTablaDatos).toHaveBeenCalledWith([{ id: 2, descripcion: 'Mercancia Disponible' }]);
    expect(tramiteStoreMock.setObservaciones).toHaveBeenCalledWith('Test Observaciones');
    expect(tramiteStoreMock.setIdioma).toHaveBeenCalledWith('Español');
    expect(tramiteStoreMock.setEntidadFederativa).toHaveBeenCalledWith('Entidad Test');
    expect(tramiteStoreMock.setRepresentacionFederal).toHaveBeenCalledWith('Representación Test');
    expect(tramiteStoreMock.setGrupoReceptor).toHaveBeenCalledWith({ nombre: 'Receptor Test' });
    expect(tramiteStoreMock.setGrupoDeDirecciones).toHaveBeenCalledWith({ direccion: 'Dirección Test' });
    expect(tramiteStoreMock.setGrupoRepresentativo).toHaveBeenCalledWith({ representante: 'Representante Test' });
    expect(component.esDatosRespuesta).toBe(true);
  });
});