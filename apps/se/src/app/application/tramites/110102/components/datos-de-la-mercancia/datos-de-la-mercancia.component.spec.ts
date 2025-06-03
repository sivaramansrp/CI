import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DatosDeLaMercanciaComponent } from './datos-de-la-mercancia.component';
import { Tramite110102Store } from '../../estados/store/tramite110102.store';
import { Tramite110102Query } from '../../estados/queries/tramite110102.query';
import { of } from 'rxjs';
import { NotificacionesComponent } from '@ng-mf/data-access-user';

describe('DatosDeLaMercanciaComponent', () => {
  let component: DatosDeLaMercanciaComponent;
  let fixture: ComponentFixture<DatosDeLaMercanciaComponent>;
  let storeMock: any;
  let queryMock: any;

  beforeEach(async () => {
    storeMock = {
      establecerDatos: jest.fn(),
    };

    queryMock = {
      selectTramite110102$: of({
        cveRegistroProductor: '123456',
      }),
    };

    await TestBed.configureTestingModule({
      imports: [
        DatosDeLaMercanciaComponent,
        ReactiveFormsModule,
        CommonModule,
        NotificacionesComponent,
      ],
      providers: [
        FormBuilder,
        { provide: Tramite110102Store, useValue: storeMock },
        { provide: Tramite110102Query, useValue: queryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario con valores por defecto', () => {
    expect(component.formularioDatosMercancia).toBeDefined();
    expect(component.formularioDatosMercancia.get('cveRegistroProductor')?.value).toBe('123456');
    expect(component.formularioDatosMercancia.get('solicitud.idSolicitud')?.value).toBeNull();
    expect(component.formularioDatosMercancia.get('solicitud.idSolicitudProductor')?.value).toBe('');
  });

  it('debe establecer valores en el store al llamar establecerValoresEnEstado', () => {
    component.formularioDatosMercancia.get('cveRegistroProductor')?.setValue('654321');
    component.establecerValoresEnEstado(component.formularioDatosMercancia, 'cveRegistroProductor');
    expect(storeMock.establecerDatos).toHaveBeenCalledWith({ cveRegistroProductor: '654321' });
  });

  it('debe obtener valores del store y asignarlos al formulario', () => {
    component.obtenerValoresDelEstado();
    expect(component.formularioDatosMercancia.get('cveRegistroProductor')?.value).toBe('123456');
  });

  it('debe retornar true si un control es inválido', () => {
    const CONTROL_NAME = 'cveRegistroProductor';
    component.formularioDatosMercancia.get(CONTROL_NAME)?.markAsTouched();
    component.formularioDatosMercancia.get(CONTROL_NAME)?.setValue('');
    expect(component.esControlInvalido(CONTROL_NAME)).toBe(true);
  });

  it('debe retornar false si un control es válido', () => {
    const CONTROL_NAME = 'cveRegistroProductor';
    component.formularioDatosMercancia.get(CONTROL_NAME)?.markAsTouched();
    component.formularioDatosMercancia.get(CONTROL_NAME)?.setValue('123456');
    expect(component.esControlInvalido(CONTROL_NAME)).toBe(false);
  });

  it('debe mostrar la notificación correcta si cveRegistroProductor tiene un error de patrón', () => {
    component.formularioDatosMercancia.get('cveRegistroProductor')?.setValue('invalid');
    component.actualizarGridComercializadores();
    expect(component.alertaNotificacion.mensaje).toBe('Debe introducir la clave de registro.');
  });

  it('debe mostrar la notificación correcta si cveRegistroProductor no coincide con el valor esperado', () => {
    component.formularioDatosMercancia.get('cveRegistroProductor')?.setValue('999999');
    component.actualizarGridComercializadores();
    expect(component.alertaNotificacion.mensaje).toBe(
      'El número de registro proporcionado no existe, no se encuentra vigente o no tiene dado de alta el RFC del comercializador. Favor de verificar.'
    );
  });

  it('debe completar el subject destruido$ al destruir el componente', () => {
    const NEXT_SPY = jest.spyOn(component['destruido$'], 'next');
    const COMPLETE_SPY = jest.spyOn(component['destruido$'], 'complete');
    component.ngOnDestroy();
    expect(NEXT_SPY).toHaveBeenCalled();
    expect(COMPLETE_SPY).toHaveBeenCalled();
  });

  it('debe habilitar cveRegistroProductor si idSolicitud es null', () => {
    component.formularioDatosMercancia.get('solicitud.idSolicitud')?.setValue(null);
    component.formularioDatosMercancia.get('cveRegistroProductor')?.disable();
    component.habilitarDeshabilitarFormulario();
    expect(component.formularioDatosMercancia.get('cveRegistroProductor')?.enabled).toBe(true);
  });

  it('debe deshabilitar cveRegistroProductor si idSolicitud no es null', () => {
    component.formularioDatosMercancia.get('solicitud.idSolicitud')?.setValue(1);
    component.formularioDatosMercancia.get('cveRegistroProductor')?.enable();
    component.habilitarDeshabilitarFormulario();
    expect(component.formularioDatosMercancia.get('cveRegistroProductor')?.disabled).toBe(true);
  });
});