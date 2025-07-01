import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedioTransporteComponent } from './medio-transporte.component';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { SagarpaService } from '../../services/sagarpa/sagarpa.service';
import { Solicitud220501Store } from '../../estados/tramites220501.store';
import { Solicitud220501Query } from '../../estados/tramites220501.query';

describe('MedioTransporteComponent', () => {
  let component: MedioTransporteComponent;
  let fixture: ComponentFixture<MedioTransporteComponent>;
  let sagarpaServiceMock: any;
  let storeMock: any;
  let queryMock: any;

  beforeEach(async () => {
    sagarpaServiceMock = {
      getMediodetransporte: jest.fn().mockReturnValue(of({ data: [{ id: 1, nombre: 'Camion' }] }))
    };

    storeMock = {
      setMedioDeTransporte: jest.fn(),
      setMostrarAgregarMercancia: jest.fn(),
      setEsSolicitudFerros: jest.fn(),
      setIdentificacionTransporte: jest.fn(),
      setTotalGuias: jest.fn(),
      setMercanciaTablaDatos: jest.fn()
    };

    queryMock = {
      selectSolicitud$: of({
        medioDeTransporte: 1,
        identificacionTransporte: 'ABC123',
        esSolicitudFerros: '1',
        totalGuias: '5',
        mostrarAgregarMercancia: true,
        mercanciaTablaDatos: []
      })
    };    

    await TestBed.configureTestingModule({
      imports: [MedioTransporteComponent],
      providers: [
        FormBuilder,
        { provide: SagarpaService, useValue: sagarpaServiceMock },
        { provide: Solicitud220501Store, useValue: storeMock },
        { provide: Solicitud220501Query, useValue: queryMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MedioTransporteComponent);
    component = fixture.componentInstance;

    component['getMercanciaTableData'] = {
      tableHeader: ['Col1', 'Col2'],
      tableBody: [{ tbodyData: ['Val1', 'Val2'] }]
    };

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with values from store on init', () => {
    expect(component.medioTransporteForm.value.medioDeTransporte).toBe(1);
    expect(component.mostrarAgregarMercancia).toBe(true);
  });

  it('should call inicializaCatalogos and obtenerMercancia on init', () => {
    const catalogoSpy = jest.spyOn<any, any>(component, 'inicializaCatalogos');
    const mercanciaSpy = jest.spyOn(component, 'obtenerMercancia');

    component.inicializarFormulario();

    expect(catalogoSpy).toHaveBeenCalled();
    expect(mercanciaSpy).toHaveBeenCalled();
  });

  it('should create form group with validators', () => {
    component.crearFormulario();
    expect(component.medioTransporteForm.contains('medioDeTransporte')).toBe(true);
  });

  it('should set mercancia header and body data', () => {
    component.obtenerMercancia();
    expect(component.mercanciaHeaderData.length).toBeGreaterThan(0);
    expect(component.mercanciaBodyData.length).toBeGreaterThan(0);
  });

  it('should update store on modificarSaldosMercancia', () => {
    component.modificarSaldosMercancia();
    expect(component.mostrarAgregarMercancia).toBe(true);
    expect(storeMock.setMostrarAgregarMercancia).toHaveBeenCalledWith(true);
  });

  it('should update store on obtenerAgregarMercanciaEvent', () => {
    component.obtenerAgregarMercanciaEvent(true);
    expect(component.mostrarAgregarMercancia).toBe(true);
    expect(storeMock.setMostrarAgregarMercancia).toHaveBeenCalledWith(true);
  });

  it('should emit true when estableceSeleccionSolicitudFerro is 1', () => {
    const emitSpy = jest.spyOn(component.transporteSeleccionado, 'emit');
    component.estableceSeleccionSolicitudFerro('1');
    expect(emitSpy).toHaveBeenCalledWith(true);
  });

  it('should emit false when estableceSeleccionSolicitudFerro is 0', () => {
    const emitSpy = jest.spyOn(component.transporteSeleccionado, 'emit');
    component.estableceSeleccionSolicitudFerro('0');
    expect(emitSpy).toHaveBeenCalledWith(false);
  });

  it('should call setIdentificacionTransporte', () => {
    component.getIdentificacionTransporte();
    expect(storeMock.setIdentificacionTransporte).toHaveBeenCalledWith('ABC123');
  });

  it('should call setTotalGuias', () => {
    component.getTotalGuiasAmparadas();
    expect(storeMock.setTotalGuias).toHaveBeenCalledWith('5');
  });

  it('should clean up on destroy', () => {
    const spy = jest.spyOn(component['destroyed$'], 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});