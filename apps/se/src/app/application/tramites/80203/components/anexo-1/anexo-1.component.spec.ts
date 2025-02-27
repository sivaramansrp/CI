import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Anexo1Component } from './anexo-1.component';
import { PermisoImmexDatosService } from 'libs/shared/data-access-user/src/core/services/80203/immex/permiso-immex-datos.service';
import { NicoService } from 'libs/shared/data-access-user/src/core/services/80203/nico/nico.service';
import { of, throwError } from 'rxjs';

describe('Anexo1Component', () => {
  let component: Anexo1Component;
  let fixture: ComponentFixture<Anexo1Component>;
  let permisoImmexDatosService: PermisoImmexDatosService;
  let nicoService: NicoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      declarations: [Anexo1Component],
      providers: [PermisoImmexDatosService, NicoService]
    }).compileComponents();

    fixture = TestBed.createComponent(Anexo1Component);
    component = fixture.componentInstance;
    permisoImmexDatosService = TestBed.inject(PermisoImmexDatosService);
    nicoService = TestBed.inject(NicoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data on init', () => {
    const dummyData = {
      permisoImmexDatos: [{ tbodyData: ["1", "Data"] }],
      fraccionDatos: [{ tbodyData: ["1", "Data"] }],
      nicoDatos: [{ tbodyData: ["1", "Data"] }]
    };

    spyOn(permisoImmexDatosService, 'getDatos').and.returnValue(of(dummyData));

    component.ngOnInit();

    expect(component.permisoImmexDatos).toEqual(dummyData.permisoImmexDatos);
    expect(component.fraccionDatos).toEqual(dummyData.fraccionDatos);
    expect(component.nicoDatos).toEqual(dummyData.nicoDatos);
  });

  it('should handle error when fetching data', () => {
    spyOn(permisoImmexDatosService, 'getDatos').and.returnValue(throwError(() => new Error('Error')));

    component.ngOnInit();

    expect(component.permisoImmexDatos).toEqual([]);
    expect(component.fraccionDatos).toEqual([]);
    expect(component.nicoDatos).toEqual([]);
  });

  it('should fetch NICO data', () => {
    const dummyNicoData = [{ id: 1, descripcion: 'Nico 1' }];

    spyOn(nicoService, 'obtenerMenuDesplegable').and.returnValue(of(dummyNicoData));

    component.obtenerIngresoSelectList();

    expect(component.nico).toEqual(dummyNicoData);
  });

  it('should handle error when fetching NICO data', () => {
    spyOn(nicoService, 'obtenerMenuDesplegable').and.returnValue(throwError(() => new Error('Error')));

    component.obtenerIngresoSelectList();

    expect(component.nico).toEqual([]);
  });

  it('should show fraccion exportacion', () => {
    component.showFraccionExportacion();
    expect(component.showFraccionExport).toBeTruthy();
  });

  it('should show producto importacion', () => {
    component.showProductoImportacion();
    expect(component.showProductoImport).toBeTruthy();
  });

  it('should show commodity importacion', () => {
    component.showCommodityImportacion();
    expect(component.showCommodityImport).toBeTruthy();
  });

  it('should save form state on destroy', () => {
    const exportacionFormValue = { permisoImmexDatos: [], fraccionDatos: [], nicoDatos: '', fraccionArancelariaExportacion: '', productoArancelariaExportacion: '', productoDescExportacion: '' };
    const importacionFormValue = { permisoImmexDatos: [], fraccionDatos: [], nicoDatos: '', commodityImportacion: '', commodityDescImportacion: '' };

    component.immexRegistroform.get('exportacionForm')?.setValue(exportacionFormValue);
    component.immexRegistroform.get('importacionForm')?.setValue(importacionFormValue);

    component.ngOnDestroy();

    expect(localStorage.getItem('exportacionForm')).toEqual(JSON.stringify(exportacionFormValue));
    expect(localStorage.getItem('importacionForm')).toEqual(JSON.stringify(importacionFormValue));
  });
});
