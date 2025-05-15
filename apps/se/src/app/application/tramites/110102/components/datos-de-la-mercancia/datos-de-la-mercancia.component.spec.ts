import { TestBed } from '@angular/core/testing';
import { DatosDeLaMercanciaComponent } from './datos-de-la-mercancia.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Tramite110102Store } from '../../estados/store/tramite110102.store';
import { Tramite110102Query } from '../../estados/queries/tramite110102.query';
import { of } from 'rxjs';

describe('DatosDeLaMercanciaComponent', () => {
  let component: DatosDeLaMercanciaComponent;
  let mockStore: any;
  let mockQuery: any;

  beforeEach(async () => {
    mockStore = { establecerDatos: jest.fn() };
    mockQuery = { selectTramite110102$: of({ cveRegistroProductor: '123456789012' }) };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,DatosDeLaMercanciaComponent],
      providers: [
        FormBuilder,
        { provide: Tramite110102Store, useValue: mockStore },
        { provide: Tramite110102Query, useValue: mockQuery }
      ]
    }).compileComponents();

    const FIXTURE = TestBed.createComponent(DatosDeLaMercanciaComponent);
    component = FIXTURE.componentInstance;
    FIXTURE.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit debe llamar a getValoresStore', () => {
    const SPY = jest.spyOn(component, 'getValoresStore');
    component.ngOnInit();
    expect(SPY).toHaveBeenCalled();
  });

  it('setValoresStore debe llamar a establecerDatos en el store', () => {
    component.datosDeLamercanciaFrom.get('cveRegistroProductor')?.setValue('987654321098');
    component.setValoresStore(component.datosDeLamercanciaFrom, 'cveRegistroProductor');
    expect(mockStore.establecerDatos).toHaveBeenCalledWith({ cveRegistroProductor: '987654321098' });
  });

  it('getValoresStore debe actualizar el valor del formulario desde el store', () => {
    component.datosDeLamercanciaFrom.get('cveRegistroProductor')?.setValue('');
    component.getValoresStore();
    expect(component.datosDeLamercanciaFrom.get('cveRegistroProductor')?.value).toBe('123456789012');
  });

  it('esInvalido debe retornar true si el control es inválido y tocado', () => {
    const CONTROL = component.datosDeLamercanciaFrom.get('cveRegistroProductor');
    CONTROL?.setValue('');
    CONTROL?.markAsTouched();
    expect(component.esInvalido('cveRegistroProductor')).toBe(true);
  });

  it('esInvalido debe retornar false si el control es válido', () => {
    const CONTROL = component.datosDeLamercanciaFrom.get('cveRegistroProductor');
    CONTROL?.setValue('123456789012');
    CONTROL?.markAsTouched();
    expect(component.esInvalido('cveRegistroProductor')).toBe(false);
  });

  it('actualizaGridComercializadoresProductos debe habilitar el campo si idSolicitud es null', () => {
    component.datosDeLamercanciaFrom.get('solicitud.idSolicitud')?.setValue(null);
    component.datosDeLamercanciaFrom.get('cveRegistroProductor')?.disable();
    component.actualizaGridComercializadoresProductos();
    expect(component.datosDeLamercanciaFrom.get('cveRegistroProductor')?.enabled).toBe(true);
  });

  it('actualizaGridComercializadoresProductos debe deshabilitar el campo si idSolicitud tiene valor', () => {
    component.datosDeLamercanciaFrom.get('solicitud.idSolicitud')?.setValue(1);
    component.datosDeLamercanciaFrom.get('cveRegistroProductor')?.enable();
    component.actualizaGridComercializadoresProductos();
    expect(component.datosDeLamercanciaFrom.get('cveRegistroProductor')?.disabled).toBe(true);
  });

  it('ngOnDestroy debe completar el subject destroyed$', () => {
    const SPY_NEXT = jest.spyOn((component as any).destroyed$, 'next');
    const SPY_COMPLETE = jest.spyOn((component as any).destroyed$, 'complete');
    component.ngOnDestroy();
    expect(SPY_NEXT).toHaveBeenCalled();
    expect(SPY_COMPLETE).toHaveBeenCalled();
  });
});