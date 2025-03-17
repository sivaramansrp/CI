import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DetosDelTramiteComponent } from './detos-del-tramite.component';

describe('DetosDelTramiteComponent', () => {
  let component: DetosDelTramiteComponent;
  let fixture: ComponentFixture<DetosDelTramiteComponent>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        DetosDelTramiteComponent, 
        HttpClientTestingModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DetosDelTramiteComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges(); 
    const req = httpMock.expectOne('/assets/json/130111/solicitude-options.json');
    req.flush({ options: [], defaultSelect: 'Inicial' }); 
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Debe inicializar el formulario con los controles necesarios', () => {
    expect(component.formDelTramite.contains('solicitud')).toBeTruthy();
    expect(component.formDelTramite.contains('tipoDocumento')).toBeTruthy();
    expect(component.formDelTramite.contains('fraccion')).toBeTruthy();
  });

  it('Debería marcar "fraccion" como inválida si está vacía', () => {
    const fraccionControl = component.formDelTramite.get('fraccion');
    fraccionControl?.setValue('');
    expect(fraccionControl?.valid).toBeFalsy();
    expect(fraccionControl?.errors).toEqual({ required: true });
  });

  it('Debería obtener las opciones de solicitud de la API', () => {
    const mockResponse = {
      options: [{ id: 1, name: 'Option 1' }],
      defaultSelect: 'Option 1',
    };

    component.fetchSolicitudeOptions(); 

    const req = httpMock.expectOne('/assets/json/130111/solicitude-options.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); 

    expect(component.solicitude).toEqual(mockResponse.options);
    expect(component.defaultSelect).toBe(mockResponse.defaultSelect);
  });

  it('debe actualizar el valor seleccionado en "onValueChange"', () => {
    const newValue = 'Nuevo Valor';
    component.onValueChange(newValue);
    expect(component.selectedValue).toBe(newValue);
  });

  it('Debe establecer el valor predeterminado para el método tipoTransporte', () => {
    component.tipoTransporte();
    expect(component.selectedValue).toBe('Nuevo');
  });
});
