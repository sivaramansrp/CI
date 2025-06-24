import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subject } from 'rxjs';
import { EmpresasTerciarizadaasComponent } from '../../component/empresas-terciarizadaas/empresas-terciarizadaas.component';
import { NuevoProgramaIndustrialService } from '../../services/modalidad-terciarización.service';

describe('EmpresasTerciarizadaasComponent', () => {
  let component: EmpresasTerciarizadaasComponent;
  let fixture: ComponentFixture<EmpresasTerciarizadaasComponent>;
  let mockService: any;

  beforeEach(async () => {
    mockService = {
      obtenerListaEstado: jest.fn().mockReturnValue(of({ data: [{ id: 1, nombre: 'Estado 1' }] }))
    };

    await TestBed.configureTestingModule({
      imports: [EmpresasTerciarizadaasComponent],
      providers: [
        { provide: NuevoProgramaIndustrialService, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmpresasTerciarizadaasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debe llamar obtenerListaEstado al inicializar y asignar estadosCatalogo', () => {
    expect(mockService.obtenerListaEstado).toHaveBeenCalled();
    expect(component.estadosCatalogo).toEqual([{ id: 1, nombre: 'Estado 1' }]);
  });

  it('debe actualizar estadosCatalogo cuando obtenerListaEstado recibe respuesta', () => {
    component.estadosCatalogo = [];
    mockService.obtenerListaEstado.mockReturnValue(of({ data: [{ id: 2, nombre: 'Estado 2' }] }));
    component.obtenerListaEstado();
    expect(component.estadosCatalogo).toEqual([{ id: 2, nombre: 'Estado 2' }]);
  });

  it('debe limpiar las suscripciones al destruir el componente', () => {
    const spyNext = jest.spyOn<any, any>(component['destroyNotifier$'], 'next');
    const spyComplete = jest.spyOn<any, any>(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});