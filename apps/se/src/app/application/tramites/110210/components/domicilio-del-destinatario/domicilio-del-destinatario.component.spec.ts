import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, Subject, Subscription } from 'rxjs';
import { DomicilioDelDestinatarioComponent } from './domicilio-del-destinatario.component';
import { Tramite110210Query } from '../../estados/queries/tramite110210.query';
import { Tramite110210Store } from '../../estados/store/tramite110210.store';
import mockData from 'libs/shared/theme/assets/json/110210/domicilio-del-destinatario.json';

describe('DomicilioDelDestinatarioComponent', () => {
  let component: DomicilioDelDestinatarioComponent;
  let fixture: ComponentFixture<DomicilioDelDestinatarioComponent>;
  let tramite110210QueryMock: jest.Mocked<Tramite110210Query>;
  let tramite110210StoreMock: jest.Mocked<Tramite110210Store>;

  beforeEach(async () => {
    tramite110210QueryMock = {
      selectTramite110210$: of({
        ciudad: 'Test City',
        calle: 'Test Street',
        numeroLetra: '123A',
        telefono: '1234567890',
        fax: '0987654321',
        correoElectronico: 'test@example.com',
        observaciones: 'Test Observations',
      }),
    } as jest.Mocked<Tramite110210Query>;

    tramite110210StoreMock = {
      setCiudad: jest.fn(),
      setCalle: jest.fn(),
      setNumeroLetra: jest.fn(),
      setTelefono: jest.fn(),
      setFax: jest.fn(),
      setCorreoElectronico: jest.fn(),
      setObservaciones: jest.fn(),
    } as unknown as jest.Mocked<Tramite110210Store>;

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, DomicilioDelDestinatarioComponent],
      providers: [
        FormBuilder,
        { provide: Tramite110210Query, useValue: tramite110210QueryMock },
        { provide: Tramite110210Store, useValue: tramite110210StoreMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DomicilioDelDestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.solicitudForm).toBeDefined();
    expect(component.solicitudForm.get('ciudad')?.value).toBe('');
    expect(component.solicitudForm.get('calle')?.value).toBe('');
  });

  it('should set form values using mockData in setFormValues', () => {
    component.setFormValues();
    expect(component.solicitudForm.get('ciudad')?.value).toBe(mockData.ciudad);
    expect(component.solicitudForm.get('calle')?.value).toBe(mockData.calle);
    expect(component.solicitudForm.get('correoElectronico')?.value).toBe(mockData.correoElectronico);
  });

  it('should restore form values from the store in restoreFormValues', () => {
    component.restoreFormValues();
    expect(component.solicitudForm.get('ciudad')?.value).toBe('Test City');
    expect(component.solicitudForm.get('calle')?.value).toBe('Test Street');
  });

  it('should update the store with form values in updateStore', () => {
    component.solicitudForm.patchValue({
      ciudad: 'Updated City',
      calle: 'Updated Street',
      numeroLetra: '456B',
      telefono: '9876543210',
      fax: '0123456789',
      correoElectronico: 'updated@example.com',
      observaciones: 'Updated Observations',
    });
    component.updateStore();
    expect(tramite110210StoreMock.setCiudad).toHaveBeenCalledWith('Updated City');
    expect(tramite110210StoreMock.setCalle).toHaveBeenCalledWith('Updated Street');
    expect(tramite110210StoreMock.setCorreoElectronico).toHaveBeenCalledWith('updated@example.com');
  });

  it('should unsubscribe from subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should unsubscribe from formSubscription on ngOnDestroy', () => {
    component.formSubscription = new Subscription();
    const unsubscribeSpy = jest.spyOn(component.formSubscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });

  it('should unsubscribe from restoreSubscription$ on ngOnDestroy', () => {
    component['restoreSubscription$'] = new Subscription();
    const unsubscribeSpy = jest.spyOn(component['restoreSubscription$'], 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});