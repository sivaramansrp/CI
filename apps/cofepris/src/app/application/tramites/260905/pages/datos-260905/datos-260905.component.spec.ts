import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Datos260905Component } from './datos-260905.component';
import { of } from 'rxjs';
describe('Datos260905Component', () => {
  let component: Datos260905Component;
  let fixture: ComponentFixture<Datos260905Component>;
   let mockSolocitudService: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Datos260905Component],
    }).compileComponents();

    fixture = TestBed.createComponent(Datos260905Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    mockSolocitudService = {
      getRegistroTomaMuestrasMercanciasData: jasmine.createSpy().and.returnValue(of({ someData: 'registro' })),
      getPagoDerechos: jasmine.createSpy().and.returnValue(of({ pago: 'derechos' })),
      actualizarEstadoFormulario: jasmine.createSpy(),
      actualizarPagoDerechosFormulario: jasmine.createSpy()
    };

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have "indice" initialized to 1', () => {
    expect(component.indice).toBe(1);
  });

  it('should change "indice" when seleccionaTab is called', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);

    component.seleccionaTab(5);
    expect(component.indice).toBe(5);
  });

    it('should subscribe to consultaQuery and call guardarDatosFormulario on update = true', () => {
    spyOn(component, 'guardarDatosFormulario');
    component.ngOnInit();
    expect(component.guardarDatosFormulario).toHaveBeenCalled();
  });

  it('should call service methods and update flags in guardarDatosFormulario', () => {
    component.guardarDatosFormulario();
    expect(mockSolocitudService.getRegistroTomaMuestrasMercanciasData).toHaveBeenCalled();
    expect(mockSolocitudService.getPagoDerechos).toHaveBeenCalled();
    expect(component.esDatosRespuesta).toBeTruthy();
    expect(mockSolocitudService.actualizarEstadoFormulario).toHaveBeenCalledWith({ someData: 'registro' });
    expect(mockSolocitudService.actualizarPagoDerechosFormulario).toHaveBeenCalledWith({ pago: 'derechos' });
  });

  it('should change tab index when seleccionaTab is called', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });
  
});
