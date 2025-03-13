import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetosDelTramiteComponent } from './datos-del-tramite.component';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { InputRadioComponent } from '../../../../shared/components/input-radio/input-radio.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';

describe('DetosDelTramiteComponent', () => {
  let component: DetosDelTramiteComponent;
  let fixture: ComponentFixture<DetosDelTramiteComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        DetosDelTramiteComponent,
        CatalogoSelectComponent,
        InputRadioComponent,
        TituloComponent
      ],
      
      providers: [FormBuilder]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetosDelTramiteComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  
    // ✅ Mock the API request expected on component initialization
    const req = httpMock.expectOne('/assets/json/130102/solicitude-options.json');
    req.flush({ options: [], defaultSelect: '' }); // Send an empty mock response
  });
  

  afterEach(() => {
    httpMock.match('/assets/json/130102/solicitude-options.json').forEach(req => req.flush({ options: [], defaultSelect: '' }));
    httpMock.verify(); // ✅ Ensure no open requests
  });
  
  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.formDelTramite).toBeDefined();
    expect(component.formDelTramite.controls['solicitud']).toBeDefined();
    expect(component.formDelTramite.controls['tipoDocumento']).toBeDefined();
    expect(component.formDelTramite.controls['fraccion']).toBeDefined();
  });

  it('should fetch solicitude options and update component state', () => {
    const mockResponse = {
      options: [{ value: '1', label: 'Test Data' }],
      defaultSelect: '1'
    };

    component.fetchSolicitudeOptions();

    const req = httpMock.expectOne('/assets/json/130102/solicitude-options.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    expect(component.solicitude).toEqual(mockResponse.options);
    expect(component.defaultSelect).toEqual(mockResponse.defaultSelect);
  });

  it('should update selectedValue when onValueChange is called', () => {
    component.onValueChange('TestValue');
    expect(component.selectedValue).toEqual('TestValue');
  });

  it('should set selectedValue to "Nuevo" when tipoTransporte is called', () => {
    component.tipoTransporte();
    expect(component.selectedValue).toEqual('Nuevo');
  });
});
