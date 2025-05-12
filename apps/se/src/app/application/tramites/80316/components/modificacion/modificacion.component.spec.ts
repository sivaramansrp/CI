import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of as observableOf, Subject } from 'rxjs';
import { ModificacionComponent } from './modificacion.component';
import { SolicitudService } from '../../services/solicitud.service';
import { Tramite80316Store } from '../../estados/tramite80316.store';
import { Tramite80316Query } from '../../estados/tramite80316.query';

describe('ModificacionComponent', () => {
  let fixture!: ComponentFixture<ModificacionComponent>;
  let component!: ModificacionComponent;
  let solicitudService: jest.Mocked<SolicitudService>;
  let tramite80316Store: jest.Mocked<Tramite80316Store>;
  let tramite80316Query: jest.Mocked<Tramite80316Query>;

  beforeEach(() => {
    solicitudService = {
      getDatosModificacion: jest.fn().mockReturnValue(observableOf({})),
      getActividadProductiva: jest.fn().mockReturnValue(observableOf({ data: [] })),
    } as unknown as jest.Mocked<SolicitudService>;

    tramite80316Store = {
      setDatosModificacion: jest.fn(),
      setActividadProductiva: jest.fn(),
    } as unknown as jest.Mocked<Tramite80316Store>;

    tramite80316Query = {
      selectSolicitud$: observableOf({}),
    } as unknown as jest.Mocked<Tramite80316Query>;

    TestBed.configureTestingModule({
      imports: [ModificacionComponent, FormsModule, ReactiveFormsModule, ToastrModule.forRoot(), HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: SolicitudService, useValue: solicitudService },
        { provide: Tramite80316Store, useValue: tramite80316Store },
        { provide: Tramite80316Query, useValue: tramite80316Query },
        provideToastr({ positionClass: 'toast-top-right' }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.modificacionForm).toBeDefined();
  });

  it('should call loadDatosModificacion on ngOnInit', () => {
    const loadDatosModificacionSpy = jest.spyOn(component, 'loadDatosModificacion');
    component.ngOnInit();
    expect(loadDatosModificacionSpy).toHaveBeenCalled();
  });

  it('should call inicializaCatalogos on ngOnInit', () => {
    const inicializaCatalogosSpy = jest.spyOn(component, 'inicializaCatalogos');
    component.ngOnInit();
    expect(inicializaCatalogosSpy).toHaveBeenCalled();
  });

  it('should call setDatosModificacion in store when loadDatosModificacion is called', () => {
    component.loadDatosModificacion();
    expect(tramite80316Store.setDatosModificacion).toHaveBeenCalled();
  });

  it('should initialize actividadProductiva when inicializaCatalogos is called', () => {
    component.inicializaCatalogos();
    expect(solicitudService.getActividadProductiva).toHaveBeenCalled();
  });

});
  
