import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AmpliacionServiciosComponent } from './ampliacion-servicios.component';
import { AmpliacionServiciosService } from '../../services/ampliacion-servicios.service';
import { Catalogo, CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AmpliacionServiciosStore } from '../../estados/tramite80205.store';
import { AmpliacionServiciosQuery } from '../../estados/tramite80205.query';

describe('AmpliacionServiciosComponent', () => {
  let component: AmpliacionServiciosComponent;
  let fixture: ComponentFixture<AmpliacionServiciosComponent>;
  let ampliacionServiciosStore: AmpliacionServiciosStore;
  let ampliacionServiciosQuery: AmpliacionServiciosQuery;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        HttpClientTestingModule,
        CatalogoSelectComponent,
        AmpliacionServiciosComponent, // Add the standalone component here
      ],
      providers: [AmpliacionServiciosService, AmpliacionServiciosStore, AmpliacionServiciosQuery]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmpliacionServiciosComponent);
    component = fixture.componentInstance;
    ampliacionServiciosStore = TestBed.inject(AmpliacionServiciosStore);
    ampliacionServiciosQuery = TestBed.inject(AmpliacionServiciosQuery);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms', () => {
    expect(component.formularioInfoRegistro).toBeDefined();
  });

  it('should call getDatos on init', () => {
    jest.spyOn(component, 'getDatos');
    component.ngOnInit();
    expect(component.getDatos).toHaveBeenCalled();
  });

  it('should call obtenerIngresoSelectList on init', () => {
    jest.spyOn(component, 'obtenerIngresoSelectList');
    component.ngOnInit();
    expect(component.obtenerIngresoSelectList).toHaveBeenCalled();
  });

  it('should initialize formularioInfoRegistro with empty values if infoRegistro is not defined', () => {
    component.inicializarFormularioInfoRegistro();
    expect(component.formularioInfoRegistro.value).toEqual({
      seleccionaLaModalidad: '',
      folio: '',
      ano: ''
    });
  });

  
  it('should call suscribirseADatos on init', () => {
    jest.spyOn(component, 'suscribirseADatos');
    component.ngOnInit();
    expect(component.suscribirseADatos).toHaveBeenCalled();
  });

  it('should call suscribirseAFields on init', () => {
    jest.spyOn(component, 'suscribirseAFields');
    component.ngOnInit();
    expect(component.suscribirseAFields).toHaveBeenCalled();
  });

  it('should call suscribirseADatosImmex on init', () => {
    jest.spyOn(component, 'suscribirseADatosImmex');
    component.ngOnInit();
    expect(component.suscribirseADatosImmex).toHaveBeenCalled();
  });

  it('should call enCambioDeCampo and update store with rfcEmpresa, numeroPrograma, tiempoPrograma', () => {
    const newRfc = 'XYZ123';
    const newNumero = 'IMMEX456';
    const newTiempo = '2026';

    const setRfcEmpresaSpy = jest.spyOn(ampliacionServiciosStore, 'setRfcEmpresa');
    const setNumeroProgramaSpy = jest.spyOn(ampliacionServiciosStore, 'setNumeroPrograma');
    const setTiempoProgramaSpy = jest.spyOn(ampliacionServiciosStore, 'setTiempoPrograma');

    component.enCambioDeCampo('rfcEmpresa', newRfc);
    component.enCambioDeCampo('numeroPrograma', newNumero);
    component.enCambioDeCampo('tiempoPrograma', newTiempo);

    expect(setRfcEmpresaSpy).toHaveBeenCalledWith(newRfc);
    expect(setNumeroProgramaSpy).toHaveBeenCalledWith(newNumero);
    expect(setTiempoProgramaSpy).toHaveBeenCalledWith(newTiempo);
  });

  it('should call procesarDatosDelHijo and update store with new data', () => {
    const newCatalogo: Catalogo = { id: 1, descripcion: 'Catalogo1' };
    const setAduanaDeIngresoSeleccionSpy = jest.spyOn(ampliacionServiciosStore, 'setAduanaDeIngresoSeleccion');

    component.procesarDatosDelHijo(newCatalogo);

    expect(component.recibioDatos).toEqual([newCatalogo]);
    expect(setAduanaDeIngresoSeleccionSpy).toHaveBeenCalledWith(newCatalogo);
  });

  it('should call eliminarServiciosGrid and update the store', () => {
    const selectedService = { descripiónDelServicio: 'Service 1' };
    component.domiciliosSeleccionados = [selectedService];
    component.datosImmex = [{ descripiónDelServicio: 'Service 1' }, { descripiónDelServicio: 'Service 2' }];
    const setDatosImmexSpy = jest.spyOn(ampliacionServiciosStore, 'setDatosImmex');

    component.eliminarServiciosGrid();

    expect(setDatosImmexSpy).toHaveBeenCalledWith([{ descripiónDelServicio: 'Service 2' }]);
  });

  

  it('should call eliminarEmpresasNacionales and update the store', () => {
    const selectedEmpresa = { RegistroContribuyentes: '1234' };
    component.empresasSeleccionados = [selectedEmpresa];
    component.datos = [{ RegistroContribuyentes: '1234' }, { RegistroContribuyentes: '5678' }];
    const setDatosSpy = jest.spyOn(ampliacionServiciosStore, 'setDatos');

    component.eliminarEmpresasNacionales();

    expect(setDatosSpy).toHaveBeenCalledWith([{ RegistroContribuyentes: '5678' }]);
  });

 
});
