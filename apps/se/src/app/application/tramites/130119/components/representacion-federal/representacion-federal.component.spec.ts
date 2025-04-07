import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { RepresentacionFederalComponent } from './representacion-federal.component';
import { CatalogoSelectComponent, TituloComponent } from '@ng-mf/data-access-user';
import { DatosDeLaSolicitudService } from '../../services/datos-de-la-solicitud/datos-de-la-solicitud.service';
import { Tramite130119Query } from '../../estados/queries/tramite130119.query';
import { Tramite130119Store } from '../../estados/store/tramite130119.store';

describe('RepresentacionFederalComponent', () => {
  let component: RepresentacionFederalComponent;
  let fixture: ComponentFixture<RepresentacionFederalComponent>;
  let datosDeLaSolicitudService: DatosDeLaSolicitudService;
  let tramite130119Query: Tramite130119Query;
  let tramite130119Store: Tramite130119Store;

  beforeEach(async () => {
    const datosDeLaSolicitudServiceMock = {
      getEstado: jest.fn().mockReturnValue(of([
        { id: '1', nombre: 'Estado 1' },
        { id: '2', nombre: 'Estado 2' }
      ])),
      getRepresentacionfederal: jest.fn().mockReturnValue(of([
        { id: '1', nombre: 'Representación 1' },
        { id: '2', nombre: 'Representación 2' }
      ]))
    };

    const tramite130119QueryMock = {
      selectTramite130119$: of({
        estado: 'Estado 1',
        representacionFederal: 'Representación 1'
      })
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule, RepresentacionFederalComponent, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent],
      providers: [
        { provide: DatosDeLaSolicitudService, useValue: datosDeLaSolicitudServiceMock },
        { provide: Tramite130119Query, useValue: tramite130119QueryMock },
        { provide: Tramite130119Store, useValue: {} }
      ]
    }).compileComponents();

    datosDeLaSolicitudService = TestBed.inject(DatosDeLaSolicitudService);
    tramite130119Query = TestBed.inject(Tramite130119Query);
    tramite130119Store = TestBed.inject(Tramite130119Store);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepresentacionFederalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.formularioRepresentacionFederalForm).toBeDefined();
    expect(component.formularioRepresentacionFederalForm.get('estado')?.value).toBe('');
    expect(component.formularioRepresentacionFederalForm.get('representacionFederal')?.value).toBe('');
  });

  it('should fetch and set estado options on init', () => {
    component.ngOnInit();
    expect(datosDeLaSolicitudService.getEstado).toHaveBeenCalled();
    expect(component.estadoOptions.length).toBe(2);
    expect(component.estadoOptions).toEqual([
      { id: '1', nombre: 'Estado 1' },
      { id: '2', nombre: 'Estado 2' }
    ]);
  });

  it('should fetch and set representacion federal options on init', () => {
    component.ngOnInit();
    expect(datosDeLaSolicitudService.getRepresentacionfederal).toHaveBeenCalled();
    expect(component.representacionFederalOptions.length).toBe(2);
    expect(component.representacionFederalOptions).toEqual([
      { id: '1', nombre: 'Representación 1' },
      { id: '2', nombre: 'Representación 2' }
    ]);
  });

  it('should fetch and set form values from store on init', () => {
    component.ngOnInit();
    expect(component.formularioRepresentacionFederalForm.get('estado')?.value).toBe('Estado 1');
    expect(component.formularioRepresentacionFederalForm.get('representacionFederal')?.value).toBe('Representación 1');
  });

  it('should set values in store when setValoresStore is called', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    component.setValoresStore(component.formularioRepresentacionFederalForm, 'estado', 'setEstado');
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.formularioRepresentacionFederalForm, 'estado', 'setEstado');
  });

  it('should complete destroyed$ subject on destroy', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
