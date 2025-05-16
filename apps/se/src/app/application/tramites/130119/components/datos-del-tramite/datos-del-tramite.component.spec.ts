import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of, Subject } from 'rxjs';
import { DatosDelTramiteComponent } from './datos-del-tramite.component';
import { CatalogoSelectComponent, TituloComponent } from "@ng-mf/data-access-user";
import { DatosDeLaSolicitudService } from '../../services/datos-de-la-solicitud/datos-de-la-solicitud.service';
import { Tramite130119Query } from '../../estados/queries/tramite130119.query';
import { Tramite130119Store } from '../../estados/store/tramite130119.store';

describe('DatosDelTramiteComponent', () => {
  let component: DatosDelTramiteComponent;
  let fixture: ComponentFixture<DatosDelTramiteComponent>;
  let datosDeLaSolicitudService: DatosDeLaSolicitudService;
  let tramite130119Query: Tramite130119Query;
  let tramite130119Store: Tramite130119Store;

  beforeEach(async () => {
    const datosDeLaSolicitudServiceMock = {
      getRegimen: jest.fn().mockReturnValue(of([
        { id: '1', nombre: 'Regimen 1' },
        { id: '2', nombre: 'Regimen 2' }
      ])),
      getClasificacionDeRegimen: jest.fn().mockReturnValue(of([
        { id: '1', nombre: 'Clasificacion 1' },
        { id: '2', nombre: 'Clasificacion 2' }
      ]))
    };

    const tramite130119QueryMock = {
      selectTramite130119$: of({
        regimen: 'Regimen 1', 
        clasificacionDeRegimen: 'Clasificacion 1'
      })
    };
    
    

    const tramite130119StoreMock = {
      establecerDatos: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule, DatosDelTramiteComponent, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent],
      providers: [
        { provide: DatosDeLaSolicitudService, useValue: datosDeLaSolicitudServiceMock },
        { provide: Tramite130119Query, useValue: tramite130119QueryMock },
        { provide: Tramite130119Store, useValue: tramite130119StoreMock }
      ]
    }).compileComponents();

    datosDeLaSolicitudService = TestBed.inject(DatosDeLaSolicitudService);
    tramite130119Query = TestBed.inject(Tramite130119Query);
    tramite130119Store = TestBed.inject(Tramite130119Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDelTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario con valores predeterminados', () => {
    expect(component.datosDelTramiteForm).toBeDefined();
    expect(component.datosDelTramiteForm.get('regimen')?.value).toBe('Regimen 1'); 
    expect(component.datosDelTramiteForm.get('clasificacionDeRegimen')?.value).toBe('Clasificacion 1');
  });
  

  it('Debe obtener y configurar las opciones del régimen al iniciar', () => {
    component.ngOnInit();
    expect(datosDeLaSolicitudService.getRegimen).toHaveBeenCalled();
    expect(component.opcionesDeRegimen.length).toBe(2);
    expect(component.opcionesDeRegimen).toEqual([
      { id: '1', nombre: 'Regimen 1' },
      { id: '2', nombre: 'Regimen 2' }
    ]);
  });

  it('debe buscar y configurar las opciones de clasificación de régimen en init', () => {
    component.ngOnInit();
    expect(datosDeLaSolicitudService.getClasificacionDeRegimen).toHaveBeenCalled();
    expect(component.opcionesDeClasificacionDeRegimen.length).toBe(2);
    expect(component.opcionesDeClasificacionDeRegimen).toEqual([
      { id: '1', nombre: 'Clasificacion 1' },
      { id: '2', nombre: 'Clasificacion 2' }
    ]);
  });

  it('Debe obtener y establecer valores de formulario desde la tienda al iniciar', () => {
    component.ngOnInit();
    expect(component.datosDelTramiteForm.get('regimen')?.value).toBe('Regimen 1');
    expect(component.datosDelTramiteForm.get('clasificacionDeRegimen')?.value).toBe('Clasificacion 1');
  });

  it('Debe establecer valores en la tienda cuando se llama a setValoresStore', () => {
    component.datosDelTramiteForm.patchValue({ regimen: 'Regimen 1' });
    component.setValoresStore(component.datosDelTramiteForm, 'regimen');
    expect(tramite130119Store.establecerDatos).toHaveBeenCalledWith({ regimen: 'Regimen 1' });
  });

  it('Debería completar el tema destruido$ en destruir', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
