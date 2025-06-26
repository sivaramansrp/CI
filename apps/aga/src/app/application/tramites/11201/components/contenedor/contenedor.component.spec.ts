import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
 
import { ContenedorComponent } from './contenedor.component';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { DatosTramiteService } from '../../services/datos-tramite.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
 
describe('ContenedorComponent', () => {
  let component: ContenedorComponent;
  let fixture: ComponentFixture<ContenedorComponent>;
  let datosTramiteServiceMock: any;
 
 
  beforeEach(async () => {
    datosTramiteServiceMock = {
      getContenedores: jest.fn().mockReturnValue(of({ data: [] })),
      getTransporteList: jest.fn(),
      getAduanaList: jest.fn().mockReturnValue(of({ data: [] })),
      agregarSolicitud: jest.fn().mockReturnValue(of({ success: true, datos: {} })),
      submitSolicitud: jest.fn()
    };
    await TestBed.configureTestingModule({
      imports: [ContenedorComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(),
      { provide: DatosTramiteService, useValue: datosTramiteServiceMock }
      ],
    }).compileComponents();
 
    fixture = TestBed.createComponent(ContenedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
 
  it('should call limpiarCampos when cancelarRadioButton is called', () => {
    const limpiarCamposSpy = jest.spyOn(component, 'limpiarCampos');
    component.cancelarRadioButton();
    expect(limpiarCamposSpy).toHaveBeenCalled();
  });
 
  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.solicitudForm).toBeDefined();
  });
 
  it('should call cargarCatalogos on ngOnInit', () => {
    const cargarCatalogosSpy = jest.spyOn(component, 'cargarCatalogos');
    component.ngOnInit();
    expect(cargarCatalogosSpy).toHaveBeenCalled();
  });
 
  it('should call setValoresStore when tipoBusqueda changes', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    component.ngOnInit();
    component.solicitudForm.get('tipoBusqueda')?.setValue('Contenedor');
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.solicitudForm, 'tipoBusqueda', 'setTipoBusqueda');
  });
 
  it('should call agregarSolicitud when validarDigitoVerificador is called with valid form', () => {
    const agregarSolicitudSpy = jest.spyOn(component, 'agregarSolicitud');
    component.solicitudForm.patchValue({
      aduana: 'aduana',
      fechaIngreso: '2024-03-13',
      inicialesContenedor: 'BBZM',
      numeroContenedor: '1098765',
      contenedores: 'AC'
    });
    component.validarDigitoVerificador();
    expect(agregarSolicitudSpy).toHaveBeenCalled();
  });
 
  it('should call datosTramiteService.getAduanaList with "aduanaList" when fetchAduanaList is called', async () => {
    datosTramiteServiceMock.getAduanaList('aduanaList');
    await component.fetchAduanaList();
    expect(datosTramiteServiceMock.getAduanaList).toHaveBeenCalledWith('aduanaList');
  });
 
  it('should call datosTramiteService.getTransporteList when fetchgetTransporteList is called', () => {
    datosTramiteServiceMock.getTransporteList('transporteList');
    component.fetchgetTransporteList();
    expect(datosTramiteServiceMock.getTransporteList).toHaveBeenCalled();
  });
 
});