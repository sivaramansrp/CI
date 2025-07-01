import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedioTransporteComponent } from './medio-transporte.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { SagarpaService } from '../../services/sagarpa/sagarpa.service';
import { Solicitud220501Store } from '../../estados/tramites220501.store';
import { Solicitud220501Query } from '../../estados/tramites220501.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import mercanciaTableMock from '@libs/shared/theme/assets/json/220501/mercancia-table.json';

jest.mock('@libs/shared/theme/assets/json/220501/mercancia-table.json', () => ({
  __esModule: true,
  default: {
    tableHeader: ['Fracción', 'Descripción', 'NICO'],
    tableBody: [{ tbodyData: ['0101', 'Caballos', '00'] }]
  }
}));

describe('MedioTransporteComponent', () => {
  let component: MedioTransporteComponent;
  let fixture: ComponentFixture<MedioTransporteComponent>;

  let mockSagarpaService: any;
  let mockStore: any;
  let mockQuery: any;
  let mockConsultaioQuery: any;

  beforeEach(async () => {
    mockSagarpaService = {
      getMediodetransporte: jest.fn().mockReturnValue(of({ data: [{ id: '1', descripcion: 'Aéreo' }] }))
    };

    mockStore = {
      setMercanciaTablaDatos: jest.fn(),
      setMostrarAgregarMercancia: jest.fn(),
      setMedioDeTransporte: jest.fn(),
      setEsSolicitudFerros: jest.fn(),
      setIdentificacionTransporte: jest.fn(),
      setTotalGuias: jest.fn()
    };

    mockQuery = {
      selectSolicitud$: of({
        medioDeTransporte: '1',
        identificacionTransporte: 'ABC123',
        esSolicitudFerros: '0',
        totalGuias: '3',
        mercanciaTablaDatos: []
      })
    };

    mockConsultaioQuery = {
      selectConsultaioState$: of({
        readonly: false,
        update: false
      })
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MedioTransporteComponent],
      providers: [
        FormBuilder,
        { provide: SagarpaService, useValue: mockSagarpaService },
        { provide: Solicitud220501Store, useValue: mockStore },
        { provide: Solicitud220501Query, useValue: mockQuery },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MedioTransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with expected default values', () => {
    const form = component.medioTransporteForm;
    expect(form).toBeDefined();
    expect(form.value).toEqual({
      medioDeTransporte: '1',
      identificacionTransporte: 'ABC123',
      esSolicitudFerros: '0',
      totalGuias: '3'
    });
  });

  it('should load catalog on init', () => {
    expect(mockSagarpaService.getMediodetransporte).toHaveBeenCalled();
    expect(component.medioDeTransporte.length).toBeGreaterThan(0);
  });

  it('should initialize mercancia table data if empty', () => {
    expect(component.mercanciaBodyData[0].tbodyData).toEqual(mercanciaTableMock.tableBody[0].tbodyData);
    expect(mockStore.setMercanciaTablaDatos).toHaveBeenCalledWith(expect.any(Array));
  });

  it('should emit true when value is 1 in estableceSeleccionSolicitudFerro', () => {
    const spy = jest.spyOn(component.transporteSeleccionado, 'emit');
    component.estableceSeleccionSolicitudFerro('1');
    expect(spy).toHaveBeenCalledWith(true);
    expect(component.mostrarAgregarMercancia).toBe(false);
    expect(mockStore.setMostrarAgregarMercancia).toHaveBeenCalledWith(false);
    expect(mockStore.setEsSolicitudFerros).toHaveBeenCalledWith('1');
  });

  it('should emit false when value is 0 in estableceSeleccionSolicitudFerro', () => {
    const spy = jest.spyOn(component.transporteSeleccionado, 'emit');
    component.estableceSeleccionSolicitudFerro('0');
    expect(spy).toHaveBeenCalledWith(false);
  });

  it('should show AgregarMercancia and update store on modificarSaldosMercancia', () => {
    component.modificarSaldosMercancia();
    expect(component.mostrarAgregarMercancia).toBe(true);
    expect(mockStore.setMostrarAgregarMercancia).toHaveBeenCalledWith(true);
  });

  it('should update mercancia data and hide agregar mercancia on actualizarMercanciaEnTabla', () => {
    const data = {
      fraccionArancelaria: '0101',
      descripcionFraccion: 'Caballos',
      nico: '00',
      descripcion: 'Caballos pura sangre',
      saldoACapturar: '10',
      unidaddeMedidaDeUMT: 'KG',
      cantidadTotalUMT: '500',
      saldoPendiente: '5'
    };
    component.actualizarMercanciaEnTabla(data);
    expect(component.mercanciaBodyData[0].tbodyData).toEqual(Object.values(data));
    expect(component.mostrarAgregarMercancia).toBe(false);
    expect(mockStore.setMercanciaTablaDatos).toHaveBeenCalledWith(Object.values(data));
  });

  it('should update store on medioDeTransporteSeleccion', () => {
    component.medioDeTransporteSeleccion({ id: 99, descripcion: 'Prueba' });
    expect(mockStore.setMedioDeTransporte).toHaveBeenCalledWith(99);
  });

  it('should get identificacionTransporte and update store', () => {
    component.getIdentificacionTransporte();
    expect(mockStore.setIdentificacionTransporte).toHaveBeenCalledWith('ABC123');
  });

  it('should get totalGuias and update store', () => {
    component.getTotalGuiasAmparadas();
    expect(mockStore.setTotalGuias).toHaveBeenCalledWith('3');
  });

  it('should update mostrarAgregarMercancia and notify store on obtenerAgregarMercanciaEvent', () => {
    component.obtenerAgregarMercanciaEvent(true);
    expect(component.mostrarAgregarMercancia).toBe(true);
    expect(mockStore.setMostrarAgregarMercancia).toHaveBeenCalledWith(true);
  });

  it('should complete destroyed$ on destroy', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});