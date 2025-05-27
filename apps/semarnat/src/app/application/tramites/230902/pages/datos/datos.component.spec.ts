import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosComponent } from './datos.component';

describe('DatosComponent', () => {
  let component: DatosComponent;
  let fixture: ComponentFixture<DatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe inicializar los pasos correctamente', () => {
    expect(component.pasos.length).toBeGreaterThan(0);
  });

  it('debe actualizar el índice con getValorIndice', () => {
    const evento = { accion: 'cont', valor: 2 };
    component.getValorIndice(evento);
    expect(component.indice).toBe(2);
  });

  it('debe establecer esDatosRespuesta en true si no hay update', () => {
    component.consultaState = { update: false } as any;
    component.ngOnInit();
    expect(component.esDatosRespuesta).toBe(true);
  });

  it('debe limpiar las suscripciones en ngOnDestroy', () => {
    const spy = spyOn(component['destroyNotifier$'], 'next');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});