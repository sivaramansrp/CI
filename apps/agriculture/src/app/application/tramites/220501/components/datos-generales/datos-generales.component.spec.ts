import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DatosGeneralesComponent } from './datos-generales.component';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RevisionService } from '@ng-mf/data-access-user';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { of } from 'rxjs';
import { throwError } from 'rxjs';
describe('DatosGeneralesComponent', () => {
  let component: DatosGeneralesComponent;
  let fixture: ComponentFixture<DatosGeneralesComponent>;
  let mockRevisionService: jest.Mocked<RevisionService>;
  let mockValidacionesService: jest.Mocked<ValidacionesFormularioService>;

  beforeEach(async () => {
    mockRevisionService = {
      getAduanaIngreso: jest.fn().mockReturnValue(of({ code: 200, message: 'Success', data: [] })),
      getOficianaInspeccion: jest.fn().mockReturnValue(of({ code: 200, message: 'Success', data: [] })),
      getPuntoInspeccion: jest.fn().mockReturnValue(of({ code: 200, message: 'Success', data: [] })),
      getEstablecimiento: jest.fn().mockReturnValue(of({ code: 200, message: 'Success', data: [] })),
      getRegimenDestinaran: jest.fn().mockReturnValue(of({ code: 200, message: 'Success', data: [] })),
      getMovilizacionNacional: jest.fn().mockReturnValue(of({ code: 200, message: 'Success', data: [] })),
      getPuntoVerificacion: jest.fn().mockReturnValue(of({ code: 200, message: 'Success', data: [] })),
      getEmpresaTransportista: jest.fn().mockReturnValue(of({ code: 200, message: 'Success', data: [] }))
    } as unknown as jest.Mocked<RevisionService>;

    mockValidacionesService = {
      isValid: jest.fn().mockReturnValue(true)
    } as unknown as jest.Mocked<ValidacionesFormularioService>;

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
    component.ngOnInit();
    tick();

    expect(component.forma.get('aduanaIngreso')).toBeTruthy();
    expect(component.datosDelaSolicitud.get('establecimiento')).toBeTruthy();
    // Add more assertions for other form controls as per your component's form structure
  }));

  it('should toggle colapsable state multiple times', () => {
    component.mostrar_colapsable();
    expect(component.colapsable).toBe(true);
    component.mostrar_colapsable();
    expect(component.colapsable).toBe(false);
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
    mockValidacionesService.isValid.mockReturnValue(false);
    expect(component.isValid(component.forma, 'aduanaIngreso')).toBe(false);
  });

  it('should handle error when fetching aduanaIngreso data', fakeAsync(() => {
    const MOCKERROR = { code: 500, error: 'Internal Server Error' };
    mockRevisionService.getAduanaIngreso.mockReturnValue(throwError(() => MOCKERROR));
    component.getAduanaIngreso();
    tick();
    expect(component.aduanaIngreso.catalogos).toBeUndefined();
  }));

  it('should fetch oficinaInspeccion data successfully', fakeAsync(() => {
    const MOCKRESPONSE = { code: 200, message: 'Success', data: [{ id: 2, descripcion: 'Oficina 1' }] };
    mockRevisionService.getOficianaInspeccion.mockReturnValue(of(MOCKRESPONSE));
    component.getOficianaInspeccion();
    tick();
    expect(component.oficianaInspeccion.catalogos).toEqual(MOCKRESPONSE.data);
  }));

  it('should fetch puntoInspeccion data successfully', fakeAsync(() => {
    const MOCKRESPONSE = { code: 200, message: 'Success', data: [{ id: 3, descripcion: 'Punto 1' }] };
    mockRevisionService.getPuntoInspeccion.mockReturnValue(of(MOCKRESPONSE));
    component.getPuntoInspeccion();
    tick();
    expect(component.puntoInspeccion.catalogos).toEqual(MOCKRESPONSE.data);
  }));

  it('should fetch establecimiento data successfully', fakeAsync(() => {
    const MOCKRESPONSE = { code: 200, message: 'Success', data: [{ id: 4, descripcion: 'Establecimiento 1' }] };
    mockRevisionService.getEstablecimiento.mockReturnValue(of(MOCKRESPONSE));
    component.getEstablecimiento();
    tick();
    expect(component.establecimiento.catalogos).toEqual(MOCKRESPONSE.data);
  }));

  it('should fetch regimenDestinaran data successfully', fakeAsync(() => {
    const MOCKRESPONSE = { code: 200, message: 'Success', data: [{ id: 5, descripcion: 'Regimen 1' }] };
    mockRevisionService.getRegimenDestinaran.mockReturnValue(of(MOCKRESPONSE));
    component.getRegimenDestinaran();
    tick();
    expect(component.regimenDestinaran.catalogos).toEqual(MOCKRESPONSE.data);
  }));

  it('should fetch movilizacionNacional data successfully', fakeAsync(() => {
    const MOCKRESPONSE = { code: 200, message: 'Success', data: [{ id: 6, descripcion: 'Movilizacion 1' }] };
    mockRevisionService.getMovilizacionNacional.mockReturnValue(of(MOCKRESPONSE));
    component.getMovilizacionNacional();
    tick();
    expect(component.movilizacionNacional.catalogos).toEqual(MOCKRESPONSE.data);
  }));

  it('should fetch puntoVerificacion data successfully', fakeAsync(() => {
    const MOCKRESPONSE = { code: 200, message: 'Success', data: [{ id: 7, descripcion: 'Punto Verificacion 1' }] };
    mockRevisionService.getPuntoVerificacion.mockReturnValue(of(MOCKRESPONSE));
    component.getPuntoVerificacion();
    tick();
    expect(component.puntoVerificacion.catalogos).toEqual(MOCKRESPONSE.data);
  }));

  it('should fetch empresaTransportista data successfully', fakeAsync(() => {
    const MOCKRESPONSE = { code: 200, message: 'Success', data: [{ id: 8, descripcion: 'Empresa 1' }] };
    mockRevisionService.getEmpresaTransportista.mockReturnValue(of(MOCKRESPONSE));
    component.getEmpresaTransportista();
    tick();
    expect(component.empresaTransportista.catalogos).toEqual(MOCKRESPONSE.data);
  }));

  it('should validate entire form when fields are invalid', () => {
    mockValidacionesService.isValid.mockReturnValue(false);
    component.forma.get('aduanaIngreso')?.setValue(null);
    expect(component.isValid(component.forma, 'aduanaIngreso')).toBe(false);
  });

  it('should initialize with currentIndex 0', () => {
    expect(component.currentIndex).toBe(0);
  });
});