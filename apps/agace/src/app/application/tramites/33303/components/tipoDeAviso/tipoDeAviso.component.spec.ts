import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { TipoDeAvisoComponent } from './tipoDeAviso.component';  // Import the standalone component
import { AvisoUnicoService } from '../../services/aviso-unico.service';
import { UnicoStore } from '../../estados/renovacion.store';
import { UnicoQuery } from '../../estados/queries/unico.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of } from 'rxjs';

class MockAvisoUnicoService {
  getAvisoModify() {
    return of({ descripcion: 'Test Description' });
  }
}

class MockUnicoStore {
  setModalidadCertificacion = jasmine.createSpy('setModalidadCertificacion');
}

class MockUnicoQuery {
  selectSolicitud$ = of({
    modalidadCertificacion: 'Initial Certification',
    foreignClientsSuppliers: true,
    nationalSuppliers: false,
    modificationsMembers: true,
    changesToLegalDocuments: false,
    mergerOrSplitNotice: false,
    additionFractions: true,
    additionmodificación: false,
    additionPresentación: true,
    acepto253: true,
  });
}

class MockConsultaioQuery {
  selectConsultaioState$ = of({ readonly: false });
}

describe('TipoDeAvisoComponent', () => {
  let component: TipoDeAvisoComponent;
  let fixture: ComponentFixture<TipoDeAvisoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule, // Add ReactiveFormsModule
        TipoDeAvisoComponent, // Add the standalone component here
      ],
      providers: [
        { provide: AvisoUnicoService, useClass: MockAvisoUnicoService },
        { provide: UnicoStore, useClass: MockUnicoStore },
        { provide: UnicoQuery, useClass: MockUnicoQuery },
        { provide: ConsultaioQuery, useClass: MockConsultaioQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TipoDeAvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit
  });

  // Test: Component Initialization
  it('should create and initialize the form', () => {
    expect(component).toBeTruthy();
    expect(component.miFormulario).toBeDefined();
    expect(component.miFormulario.controls['modalidadCertificacion'].value).toBe('Initial Certification');
  });

  // Test: Form Disabled When `esFormularioSoloLectura` is True
  it('should disable the form when esFormularioSoloLectura is true', () => {
    component.esFormularioSoloLectura = true;
    component.inicializarEstadoFormulario();
    fixture.detectChanges();

    const modalidadControl = component.miFormulario.controls['modalidadCertificacion'];
    expect(modalidadControl.disabled).toBe(true);
  });

  // Test: Form Should be Enabled When `esFormularioSoloLectura` is False
  it('should enable the form when esFormularioSoloLectura is false', () => {
    component.esFormularioSoloLectura = false;
    component.inicializarEstadoFormulario();
    fixture.detectChanges();

    const modalidadControl = component.miFormulario.controls['modalidadCertificacion'];
    expect(modalidadControl.enabled).toBe(true);
  });

  // Test: `inicializamiFormulario()` Method
  it('should call setModalidadCertificacion with the correct value', () => {
    component.inicializamiFormulario();
    expect(component['unicoStore'].setModalidadCertificacion).toHaveBeenCalledWith('Test Description');
  });

  // Test: `aiEnviar()` Method
  it('should emit the form value when aiEnviar is called', () => {
    spyOn(component.tabEnabledData, 'emit');
    component.miFormulario.controls['modalidadCertificacion'].setValue('Updated Certification');
    component.aiEnviar();

    expect(component.tabEnabledData.emit).toHaveBeenCalledWith({
      modalidadCertificacion: 'Updated Certification',
      foreignClientsSuppliers: true,
      nationalSuppliers: false,
      modificationsMembers: true,
      changesToLegalDocuments: false,
      mergerOrSplitNotice: false,
      additionFractions: true,
      additionmodificación: false,
      additionPresentación: true,
      acepto253: true,
    });
  });

  // Test: `ngOnDestroy()` Method
  it('should call next and complete on destroy$', () => {
    spyOn(component['destroy$'], 'next');
    spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(component['destroy$'].next).toHaveBeenCalled();
    expect(component['destroy$'].complete).toHaveBeenCalled();
  });

  // Test: Form Validation for Required Field (`acepto253`)
  it('should mark acepto253 as required', () => {
    const acepto253Control = component.miFormulario.controls['acepto253'];
    acepto253Control.setValue('');
    expect(acepto253Control.valid).toBeFalsy();
    expect(acepto253Control.hasError('required')).toBeTruthy();
  });
});
