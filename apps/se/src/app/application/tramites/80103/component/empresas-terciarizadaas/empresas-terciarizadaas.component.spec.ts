import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpresasTerciarizadaasComponent } from './empresas-terciarizadaas.component';
import { NuevoProgramaIndustrialService } from '../../services/modalidad-albergue.service';
import { of } from 'rxjs';
import { Catalogo } from '@libs/shared/data-access-user/src';

describe('EmpresasTerciarizadaasComponent (Jest)', () => {
  let component: EmpresasTerciarizadaasComponent;
  let fixture: ComponentFixture<EmpresasTerciarizadaasComponent>;
  let mockService: Partial<NuevoProgramaIndustrialService>;

  const ESTADOS_MOCK: Catalogo[] = [
    { id: 1, descripcion: 'CDMX' },
    { id: 2, descripcion: 'Nuevo León' },
  ];

  beforeEach(async () => {
    mockService = {
      obtenerListaEstado: jest.fn().mockReturnValue(of({ data: ESTADOS_MOCK })),
    };

    await TestBed.configureTestingModule({
      imports: [EmpresasTerciarizadaasComponent],
      providers: [
        { provide: NuevoProgramaIndustrialService, useValue: mockService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EmpresasTerciarizadaasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call obtenerListaEstado() and populate estadosCatalogo', () => {
    component.obtenerListaEstado();
    expect(mockService.obtenerListaEstado).toHaveBeenCalled();
    expect(component.estadosCatalogo).toEqual(ESTADOS_MOCK);
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should have correct table configuration headers and order', () => {
    const headers = component.parentTablaConfig.map(col => col.encabezado);
    expect(headers).toEqual([
      'Calle',
      'Número exterior',
      'Número interior',
      'Código postal',
      'Colonia',
      'Municipio o delegación',
      'Entidad federativa',
      'País',
      'Registro federal de contribuyentes',
      'Domicilio fiscal del solicitante',
      'Razón social',
    ]);

    const orders = component.parentTablaConfig.map(col => col.orden);
    expect(orders).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  });
});
