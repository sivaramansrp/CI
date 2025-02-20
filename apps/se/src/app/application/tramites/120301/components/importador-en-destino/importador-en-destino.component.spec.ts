import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ImportadorEnDestinoComponent } from './importador-en-destino.component';
import { ImportadorEnDestinoService } from 'libs/shared/data-access-user/src/core/services/120301/importador-en-destino/importador-en-destino.service';
import { TableComponent } from 'libs/shared/data-access-user/src/tramites/components/table/table.component';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';

describe('ImportadorEnDestinoComponent', () => {
  let component: ImportadorEnDestinoComponent;
  let fixture: ComponentFixture<ImportadorEnDestinoComponent>;
  let importadorEnDestinoService: ImportadorEnDestinoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        TableComponent,
        TituloComponent
      ],
      declarations: [ImportadorEnDestinoComponent],
      providers: [ImportadorEnDestinoService]
    }).compileComponents();

    fixture = TestBed.createComponent(ImportadorEnDestinoComponent);
    component = fixture.componentInstance;
    importadorEnDestinoService = TestBed.inject(ImportadorEnDestinoService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch data on init', () => {
    const mockData = {
      importadores: [
        { tbodyData: ['Importador 1', 'Dirección 1', 'País 1', '2024-11-07 00:00:00.0'] },
        { tbodyData: ['Importador 2', 'Dirección 2', 'País 2', '2024-10-14 00:00:00.0'] }
      ]
    };
    spyOn(importadorEnDestinoService, 'getDatos').and.returnValue(of(mockData));

    component.ngOnInit();

    expect(component.importadores).toEqual(mockData.importadores);
  });

  it('should handle error while fetching data', () => {
    spyOn(importadorEnDestinoService, 'getDatos').and.returnValue(of({}));

    component.ngOnInit();

    expect(component.importadores).toEqual([]);
  });
});