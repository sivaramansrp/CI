import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DatosGeneralesComponent } from './datos-generales.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { RevisionService, ValidacionesFormularioService } from '@ng-mf/data-access-user';
import {jasmine} from '@types/jasmine';

describe('DatosGeneralesComponent', () => {
  let component: DatosGeneralesComponent;
  let fixture: ComponentFixture<DatosGeneralesComponent>;
  let mockRevisionService: jasmine.SpyObj<RevisionService>;
  let mockValidacionesService: jasmine.SpyObj<ValidacionesFormularioService>;

  beforeEach(async () => {
    mockRevisionService = jasmine.createSpyObj('RevisionService', [
      'getAduanaIngreso',
      'getOficianaInspeccion',
      'getPuntoInspeccion',
      'getEstablecimiento',
      'getRegimenDestinaran',
      'getMovilizacionNacional',
      'getPuntoVerificacion',
      'getEmpresaTransportista'
    ]);

    mockRevisionService.getAduanaIngreso.and.returnValue(of({code: 200, message:'Success', data: []}));
    mockRevisionService.getOficianaInspeccion.and.returnValue(of({code: 200, message:'Success', data: []}));
    mockRevisionService.getPuntoInspeccion.and.returnValue(of({code: 200, message:'Success', data: []}));
    mockRevisionService.getEstablecimiento.and.returnValue(of({code: 200, message:'Success', data: []}));
    mockRevisionService.getRegimenDestinaran.and.returnValue(of({code: 200, message:'Success', data: []}));
    mockRevisionService.getMovilizacionNacional.and.returnValue(of({code: 200, message:'Success', data: []}));
    mockRevisionService.getPuntoVerificacion.and.returnValue(of({code: 200, message:'Success', data: []}));
    mockRevisionService.getEmpresaTransportista.and.returnValue(of({code: 200, message:'Success', data: []}));


    mockValidacionesService = jasmine.createSpyObj('ValidacionesFormularioService', ['isValid']);

    await TestBed.configureTestingModule({
      declarations: [DatosGeneralesComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: RevisionService, useValue: mockRevisionService },
        { provide: ValidacionesFormularioService, useValue: mockValidacionesService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms with correct controls on ngOnInit', fakeAsync(() => {
    mockRevisionService.getAduanaIngreso.and.returnValue(of({ code: 200, message:'Success', data: [] }));
    mockRevisionService.getOficianaInspeccion.and.returnValue(of({ code: 200, message:'Success', data: [] }));
    mockRevisionService.getPuntoInspeccion.and.returnValue(of({ code: 200, message:'Success', data: [] }));
    mockRevisionService.getEstablecimiento.and.returnValue(of({ code: 200, message:'Success', data: [] }));
    mockRevisionService.getRegimenDestinaran.and.returnValue(of({ code: 200, message:'Success', data: [] }));
    mockRevisionService.getMovilizacionNacional.and.returnValue(of({ code: 200, message:'Success', data: [] }));
    mockRevisionService.getPuntoVerificacion.and.returnValue(of({ code: 200, message:'Success', data: [] }));
    mockRevisionService.getEmpresaTransportista.and.returnValue(of({ code: 200, message:'Success', data: [] }));

    component.ngOnInit();
    tick();

    expect(component.forma.get('aduanaIngreso')).toBeTruthy();
    expect(component.datosDelaSolicitud.get('establecimiento')).toBeTruthy();
    // Add more assertions for other form controls as per your component's form structure
  }));

  it('should toggle colapsable state multiple times', () => {
    component.mostrar_colapsable();
    expect(component.colapsable).toBeTrue();
    component.mostrar_colapsable();
    expect(component.colapsable).toBeFalse();
  });

  it('should rotate currentIndex correctly when exceeding rows length', () => {
    component.rows = [
      { Partida: '1', Tiporequisito: 'Inspección ocular', Requisito: 'Requisito', Certificado: 123456, Fraccion: '01039201', Descripcion: 'Con pedigree o certificado de alto registro.', Nico: '00' },
      { Partida: '2', Tiporequisito: 'inspección de oído', Requisito: 'Requisito', Certificado: 123456, Fraccion: '01039201', Descripcion: 'Con pedigree o certificado de alto registro.', Nico: '00' },
      { Partida: '3', Tiporequisito: 'inspección de nariz', Requisito: 'Requisito', Certificado: 123456, Fraccion: '01039201', Descripcion: 'Con pedigree o certificado de alto registro.', Nico: '00' }
    ];
    component.currentIndex = 2;
    component.rotateRow(1);
    expect(component.currentIndex).toBe(0);
  });

  it('should return false when form field is invalid', () => {
    mockValidacionesService.isValid.and.returnValue(false);
    expect(component.isValid(component.forma, 'aduanaIngreso')).toBeFalse();
  });

  it('should handle error when fetching aduanaIngreso data', fakeAsync(() => {
    const mockError = { code: 500, error: 'Internal Server Error' };
    mockRevisionService.getAduanaIngreso.and.returnValue(throwError(() => mockError));
    component.getAduanaIngreso();
    tick();
    expect(component.aduanaIngreso.catalogos).toBeUndefined();
  }));

  it('should fetch oficinaInspeccion data successfully', fakeAsync(() => {
    const mockResponse = { code: 200, message: 'Success', data: [{ id: 2, descripcion: 'Oficina 1' }] };
    mockRevisionService.getOficianaInspeccion.and.returnValue(of(mockResponse));
    component.getOficianaInspeccion();
    tick();
    expect(component.oficianaInspeccion.catalogos).toEqual(mockResponse.data);
  }));

  it('should fetch puntoInspeccion data successfully', fakeAsync(() => {
    const mockResponse = { code: 200, message: 'Success', data: [{ id: 3, descripcion: 'Punto 1' }] };
    mockRevisionService.getPuntoInspeccion.and.returnValue(of(mockResponse));
    component.getPuntoInspeccion();
    tick();
    expect(component.puntoInspeccion.catalogos).toEqual(mockResponse.data);
  }));

  it('should fetch establecimiento data successfully', fakeAsync(() => {
    const mockResponse = { code: 200, message: 'Success', data: [{ id: 4, descripcion: 'Establecimiento 1' }] };
    mockRevisionService.getEstablecimiento.and.returnValue(of(mockResponse));
    component.getEstablecimiento();
    tick();
    expect(component.establecimiento.catalogos).toEqual(mockResponse.data);
  }));

  it('should fetch regimenDestinaran data successfully', fakeAsync(() => {
    const mockResponse = { code: 200, message: 'Success', data: [{ id: 5, descripcion: 'Regimen 1' }] };
    mockRevisionService.getRegimenDestinaran.and.returnValue(of(mockResponse));
    component.getRegimenDestinaran();
    tick();
    expect(component.regimenDestinaran.catalogos).toEqual(mockResponse.data);
  }));

  it('should fetch movilizacionNacional data successfully', fakeAsync(() => {
    const mockResponse = { code: 200, message: 'Success', data: [{ id: 6, descripcion: 'Movilizacion 1' }] };
    mockRevisionService.getMovilizacionNacional.and.returnValue(of(mockResponse));
    component.getMovilizacionNacional();
    tick();
    expect(component.movilizacionNacional.catalogos).toEqual(mockResponse.data);
  }));

  it('should fetch puntoVerificacion data successfully', fakeAsync(() => {
    const mockResponse = { code: 200, message: 'Success', data: [{ id: 7, descripcion: 'Punto Verificacion 1' }] };
    mockRevisionService.getPuntoVerificacion.and.returnValue(of(mockResponse));
    component.getPuntoVerificacion();
    tick();
    expect(component.puntoVerificacion.catalogos).toEqual(mockResponse.data);
  }));

  it('should fetch empresaTransportista data successfully', fakeAsync(() => {
    const mockResponse = { code: 200, message: 'Success', data: [{ id: 8, descripcion: 'Empresa 1' }] };
    mockRevisionService.getEmpresaTransportista.and.returnValue(of(mockResponse));
    component.getEmpresaTransportista();
    tick();
    expect(component.empresaTransportista.catalogos).toEqual(mockResponse.data);
  }));

  it('should validate entire form when fields are invalid', () => {
    mockValidacionesService.isValid.and.returnValue(false);
    component.forma.get('aduanaIngreso')?.setValue(null);
    expect(component.isValid(component.forma, 'aduanaIngreso')).toBeFalse();
  });

  it('should initialize with currentIndex 0', () => {
    expect(component.currentIndex).toBe(0);
  });

});