import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder,ReactiveFormsModule } from '@angular/forms';
import { SolicitanteComponent } from './solicitante.component';
import { SolicitanteService } from '../../../../core/services/shared/solicitante/solicitante.service';

import { FormulariosService } from '../../../../core/services/shared/formularios/formularios.service';
import { of } from 'rxjs';

import { FormularioDinamico } from '../../../../core/models/shared/forms-model';
import { PERSONA_FISICA_SACIONAL } from '../../../../shared/constantes/solicitante-constantes.enum';

interface JSONResponse {
  id: number;
  descripcion: string;
  codigo: string;
  data: string;
}

describe('SolicitanteComponent', () => {
  let component: SolicitanteComponent;
  let fixture: ComponentFixture<SolicitanteComponent>;
  let solicitanteService: jasmine.SpyObj<SolicitanteService>;
  let formulariosService: jasmine.SpyObj<FormulariosService>;

  beforeEach(async () => {
    const solicitanteServiceSpy = jasmine.createSpyObj('SolicitanteService', ['getDatosGenerales']);
    const formulariosServiceSpy = jasmine.createSpyObj('FormulariosService', ['obtenerNombresCamposForm', 'agregarValorCampoDesactivados']);
  
    solicitanteServiceSpy.getDatosGenerales.and.returnValue(of({ id: 1, descripcion: 'desc', codigo: 'code', data: JSON.stringify({ datosGenerales: { nombre: 'John' } }) }));
  
    await TestBed.configureTestingModule({
      declarations: [SolicitanteComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: SolicitanteService, useValue: solicitanteServiceSpy },
        { provide: FormulariosService, useValue: formulariosServiceSpy }
      ]
    })
    .compileComponents();
  
    fixture = TestBed.createComponent(SolicitanteComponent);
    component = fixture.componentInstance;
    solicitanteService = TestBed.inject(SolicitanteService) as jasmine.SpyObj<SolicitanteService>;
    formulariosService = TestBed.inject(FormulariosService) as jasmine.SpyObj<FormulariosService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on creation', () => {
    expect(component.form).toBeDefined();
    expect(component.datosGeneralesForm).toBeDefined();
  });

  it('should set tipoPersona and persona on obtenerTipoPersona', () => {
    component.obtenerTipoPersona(1); // Assuming 1 is TIPO_PERSONA.FISICA_NACIONAL
    expect(component.tipoPersona).toBe(1);
    expect(component.persona).toBe(PERSONA_FISICA_SACIONAL);
  });

  it('should call getDatosGenerales on ngOnInit', () => {
    spyOn(component, 'getDatosGenerales');
    component.ngOnInit();
    expect(component.getDatosGenerales).toHaveBeenCalled();
  });

  it('should initialize form group with given config', () => {
    const config: FormularioDinamico[] = [{ campo: 'nombre', validators: ['required'], disabled: false, labelNombre: '', class: '', tipo_input: '' }];
    component.inicializarFormGroup(config, 'datosGenerales');
    expect(component.datosGeneralesForm.get('nombre')).toBeDefined();
    expect(component.datosGeneralesForm.get('nombre')?.validator).toBeTruthy();
  });

  it('should get datos generales from service', () => {
    const mockResponse: JSONResponse = { id: 1, descripcion: 'desc', codigo: 'code', data: JSON.stringify({ datosGenerales: { nombre: 'John' } }) };
    solicitanteService.getDatosGenerales.and.returnValue(of(mockResponse));
    formulariosService.obtenerNombresCamposForm.and.returnValue(['nombre']);
    component.getDatosGenerales();
    expect(solicitanteService.getDatosGenerales).toHaveBeenCalled();
    expect(formulariosService.obtenerNombresCamposForm).toHaveBeenCalled();
    expect(formulariosService.agregarValorCampoDesactivados).toHaveBeenCalledWith(component.datosGeneralesForm, 'nombre', 'John');
  });
});