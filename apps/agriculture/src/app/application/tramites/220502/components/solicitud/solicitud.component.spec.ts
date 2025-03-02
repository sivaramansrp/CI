import { CommonModule } from '@angular/common';
import { ComponentFixture } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitudComponent } from './solicitud.component';
import { of } from 'rxjs';

import { CarrosDeFerrocarrilComponent } from '../../shared/carros-de-ferrocarril/carros-de-ferrocarril.component';
import { DatosDelTramiteARealizarComponent } from '../../shared/datos-del-tramite-a-realizar/datos-del-tramite-a-realizar.component';
import { HistorialInspeccionFisicaComponent } from '../../shared/historial-inspeccion-fisica/historial-inspeccion-fisica.component';
import { MedioTransporteComponent } from '../../shared/medio-transporte/medio-transporte.component';
import { ResponsableInspeccionEnPuntoComponent } from '../../shared/responsable-inspeccion-en-punto/responsable-inspeccion-en-punto.component';
import { SolicitudDatosComponent } from '../../shared/solicitud-datos/solicitud-datos.component';
import { SolicitudPantallasService } from '@ng-mf/data-access-user';
import { TestBed } from '@angular/core/testing';
import { fakeAsync } from '@angular/core/testing';
import { tick } from '@angular/core/testing';

describe('SolicitudComponent 220502', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;
  let solicitudService: SolicitudPantallasService;

  beforeEach(async () => {
    const SOLICITUDSERVICEMOCK = {
      getData: jest.fn().mockReturnValue(
        of({
          hMercancia: [
            'Fracción arancelaria',
            'Descripción de la fracción',
            'Nico',
            'Descripción Nico',
            'Cantidad solicitada en UMT',
            'Unidad de medida de tarifa (UMT)',
            'Cantidad total UMT',
            'Saldo pendiente',
          ],
          hHistorialinspeccion: [
            'Número parcialidad/remesa',
            'Fracción arancelaria',
            'Nico',
            'Cantidad total en UMT',
            'Cantidad parcial en UTM',
            'Saldo pendiente',
            'Fecha de ingreso',
          ],
          hCarroFerrocarril: [
            'Número de parcialidad/remesa',
            'Cantidad de carros de ferrocarril',
          ],
          hSolicitud: ['Fecha Creación', 'Mercancía', 'Cantidad', 'Proovedor'],
          dSolicitud: [
            {
              fechaCreacion: '2025-02-02 19:50:08:0',
              mercancia: 'descripcion',
              cantidad: '1000000',
              proovedor: 'erick',
            },
          ],
          dMercancia: [
            {
              fraccionArancelaria: '1001.10.10',
              descripcionFraccion: 'Trigo duro',
              nico: 'Sí',
              nicoDescripcion: 'Trigo para molienda',
              cantidadSolicitadaUMT: 50,
              unidadMedidaUMT: 'kg',
              cantidadTotalUMT: 500,
              saldoPendiente: 100,
            },
          ],
          dCarrosDeFerrocarril: [
            {
              idInspeccionFisica: 1,
              numeroAutorizacion: '12345',
              numeroPartidaMercancia: 'P001',
              numeroTotalCarros: 10,
            },
          ],
          dHistorialInspecciones: [
            {
              numeroPartidaMercancia: '12345',
              fraccionArancelaria: '0101.21.00',
              nico: 'Si',
              cantidadUmt: '1000',
              cantidadInspeccion: '500',
              saldoPendiente: '500',
              fechaInspeccionString: '2023-10-01',
            },
          ],
        })
      ),
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        CarrosDeFerrocarrilComponent,
        DatosDelTramiteARealizarComponent,
        HistorialInspeccionFisicaComponent,
        MedioTransporteComponent,
        ResponsableInspeccionEnPuntoComponent,
        SolicitudDatosComponent,
        SolicitudComponent,
      ],
      providers: [
        FormBuilder,
        { provide: SolicitudPantallasService, useValue: SOLICITUDSERVICEMOCK },
      ],
    }).compileComponents();

    solicitudService = TestBed.inject(SolicitudPantallasService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.form).toBeTruthy();
  });

  it('should load initial data on ngOnInit', fakeAsync(() => {
    jest.spyOn(component, 'cargarDatosIniciales').mockImplementation();

    component.ngOnInit();
    tick();
    fixture.detectChanges();

    expect(component.cargarDatosIniciales).toHaveBeenCalled();
    expect(solicitudService.getData).toHaveBeenCalled();

    expect(component.dSolicitud).toEqual([
      {
        fechaCreacion: '2025-02-02 19:50:08:0',
        mercancia: 'descripcion',
        cantidad: '1000000',
        proovedor: 'erick',
      },
    ]);

    expect(component.hSolicitud).toEqual([
      'Fecha Creación',
      'Mercancía',
      'Cantidad',
      'Proovedor',
    ]);

    expect(component.hCarroFerrocarril).toEqual([
      'Número de parcialidad/remesa',
      'Cantidad de carros de ferrocarril',
    ]);

    expect(component.hHistorialinspeccion).toEqual([
      'Número parcialidad/remesa',
      'Fracción arancelaria',
      'Nico',
      'Cantidad total en UMT',
      'Cantidad parcial en UTM',
      'Saldo pendiente',
      'Fecha de ingreso',
    ]);

    expect(component.dHistorialInspecciones).toEqual([
      {
        numeroPartidaMercancia: '12345',
        fraccionArancelaria: '0101.21.00',
        nico: 'Si',
        cantidadUmt: '1000',
        cantidadInspeccion: '500',
        saldoPendiente: '500',
        fechaInspeccionString: '2023-10-01',
      },
    ]);

    expect(component.dCarrosDeFerrocarril).toEqual([
      {
        idInspeccionFisica: 1,
        numeroAutorizacion: '12345',
        numeroPartidaMercancia: 'P001',
        numeroTotalCarros: 10,
      },
    ]);

    expect(component.hMercanciaTabla).toEqual([
      'Fracción arancelaria',
      'Descripción de la fracción',
      'Nico',
      'Descripción Nico',
      'Cantidad solicitada en UMT',
      'Unidad de medida de tarifa (UMT)',
      'Cantidad total UMT',
      'Saldo pendiente',
    ]);

    expect(component.dMercanciaBody).toEqual([
      {
        fraccionArancelaria: '1001.10.10',
        descripcionFraccion: 'Trigo duro',
        nico: 'Sí',
        nicoDescripcion: 'Trigo para molienda',
        cantidadSolicitadaUMT: 50,
        unidadMedidaUMT: 'kg',
        cantidadTotalUMT: 500,
        saldoPendiente: 100,
      },
    ]);
  }));
});
