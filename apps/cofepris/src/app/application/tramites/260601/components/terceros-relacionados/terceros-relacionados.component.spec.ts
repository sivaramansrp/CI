import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TercerosRelacionadosComponent } from './terceros-relacionados.component';
import fabricanteTable from '@libs/shared/theme/assets/json/260601/fabricante-table.json';
import proveedorTable from '@libs/shared/theme/assets/json/260601/proveedor-table.json';
import { TERCEROR_TEXTO_DE_ALERTA } from '../../constantes/aviso-enum';
import { HttpClientModule } from '@angular/common/http';

describe('TercerosRelacionadosComponent', () => {
  let component: TercerosRelacionadosComponent;
  let fixture: ComponentFixture<TercerosRelacionadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TercerosRelacionadosComponent,
        HttpClientModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct initial TEXTOS value', () => {
    expect(component.TEXTOS).toBe(TERCEROR_TEXTO_DE_ALERTA);
  });

  it('should initialize proveedorHeaderData and proveedorBodyData with the correct values in obtenerProveedor', () => {
    component.obtenerProveedor();
    expect(component.proveedorHeaderData).toEqual(proveedorTable.tableHeader);
    expect(component.proveedorBodyData).toEqual(proveedorTable.tableBody);
  });

  it('should initialize fabricanteHeaderData and fabricanteBodyData with the correct values in obtenerFabricante', () => {
    component.obtenerFabricante();
    expect(component.fabricanteHeaderData).toEqual(fabricanteTable.tableHeader);
    expect(component.fabricanteBodyData).toEqual(fabricanteTable.tableBody);
  });

  it('should call obtenerProveedor and obtenerFabricante in ngOnInit', () => {
    jest.spyOn(component, 'obtenerProveedor');
    jest.spyOn(component, 'obtenerFabricante');
    component.ngOnInit();
    expect(component.obtenerProveedor).toHaveBeenCalled();
    expect(component.obtenerFabricante).toHaveBeenCalled();
  });

  it('should call limpiarProveedor method and handle logic for cleaning supplier data', () => {
    jest.spyOn(component, 'limpiarProveedor');
    component.limpiarProveedor();
    expect(component.limpiarProveedor).toHaveBeenCalled();
  });

  it('should call limpiarFabricante method and handle logic for cleaning manufacturer data', () => {
    jest.spyOn(component, 'limpiarFabricante');
    component.limpiarFabricante();
    expect(component.limpiarFabricante).toHaveBeenCalled();
  });
});