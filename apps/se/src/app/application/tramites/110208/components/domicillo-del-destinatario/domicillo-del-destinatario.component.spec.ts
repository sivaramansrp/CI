import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { DomicilloDelDestinatarioComponent } from './domicillo-del-destinatario.component';
import { ValidarInicalmenteService } from '../../services/validar-inicalmente/validar-inicalmente.service';
import { Tramite110208Store } from '../../../../estados/tramites/tramite110208.store';
import { Tramite110208Query } from '../../../../estados/queries/tramite110208.query';

describe('DomicilloDelDestinatarioComponent', () => {
  let component: DomicilloDelDestinatarioComponent;
  let fixture: ComponentFixture<DomicilloDelDestinatarioComponent>;
  let validarInicalmenteServiceMock: any;
  let tramite110208StoreMock: any;
  let tramite110208QueryMock: any;

  beforeEach(async () => {
    validarInicalmenteServiceMock = {
      obtenerEstadoList: jest.fn().mockReturnValue(of({ data: [{ id: 1, name: 'Estado 1' }] })),
    };

    tramite110208StoreMock = {
      setCiudad: jest.fn(),
      setCalle: jest.fn(),
    };

    tramite110208QueryMock = {
      selectSolicitud$: of({
        ciudad: 'Ciudad Test',
        calle: 'Calle Test',
        numeroLetra: '123',
        correoElectronico: 'test@example.com',
      }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DomicilloDelDestinatarioComponent],
      providers: [
        { provide: ValidarInicalmenteService, useValue: validarInicalmenteServiceMock },
        { provide: Tramite110208Store, useValue: tramite110208StoreMock },
        { provide: Tramite110208Query, useValue: tramite110208QueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DomicilloDelDestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values from the state', () => {
    expect(component.domicilioDestinatario.value).toEqual({
      ciudad: 'Ciudad Test',
      calle: 'Calle Test',
      numeroLetra: '123',
      lada: null,
      telefono: null,
      fax: null,
      correoElectronico: 'test@example.com',
      paisDestino: null,
    });
  });

  it('should call obtenerEstadoList and populate estado list', () => {
    component.obtenerEstadoList();
    expect(validarInicalmenteServiceMock.obtenerEstadoList).toHaveBeenCalled();
    expect(component.estado).toEqual([{ id: 1, name: 'Estado 1' }]);
  });

  it('should call setValoresStore and update the store', () => {
    const form = component.domicilioDestinatario;
    form.get('ciudad')?.setValue('New City');
    component.setValoresStore(form, 'ciudad', 'setCiudad');
    expect(tramite110208StoreMock.setCiudad).toHaveBeenCalledWith('New City');
  });

  it('should unsubscribe from observables on destroy', () => {
    const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    component.ngOnDestroy();
    expect(destroyNotifierSpy).toHaveBeenCalled();
    expect(destroyedSpy).toHaveBeenCalled();
  });
});
