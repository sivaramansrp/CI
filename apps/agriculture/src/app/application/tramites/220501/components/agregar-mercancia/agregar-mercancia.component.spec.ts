import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AgregarMercanciaComponent } from './agregar-mercancia.component';
import { Solicitud220501Query } from '../../estados/tramites220501.query';
import { Solicitud220501Store } from '../../estados/tramites220501.store';
import { of } from 'rxjs';

describe('AgregarMercanciaComponent', () => {
  let component: AgregarMercanciaComponent;
  let fixture: ComponentFixture<AgregarMercanciaComponent>;
  let solicitudQueryMock: any;
  let solicitudStoreMock: any;

  beforeEach(async () => {
    solicitudQueryMock = {
      selectSolicitud$: of({
        fraccionArancelaria: '1234',
        descripcionFraccion: 'Test Description',
        nico: '5678',
        descripcion: 'Test Mercancia',
        unidaddeMedidaDeUMT: 'kg',
        cantidadTotalUMT: '100',
        saldoPendiente: '50',
        saldoACapturar: '10'
      })
    };

    solicitudStoreMock = {
      setSaldoACapturar: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule, 
        ToastrModule.forRoot(),
        AgregarMercanciaComponent
      ],
      providers: [
        FormBuilder,
        { provide: Solicitud220501Query, useValue: solicitudQueryMock },
        { provide: Solicitud220501Store, useValue: solicitudStoreMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AgregarMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form in crearFormulario', () => {
    component.crearFormulario();
    expect(component.agregarMercanciaForm).toBeDefined();
    expect(component.agregarMercanciaForm.get('fraccionArancelaria')?.value).toBe('1234');
    expect(component.agregarMercanciaForm.get('descripcionFraccion')?.value).toBe('Test Description');
  });

  it('should patch form values when selectSolicitud$ emits', () => {
    expect(component.agregarMercanciaForm.get('saldoACapturar')?.value).toBe('10');
  });

  it('should call setSaldoACapturar when setSaldoACapturar is triggered', () => {
    const event = { target: { value: '20' } } as any;
    component.setSaldoACapturar(event);
    expect(solicitudStoreMock.setSaldoACapturar).toHaveBeenCalledWith('20');
  });

  it('should emit cancelarEvento when cerrarModal is called', () => {
    const cancelarEventoSpy = jest.spyOn(component.cancelarEvento, 'emit');
    component.cerrarModal(true);
    expect(cancelarEventoSpy).toHaveBeenCalledWith(false);
  });

  it('should unsubscribe from observables on ngOnDestroy', () => {
    const destroyedSpy = jest.spyOn((component as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');

    component.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
