import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
// eslint-disable-next-line sort-imports
import { CommonModule } from '@angular/common';

import { DatosEmpresaComponent } from './datos-empresa.component';
// eslint-disable-next-line sort-imports
import { AlertComponent, BtnContinuarComponent, CatalogoSelectComponent, InputRadioComponent, TablaDinamicaComponent, TituloComponent } from '@ng-mf/data-access-user';

fdescribe('DatosEmpresaComponent', () => {
  let component: DatosEmpresaComponent;
  let fixture: ComponentFixture<DatosEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        CatalogoSelectComponent,
        TituloComponent,
        AlertComponent,
        InputRadioComponent,
        TablaDinamicaComponent,
        BtnContinuarComponent,
        DatosEmpresaComponent
      ],
      declarations: []
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize formularioEmpresa form on init', () => {
    expect(component.formularioEmpresa).toBeDefined();
    expect(component.formularioEmpresa.get('estado')).toBeDefined();
    expect(component.formularioEmpresa.get('representacionFederal')).toBeDefined();
  });

  it('should fill default values in the form', () => {
    component.llenarValoresPredeterminados();
    expect(component.formularioEmpresa.get('pais')?.value).toBe('ESTADOS UNIDOS MEXICANOS');
    expect(component.formularioEmpresa.get('codigoPostal')?.value).toBe('32679');
    expect(component.formularioEmpresa.get('estado')?.value).toBe('CHIHUAHUA');
  });

  it('should set federalEstatal catalog options', () => {
    component.obtenerFederalEstatal();
    expect(component.federalEstatal.length).toBeGreaterThan(0);
  });


  it('should have table configurations defined', () => {
    expect(component.configuracionTabla.length).toBeGreaterThan(0);
    expect(component.tableHeader.length).toBeGreaterThan(0);
    expect(component.tableHeaderExtranjeros.length).toBeGreaterThan(0);
  });

  it('should have default data for tables', () => {
    expect(component.datosTablaExtranjeros).toBeDefined();
    expect(component.datosGenerales).toBeDefined();
    expect(component.tablaDatosSucursal).toBeDefined();
  });
});
