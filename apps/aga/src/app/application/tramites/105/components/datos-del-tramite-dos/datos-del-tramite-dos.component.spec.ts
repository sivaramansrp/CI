import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosDelTramiteDosComponent } from './datos-del-tramite-dos.component';

describe('DatosDelTramiteDosComponent', () => {
  let component: DatosDelTramiteDosComponent;
  let fixture: ComponentFixture<DatosDelTramiteDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosDelTramiteDosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDelTramiteDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

it('debería inicializar el formulario datosDelTramiteDos correctamente', () => {
  component.ngOnInit();
  expect(component.datosDelTramiteDos).toBeDefined();
  expect(component.datosDelTramiteDos.get('procedimientoCargaDescarga')).toBeTruthy();
  expect(component.datosDelTramiteDos.get('sistemasMedicionUbicacion')).toBeTruthy();
  expect(component.datosDelTramiteDos.get('motivoNoDespachoAduana')).toBeTruthy();
  expect(component.datosDelTramiteDos.get('operaciones')).toBeTruthy();
});

it('debería inicializar el formulario agenteForm correctamente', () => {
  component.ngOnInit();
  expect(component.agenteForm).toBeDefined();
  expect(component.agenteForm.get('nombres')).toBeTruthy();
  expect(component.agenteForm.get('primerApellido')).toBeTruthy();
  expect(component.agenteForm.get('segundoApellido')).toBeTruthy();
  expect(component.agenteForm.get('numeroPatente')).toBeTruthy();
});

it('debería cerrar el modal al llamar cerrarModal', () => {
  const closeModalSpy = jest.spyOn(component.closeModal.nativeElement, 'click');
  component.cerrarModal();
  expect(closeModalSpy).toHaveBeenCalled();
});

it('debería obtener los datos de mercancías correctamente', () => {
  component.obtenerMercancia();
  expect(component.mercanciaHeaderData).toEqual(component.getMercanciaTableData.mercanciaTabledos.tableHeader);
  expect(component.mercanciaBodyData).toEqual(component.getMercanciaTableData.mercanciaTabledos.tableBody);
});

it('debería agregar mercancías a la tabla y resetear el formulario', () => {
  component.agenteForm.setValue({
    nombres: 'Juan',
    primerApellido: 'Pérez',
    segundoApellido: 'Gómez',
    numeroPatente: '12345',
  });
  component.agregarMercancias();
  expect(component.getMercanciaTableData.mercanciaTabledos.tableBody).toContainEqual({
    nombres: 'Juan',
    primerApellido: 'Pérez',
    segundoApellido: 'Gómez',
    numeroPatente: '12345',
  });
  expect(component.agenteForm.valid).toBeFalsy();
});

it('no debería agregar mercancías si el formulario no es válido', () => {
  component.agenteForm.setValue({
    nombres: '',
    primerApellido: '',
    segundoApellido: '',
    numeroPatente: '',
  });
  const initialLength = component.getMercanciaTableData.mercanciaTabledos.tableBody.length;
  component.agregarMercancias();
  expect(component.getMercanciaTableData.mercanciaTabledos.tableBody.length).toBe(initialLength);
});

it('debería llamar al servicio para obtener operaciones en getOperaciones', () => {
  const invoCarServiceSpy = jest.spyOn(component['invoCarService'], 'getPais').mockReturnValue({
    subscribe: jest.fn((callback) => callback({ code: 200, data: [] })),
  } as any);
  component.getOperaciones();
  expect(invoCarServiceSpy).toHaveBeenCalled();
});

it('debería limpiar las suscripciones al destruir el componente', () => {
  const subscriptionSpy = jest.spyOn(component.subscriptionS, 'unsubscribe');
  component.ngOnDestroy();
  expect(subscriptionSpy).toHaveBeenCalled();
  component.subscriptions.forEach((sub) => {
    expect(sub.closed).toBeTruthy();
  });
});
});
