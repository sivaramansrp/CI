
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AmpliacionServiciosComponent } from './ampliacion-servicios.component';
import { AmpliacionServiciosService } from '../../services/ampliacion-servicios.service';
import { CatalogoSelectComponent } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';
import { ComponentFixture} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';


describe('AmpliacionServiciosComponent', () => {
  let component: AmpliacionServiciosComponent;
  let fixture: ComponentFixture<AmpliacionServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule,
        CommonModule,
        HttpClientTestingModule,
        CatalogoSelectComponent,
        
        AmpliacionServiciosComponent, // Add the standalone component here
      ],
      providers: [AmpliacionServiciosService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AmpliacionServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms', () => {
    expect(component.formularioInfoRegistro).toBeDefined();
  });

  it('should call getDatos on init', () => {
    jest.spyOn(component, 'getDatos');
    component.ngOnInit();
    expect(component.getDatos).toHaveBeenCalled();
  });

  it('should call obtenerIngresoSelectList on init', () => {
    jest.spyOn(component, 'obtenerIngresoSelectList');
    component.ngOnInit();
    expect(component.obtenerIngresoSelectList).toHaveBeenCalled();
  });

  it('should initialize formularioInfoRegistro with empty values if infoRegistro is not defined', () => {
   
    component.inicializarFormularioInfoRegistro();
    expect(component.formularioInfoRegistro.value).toEqual({
      seleccionaLaModalidad: '',
      folio: '',
      año: ''
    });
  });

  it('should initialize formularioInfoRegistro with values from infoRegistro if it is defined', () => {
    component.infoRegistro = {
      seleccionaLaModalidad: 'Modalidad 1',
      folio: '12345',
      año: '2023'
    };
    component.inicializarFormularioInfoRegistro();
    expect(component.formularioInfoRegistro.value).toEqual({
      seleccionaLaModalidad: 'Modalidad 1',
      folio: '12345',
      año: '2023'
    });
  }); 
});