import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { AlertComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { DomiciliosDePlantasComponent } from './domicilios-de-plantas.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProsecService } from '@ng-mf/data-access-user';
import { ReactiveFormsModule } from '@angular/forms';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';

describe('DomiciliosDePlantasComponent', () => {
  let component: DomiciliosDePlantasComponent;
  let fixture: ComponentFixture<DomiciliosDePlantasComponent>;
  let prosecService: ProsecService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DomiciliosDePlantasComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, TituloComponent,AlertComponent, TablaDinamicaComponent, CatalogoSelectComponent],
      providers: [ProsecService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DomiciliosDePlantasComponent);
    component = fixture.componentInstance;
    prosecService = TestBed.inject(ProsecService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.forma).toBeDefined();
    expect(component.forma.get('modalidad')).toBeDefined();
  });

  it('should call obtenserListaEstado on init', () => {
    spyOn(component, 'obtenserListaEstado');
    component.ngOnInit();
    expect(component.obtenserListaEstado).toHaveBeenCalled();
  });

  it('should retrieve estado list', () => {
    const MOCKDATA = [{ id: 1, nombre: 'Estado 1', descripcion: 'Estado 1' }];
    spyOn(prosecService, 'obtenerMenuDesplegable').and.returnValue(of(MOCKDATA));
    component.obtenserListaEstado();
    expect(component.estadoSeleccionar).toEqual(MOCKDATA);
  });

  it('should handle error when retrieving estado list', () => {
    spyOn(prosecService, 'obtenerMenuDesplegable').and.returnValue(throwError('error'));
    component.obtenserListaEstado();
    expect(component.estadoSeleccionar).toEqual([]);
  });

  it('should retrieve federal list', () => {
    const MOCKDATA = [{ id: 1, nombre: 'Federal 1', descripcion: 'Federal 1' }];
    spyOn(prosecService, 'obtenerMenuDesplegable').and.returnValue(of(MOCKDATA));
    component.obtenserListaFederal();
    expect(component.RepresentacionFederal).toEqual(MOCKDATA);
  });

  it('should handle error when retrieving federal list', () => {
    spyOn(prosecService, 'obtenerMenuDesplegable').and.returnValue(throwError('error'));
    component.obtenserListaFederal();
    expect(component.RepresentacionFederal).toEqual([]);
  });

  it('should retrieve actividad productiva list', () => {
    const mockData = [{ id: 1, nombre: 'Actividad 1', descripcion: 'Actividad 1' }];
    spyOn(prosecService, 'obtenerMenuDesplegable').and.returnValue(of(mockData));
    component.obtenserListaActividad();
    expect(component.ActividadProductiva).toEqual(mockData);
  });

  it('should handle error when retrieving actividad productiva list', () => {
    spyOn(prosecService, 'obtenerMenuDesplegable').and.returnValue(throwError('error'));
    component.obtenserListaActividad();
    expect(component.ActividadProductiva).toEqual([]);
  });

  it('should call obtenserListaFederal when obtenserLista is called', () => {
    spyOn(component, 'obtenserListaFederal');
    component.obtenserLista();
    expect(component.obtenserListaFederal).toHaveBeenCalled();
  });

  it('should call obtenserListaActividad when obtenserLista is called', () => {
    spyOn(component, 'obtenserListaActividad');
    component.obtenserLista();
    expect(component.obtenserListaActividad).toHaveBeenCalled();
  });

  it('should have plantaColumnsConfiguracion defined', () => {
    expect(component.plantaColumnsConfiguracion).toBeDefined();
    expect(component.plantaColumnsConfiguracion.length).toBeGreaterThan(0);
  });

  it('should have plantasDatos defined', () => {
    expect(component.plantasDatos).toBeDefined();
    expect(component.plantasDatos.length).toBeGreaterThan(0);
  });

  it('should set TEXTO correctly', () => {
    const TEXTO = 'some text'; // Define TEXTO
    expect(component.TEXTO).toBe(TEXTO);
  });

  it('should create form with modalidad control', () => {
    component.ngOnInit();
    expect(component.forma.contains('modalidad')).toBeTruthy();
  });

  it('should call obtenserListaActividad and obtenserListaFederal on obtenserLista', () => {
    spyOn(component, 'obtenserListaActividad');
    spyOn(component, 'obtenserListaFederal');
    component.obtenserLista();
    expect(component.obtenserListaActividad).toHaveBeenCalled();
    expect(component.obtenserListaFederal).toHaveBeenCalled();
  });
});