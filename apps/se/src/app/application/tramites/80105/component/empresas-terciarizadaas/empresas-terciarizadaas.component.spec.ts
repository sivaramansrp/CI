import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpresasTerciarizadaasComponent } from './empresas-terciarizadaas.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NuevoProgramaIndustrialService } from '../../services/modalidad-terciarización.service';
import { of } from 'rxjs';

describe('EmpresasTerciarizadaasComponent', () => {
  let component: EmpresasTerciarizadaasComponent;
  let fixture: ComponentFixture<EmpresasTerciarizadaasComponent>;
  let serviceMock: jest.Mocked<NuevoProgramaIndustrialService>;
  
  beforeEach(async () => {
    serviceMock = {
      obtenerListaEstado: jest.fn().mockReturnValue(
        of({
          code: 200,
          message: 'Success',
          data: [
            { id: 1, descripcion: 'Estado 1' },
            { id: 2, descripcion: 'Estado 2' },
          ],
        })
      ),
    } as any;

    await TestBed.configureTestingModule({
      imports: [EmpresasTerciarizadaasComponent, HttpClientTestingModule],
      providers: [{ provide: NuevoProgramaIndustrialService, useValue: serviceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(EmpresasTerciarizadaasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should define correct table configuration', () => {
    expect(component.parentTablaConfig.length).toBe(11);
    expect(component.parentTablaConfig[0].encabezado).toBe('Calle');
    expect(component.parentTablaConfig[10].encabezado).toBe('Razón social');
  });

  it('should update estadosCatalogo from obtenerListaEstado()', () => {
    const mockResponse = {
      code: 200,
      message: 'Success',
      data: [
        { id: 1, descripcion: 'Estado 1' },
        { id: 2, descripcion: 'Estado 2' },
      ],
    };
    serviceMock.obtenerListaEstado.mockReturnValue(of(mockResponse));
    component.obtenerListaEstado();
    expect(serviceMock.obtenerListaEstado).toHaveBeenCalled();
    expect(component.estadosCatalogo).toEqual(mockResponse.data);
  });

  it('should not update estadosCatalogo when service returns null or undefined', () => {
    serviceMock.obtenerListaEstado.mockReturnValue(of(null as any));
    component.estadosCatalogo = [{ id: 99, descripcion: 'Preexisting' }];
    component.obtenerListaEstado();
    expect(serviceMock.obtenerListaEstado).toHaveBeenCalled();
    expect(component.estadosCatalogo).toEqual([{ id: 99, descripcion: 'Preexisting' }]);
  });

  it('should clean up destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
