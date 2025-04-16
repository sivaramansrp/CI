import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TipoDePropietarioComponent } from './tipo-de-propietario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Tramite630104Query } from '../../../tramites/630104/estados/queries/tramite630104.query';
import { of, Subject } from 'rxjs';
import { Catalogo } from '@libs/shared/data-access-user/src';

describe('TipoDePropietarioComponent', () => {
  let component: TipoDePropietarioComponent;
  let fixture: ComponentFixture<TipoDePropietarioComponent>;
  let tramite630104QueryMock: Partial<Tramite630104Query>;

  beforeEach(async () => {
    tramite630104QueryMock = {
      select: jest.fn().mockReturnValue(of({ esConsultaRep: 'Si', esExtranjero: 'Persona Fisica Extranjero' })),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,TipoDePropietarioComponent],
      declarations: [],
      providers: [{ provide: Tramite630104Query, useValue: tramite630104QueryMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(TipoDePropietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.formSolicitud).toBeDefined();
    expect(component.formSolicitud.get('esConsultaRep')?.value).toBe('Si');
    expect(component.formSolicitud.get('esExtranjero')?.value).toBe('Persona Fisica Extranjero');
  });

  it('should emit setValoresStoreEvent when setValoresStore is called', () => {
    const emitSpy = jest.spyOn(component.setValoresStoreEvent, 'emit');
    component.formSolicitud = component.fb.group({
      esConsultaRep: ['Si'],
    });

    component.setValoresStore(component.formSolicitud, 'esConsultaRep');
    expect(emitSpy).toHaveBeenCalledWith({ form: component.formSolicitud, campo: 'esConsultaRep' });
    expect(component.propietarioOptionsForm).toBe(true);
  });

  it('should set propietarioOptionsForm to false when esConsultaRep is "No"', () => {
    component.tramite630104State = { esConsultaRep: 'No' } as any;
    component.setValoresStore(component.formSolicitud, 'esConsultaRep');
    expect(component.propietarioOptionsForm).toBe(false);
  });

  it('should emit setValoresStoreEvent when setValoresStoreForNoOption is called', () => {
    const emitSpy = jest.spyOn(component.setValoresStoreEvent, 'emit');
    component.formSolicitud = component.fb.group({
      esExtranjero: ['Persona Fisica Extranjero'],
    });

    component.setValoresStoreForNoOption(component.formSolicitud, 'esExtranjero');
    expect(emitSpy).toHaveBeenCalledWith({ form: component.formSolicitud, campo: 'esExtranjero' });
    expect(component.propietarioOptionsNoForm).toBe(true);
  });

  it('should set propietarioOptionsNoForm to false when esExtranjero is not "Persona Fisica Extranjero"', () => {
    component.tramite630104State = { esExtranjero: 'Other' } as any;
    component.setValoresStoreForNoOption(component.formSolicitud, 'esExtranjero');
    expect(component.propietarioOptionsNoForm).toBe(undefined);
  });

 
});