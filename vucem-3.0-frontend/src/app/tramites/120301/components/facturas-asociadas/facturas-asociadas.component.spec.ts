import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { formularioAsociacionFactura } from './facturas-asociadas.component';
import { FacturasAsociadasService } from '../../../../core/services/120301/facturas-asociadas/facturas-asociadas.service';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

describe('formularioAsociacionFactura', () => {
  let component: formularioAsociacionFactura;
  let fixture: ComponentFixture<formularioAsociacionFactura>;
  let facturasAsociadasService: FacturasAsociadasService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        TableComponent,
        TituloComponent
      ],
      declarations: [formularioAsociacionFactura],
      providers: [FacturasAsociadasService]
    }).compileComponents();

    fixture = TestBed.createComponent(formularioAsociacionFactura);
    component = fixture.componentInstance;
    facturasAsociadasService = TestBed.inject(FacturasAsociadasService);
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
    spyOn(facturasAsociadasService, 'getDatos').and.returnValue(of(mockData));

    component.ngOnInit();

    expect(component.facturas).toEqual(mockData.facturas);
  });

  it('should handle error while fetching data', () => {
    spyOn(facturasAsociadasService, 'getDatos').and.returnValue(of({}));

    component.ngOnInit();

    expect(component.facturas).toEqual([]);
  });
});
