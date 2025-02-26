import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { CatalogoSelectComponent } from './catalogo-select.component';

describe('CatalogoSelectComponent', () => {
  let component: CatalogoSelectComponent;
  let fixture: ComponentFixture<CatalogoSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatalogoSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogoSelectComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('should initialize the form', () => {
    expect(component.form).toBeDefined();
    expect(component.form.controls['solicitud']).toBeDefined();
    expect(component.form.controls['tipoDocumento']).toBeDefined();
  });
  it('should set default values for solicitude options', () => {
    const mockResponse: ProductoResponse = {
      options: [
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
      ],
      defaultSelect: '1',
    };
  
    const requests = httpMock.match('/assets/json/130102/solicitude-options.json');
    expect(requests.length).toBeGreaterThan(0);
  
    requests.forEach(req => {
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  
    expect(component.solicitude).toEqual(mockResponse.options);
    expect(component.defaultSelect).toBe(mockResponse.defaultSelect);
  });
  it('should set tiposDocumentosArray on fetchTiposDocumentos', () => {
    const mockResponse: TiposDocumentosResponse = {
      tiposDocumentosArray: [
        {
          labelNombre: 'Tipo Documento 1',
          required: true,
          primerOpcion: 'Seleccione una opción',
          catalogos: [
            { id: 1, descripcion: 'Documento 1' },
            { id: 2, descripcion: 'Documento 2' },
          ],
        },
      ],
    };
  
    const requests = httpMock.match('/assets/json/130102/solicitude-select.json');
    expect(requests.length).toBeGreaterThan(0);
  
    requests.forEach(req => {
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  
    expect(component.tiposDocumentosArray).toEqual(mockResponse.tiposDocumentosArray);
  });
  
 
  it('should handle onValueChange correctly', () => {
    const newValue = 'Nuevo Valor';
    component.onValueChange(newValue);
    expect(component.selectedValue).toBe(newValue);
  });
 
  it('should call tipoTransporte when a tipoDocumento is selected', () => {
    spyOn(component, 'tipoTransporte');
    const mockTipoDocumento = { id: 1, descripcion: 'Tipo Documento 1' };
    component.tipoTransporte(mockTipoDocumento);
    expect(component.tipoTransporte).toHaveBeenCalledWith(mockTipoDocumento);
  });
});