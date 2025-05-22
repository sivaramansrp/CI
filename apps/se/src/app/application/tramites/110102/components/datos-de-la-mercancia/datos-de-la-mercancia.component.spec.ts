import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { DatosDeLaMercanciaComponent } from './datos-de-la-mercancia.component';
import { Tramite110102Store } from '../../estados/store/tramite110102.store';
import { Tramite110102Query } from '../../estados/queries/tramite110102.query';
import { of } from 'rxjs';

describe('DatosDeLaMercanciaComponent', () => {
  let component: DatosDeLaMercanciaComponent;
  let fixture: ComponentFixture<DatosDeLaMercanciaComponent>;
  let storeMock: any;
  let queryMock: any;

  beforeEach(async () => {
    storeMock = {
      setCveRegistroProductor: jest.fn()
    };

    queryMock = {
      selectTramite110102$: of({
        cveRegistroProductor: '123456'
      })
    };

    await TestBed.configureTestingModule({
      imports: [
        DatosDeLaMercanciaComponent,
        ReactiveFormsModule,
        CommonModule
      ],
      providers: [
        FormBuilder,
        { provide: Tramite110102Store, useValue: storeMock },
        { provide: Tramite110102Query, useValue: queryMock }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosDeLaMercanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar el formulario con valores por defecto', () => {
    expect(component.datosDeLamercanciaFrom).toBeDefined();
    expect(component.datosDeLamercanciaFrom.get('cveRegistroProductor')?.value).toBe('123456');
    expect(component.datosDeLamercanciaFrom.get('solicitud.idSolicitud')?.value).toBeNull();
    expect(component.datosDeLamercanciaFrom.get('solicitud.idSolicitudProductor')?.value).toBe('');
  });

  it('debe establecer valores en el store al llamar setValoresStore', () => {
    component.datosDeLamercanciaFrom.get('cveRegistroProductor')?.setValue('654321');
    component.setValoresStore(component.datosDeLamercanciaFrom, 'cveRegistroProductor', 'setCveRegistroProductor');
    expect(storeMock.setCveRegistroProductor).toHaveBeenCalledWith('654321');
  });

  it('debe obtener valores del store y asignarlos al formulario', () => {
    component.getValoresStore();
    expect(component.datosDeLamercanciaFrom.get('cveRegistroProductor')?.value).toBe('123456');
  });

  it('debe retornar true si un control es inválido', () => {
    const CONTROL_NAME = 'cveRegistroProductor';
    component.datosDeLamercanciaFrom.get(CONTROL_NAME)?.markAsTouched();
    component.datosDeLamercanciaFrom.get(CONTROL_NAME)?.setValue('');
    expect(component.esInvalido(CONTROL_NAME)).toBe(true);
  });

  it('debe retornar false si un control es válido', () => {
    const CONTROL_NAME = 'cveRegistroProductor';
    component.datosDeLamercanciaFrom.get(CONTROL_NAME)?.markAsTouched();
    component.datosDeLamercanciaFrom.get(CONTROL_NAME)?.setValue('123456');
    expect(component.esInvalido(CONTROL_NAME)).toBe(false);
  });

  it('debe habilitar cveRegistroProductor si idSolicitud es null', () => {
    component.datosDeLamercanciaFrom.get('solicitud.idSolicitud')?.setValue(null);
    component.actualizaGridComercializadoresProductos();
    expect(component.datosDeLamercanciaFrom.get('cveRegistroProductor')?.enabled).toBe(true);
  });

  it('debe deshabilitar cveRegistroProductor si idSolicitud no es null', () => {
    component.datosDeLamercanciaFrom.get('solicitud.idSolicitud')?.setValue(1);
    component.actualizaGridComercializadoresProductos();
    expect(component.datosDeLamercanciaFrom.get('cveRegistroProductor')?.disabled).toBe(true);
  });

  it('debe mostrar la notificación correcta si cveRegistroProductor tiene un error de patrón', () => {
    component.datosDeLamercanciaFrom.get('cveRegistroProductor')?.setValue('invalid');
    component.actualizaGridComercializadoresProductos();
    expect(component.nuevaAlertaNotificacion.mensaje).toBe('Debe introducir la clave de registro.');
  });

  it('debe mostrar la notificación correcta si cveRegistroProductor no coincide con el valor esperado', () => {
    component.datosDeLamercanciaFrom.get('cveRegistroProductor')?.setValue('999999');
    component.actualizaGridComercializadoresProductos();
    expect(component.nuevaAlertaNotificacion.mensaje).toBe(
      'El número de registro proporcionado no existe, no se encuentra vigente o no tiene dado de alta el RFC del comercializador. Favor de verificar.'
    );
  });

  it('debe completar el subject destroyed$ al destruir el componente', () => {
    const NEXT_SPY = jest.spyOn(component['destroyed$'], 'next');
    const COMPLETE_SPY = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(NEXT_SPY).toHaveBeenCalled();
    expect(COMPLETE_SPY).toHaveBeenCalled();
  });
});