import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosCertificadoComponent } from './datosCertificado.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ValidarInicalmenteService } from '../../services/validar-inicalmente/validar-inicalmente.service';
import { Tramite110208Query } from '../../../../estados/queries/tramite110208.query';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // ✅ ADD THIS

describe('DatosCertificadoComponent', () => {
  let component: DatosCertificadoComponent;
  let fixture: ComponentFixture<DatosCertificadoComponent>;
  let mockService: jest.Mocked<ValidarInicalmenteService>;
  let mockQuery: jest.Mocked<Tramite110208Query>;

  beforeEach(async () => {
    mockService = {
      obtenerEstadoList: jest.fn().mockReturnValue(of({ data: [{ id: 1, name: 'Estado1' }] })),
    } as unknown as jest.Mocked<ValidarInicalmenteService>;

    mockQuery = {
      selectSolicitud$: of({
        observaciones: 'Test Observaciones',
        idioma: 'ES',
        entidadFederativaCertificado: 'Entidad1',
        representacionFederal: 'Representacion1',
      }),
    } as unknown as jest.Mocked<Tramite110208Query>;

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        DatosCertificadoComponent,
        HttpClientTestingModule, // ✅ REQUIRED FIX
      ],
      providers: [
        FormBuilder,
        { provide: ValidarInicalmenteService, useValue: mockService },
        { provide: Tramite110208Query, useValue: mockQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call obtenerEstadoList on init', () => {
    expect(mockService.obtenerEstadoList).toHaveBeenCalled();
    expect(component.estado).toEqual([{ id: 1, name: 'Estado1' }]);
  });

  it('should update store when setValoresStore is called', () => {
    const form = component.formDatosCertificado;
    form.get('idioma')?.setValue('EN');
    component.setValoresStore(form, 'idioma', 'setIdioma');
    // Add store mock expectations if available
  });

  it('should populate estado list when obtenerEstadoList is called', () => {
    component.obtenerEstadoList();
    expect(component.estado).toEqual([{ id: 1, name: 'Estado1' }]);
  });

  it('should clean up observables on destroy', () => {
    const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    component.ngOnDestroy();
    expect(destroyNotifierSpy).toHaveBeenCalled();
  });

  it('should mark form invalid if required fields missing', () => {
    component.formDatosCertificado.get('idioma')?.setValue('');
    component.formDatosCertificado.get('entidadFederativa')?.setValue('');
    component.formDatosCertificado.get('representacionFederal')?.setValue('');
    expect(component.formDatosCertificado.valid).toBeFalsy();
  });

  it('should mark form valid if required fields are filled', () => {
    component.formDatosCertificado.get('idioma')?.setValue('EN');
    component.formDatosCertificado.get('entidadFederativa')?.setValue('Entidad2');
    component.formDatosCertificado.get('representacionFederal')?.setValue('Representacion2');
    expect(component.formDatosCertificado.valid).toBeTruthy();
  });
});
