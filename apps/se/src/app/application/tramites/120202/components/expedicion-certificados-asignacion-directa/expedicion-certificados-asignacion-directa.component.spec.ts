import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpedicionCertificadosAsignacionDirectaComponent } from './expedicion-certificados-asignacion-directa.component';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('ExpedicionCertificadosAsignacionDirectaComponent Additional Tests', () => {
  let component: ExpedicionCertificadosAsignacionDirectaComponent;
  let fixture: ComponentFixture<ExpedicionCertificadosAsignacionDirectaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
          imports: [
            ReactiveFormsModule,
            HttpClientModule
          ]
        }).compileComponents();

    fixture = TestBed.createComponent(ExpedicionCertificadosAsignacionDirectaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize the form on ngOnInit', () => {
    const spy = jest.spyOn(component, 'crearExpedicionCertificadosAsignacionForm');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call inicializaCatalogos on ngOnInit', () => {
    const spy = jest.spyOn(component, 'inicializaCatalogos');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call aniosAutorizacionSeleccion on ngOnInit', () => {
    const spy = jest.spyOn(component, 'aniosAutorizacionSeleccion');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should reset forms and call store methods on buscar', () => {
    const resetSpy = jest.spyOn(component.asignacionOficioNumeroForm, 'reset');
    const setAniosAutorizacionSpy = jest.spyOn(component['tramite120202Store'], 'setAniosAutorizacion');
    const setNumFolioAsignacionAuxSpy = jest.spyOn(component['tramite120202Store'], 'setNumFolioAsignacionAux');

    component.buscar();

    expect(resetSpy).toHaveBeenCalledWith({ cveAniosAutorizacion: '', numFolioAsignacionAux: '' });
    expect(setAniosAutorizacionSpy).toHaveBeenCalledWith('');
    expect(setNumFolioAsignacionAuxSpy).toHaveBeenCalledWith('');
  });

  it('should call setValoresStore for each form field in setEstablecerDatosCampo', () => {
    const spy = jest.spyOn(component, 'setValoresStore');
    component.setEstablecerDatosCampo();
    expect(spy).toHaveBeenCalledTimes(21);
  });

  it('should add a new value to cuerpoTabla and update store on agregar', () => {
    const setCuerpoTablaSpy = jest.spyOn(component['tramite120202Store'], 'setCuerpoTabla');
    const setTotalExpedirSpy = jest.spyOn(component['tramite120202Store'], 'setTotalExpedir');
    const valor = '100';

    component.agregar(valor);

    expect(component.cuerpoTabla).toContainEqual({ montoExpedir: 100 });
    expect(setCuerpoTablaSpy).toHaveBeenCalledWith(component.cuerpoTabla);
    expect(setTotalExpedirSpy).toHaveBeenCalledWith(100);
  });

  it('should call destruirNotificador$ complete on ngOnDestroy', () => {
    const destruirNotificadorSpy = jest.spyOn(component['destruirNotificador$'], 'complete');
    component.ngOnDestroy();
    expect(destruirNotificadorSpy).toHaveBeenCalled();
  });

  it('should call tramite120202Store methods in setValoresStore', () => {
    const setEstadoSpy = jest.spyOn(component['tramite120202Store'], 'setEstado');
    const form = component.representacionFederalForm;
    form.get('estado')?.setValue('Test State');

    component.setValoresStore(form, 'estado', 'setEstado');

    expect(setEstadoSpy).toHaveBeenCalledWith('Test State');
  });

  it('should initialize aniosAutorizacion on inicializaCatalogos', (done) => {
    const mockResponse = { code: 200, data: [{ id: 1, descripcion: '2023' }], message: 'Success' };
    jest.spyOn(component['expedicionCertificadosAsignacionService'], 'getAniosAutorizacionCatalogo').mockReturnValue(
      of(mockResponse)
    );

    component.inicializaCatalogos();

    setTimeout(() => {
      expect(component.aniosAutorizacion).toEqual(mockResponse.data);
      done();
    });
  });

  it('should update tramite120202Store on aniosAutorizacionSeleccion', () => {
    const setAniosAutorizacionSpy = jest.spyOn(component['tramite120202Store'], 'setAniosAutorizacion');
    component.asignacionOficioNumeroForm.get('cveAniosAutorizacion')?.setValue('2023');

    component.aniosAutorizacionSeleccion();

    expect(setAniosAutorizacionSpy).toHaveBeenCalledWith('2023');
  });
});
