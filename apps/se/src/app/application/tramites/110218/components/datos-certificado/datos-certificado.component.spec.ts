import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosCertificadoComponent } from './datos-certificado.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CertificadoTecnicoJaponService } from '@libs/shared/data-access-user/src/core/services/110218/certificadoTecnicoJapon.service';
import { Tramite110218Store } from '../../estados/tramites/tramite110218.store';
import { Tramite110218Query } from '../../estados/queries/tramite110218.query';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { CompliMentaria } from '../../models/certificado-tecnico-japon.enum';

describe('DatosCertificadoComponent', () => {
  let component: DatosCertificadoComponent;
  let fixture: ComponentFixture<DatosCertificadoComponent>;
  let mockService: jest.Mocked<CertificadoTecnicoJaponService>;
  let mockStore: jest.Mocked<Tramite110218Store>;
  let mockQuery: jest.Mocked<Tramite110218Query>;
  let mockRouter: jest.Mocked<Router>;

  beforeEach(async () => {
    mockService = {
      getDatosCertificado: jest.fn().mockReturnValue(of([{ id: 1, nombre: 'Certificado 1' }]))
    } as any;

    mockStore = {
      setlugar: jest.fn(),
      setobservaciones: jest.fn(),
      storeTableValues: jest.fn()
    } as any;

    mockQuery = {
      lugar$: of('México'),
      observaciones$: of('Observación de prueba'),
      tableDataDatos$: of([{ id: 1, nombre: 'Certificado 1' }])
    } as any;

    mockRouter = {
      navigate: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,DatosCertificadoComponent],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: CertificadoTecnicoJaponService, useValue: mockService },
        { provide: Tramite110218Store, useValue: mockStore },
        { provide: Tramite110218Query, useValue: mockQuery },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.datosdelcertificado.value).toEqual({
      lugar: '',
      observaciones: ''
    });
  });

  it('should call getTabledatas() on initialization', () => {
    expect(mockService.getDatosCertificado).toHaveBeenCalled();
  });

  it('should subscribe to store changes and update the form', () => {
    expect(component.datosdelcertificado.value.lugar).toBe('México');
    expect(component.datosdelcertificado.value.observaciones).toBe('Observación de prueba');
  });

  it('should handle row selection', () => {
    const selectedRow: CompliMentaria = {
      númerodeOrden: '1',
      fracciónArancelaria: '1234.56.78',
      nombreTécnico: 'Certificado 1',
      nombreComercial: 'Certificado Comercial 1',
      nombreIngles: 'Certificate 1',
      númerodeRegistro: '123456'
    };
    component.handleFilaSeleccionada(selectedRow);
    expect(component.selectedRow).toEqual(selectedRow);
  });

  it('should handle multiple row selection', () => {
    const selectedRows = [{ id: 1, nombre: 'Certificado 1' }, { id: 2, nombre: 'Certificado 2' }];
    component.handleListaDeFilaSeleccionada(selectedRows);
    expect(component.selectedRows).toEqual(selectedRows);
  });

  it('should navigate to mercancias-seleccionadas-form on form modification', () => {
    component.onModifyForm();
    expect(mockStore.storeTableValues).toHaveBeenCalledWith(component.selectedRow);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['pago/certificado-tecnico-japon/mercancias-seleccionadas-form']);
  });

  it('should update the store when form values change', () => {
    component.datosdelcertificado.get('lugar')?.setValue('España');
    component.onDatosdelcertificadoChange('lugar');
    expect(mockStore.setlugar).toHaveBeenCalledWith('España');

    component.datosdelcertificado.get('observaciones')?.setValue('Nueva observación');
    component.onDatosdelcertificadoChange('observaciones');
    expect(mockStore.setobservaciones).toHaveBeenCalledWith('Nueva observación');
  });

  it('should clean up subscriptions on component destruction', () => {
    const spyNext = jest.spyOn(component['destroyed$'], 'next');
    const spyComplete = jest.spyOn(component['destroyed$'], 'complete');

    component.ngOnDestroy();

    expect(spyNext).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});
