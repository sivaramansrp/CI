import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { PasoDosComponent } from './paso-dos.component';
import { Tramite11201Store } from '../../../../core/estados/tramites/tramite11201.store';
import { Tramite11201Query } from '../../../../core/queries/tramite11201.query';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;
  let tramite11201StoreMock: any;
  let tramite11201QueryMock: any;

  beforeEach(async () => {
    tramite11201StoreMock = {
      setLinea: jest.fn(),
      setLineaCheckbox: jest.fn(),
    };

    tramite11201QueryMock = {
      selectSolicitud$: of({
        linea: '123456',
        monto: '1000',
        montoPagar: '352',
        lineaCheckbox: true,
      }),
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        PasoDosComponent,
      ],
      providers: [
        { provide: Tramite11201Store, useValue: tramite11201StoreMock },
        { provide: Tramite11201Query, useValue: tramite11201QueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.formSolicitud).toBeDefined();
    expect(component.formSolicitud.get('pagoDeDerechos.linea')?.value).toBe('123456');
    expect(component.formSolicitud.get('pagoDeDerechos.monto')?.value).toBe('');
    expect(component.formSolicitud.get('pagoDeDerechos.montoPagar')?.value).toBe('352');
    expect(component.formSolicitud.get('pagoDeDerechos.lineaCheckbox')?.value).toBe(true);
  });

  it('should disable and set value of montoPagar on campoDeDormularioDeActualizacion', () => {
    component.campoDeDormularioDeActualizacion();
    const montoPagarControl = component.formSolicitud.get('pagoDeDerechos.montoPagar');
    expect(montoPagarControl?.disabled).toBe(true);
    expect(montoPagarControl?.value).toBe('352');
  });

  it('should call setValoresStore when linea input changes', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    const lineaInput = fixture.debugElement.query(By.css('#linea')).nativeElement;
    lineaInput.value = '654321';
    lineaInput.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.formSolicitud, 'pagoDeDerechos.linea', 'setLinea');
  });

  it('should call setValoresStore when lineaCheckbox changes', () => {
    const setValoresStoreSpy = jest.spyOn(component, 'setValoresStore');
    const lineaCheckbox = fixture.debugElement.query(By.css('#lineaCheckbox')).nativeElement;
    lineaCheckbox.checked = false;
    lineaCheckbox.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(setValoresStoreSpy).toHaveBeenCalledWith(component.formSolicitud, 'pagoDeDerechos.lineaCheckbox', 'setLineaCheckbox');
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});