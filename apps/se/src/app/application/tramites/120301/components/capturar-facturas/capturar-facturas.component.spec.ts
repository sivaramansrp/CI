import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapturarFacturasComponent } from './capturar-facturas.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InputFechaComponent } from 'libs/shared/data-access-user/src/tramites/components/input-fecha/input-fecha.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SelectCatalogosComponent } from 'libs/shared/data-access-user/src/tramites/components/select-catalogos/select-catalogos.component';
import { TableComponent } from 'libs/shared/data-access-user/src/tramites/components/table/table.component';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { of, throwError } from 'rxjs';

describe('CapturarFacturasComponent', () => {
  let component: CapturarFacturasComponent;
  let fixture: ComponentFixture<CapturarFacturasComponent>;
  let httpServicios: HttpClient;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        CapturarFacturasComponent
      ],
      declarations: [
        TableComponent,
        TituloComponent,
        SelectCatalogosComponent,
        InputFechaComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CapturarFacturasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    httpServicios = TestBed.inject(HttpClient);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch unidad de medida data', () => {
    const mockUnidadDeMedida = {
      data: [
        { id: 1, descripcion: 'Kilogramo', tam: 'Grande', dpi: 'Nacional', value: 'KG' },
        { id: 2, descripcion: 'Litro', tam: 'Mediano', dpi: 'Internacional', value: 'L' }
      ]
    };
    jest.spyOn(httpServicios, 'get').mockReturnValue(of(mockUnidadDeMedida));

    component.obtenerIngresoSelectList();

    expect(component.unidadDeMedida).toEqual(mockUnidadDeMedida.data);
  });

  it('should handle error while fetching unidad de medida data', () => {
    jest.spyOn(httpServicios, 'get').mockReturnValue(throwError(new Error('API Error')));

    component.obtenerIngresoSelectList();

    expect(component.unidadDeMedida).toEqual([]); // Ensure it properly resets on error
  });
});
