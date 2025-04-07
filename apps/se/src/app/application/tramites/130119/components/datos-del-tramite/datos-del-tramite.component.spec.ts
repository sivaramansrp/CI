import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of} from 'rxjs';
import { DatosDelTramiteComponent } from './datos-del-tramite.component';
import { CatalogoSelectComponent, TituloComponent } from '@ng-mf/data-access-user';
import { DatosDeLaSolicitudService } from '../../services/datos-de-la-solicitud/datos-de-la-solicitud.service';
import { Tramite130119Query } from '../../estados/queries/tramite130119.query';
import { Tramite130119Store } from '../../estados/store/tramite130119.store';

describe('DatosDelTramiteComponent', () => {
  let component: DatosDelTramiteComponent;
  let fixture: ComponentFixture<DatosDelTramiteComponent>;
  let datosDelTramiteService: DatosDeLaSolicitudService;
  let tramite130119Query: Tramite130119Query;
  let tramite130119Store: Tramite130119Store;

  beforeEach(async () => {
    const datosDelTramiteServiceMock = {
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

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule,DatosDelTramiteComponent, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent],
      providers: [
        { provide: DatosDeLaSolicitudService, useValue: datosDelTramiteServiceMock },
        { provide: Tramite130119Query, useValue: tramite130119QueryMock },
        { provide: Tramite130119Store, useValue: {} }
      ]
    }).compileComponents();

    datosDelTramiteService = TestBed.inject(DatosDeLaSolicitudService);
    tramite130119Query = TestBed.inject(Tramite130119Query);
    tramite130119Store = TestBed.inject(Tramite130119Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDelTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.datosDelTramiteForm).toBeDefined();
    expect(component.datosDelTramiteForm.get('regimen')?.value).toBe('');
    expect(component.datosDelTramiteForm.get('clasificacionDeRegimen')?.value).toBe('');
  });

  it('should fetch and set regimen options on init', () => {
    component.ngOnInit();
    expect(datosDelTramiteService.getRegimen).toHaveBeenCalled();
    expect(component.regimenOptions.length).toBe(2);
    expect(component.regimenOptions).toEqual([
      { id: '1', nombre: 'Regimen 1' },
      { id: '2', nombre: 'Regimen 2' }
    ]);
  });

  it('should fetch and set clasificacion de regimen options on init', () => {
    component.ngOnInit();
    expect(datosDelTramiteService.getClasificacionDeRegimen).toHaveBeenCalled();
    expect(component.clasificacionDeRegimenOptions.length).toBe(2);
    expect(component.clasificacionDeRegimenOptions).toEqual([
      { id: '1', nombre: 'Clasificacion 1' },
      { id: '2', nombre: 'Clasificacion 2' }
    ]);
  });

  it('should fetch and set form values from store on init', () => {
    component.ngOnInit();
    expect(component.datosDelTramiteForm.get('regimen')?.value).toBe('Regimen 1');
    expect(component.datosDelTramiteForm.get('clasificacionDeRegimen')?.value).toBe('Clasificacion 1');
  });

  it('should set values in store when setValoresStore is called', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    component.setValoresStore(component.datosDelTramiteForm, 'regimen', 'setRegimen');
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.datosDelTramiteForm, 'regimen', 'setRegimen');
  });

  it('should complete destroyed$ subject on destroy', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});