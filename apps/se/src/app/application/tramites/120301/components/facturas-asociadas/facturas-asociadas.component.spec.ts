import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FacturasAsociadasService } from '../../services/facturas-asociadas/facturas-asociadas.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from 'libs/shared/data-access-user/src/tramites/components/table/table.component';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { formularioAsociacionFactura } from './facturas-asociadas.component';
import { of, throwError } from 'rxjs';

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
    const MOCKDATA = {
      facturasDisponible: [
        { tbodyData: ['prueba107112024', 'RAZON SOCIAL CONSIGNATARIO CONSIGNATARIO', 'CALLE', '2024-11-07 00:00:00.0', '100', '9', 'Kilogramo', '100.0'] }
      ],
      facturasAsociadas: [
        { tbodyData: ['3434324', 'FACTURA', 'CALLE', '2024-10-14 00:00:00.0', '999999', '999990', 'Kilogramo', '3213.0'] }
      ]
    };
    spyOn(facturasAsociadasService, 'getDatos').and.returnValue(of(MOCKDATA));

    component.ngOnInit();

    expect(component.facturasDisponible).toEqual(MOCKDATA.facturasDisponible);
    expect(component.facturasAsociadas).toEqual(MOCKDATA.facturasAsociadas);
  });

  it('should handle error while fetching data', () => {
    spyOn(facturasAsociadasService, 'getDatos').and.returnValue(throwError('error'));

    component.ngOnInit();

    expect(component.facturasDisponible).toEqual([]);
    expect(component.facturasAsociadas).toEqual([]);
  });

  it('should initialize form with default values', () => {
    component.ngOnInit();
    expect(component.formularioAsociacionFactura.value).toEqual({ cantidad: '' });
  });

  it('should have a valid form when cantidad is provided', () => {
    component.ngOnInit();
    component.formularioAsociacionFactura.controls['cantidad'].setValue('10');
    expect(component.formularioAsociacionFactura.valid).toBeTruthy();
  });

  it('should have an invalid form when cantidad is empty', () => {
    component.ngOnInit();
    component.formularioAsociacionFactura.controls['cantidad'].setValue('');
    expect(component.formularioAsociacionFactura.invalid).toBeTruthy();
  });
});