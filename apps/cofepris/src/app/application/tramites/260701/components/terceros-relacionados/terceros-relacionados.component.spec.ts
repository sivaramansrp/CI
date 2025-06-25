import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosRelacionadosComponent } from './terceros-relacionados.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { CertificadosLicenciasService } from '../../services/certificados-licencias.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';

describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let fixture: ComponentFixture<TercerosRelacionadosComponent>;
  let certificadosLicenciasSvcMock: any;
  let consultaioQueryMock: any;
  let modalServiceMock: any;

  beforeEach(async () => {
    certificadosLicenciasSvcMock = {
      getDestinatarioDatos: jest.fn().mockReturnValue(of([])),
      getFabricanteDatos: jest.fn().mockReturnValue(of([])),
    };
    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false }),
    };
    modalServiceMock = {
      show: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [TercerosRelacionadosComponent],
      providers: [
        { provide: CertificadosLicenciasService, useValue: certificadosLicenciasSvcMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
        { provide: BsModalService, useValue: modalServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set destinatarioDatos and fabricanteTablaDatos on init', () => {
    expect(component.destinatarioDatos).toEqual([]);
    expect(component.fabricanteTablaDatos).toEqual([]);
  });

  it('should set esFormularioSoloLectura from consultaioQuery', () => {
    expect(component.esFormularioSoloLectura).toBe(false);
  });

  it('should set tieneFilaSeleccionada when setTablaSeleccionDestinatario is called', () => {
    component.setTablaSeleccionDestinatario([{ nombre: 'test' } as any]);
    expect(component.tieneFilaSeleccionada).toBe(true);
    component.setTablaSeleccionDestinatario([]);
    expect(component.tieneFilaSeleccionada).toBe(false);
  });

  it('should set tieneFilaSeleccionadaFabricante when setTablaSeleccionFabricante is called', () => {
    component.setTablaSeleccionFabricante([{ nombre: 'fab' } as any]);
    expect(component.tieneFilaSeleccionadaFabricante).toBe(true);
    component.setTablaSeleccionFabricante([]);
    expect(component.tieneFilaSeleccionadaFabricante).toBe(false);
  });

  it('should open fabricante modal with correct title', () => {
    component.abrirFabricanteModal('Test Title');
    expect(modalServiceMock.show).toHaveBeenCalled();
    expect(modalServiceMock.show.mock.calls[0][1].initialState.titulo).toBe('Test Title');
  });

  it('should set nuevaNotificacion and elementoParaEliminar when abrirModal is called', () => {
    component.abrirModal(2);
    expect(component.nuevaNotificacion).toBeDefined();
    expect(component.elementoParaEliminar).toBe(2);
  });

  it('should remove pedimento and update tables on eliminarPedimento', () => {
    component.pedimentos = [
      { id: 1 } as any,
      { id: 2 } as any,
      { id: 3 } as any
    ];
    component.elementoParaEliminar = 1;
    component.tieneFilaSeleccionada = true;
    component.tieneFilaSeleccionadaFabricante = true;
    component.destinatarioDatos = [{}, {}] as any;
    component.fabricanteTablaDatos = [{}, {}] as any;
    component.eliminarPedimento(true);
    expect(component.pedimentos.length).toBe(2);
    expect(component.destinatarioDatos.length).toBe(1);
    expect(component.fabricanteTablaDatos.length).toBe(1);
  });

  it('should not remove pedimento if borrar is false', () => {
    component.pedimentos = [
      { id: 1 } as any,
      { id: 2 } as any,
      { id: 3 } as any
    ];
    component.elementoParaEliminar = 1;
    component.eliminarPedimento(false);
    expect(component.pedimentos.length).toBe(3);
  });

  it('should clean up destroyNotifier$ on ngOnDestroy', () => {
    const spy = jest.spyOn((component as any).destroyNotifier$, 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  it('should only remove destinatarioDatos if tieneFilaSeleccionada is true', () => {
    component.pedimentos = [{}, {}] as any;
    component.elementoParaEliminar = 0;
    component.tieneFilaSeleccionada = true;
    component.tieneFilaSeleccionadaFabricante = false;
    component.destinatarioDatos = [{}, {}] as any;
    component.fabricanteTablaDatos = [{}, {}] as any;
    component.eliminarPedimento(true);
    expect(component.destinatarioDatos.length).toBe(1);
    expect(component.fabricanteTablaDatos.length).toBe(2);
  });

  it('should only remove fabricanteTablaDatos if tieneFilaSeleccionadaFabricante is true', () => {
    component.pedimentos = [{}, {}] as any;
    component.elementoParaEliminar = 0;
    component.tieneFilaSeleccionada = false;
    component.tieneFilaSeleccionadaFabricante = true;
    component.destinatarioDatos = [{}, {}] as any;
    component.fabricanteTablaDatos = [{}, {}] as any;
    component.eliminarPedimento(true);
    expect(component.destinatarioDatos.length).toBe(2);
    expect(component.fabricanteTablaDatos.length).toBe(1);
  });

  it('should not remove destinatarioDatos or fabricanteTablaDatos if neither is selected', () => {
    component.pedimentos = [{}, {}] as any;
    component.elementoParaEliminar = 0;
    component.tieneFilaSeleccionada = false;
    component.tieneFilaSeleccionadaFabricante = false;
    component.destinatarioDatos = [{}, {}] as any;
    component.fabricanteTablaDatos = [{}, {}] as any;
    component.eliminarPedimento(true);
    expect(component.destinatarioDatos.length).toBe(2);
    expect(component.fabricanteTablaDatos.length).toBe(2);
  });

  it('should set modalRef when abrirFabricanteModal is called', () => {
    modalServiceMock.show.mockReturnValue('mockRef');
    component.abrirFabricanteModal('Test Title');
    expect(component.modalRef).toBe('mockRef');
  });

  it('should set destinatarioDatos and fabricanteTablaDatos from service on ngOnInit', () => {
    certificadosLicenciasSvcMock.getDestinatarioDatos.mockReturnValue(of([{ nombre: 'dest' }]));
    certificadosLicenciasSvcMock.getFabricanteDatos.mockReturnValue(of([{ nombre: 'fab' }]));
    component.ngOnInit();
    expect(component.destinatarioDatos).toEqual([{ nombre: 'dest' }]);
    expect(component.fabricanteTablaDatos).toEqual([{ nombre: 'fab' }]);
  });

  it('should set esFormularioSoloLectura to true if consultaioQuery emits readonly true', async () => {
    consultaioQueryMock.selectConsultaioState$ = of({ readonly: true });
    // The override must happen before createComponent is called
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [TercerosRelacionadosComponent],
      providers: [
        { provide: CertificadosLicenciasService, useValue: certificadosLicenciasSvcMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
        { provide: BsModalService, useValue: modalServiceMock },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // If the subscription is in ngOnInit, call it:
    if (component.ngOnInit) component.ngOnInit();
    expect(component.esFormularioSoloLectura).toBe(true);
  });

  it('should not fail eliminarPedimento if arrays are empty', () => {
    component.pedimentos = [];
    component.destinatarioDatos = [];
    component.fabricanteTablaDatos = [];
    component.elementoParaEliminar = 0;
    component.tieneFilaSeleccionada = true;
    component.tieneFilaSeleccionadaFabricante = true;
    expect(() => component.eliminarPedimento(true)).not.toThrow();
    expect(component.pedimentos.length).toBe(0);
    expect(component.destinatarioDatos.length).toBe(0);
    expect(component.fabricanteTablaDatos.length).toBe(0);
  });

  it('should not remove anything if eliminarPedimento called with false and arrays are empty', () => {
    component.pedimentos = [];
    component.destinatarioDatos = [];
    component.fabricanteTablaDatos = [];
    component.elementoParaEliminar = 0;
    expect(() => component.eliminarPedimento(false)).not.toThrow();
    expect(component.pedimentos.length).toBe(0);
    expect(component.destinatarioDatos.length).toBe(0);
    expect(component.fabricanteTablaDatos.length).toBe(0);
  });

  it('should call ngOnDestroy and complete destroyNotifier$', () => {
    const completeSpy = jest.spyOn((component as any).destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
});