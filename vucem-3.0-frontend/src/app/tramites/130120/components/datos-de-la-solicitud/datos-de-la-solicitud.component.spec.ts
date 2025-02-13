import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { CatalogosService } from '../../../../core/services/shared/catalogos/catalogos.service';
import { CommonModule } from '@angular/common';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { InputFechaComponent } from '../../../../shared/components/input-fecha/input-fecha.component';
import { InputRadioComponent } from '../../../../shared/components/input-radio/input-radio.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { of } from 'rxjs';

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let _catalogosService: CatalogosService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        TituloComponent,
        InputFechaComponent,
        InputRadioComponent,
        CatalogoSelectComponent,
        DatosDeLaSolicitudComponent // Import the standalone component here
      ],
      providers: [
        FormBuilder,
        {
          provide: CatalogosService,
          useValue: {
            getCatalogo: jasmine.createSpy('getCatalogo').and.returnValue(of([]))
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    _catalogosService = TestBed.inject(CatalogosService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    component.ngOnInit();
    expect(component.formulario).toBeDefined();
  });

  it('should set valoresSeleccionadosRadio', () => {
    const mockValues = { key: 'value' };
    component.valoresSeleccionadosRadio = mockValues;
    expect(component.valoresSeleccionadosRadio).toEqual(mockValues);
  });

  it('should create formulario with FormBuilder', () => {
    component.ngOnInit();
    expect(component.formulario instanceof FormGroup).toBe(true);
  });

  it('should have correct input types and props', () => {
    const inputTypes = component.configuracion[0].menu;
    expect(inputTypes).toBeDefined();
    expect(inputTypes.length).toBeGreaterThan(0);
    inputTypes.forEach(input => {
      expect(input.inputType).toBeDefined();
      expect(input.props).toBeDefined();
      expect(input.class).toBe('col-md-8');
    });
  });

  it('should call ngOnInit and initialize formulario', () => {
    spyOn(component, 'ngOnInit').and.callThrough();
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
    expect(component.formulario).toBeDefined();
  });

  it('should call crearFormulario', () => {
    spyOn(component, 'crearFormulario').and.callThrough();
    component.crearFormulario();
    expect(component.crearFormulario).toHaveBeenCalled();
  });

  it('should call getCatalogo from CatalogosService', () => {
    component.ngOnInit();
    expect(_catalogosService.getCatalogo).toHaveBeenCalled();
  });
});