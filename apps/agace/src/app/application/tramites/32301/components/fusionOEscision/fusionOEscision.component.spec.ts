import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent, InputRadioComponent, TableComponent, TablePaginationComponent, TituloComponent, FirmaElectronicaComponent, SharedModule, WizardComponent } from "@ng-mf/data-access-user";
import { FusionOEscisionComponent } from './fusionOEscision.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { AvisoModifyService } from '../../services/aviso-modify.service';
import { Tramite32301Query } from '../../estados/tramite32301.query';
import { Tramite32301Store } from '../../estados/tramite32301.store';
import { Modal } from 'bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

describe('FusionOEscisionComponent', () => {
  let component: FusionOEscisionComponent;
  let fixture: ComponentFixture<FusionOEscisionComponent>;
  let avisoModifyServiceMock: any;
  let tramiteQueryMock: any;
  let tramiteStoreMock: any;

  beforeEach(async () => {
    avisoModifyServiceMock = {
      getCapacidadAlmacenamiento: jest.fn().mockReturnValue(of([{ label: 'Option 1', value: '1' }])),
      cargarDatosPersonaFusion: jest.fn().mockReturnValue(of({ rfc: 'RFC123', razonSocial: 'Test Company' })),
    };

    tramiteQueryMock = {
      selectpersonaFusionEscisionDTO$: of({ rfc: 'RFC123', razonSocial: 'Test Company' }),
    };

    tramiteStoreMock = {
      SetpersonaFusionEscisionDTO: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule, ReactiveFormsModule, AlertComponent, TituloComponent, InputRadioComponent, TableComponent, TablePaginationComponent, FusionOEscisionComponent, FirmaElectronicaComponent,
              RouterModule,
              FormsModule,
              HttpClientModule,
              WizardComponent,
              SharedModule],
      providers: [
        FormBuilder,
        { provide: AvisoModifyService, useValue: avisoModifyServiceMock },
        { provide: Tramite32301Query, useValue: tramiteQueryMock },
        { provide: Tramite32301Store, useValue: tramiteStoreMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FusionOEscisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms on ngOnInit', () => {
    component.ngOnInit();
    expect(component.formulario).toBeDefined();
    expect(component.modelFormulario).toBeDefined();
  });

  it('should call getCapacidadAlmacenamiento and set radioOptions', () => {
    component.getCapacidadAlmacenamiento();
    expect(avisoModifyServiceMock.getCapacidadAlmacenamiento).toHaveBeenCalled();
    expect(component.radioOptions).toEqual([{ label: 'Option 1', value: '1' }]);
  });

  it('should initialize modals on ngAfterViewInit', () => {
    const modalElement = document.createElement('div');
    jest.spyOn(component.ModificarFusionEscisionModel, 'nativeElement', 'get').mockReturnValue(modalElement);
    jest.spyOn(component.correctamenteModel, 'nativeElement', 'get').mockReturnValue(modalElement);

    component.ngAfterViewInit();

    expect(component.ModificarFusionEscisionInstance).toBeInstanceOf(Modal);
    expect(component.correctamenteModelInstance).toBeInstanceOf(Modal);
  });

  it('should update fusionradioOptions on ocultarEscicion', () => {
    component.formulario.patchValue({ capacidadAlmacenamiento: 'fusion2' });
    component.ocultarEscicion();
    expect(component.fusionradioOptions).toEqual([{ label: 'Fusión', value: '1' }]);
  });

  it('should update titles and visibility on mostrarFusionOEscision', () => {
    component.formulario.patchValue({ numeroTotalCarros: '1' });
    component.mostrarFusionOEscision();
    expect(component.divCompletoVisible).toBe(true);
    expect(component.fusionOescisionTitulo).toBe('Datos de las empresas fusionadas');
    expect(component.labelFechaFusionOscision).toBe('Fecha en que surte efecto la fusión');
  });

  it('should toggle certification visibility on mostrarCertificacionFusionada', () => {
    component.formulario.patchValue({ cantidadBienes: '1' });
    component.mostrarCertificacionFusionada();
    expect(component.conCertificacionPrincipalVisible).toBe(true);

    component.modelFormulario.patchValue({ mCantidadBienes: '0' });
    component.mostrarCertificacionFusionada('isModel');
    expect(component.sinCertificacionPrincipalVisible).toBe(false);
  });

  it('should load persona fusion data and update store on cargarDatosPersonaFusion', () => {
    component.cargarDatosPersonaFusion();
    expect(avisoModifyServiceMock.cargarDatosPersonaFusion).toHaveBeenCalled();
    expect(tramiteStoreMock.SetpersonaFusionEscisionDTO).toHaveBeenCalledWith({ rfc: 'RFC123', razonSocial: 'Test Company' });
  });

  it('should update pagination on onItemsPerPageChange', () => {
    component.miembroDeLaEmpresaBodyData = Array.from({ length: 10 }, (_, i) => i);
    component.onItemsPerPageChange(5);
    expect(component.itemsPerPage).toBe(5);
    expect(component.currentPage).toBe(1);
    component.updatePagination();
    expect(component.miembroDeLaEmpresaBodyData.length).toBe(5);
  });

  it('should destroy subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component.destroy$, 'next');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
  });
});