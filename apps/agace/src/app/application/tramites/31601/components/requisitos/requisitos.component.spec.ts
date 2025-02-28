import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { RequisitosComponent } from './requisitos.component';
import { ServiciosPantallaService } from '../../../../core/services/31601/servicios-pantalla.service';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { CATALOGOS_ID } from '../../../../shared/constantes/constantes';
import { Catalogo } from '../../../../core/models/shared/catalogos.model';
import { Tipos } from '../../../../core/models/31601/servicios-pantallas.model';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MockValue } from 'libs/shared/theme/assets/json/31601/mock-value.json';
class MockServiciosPantallaService {
  getTiposCatalog() {
    return of(MockValue.tiposCatalog);
  }

  getTipoCatalog(catalogo: string) {
    return of(MockValue.tipoCatalogResponse);
  }
}

fdescribe('RequisitosComponent', () => {
  let component: RequisitosComponent;
  let fixture: ComponentFixture<RequisitosComponent>;
  let pantallaSvc: MockServiciosPantallaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        HttpClientModule,
        FormsModule,
        CommonModule,
        RequisitosComponent,
        TituloComponent,
        TableComponent,
        CatalogoSelectComponent,
      ],
      providers: [
        {
          provide: ServiciosPantallaService,
          useClass: MockServiciosPantallaService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RequisitosComponent);
    component = fixture.componentInstance;
    pantallaSvc = TestBed.inject(ServiciosPantallaService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should loadTipos and set correct values', () => {
    component.loadTipos();

    // Validate the values from mock service
    expect(component.tipos).toEqual([
      { tiposData: 'Tipo Document 1' },
      { tiposData: 'Tipo Document 2' },
    ]);

    expect(component.tipocatlog).toEqual([
      { id: 1, descripcion: 'Catalogo 1', tam: 'A4', dpi: '300' },
    ]);

    expect(component.tipoHeaderData).toEqual(
      component.tipoTableData.tableHeader
    );
  });

  it('should toggle showContent', () => {
    expect(component.showContent).toBeFalse();
    component.toggleContent();
    expect(component.showContent).toBeTrue();
    component.toggleContent();
    expect(component.showContent).toBeFalse();
  });
});
