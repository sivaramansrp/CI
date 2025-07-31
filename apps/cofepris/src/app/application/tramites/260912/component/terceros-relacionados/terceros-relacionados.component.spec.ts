import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { TercerosRelacionadosComponent } from './terceros-relacionados.component';
import { CommonModule } from '@angular/common';
import { TituloComponent, TablaDinamicaComponent, TableComponent, ConsultaioQuery } from '@ng-mf/data-access-user';
import { AlertComponent } from 'libs/shared/data-access-user/src/tramites/components/alert/alert.component';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpClientTestingModule } from '@angular/common/http/testing'; 
import { CapturarColumns } from '../../modelos/fabricante-datos.model';
import { DestinatarioCapturarColumns } from '../../modelos/destinatario-datos.model';
import { TercerosRelacionadosService } from '../../services/terceros-relacionados.service';

describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let fixture: ComponentFixture<TercerosRelacionadosComponent>;
  let tercerosServiceSpy: jest.Mocked<TercerosRelacionadosService>;
 
  const mockFabricanteData: CapturarColumns[] = [
    {
      colonia: "OTRA NO ESPECIFICADA EN EL CATÁLOGO",
      coloniaOEquivalente: "---",
      codigoPostal: "56979",
      entidadFederativa: "MÉXICO",
      estadoLocalidad: "---",
      localidad: "LAS DELICIAS",
      municipioOAlcaldia: "ATLAUTLA",
      nombreDenominacionORazonSocial: "AGRICOLA ALPE, S DE RL DE CV",
      pais: "MEXICO(ESTADOS UNIDOS MEXICANOS)",
      calle: "Ok",
      correoElectronico: "D@GMAIL.COM",
      curp: "---",
      numeroExterior: 23,
      numeroInterior: 33,
      rfc: "AAL0409235E6",
      telefono: 3333333333,
    }
  ];
 
  const mockDestinatarioData: DestinatarioCapturarColumns[] = [
    {
      colonia: "OTRA NO ESPECIFICADA EN EL CATÁLOGO",
      coloniaOEquivalente: "---",
      codigoPostal: "56979",
      entidadFederativa: "MÉXICO",
      estadoLocalidad: "---",
      localidad: "LAS DELICIAS",
      municipioOAlcaldia: "ATLAUTLA",
      nombreDenominacionORazonSocial: "AGRICOLA ALPE, S DE RL DE CV",
      pais: "MEXICO(ESTADOS UNIDOS MEXICANOS)",
      calle: "Ok",
      correoElectronico: "D@GMAIL.COM",
      curp: "---",
      numeroExterior: 23,
      numeroInterior: 33,
      rfc: "AAL0409235E6",
      telefono: 3333333333,
    },
  ];
 
  beforeEach(async () => {
    const spy = {
      obtenerInformaciónDeTablaDeFabricantes: jest.fn().mockReturnValue(of(mockFabricanteData)),
      obtenerInformacionDeTablaDeDestinatraios: jest.fn().mockReturnValue(of(mockDestinatarioData)),
      obtenerInformacionDeTablaDeproveedors: jest.fn().mockReturnValue(of([])),
      obtenerInformacionDeTablaDeFacturadores: jest.fn().mockReturnValue(of([]))
    };

    const consultaioQuerySpy = {
      selectConsultaioState$: of({ readonly: false })
    };
 
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientTestingModule,
        TercerosRelacionadosComponent,
        TituloComponent,
        AlertComponent,
        TablaDinamicaComponent,
        TableComponent
      ],
      providers: [
        { provide: TercerosRelacionadosService, useValue: spy },
        { provide: ConsultaioQuery, useValue: consultaioQuerySpy }
      ]
    })
    .overrideComponent(TercerosRelacionadosComponent, {
      set: {
        providers: []
      }
    })
    .compileComponents();
 
    tercerosServiceSpy = TestBed.inject(TercerosRelacionadosService) as jest.Mocked<TercerosRelacionadosService>;
 
    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
 
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
 
  it('should initialize properly on ngOnInit', () => {
    const fabricanteDataSpy = jest.spyOn(component, 'obtenerFabricanteTableIData');
    const destinatarioDataSpy = jest.spyOn(component, 'obtenerDestinatarioTableIData');
 
    component.ngOnInit();
 
    expect(fabricanteDataSpy).toHaveBeenCalledTimes(1);
    expect(destinatarioDataSpy).toHaveBeenCalledTimes(1);
  });
 
  it('should fetch fabricante data and assign it to fabricantedatosTabla', fakeAsync(() => {
    // Limpiar llamadas previas de ngOnInit
    tercerosServiceSpy.obtenerInformaciónDeTablaDeFabricantes.mockClear();
    
    component.obtenerFabricanteTableIData();
    tick();

    expect(tercerosServiceSpy.obtenerInformaciónDeTablaDeFabricantes).toHaveBeenCalledTimes(1);
    expect(component.fabricantedatosTabla).toEqual(mockFabricanteData);
  })); 
  it('should fetch destinatario data and assign it to destinatarioDatosTabla', fakeAsync(() => {
    // Limpiar llamadas previas de ngOnInit
    tercerosServiceSpy.obtenerInformacionDeTablaDeDestinatraios.mockClear();
    
    component.obtenerDestinatarioTableIData();
    tick();
    
    expect(tercerosServiceSpy.obtenerInformacionDeTablaDeDestinatraios).toHaveBeenCalledTimes(1);
    expect(component.destinatarioDatosTabla).toEqual(mockDestinatarioData);
  }));
 
  it('should properly complete subscription on ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');
 
    component.ngOnDestroy();
 
    expect(nextSpy).toHaveBeenCalledTimes(1);
    expect(completeSpy).toHaveBeenCalledTimes(1);
  });
});