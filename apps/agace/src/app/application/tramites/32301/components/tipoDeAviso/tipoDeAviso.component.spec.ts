import { AlertComponent, InputCheckComponent, TituloComponent, FirmaElectronicaComponent, SharedModule, WizardComponent  } from "@ng-mf/data-access-user";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AvisoModifyService } from '../../services/aviso-modify.service';
import { of } from 'rxjs';
import { TipoDeAvisoComponent } from './tipoDeAviso.component';
import { Tramite32301Query } from '../../estados/tramite32301.query';
import { Tramite32301Store } from '../../estados/tramite32301.store';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


describe('TipoDeAvisoComponent', () => {
  let component: TipoDeAvisoComponent;
  let fixture: ComponentFixture<TipoDeAvisoComponent>;
  let avisoModifyServiceMock: any;
  let tramiteQueryMock: any;
  let tramiteStoreMock: any;

  beforeEach(async () => {
    avisoModifyServiceMock = {
      getAvisoModify: jest.fn().mockReturnValue(of({ descripcion: 'Test Description' })),
    };

    tramiteQueryMock = {
      select: jest.fn().mockReturnValue(of({ modalidadCertificacion: 'Test Modalidad' })),
    };

    tramiteStoreMock = {
      setModalidadCertificacion: jest.fn(),
      setforeignClientsSuppliers: jest.fn(),
      setNationalSuppliers: jest.fn(),
      setModificationsMembers: jest.fn(),
      setChangesToLegalDocuments: jest.fn(),
      setMergerOrSplitNotice: jest.fn(),
      setAdditionFractions: jest.fn(),
      setAcepto253: jest.fn(),
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, AlertComponent, InputCheckComponent, TituloComponent, TipoDeAvisoComponent, FirmaElectronicaComponent, RouterModule,
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoDeAvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on component initialization', () => {
    expect(component.miFormulario).toBeDefined();
    expect(component.miFormulario.get('modalidadCertificacion')?.value).toBeUndefined();
  });

  it('should call getAvisoModify and setModalidadCertificacion on inicializamiFormulario', () => {
    component.inicializamiFormulario();
    expect(avisoModifyServiceMock.getAvisoModify).toHaveBeenCalled();
    expect(tramiteStoreMock.setModalidadCertificacion).toHaveBeenCalledWith('Test Description');
  });

  it('should update the form when Tramite32301Query emits a new state', () => {
    component.ngOnInit();
    expect(component.tipoDevAviso.modalidadCertificacion).toBe('Test Modalidad');
  });

  it('should emit form values on onSubmit', () => {
    jest.spyOn(component.tabEnabledData, 'emit');
    component.miFormulario.setValue({
      modalidadCertificacion: 'Test',
      foreignClientsSuppliers: true,
      nationalSuppliers: false,
      modificationsMembers: true,
      changesToLegalDocuments: true,
      mergerOrSplitNotice: false,
      additionFractions: true,
      acepto253: false,
    });
    component.onSubmit();
    expect(component.tabEnabledData.emit).toHaveBeenCalledWith({
      modalidadCertificacion: 'Test',
      foreignClientsSuppliers: true,
      nationalSuppliers: false,
      modificationsMembers: true,
      changesToLegalDocuments: true,
      mergerOrSplitNotice: false,
      additionFractions: true,
      acepto253: false,
    });
  });
});