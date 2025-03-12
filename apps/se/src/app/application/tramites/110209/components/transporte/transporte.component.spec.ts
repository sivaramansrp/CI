import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { TransporteComponent } from './transporte.component';
import { TituloComponent } from '@ng-mf/data-access-user';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { TransporteService } from '../../services/transporte/transporte.service';
import { Tramite110209Store } from '../../estados/stores/tramite110209.store';
import { Tramite110209Query } from '../../estados/queries/tramite110209.query';

describe('TransporteComponent', () => {
  let component: TransporteComponent;
  let fixture: ComponentFixture<TransporteComponent>;
  let service: TransporteService;
  let store: Tramite110209Store;
  let query: Tramite110209Query;

  beforeEach(async () => {
    const serviceMock = {
      getMedioDeTransporte: jest.fn().mockReturnValue(of([
        { id: '1', nombre: 'Aéreo' },
        { id: '2', nombre: 'Marítimo' }
      ]))
    };

    const storeMock = {
      setMedioDeTransporte: jest.fn(),
      setRutaCompleta: jest.fn(),
      setPuertoDeEmbarque: jest.fn(),
      setPuertoDeDesembarque: jest.fn()
    };

    const queryMock = {
      selectTramite110102$: of({
        medioDeTransporte: '1',
        rutaCompleta: 'Ruta 1',
        puertoDeEmbarque: 'Puerto 1',
        puertoDeDesembarque: 'Puerto 2'
      })
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [TransporteComponent,CommonModule, ReactiveFormsModule, TituloComponent, CatalogoSelectComponent],
      providers: [
        { provide: TransporteService, useValue: serviceMock },
        { provide: Tramite110209Store, useValue: storeMock },
        { provide: Tramite110209Query, useValue: queryMock }
      ]
    }).compileComponents();

    service = TestBed.inject(TransporteService);
    store = TestBed.inject(Tramite110209Store);
    query = TestBed.inject(Tramite110209Query);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.transporteForm).toBeDefined();
    expect(component.transporteForm.get('medioDeTransporte')?.value).toBe('');
    expect(component.transporteForm.get('rutaCompleta')?.value).toBe('');
    expect(component.transporteForm.get('puertoDeEmbarque')?.value).toBe('');
    expect(component.transporteForm.get('puertoDeDesembarque')?.value).toBe('');
  });

  it('should fetch and set medio de transporte options on init', () => {
    component.ngOnInit();
    expect(service.getMedioDeTransporte).toHaveBeenCalled();
    expect(component.medioDeTransporteOptions.length).toBe(2);
    expect(component.medioDeTransporteOptions).toEqual([
      { id: '1', nombre: 'Aéreo' },
      { id: '2', nombre: 'Marítimo' }
    ]);
  });

  it('should fetch and set form values from store on init', () => {
    component.ngOnInit();
    expect(component.transporteForm.get('medioDeTransporte')?.value).toBe('1');
    expect(component.transporteForm.get('rutaCompleta')?.value).toBe('Ruta 1');
    expect(component.transporteForm.get('puertoDeEmbarque')?.value).toBe('Puerto 1');
    expect(component.transporteForm.get('puertoDeDesembarque')?.value).toBe('Puerto 2');
  });

  it('should set values in store when form values change', () => {
    component.transporteForm.get('medioDeTransporte')?.setValue('2');
    component.setValoresStore(component.transporteForm, 'medioDeTransporte', 'setMedioDeTransporte');
    expect(store.setMedioDeTransporte).toHaveBeenCalledWith('2');

    component.transporteForm.get('rutaCompleta')?.setValue('Ruta 2');
    component.setValoresStore(component.transporteForm, 'rutaCompleta', 'setRutaCompleta');
    expect(store.setRutaCompleta).toHaveBeenCalledWith('Ruta 2');

    component.transporteForm.get('puertoDeEmbarque')?.setValue('Puerto 3');
    component.setValoresStore(component.transporteForm, 'puertoDeEmbarque', 'setPuertoDeEmbarque');
    expect(store.setPuertoDeEmbarque).toHaveBeenCalledWith('Puerto 3');

    component.transporteForm.get('puertoDeDesembarque')?.setValue('Puerto 4');
    component.setValoresStore(component.transporteForm, 'puertoDeDesembarque', 'setPuertoDeDesembarque');
    expect(store.setPuertoDeDesembarque).toHaveBeenCalledWith('Puerto 4');
  });

  it('should complete destroyed$ subject on destroy', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});