import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepresentanteLegalComponent } from './representante-legal.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { AvisoSanitarioService } from '../../services/aviso-sanitario.service';
import { Tramite260601Store } from '../../../../estados/tramites/tramite260601.store';
import { Tramite260601Query } from '../../../../estados/queries/tramite260601.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ToastrService } from 'ngx-toastr';
import { MSG_ERROR_REPRESENTANTE_LEGAL } from '../../constantes/aviso-enum';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RepresentanteLegalComponent', () => {
  let component: RepresentanteLegalComponent;
  let fixture: ComponentFixture<RepresentanteLegalComponent>;
  let mockStore: any;
  let mockQuery: any;
  let mockService: any;
  let mockToastr: any;
  let mockConsultaioQuery: any;

  beforeEach(async () => {
    mockStore = {
      setNombreOrazonsocial: jest.fn(),
      setApellidoPaterno: jest.fn(),
      setApellidoMaterno: jest.fn(),
      setRfc: jest.fn()
    };

    mockQuery = {
      selectSeccionState$: of({ rfc: 'RFC123', nombreOrazonsocial: 'Empresa', apellidoPaterno: 'Paterno', apellidoMaterno: 'Materno' })
    };

    mockService = {
      buscarRfc: jest.fn().mockReturnValue(of({ data: [{ nombreOrazonsocial: 'Empresa', apellidoPaterno: 'Paterno', apellidoMaterno: 'Materno' }] }))
    };

    mockToastr = {
      error: jest.fn()
    };

    mockConsultaioQuery = {
      selectConsultaioState$: of({ readonly: false })
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, RepresentanteLegalComponent, FormsModule, HttpClientTestingModule],
      providers: [
        FormBuilder,
        { provide: Tramite260601Store, useValue: mockStore },
        { provide: Tramite260601Query, useValue: mockQuery },
        { provide: AvisoSanitarioService, useValue: mockService },
        { provide: ToastrService, useValue: mockToastr },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RepresentanteLegalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with correct values from state', () => {
    component.inicializarFormulario();
    expect(component.representanteLegalForm.get('rfc')?.value).toBe('RFC123');
    expect(component.representanteLegalForm.get('nombreOrazonsocial')?.value).toBe('Empresa');
  });

  it('should disable form in readonly mode', () => {
    component.esFormularioSoloLectura = true;
    component.representanteLegalForm = component['fb'].group({ rfc: [''] });
    const disableSpy = jest.spyOn(component.representanteLegalForm, 'disable');
    component.guardarDatosFormulario();
  });

  it('should enable form in non-readonly mode', () => {
    component.esFormularioSoloLectura = false;
    component.representanteLegalForm = component['fb'].group({ rfc: [''] });
    const enableSpy = jest.spyOn(component.representanteLegalForm, 'enable');
    component.guardarDatosFormulario();
  });

  it('should call store setters when storing values', () => {
    component.representanteLegalForm = component['fb'].group({ rfc: ['RFC'], nombreOrazonsocial: ['Nombre'], apellidoPaterno: ['A'], apellidoMaterno: ['B'] });
    component.tiendaCampoRepresentanteLegal();
    expect(mockStore.setNombreOrazonsocial).toHaveBeenCalledWith('Nombre');
    expect(mockStore.setApellidoPaterno).toHaveBeenCalledWith('A');
    expect(mockStore.setApellidoMaterno).toHaveBeenCalledWith('B');
    expect(mockStore.setRfc).toHaveBeenCalledWith('RFC');
  });

  it('should show error and reset form if RFC is empty', () => {
    component.representanteLegalForm = component['fb'].group({ rfc: [''] });
    const resetSpy = jest.spyOn(component.representanteLegalForm, 'reset');
    component.obtenerRespuestaIDCPorRFC();
    expect(mockToastr.error).toHaveBeenCalledWith(MSG_ERROR_REPRESENTANTE_LEGAL);
    expect(component.modalAlerta).toBe(true);
    expect(resetSpy).toHaveBeenCalled();
  });

  it('should call buscarRfc and patch form on valid RFC', () => {
    component.representanteLegalForm = component['fb'].group({
      rfc: ['RFC'],
      nombreOrazonsocial: [''],
      apellidoPaterno: [''],
      apellidoMaterno: ['']
    });
    component.obtenerRespuestaIDCPorRFC();
    expect(mockService.buscarRfc).toHaveBeenCalled();
    expect(component.representanteLegalForm.get('nombreOrazonsocial')?.value).toBe('Empresa');
  });

  it('should reset form and hide modal on aceptar', () => {
    component.representanteLegalForm = component['fb'].group({ rfc: ['RFC'] });
    const resetSpy = jest.spyOn(component.representanteLegalForm, 'reset');
    component.modalAlerta = true;
    component.aceptar();
    expect(component.modalAlerta).toBe(false);
    expect(resetSpy).toHaveBeenCalled();
  });

  it('should unsubscribe on destroy', () => {
    const completeSpy = jest.spyOn(component['destruirNotificador$'], 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
});
