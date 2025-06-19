import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoDosComponent } from './paso-dos.component';
import { AlertComponent, AnexarDocumentosComponent, CatalogosService, TituloComponent } from '@libs/shared/data-access-user/src';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;
  let catalogosServiceMock: any;

  beforeEach(async () => {

    catalogosServiceMock = {
      getCatalogo: jest.fn().mockReturnValue(of([{ id: 1, descripcion: 'Documento 1' }]))
    };
    
    await TestBed.configureTestingModule({
      declarations: [PasoDosComponent],
      imports: [HttpClientTestingModule, TituloComponent, AlertComponent, AnexarDocumentosComponent],
      providers: [
        { provide: CatalogosService, useValue: catalogosServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTiposDocumentos and populate catalogoDocumentos', () => {
    component.getTiposDocumentos();
    expect(catalogosServiceMock.getCatalogo).toHaveBeenCalled();
    expect(component.catalogoDocumentos.length).toBeGreaterThan(0);
  });
});
