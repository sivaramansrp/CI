import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AlertComponent,
  Catalogo,
  CatalogoSelectComponent,
  InputRadioComponent,
  TableComponent,
  TituloComponent,
  FirmaElectronicaComponent, SharedModule, WizardComponent
} from '@ng-mf/data-access-user';
import { ModificacionGoceInmuebleComponent } from './modificacionGoceInmueble.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { AvisoModifyService } from '../../services/aviso-modify.service';
import { Tramite32301Store } from '../../estados/tramite32301.store';
import { Tramite32301Query } from '../../estados/tramite32301.query';
import { Modal } from 'bootstrap';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

describe('ModificacionGoceInmuebleComponent', () => {
  let component: ModificacionGoceInmuebleComponent;
  let fixture: ComponentFixture<ModificacionGoceInmuebleComponent>;
  let avisoModifyServiceMock: any;
  let tramiteStoreMock: any;
  let tramiteQueryMock: any;

  beforeEach(async () => {
    avisoModifyServiceMock = {
      getEntidadFederativa: jest.fn().mockReturnValue(of([])),
      getGridDomiciliosModificados: jest
        .fn()
        .mockReturnValue(of({ tableHeader: [], tableBody: [] })),
      getGridMostrarGridModificado: jest
        .fn()
        .mockReturnValue(of({ tableHeader: [], tableBody: [] })),
    };

    tramiteStoreMock = {
      setModificacionGoceInmueble: jest.fn(),
    };

    tramiteQueryMock = {
      selectModificacionGoceInmueble$: of({}),
      select: jest.fn().mockReturnValue(of({})),
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        TituloComponent,
        InputRadioComponent,
        AlertComponent,
        TableComponent,
        CatalogoSelectComponent,
        ModificacionGoceInmuebleComponent,
        FirmaElectronicaComponent,
                      RouterModule,
                      FormsModule,
                      HttpClientModule,
                      WizardComponent,
                      SharedModule
      ],
      providers: [
        FormBuilder,
        { provide: AvisoModifyService, useValue: avisoModifyServiceMock },
        { provide: Tramite32301Store, useValue: tramiteStoreMock },
        { provide: Tramite32301Query, useValue: tramiteQueryMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificacionGoceInmuebleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.modificacionGoceForm).toBeDefined();
    expect(component.direccionGrid).toBeDefined();
  });

  it('should call getEntidadFederativa on ngOnInit', () => {
    component.ngOnInit();
    expect(avisoModifyServiceMock.getEntidadFederativa).toHaveBeenCalled();
  });

  it('should call getGridDomiciliosModificados on initialization', () => {
    expect(
      avisoModifyServiceMock.getGridDomiciliosModificados
    ).toHaveBeenCalled();
  });

  it('should call getGridMostrarGridModificado on initialization', () => {
    expect(
      avisoModifyServiceMock.getGridMostrarGridModificado
    ).toHaveBeenCalled();
  });

  it('should toggle mostrarGridNuevo and mostrarGridModificado based on radio selection', () => {
    component.modificacionGoceForm.patchValue({
      ideGenerica2: 'DomicilioNuevo',
    });
    component.verificaRadioTipoSem();
    expect(component.mostrarGridNuevo).toBe(true);
    expect(component.mostrarGridModificado).toBe(false);

    component.modificacionGoceForm.patchValue({
      ideGenerica2: 'ModificarDomicilio',
    });
    component.verificaRadioTipoSem();
    expect(component.mostrarGridNuevo).toBe(false);
    expect(component.mostrarGridModificado).toBe(true);
  });

  it('should add a new part to modificacionPartes', () => {
    component.direccionGrid.patchValue({
      rfcPartesCons: 'RFC123456789',
      nombrePartesCons: 'Test Name',
      caracterDeCons: 'Test Role',
    });
    component.agregarParteC();
    expect(component.modificacionPartes.length).toBe(3);
  });

  it('should remove the last part from modificacionPartes', () => {
    component.modificacionPartes = [
      { rfc: 'RFC123', nombre: 'Name', caracter: 'Role' },
    ];
    component.eliminarParteC();
    expect(component.modificacionPartes.length).toBe(0);
  });

  it('should call setModificacionGoceInmueble when guardarDomInmuebleNvo is called', () => {
    component.direccionGrid.patchValue({
      direccion: 'Test Address',
      codigoPostal: '12345',
      cveEntidad: '01',
      cveMunicipio: '001',
      cveTipoDoc: '01',
      fechaInicioAnterior: '2023-01-01',
      fechaFinAnterior: '2023-12-31',
      fechaInicioActual: '2024-01-01',
      fechaFinActual: '2024-12-31',
      rfcPartesC: 'RFC123456789',
      caracterDeCons: 'Test Role',
    });
    component.guardarDomInmuebleNvo();
    expect(tramiteStoreMock.setModificacionGoceInmueble).toHaveBeenCalledWith(
      component.direccionGrid.value
    );
  });

  it('should destroy observables on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component.destroy$, 'next');
    const completeSpy = jest.spyOn(component.destroy$, 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should initialize modals on ngAfterViewInit', () => {
    component.modificarModel = {
      nativeElement: document.createElement('div'),
    } as any;
    component.modificarRecordModel = {
      nativeElement: document.createElement('div'),
    } as any;
    component.modalDomiciliosInmuebleNuevo = {
      nativeElement: document.createElement('div'),
    } as any;

    component.ngAfterViewInit();

    expect(component.modificarModelInstance).toBeInstanceOf(Modal);
    expect(component.modificarRecordModelInstance).toBeInstanceOf(Modal);
    expect(component.modalDomiciliosInmuebleNuevoInstance).toBeInstanceOf(
      Modal
    );
  });
});
