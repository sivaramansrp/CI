import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { RegistroParaLaComponent } from './registro-para-la.component';
import { Tramite301Store } from '../../../../core/estados/tramites/tramite301.store';
import { Tramite301Query } from '../../../../core/queries/tramite301.query';

describe('RegistroParaLaComponent', () => {
  let component: RegistroParaLaComponent;
  let fixture: ComponentFixture<RegistroParaLaComponent>;
  let store: Tramite301Store;
  let query: Tramite301Query;

  const mockSolicitudState = {
    registro: 1,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroParaLaComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        {
          provide: Tramite301Store,
          useValue: {
            setRegistro: jest.fn(),
          },
        },
        {
          provide: Tramite301Query,
          useValue: {
            selectSolicitud$: of(mockSolicitudState),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroParaLaComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Tramite301Store);
    query = TestBed.inject(Tramite301Query);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on component creation', () => {
    expect(component.registroParaLaForm).toBeDefined();
    expect(component.registroParaLaForm.get('registro')?.value).toBe(mockSolicitudState.registro);
  });

  it('should initialize registroOptions and pasos in getRegistro()', () => {
    component.getRegistro();
    expect(component.registroOptions).toEqual([
      { id: 1, descripcion: 'Si' },
      { id: 2, descripcion: 'No' },
    ]);
    expect(component.pasos).toEqual([]);
    expect(component.datosPasos.nroPasos).toBe(0);
  });

  it('should call setValoresStore and update the store', () => {
    const spy = jest.spyOn(store, 'setRegistro');
    component.setValoresStore(component.registroParaLaForm, 'registro', 'setRegistro');
    expect(spy).toHaveBeenCalledWith(mockSolicitudState.registro);
  });

  it('should clean up subscriptions on component destroy', () => {
    const spyNext = jest.spyOn(component['destroyNotifier$'], 'next');
    const spyComplete = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});