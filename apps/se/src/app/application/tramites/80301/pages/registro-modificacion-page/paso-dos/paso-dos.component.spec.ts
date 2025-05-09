import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoDosComponent } from './paso-dos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { CatalogosService } from '@ng-mf/data-access-user';
import { ToastrModule } from 'ngx-toastr';
import { NO_ERRORS_SCHEMA } from '@angular/core';

fdescribe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;
  let catalogosServiceMock: any;

  const mockCatalogo = [
    { id: 10, descripcion: 'Factura comercial' },
    { id: 11, descripcion: 'Carta porte' }
  ];

  beforeEach(async () => {
    catalogosServiceMock = {
      getCatalogo: jest.fn().mockReturnValue(of(mockCatalogo))
    };

    await TestBed.configureTestingModule({
      imports: [
        PasoDosComponent,
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ],
      providers: [
        { provide: CatalogosService, useValue: catalogosServiceMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a getTiposDocumentos en ngOnInit', () => {
    const spy = jest.spyOn(component, 'getTiposDocumentos');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('debería asignar documentosSeleccionados en ngOnInit', () => {
    component.ngOnInit();
    expect(component.documentosSeleccionados.length).toBe(2);
    expect(component.documentosSeleccionados[0].descripcion).toContain('valor de la mercancía');
  });

  it('debería obtener los tipos de documentos y asignarlos correctamente', () => {
    component.getTiposDocumentos();
    expect(catalogosServiceMock.getCatalogo).toHaveBeenCalled();
    expect(component.catalogoDocumentos).toEqual(mockCatalogo);
  });

  it('debería manejar error si la llamada a getCatalogo falla', () => {
    const errorResponse = new Error('Error al obtener catálogo');
    catalogosServiceMock.getCatalogo.mockReturnValueOnce(throwError(() => errorResponse));
    expect(() => component.getTiposDocumentos()).not.toThrow();
  });
});
