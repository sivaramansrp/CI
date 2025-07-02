import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { SolicitanteComponent } from '../../components/solicitante/solicitante.component';
import { AvisoComponent } from '../../components/aviso/aviso.component';
import { Tramite32503Query } from '../../../../estados/queries/tramite32503.query';
import { Tramite32503Store } from '../../../../estados/tramites/tramite32503.store';
import { of, Subject } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { AvisoTrasladoService } from '../../services/aviso-traslado.service';
import { TIPO_PERSONA } from '@libs/shared/data-access-user/src';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let tramiteQueryMock: any;
  let tramiteStoreMock: any;
  let avisoTrasladoServiceMock: any;

  beforeEach(async () => {
    avisoTrasladoServiceMock = {
      getDatosConsulta: jest.fn().mockReturnValue(
        of({
          success: true,
          datos: {
            avisoFormulario: { tipoAviso: 'Test Tipo Aviso' },
            tablaDeDatos: [{ id: 1, descripcion: 'Test Tabla' }],
          },
        })
      ),
    };
    tramiteQueryMock = {
      selectSolicitud$: of({
        pestanaActiva: 1,
      }),
    };

    tramiteStoreMock = {
      setPestanaActiva: jest.fn(),
      setAvisoFormulario: jest.fn(),
      setTablaDeDatos: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [PasoUnoComponent, SolicitanteComponent, AvisoComponent],
      providers: [
        provideHttpClient(),
        { provide: Tramite32503Query, useValue: tramiteQueryMock },
        { provide: Tramite32503Store, useValue: tramiteStoreMock },
        { provide: AvisoTrasladoService, useValue: avisoTrasladoServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the active tab index on ngOnInit', () => {
    component.ngOnInit();
    expect(component.indice).toBe(1);
  });

  it('should call setPestanaActiva when seleccionaTab is called', () => {
    const tabIndex = 2;
    component.seleccionaTab(tabIndex);
    expect(component.indice).toBe(tabIndex);
    expect(tramiteStoreMock.setPestanaActiva).toHaveBeenCalledWith(tabIndex);
  });

  it('should subscribe to tramiteQuery and update tramiteState', () => {
    component.ngOnInit();
    expect(component.tramiteState).toEqual({ pestanaActiva: 1 });
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should fetch data and update the store when fetchGetDatosConsulta is called', () => {
    component.fetchGetDatosConsulta();
    expect(avisoTrasladoServiceMock.getDatosConsulta).toHaveBeenCalled();
    expect(tramiteStoreMock.setAvisoFormulario).toHaveBeenCalledWith({
      tipoAviso: 'Test Tipo Aviso',
    });
    expect(tramiteStoreMock.setTablaDeDatos).toHaveBeenCalledWith([
      { id: 1, descripcion: 'Test Tabla' },
    ]);
    expect(component.esDatosRespuesta).toBe(true);
  });
});