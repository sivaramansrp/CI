import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoUnoComponent } from './paso-uno.component';
import { CatalogosService } from '../../service/catalogos.service';
import { of } from 'rxjs';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { ReplaySubject } from 'rxjs';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let mockCatalogosService: jest.Mocked<CatalogosService>;

  beforeEach(async () => {
    mockCatalogosService = {
      obtenerTablaPlantas: jest.fn().mockReturnValue(of([])),
      obtenerTablaSector: jest.fn().mockReturnValue(of([])),
      obtenerTablaMercancia: jest.fn().mockReturnValue(of([])),
      obtenerTablaProductor: jest.fn().mockReturnValue(of([])),
    } as unknown as jest.Mocked<CatalogosService>;

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      imports: [SolicitanteComponent],
      providers: [{ provide: CatalogosService, useValue: mockCatalogosService }],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data for listaPlantasTabla on init', () => {
    component.ngOnInit();
    expect(mockCatalogosService.obtenerTablaPlantas).toHaveBeenCalled();
    expect(component.listaPlantasTabla).toEqual([]);
  });

  it('should fetch data for listaSectorTabla on init', () => {
    component.ngOnInit();
    expect(mockCatalogosService.obtenerTablaSector).toHaveBeenCalled();
    expect(component.listaSectorTabla).toEqual([]);
  });

  it('should fetch data for listaTablaMercancia on init', () => {
    component.ngOnInit();
    expect(mockCatalogosService.obtenerTablaMercancia).toHaveBeenCalled();
    expect(component.listaTablaMercancia).toEqual([]);
  });

  it('should fetch data for listaTablaProductor on init', () => {
    component.ngOnInit();
    expect(mockCatalogosService.obtenerTablaProductor).toHaveBeenCalled();
    expect(component.listaTablaProductor).toEqual([]);
  });

  it('should initialize persona and domicilioFiscal in ngAfterViewInit', () => {
    const mockSolicitanteComponent = {
      obtenerTipoPersona: jest.fn(),
    } as unknown as SolicitanteComponent;

    component.solicitante = mockSolicitanteComponent;
    component.ngAfterViewInit();

    expect(component.persona).toEqual([]);
    expect(component.domicilioFiscal).toEqual([]);
    expect(mockSolicitanteComponent.obtenerTipoPersona).toHaveBeenCalledWith(1); // Assuming `TIPO_PERSONA.MORAL_NACIONAL` is 1
  });

  it('should update indice when seleccionaTab is called', () => {
    component.seleccionaTab(2);
    expect(component.indice).toBe(2);
  });

  it('should clean up subscriptions on destroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });
});