import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { CapturarFacturasComponent } from './capturar-facturas.component';
import { CapturarFacturasService } from 'libs/shared/data-access-user/src/core/services/120301/capturar-facturas/capturar-facturas.service';
import { TableComponent } from 'libs/shared/data-access-user/src/tramites/components/table/table.component';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { SelectCatalogosComponent } from 'libs/shared/data-access-user/src/tramites/components/select-catalogos/select-catalogos.component';
import { InputFechaComponent } from 'libs/shared/data-access-user/src/tramites/components/input-fecha/input-fecha.component';

describe('CapturarFacturasComponent', () => {
  let component: CapturarFacturasComponent;
  let fixture: ComponentFixture<CapturarFacturasComponent>;
  let capturarFacturasService: CapturarFacturasService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        TableComponent,
        TituloComponent,
        SelectCatalogosComponent,
        InputFechaComponent
      ],
      declarations: [CapturarFacturasComponent],
      providers: [CapturarFacturasService]
    }).compileComponents();

    fixture = TestBed.createComponent(CapturarFacturasComponent);
    component = fixture.componentInstance;
    capturarFacturasService = TestBed.inject(CapturarFacturasService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data on init', () => {
    const mockData = {
      facturas: [
        { tbodyData: ['prueba107112024', 'RAZON SOCIAL CONSIGNATARIO CONSIGNATARIO', 'CALLE', '2024-11-07 00:00:00.0', '100', '9', 'Kilogramo', '100.0'] },
        { tbodyData: ['3434324', 'FACTURA', 'CALLE', '2024-10-14 00:00:00.0', '999999', '999990', 'Kilogramo', '3213.0'] }
      ]
    };
    spyOn(capturarFacturasService, 'getDatos').and.returnValue(of(mockData));

    component.ngOnInit();

    expect(component.facturas).toEqual(mockData.facturas);
  });

  it('should handle error while fetching data', () => {
    spyOn(capturarFacturasService, 'getDatos').and.returnValue(of({}));

    component.ngOnInit();

    expect(component.facturas).toEqual([]);
  });

  it('should fetch unidad de medida data', () => {
    const mockUnidadDeMedida = {
      data: [
        { id: 1, descripcion: 'Kilogramo', tam: 'Grande', dpi: 'Nacional', value: 'KG' },
        { id: 2, descripcion: 'Litro', tam: 'Mediano', dpi: 'Internacional', value: 'L' }
      ]
    };
    spyOn(component['httpServicios'], 'get').and.returnValue(of(mockUnidadDeMedida));

    component.obtenerIngresoSelectList();

    expect(component.unidadDeMedida.catalogos).toEqual(mockUnidadDeMedida.data);
  });

  it('should handle error while fetching unidad de medida data', () => {
    spyOn(component['httpServicios'], 'get').and.returnValue(of({}));

    component.obtenerIngresoSelectList();

    expect(component.unidadDeMedida.catalogos).toEqual([]);
  });
});