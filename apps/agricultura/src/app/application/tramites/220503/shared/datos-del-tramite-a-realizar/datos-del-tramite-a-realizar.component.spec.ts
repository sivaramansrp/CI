import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { DatosDelTramiteARealizarComponent } from './datos-del-tramite-a-realizar.component';
import { SolicitudPantallasService } from '../../services/solicitud-pantallas.service';
import { Solicitud220503Store } from '../../estados/tramites220503.store';
import { Solicitud220503Query } from '../../estados/tramites220503.query';
import { of } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@ng-mf/data-access-user';
import { InputFechaComponent } from '@ng-mf/data-access-user';

describe('DatosDelTramiteARealizarComponent', () => {
  let component: DatosDelTramiteARealizarComponent;
  let fixture: ComponentFixture<DatosDelTramiteARealizarComponent>;
  let solicitudServiceMock: jest.Mocked<SolicitudPantallasService>;
  let solicitudStoreMock: jest.Mocked<Solicitud220503Store>;
  let solicitudQueryMock: jest.Mocked<Solicitud220503Query>;

  beforeEach(async () => {
    solicitudServiceMock = {
      getDataDatosDelTramite: jest.fn(),
    } as never;

    solicitudStoreMock = {
      setFechaDeInspeccion: jest.fn(),
      setCertificadosAutorizados: jest.fn(),
      setHoraDeInspeccion: jest.fn(),
      setAduanaDeIngreso: jest.fn(),
      setSanidadAgropecuaria: jest.fn(),
      setPuntoDeInspeccion: jest.fn(),
    } as never;

    solicitudQueryMock = {
      selectSolicitud$: jest.fn(),
    } as never;

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        DatosDelTramiteARealizarComponent,
        CommonModule,
        TituloComponent,
        CatalogoSelectComponent,
        InputFechaComponent,
      ],
      declarations: [],
      providers: [
        { provide: SolicitudPantallasService, useValue: solicitudServiceMock },
        { provide: Solicitud220503Store, useValue: solicitudStoreMock },
        { provide: Solicitud220503Query, useValue: solicitudQueryMock },
        { provide: ChangeDetectorRef, useValue: { detectChanges: jest.fn() } },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDelTramiteARealizarComponent);
    component = fixture.componentInstance;
    component.claveDeControl = 'testControl';
    component.parentContainer = {
      control: new FormGroup({}),
    } as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add control to parent form group on ngOnInit', () => {
    component.ngOnInit();
    expect(component.grupoFormularioPadre.contains('testControl')).toBe(true);
  });

  it('should remove control from parent form group on ngOnDestroy', () => {
    component.ngOnInit();
    component.ngOnDestroy();
    expect(component.grupoFormularioPadre.contains('testControl')).toBe(false);
  });

  it('should call solicitudService.getDataDatosDelTramite on cargarDatosIniciales', () => {
    solicitudServiceMock.getDataDatosDelTramite.mockReturnValue(of({} as any));
    component.cargarDatosIniciales();
    expect(solicitudServiceMock.getDataDatosDelTramite).toHaveBeenCalled();
  });

  it('should update form control value on certificadosSeleccion', () => {
    component.ngOnInit();
    const testCatalogo = { descripcion: 'Test Certificado' } as any;
    component.certificadosSeleccion(testCatalogo);
    expect(
      component.grupoFormularioPadre.get('testControl')?.value
        .certificadosAutorizados
    ).toBe('Test Certificado');
  });

  it('should call setFechaDeInspeccion on cambioFechaInicio', () => {
    component.cambioFechaInicio('2023-01-01');
    expect(solicitudStoreMock.setFechaDeInspeccion).toHaveBeenCalledWith(
      '2023-01-01'
    );
  });

  it('should call setCertificadosAutorizados on setCertificadosAutorizados', () => {
    const testCatalogo = { id: 1 } as any;
    component.setCertificadosAutorizados(testCatalogo);
    expect(solicitudStoreMock.setCertificadosAutorizados).toHaveBeenCalledWith(
      1
    );
  });

  it('should call setHoraDeInspeccion on setHoraDeInspeccion', () => {
    const testCatalogo = { id: 2 } as any;
    component.setHoraDeInspeccion(testCatalogo);
    expect(solicitudStoreMock.setHoraDeInspeccion).toHaveBeenCalledWith(2);
  });

  it('should call setAduanaDeIngreso on setAduanaDeIngreso', () => {
    const testCatalogo = { id: 3 } as any;
    component.setAduanaDeIngreso(testCatalogo);
    expect(solicitudStoreMock.setAduanaDeIngreso).toHaveBeenCalledWith(3);
  });

  it('should call setSanidadAgropecuaria on setSanidadAgropecuaria', () => {
    const testCatalogo = { id: 4 } as any;
    component.setSanidadAgropecuaria(testCatalogo);
    expect(solicitudStoreMock.setSanidadAgropecuaria).toHaveBeenCalledWith(4);
  });

  it('should call setPuntoDeInspeccion on setPuntoDeInspeccion', () => {
    const testCatalogo = { id: 5 } as any;
    component.setPuntoDeInspeccion(testCatalogo);
    expect(solicitudStoreMock.setPuntoDeInspeccion).toHaveBeenCalledWith(5);
  });
});
