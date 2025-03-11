import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AlertComponent, CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CATALOGOS_ID } from '@ng-mf/data-access-user';
import { DatosDonanteExtranjeroComponent } from './datos-donante-extranjero.component';
import { DonacionesExtranjerasService } from '../../services/donaciones-extranjeras/donaciones-extranjeras.service';

describe('DatosDonanteExtranjeroComponent', () => {
  let component: DatosDonanteExtranjeroComponent;
  let fixture: ComponentFixture<DatosDonanteExtranjeroComponent>;
  let donacionesExtranjerasService: jest.Mocked<DonacionesExtranjerasService>;

  // Mock del servicio DonacionesExtranjerasService
  const DONACIONES_EXTRANJERAS_SERVICE_MOCK = {
    getPaises: jest.fn().mockReturnValue(of({ data: [{ id: 1, descripcion: 'México' }] })),
    getDocumentoResidencia: jest.fn().mockReturnValue(of({ data: [{ id: 1, descripcion: 'Tarjeta de Residencia' }] }))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DatosDonanteExtranjeroComponent, CatalogoSelectComponent, AlertComponent],
      providers: [
        { provide: DonacionesExtranjerasService, useValue: DONACIONES_EXTRANJERAS_SERVICE_MOCK }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(DatosDonanteExtranjeroComponent);
    component = fixture.componentInstance;
    donacionesExtranjerasService = TestBed.inject(DonacionesExtranjerasService) as jest.Mocked<DonacionesExtranjerasService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call inicializaCatalogos method once on ngOnInit', () => {
    jest.spyOn(component, 'inicializaCatalogos').mockImplementation(() => {
      component.pais = [{ id: 1, descripcion: 'México' }];
      component.cveDocumentoResidencia = [{ id: 1, descripcion: 'Tarjeta de Residencia' }];
    });

    component.ngOnInit();

    // Asegúrese de que el método se llame solo una vez durante la inicialización
    expect(component.inicializaCatalogos).toHaveBeenCalledTimes(1);
  });

  it('should initialize the pais catalog correctly', () => {
    component.ngOnInit();
    expect(component.pais).toEqual([{ id: 1, descripcion: 'México' }]);
  });

  it('should initialize the documento de residencia catalog correctly', () => {
    component.ngOnInit();
    expect(component.cveDocumentoResidencia).toEqual([{ id: 1, descripcion: 'Tarjeta de Residencia' }]);
  });

  it('should call the getPaises and getDocumentoResidencia methods on ngOnInit', () => {
    component.ngOnInit();

    // Verificar que se llamaron los métodos del servicio
    expect(donacionesExtranjerasService.getPaises).toHaveBeenCalledWith(CATALOGOS_ID.CAT_PAIS);
    expect(donacionesExtranjerasService.getDocumentoResidencia).toHaveBeenCalledWith(CATALOGOS_ID.CAT_DOCUMENTO_RESIDENCIA);
  });

  it('should map the correct data for pais and documento residencia', () => {
    // Llame a ngOnInit para inicializar los datos
    component.ngOnInit();

    // Verifique si los valores para países y documentos de residencia están configurados correctamente
    expect(component.pais).toEqual([{ id: 1, descripcion: 'México' }]);
    expect(component.cveDocumentoResidencia).toEqual([{ id: 1, descripcion: 'Tarjeta de Residencia' }]);
  });

  it('should not call getPaises or getDocumentoResidencia if ngOnInit is not called', () => {
    // Verifique que los métodos del servicio no se llamen antes de ngOnInit
    expect(donacionesExtranjerasService.getPaises).not.toHaveBeenCalled();
    expect(donacionesExtranjerasService.getDocumentoResidencia).not.toHaveBeenCalled();
  });
});
