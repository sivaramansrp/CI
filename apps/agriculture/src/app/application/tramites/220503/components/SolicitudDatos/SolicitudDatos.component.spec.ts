import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudDatosComponent } from './SolicitudDatos.component';
import { SolicitudPantallasService } from '../../services/solicitud-pantallas.service';
import { from, of } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { CargarDatosIniciales } from '../../models/solicitud-pantallas.model';
import { DatosDelTramiteARealizarComponent } from '../../shared/datos-del-tramite-a-realizar/datos-del-tramite-a-realizar.component';
import { MedioTransporteComponent } from '../../shared/medio-transporte/medio-transporte.component';
import { ResponsableInspeccionEnPuntoComponent } from '../../shared/responsable-inspeccion-en-punto/responsable-inspeccion-en-punto.component';
import { SolicitudDatosTabComponent } from '../../shared/solicitud-datos/solicitud-datos.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {SharedModule, WizardComponent} from "@ng-mf/data-access-user";
describe('SolicitudDatosComponent', () => {
  let component: SolicitudDatosComponent;
  let fixture: ComponentFixture<SolicitudDatosComponent>;
  let solicitudServiceMock: jest.Mocked<SolicitudPantallasService>;

  beforeEach(async () => {
    solicitudServiceMock = {
      getData: jest.fn(),
    } as unknown as jest.Mocked<SolicitudPantallasService>;

    await TestBed.configureTestingModule({
      imports: [
        SolicitudDatosComponent,
        CommonModule,
        ReactiveFormsModule,
        SolicitudDatosTabComponent,
        DatosDelTramiteARealizarComponent,
        ResponsableInspeccionEnPuntoComponent,
        MedioTransporteComponent,
        RouterModule,
        FormsModule,
        HttpClientModule,
        WizardComponent,
        SharedModule,
      ],
      providers: [
        FormBuilder,
        { provide: SolicitudPantallasService, useValue: solicitudServiceMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form group', () => {
    expect(component.form).toBeDefined();
  });

  it('should call cargarDatosIniciales on ngOnInit', () => {
    const cargarDatosInicialesSpy = jest.spyOn(
      component,
      'cargarDatosIniciales'
    );
    component.ngOnInit();
    expect(cargarDatosInicialesSpy).toHaveBeenCalled();
  });

  it('should load initial data from the service', () => {
    const mockData: CargarDatosIniciales = {
      hHistorialinspeccion: ['Header1', 'Header2'],
      dHistorialInspecciones: [],
      dCarrosDeFerrocarril: [],
      hCarroFerrocarril: ['Header3'],
      hSolicitud: ['Header4'],
      dSolicitud: [],
      hMerchandise: ['Header5'],
      dMercancia: [],
      medioDeTransporte: {
        labelNombre: 'test',
        required: true,
        primerOpcion: 'string',
        catalogos: [],
      },
    };

    solicitudServiceMock.getData.mockReturnValue(of(mockData));

    component.cargarDatosIniciales();

    expect(component.hHistorialinspeccion).toEqual(
      mockData.hHistorialinspeccion
    );
    expect(component.dHistorialInspecciones).toEqual(
      mockData.dHistorialInspecciones
    );
    expect(component.dCarrosDeFerrocarril).toEqual(
      mockData.dCarrosDeFerrocarril
    );
    expect(component.hCarroFerrocarril).toEqual(mockData.hCarroFerrocarril);
    expect(component.hSolicitud).toEqual(mockData.hSolicitud);
    expect(component.dSolicitud).toEqual(mockData.dSolicitud);
    expect(component.hMercanciaTabla).toEqual(mockData.hMerchandise);
    expect(component.dMercanciaBody).toEqual(mockData.dMercancia);
    expect(component.mediodetransporte).toEqual(mockData.medioDeTransporte);
  });

  it('should unsubscribe from observables on ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
  
});
