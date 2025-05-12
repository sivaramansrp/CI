import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BitacoraComponent } from './bitacora.component';
import { CatalogosService } from '../../service/catalogos.service';
import { of } from 'rxjs';
import { BitacoraTablaComponent } from '../../../../shared/components/bitacora/bitacora.component';
import { PlantasComponent } from '../../../../shared/components/plantas/plantas.component';
import { SectorComponent } from '../../../../shared/components/sector/sector.component';
import { ProducirMercanciasComponent } from '../../../../shared/components/producir-mercancias/producir-mercancias.component';
import { ProductorIndirectoComponent } from '../../../../shared/components/productor-indirecto/productor-indirecto.component';

describe('BitacoraComponent', () => {
  let component: BitacoraComponent;
  let fixture: ComponentFixture<BitacoraComponent>;
  let mockCatalogosService: jest.Mocked<CatalogosService>;

  beforeEach(async () => {
    mockCatalogosService = {
      obtenerTablaBitacora: jest.fn().mockReturnValue(of([])),
      obtenerTablaPlantas: jest.fn().mockReturnValue(of([])),
      obtenerTablaSector: jest.fn().mockReturnValue(of([])),
      obtenerTablaMercancia: jest.fn().mockReturnValue(of([])),
      obtenerTablaProductor: jest.fn().mockReturnValue(of([])),
    } as unknown as jest.Mocked<CatalogosService>;

    await TestBed.configureTestingModule({
      imports: [
        BitacoraComponent,
        BitacoraTablaComponent,
        PlantasComponent,
        SectorComponent,
        ProducirMercanciasComponent,
        ProductorIndirectoComponent,
      ],
      providers: [{ provide: CatalogosService, useValue: mockCatalogosService }],
    }).compileComponents();

    fixture = TestBed.createComponent(BitacoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data for listaTablaBitacora on init', () => {
    component.ngOnInit();
    expect(mockCatalogosService.obtenerTablaBitacora).toHaveBeenCalled();
    expect(component.listaTablaBitacora).toEqual([]);
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

  it('should clean up subscriptions on destroy', () => {
    const destroyedSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(destroyedSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });
});