/* eslint-disable sort-imports */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { DatosPorRegimenComponent } from './datos-por-regimen.component';
import { TituloComponent } from '../../../../shared/components/titulo/titulo.component';
import { CatalogoSelectComponent } from '../../../../shared/components/catalogo-select/catalogo-select.component';
import { TableComponent } from '../../../../shared/components/table/table.component';
import { ValidacionesFormularioService } from '../../../../core/services/shared/validaciones-formulario/validaciones-formulario.service';
import { ServiciosPantallaService } from '../../../../core/services/31601/servicios-pantalla.service';
import { Tramite31601Store } from '../../../../estados/tramites/tramites31601.store';
import { of } from 'rxjs';

describe('DatosPorRegimenComponent', () => {
  let component: DatosPorRegimenComponent;
  let fixture: ComponentFixture<DatosPorRegimenComponent>;
  let validacionesService: jasmine.SpyObj<ValidacionesFormularioService>;
  let pantallaSvc: jasmine.SpyObj<ServiciosPantallaService>;
  let tramite31601Store: jasmine.SpyObj<Tramite31601Store>;

  beforeEach(async () => {
    const validacionesServiceSpy = jasmine.createSpyObj(
      'ValidacionesFormularioService',
      ['isValid']
    );
    const pantallaSvcSpy = jasmine.createSpyObj('ServiciosPantallaService', [
      'getBimestreUnoCatalogo',
      'getBimestreDosCatalogo',
      'getBimestreTresCatalogo',
    ]);
    const tramite31601StoreSpy = jasmine.createSpyObj('Tramite31601Store', [
      'setComboBimestresOne',
      'setComboBimestresTwo',
      'setComboBimestresThree',
    ]);

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ReactiveFormsModule,
        DatosPorRegimenComponent,
        TituloComponent,
        CatalogoSelectComponent,
        TableComponent,
      ],
      providers: [
        {
          provide: ValidacionesFormularioService,
          useValue: validacionesServiceSpy,
        },
        { provide: ServiciosPantallaService, useValue: pantallaSvcSpy },
        { provide: Tramite31601Store, useValue: tramite31601StoreSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosPorRegimenComponent);
    component = fixture.componentInstance;
    validacionesService = TestBed.inject(
      ValidacionesFormularioService
    ) as jasmine.SpyObj<ValidacionesFormularioService>;
    pantallaSvc = TestBed.inject(
      ServiciosPantallaService
    ) as jasmine.SpyObj<ServiciosPantallaService>;
    tramite31601Store = TestBed.inject(
      Tramite31601Store
    ) as jasmine.SpyObj<Tramite31601Store>;

    pantallaSvc.getBimestreUnoCatalogo.and.returnValue(
      of({ code: 200, message: 'Success', data: [] })
    );
    pantallaSvc.getBimestreDosCatalogo.and.returnValue(
      of({ code: 200, message: 'Success', data: [] })
    );
    pantallaSvc.getBimestreTresCatalogo.and.returnValue(
      of({ code: 200, message: 'Success', data: [] })
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize one catalogs on init', () => {
    expect(pantallaSvc.getBimestreUnoCatalogo).toHaveBeenCalledTimes(3);
  });

  it('should initialize form on creation', () => {
    expect(component.regimenForm).toBeDefined();
  });

  it('should create form on initialization', () => {
    component.crearRegimenForm();
    expect(component.regimenForm).toBeDefined();
  });

  it('should set default form control values', () => {
    component.establecervalorcontrolformulario();
    expect(component.regimenForm.get('importaciones')?.value).toBe('Yes');
    expect(component.regimenForm.get('infraestructura')?.value).toBe('Yes');
  });

  it('should validate form fields', () => {
    validacionesService.isValid.and.returnValue(true);
    expect(component.isValid('importaciones')).toBeTrue();
    expect(validacionesService.isValid).toHaveBeenCalledWith(
      component.regimenForm,
      'importaciones'
    );
  });

  it('should handle bimestre selections', () => {
    component.regimenForm.get('comboBimestresOne')?.setValue('Bimestre 1');
    component.bimestreUnoSeleccion();
    expect(tramite31601Store.setComboBimestresOne).toHaveBeenCalledWith(
      'Bimestre 1'
    );

    component.regimenForm.get('comboBimestresTwo')?.setValue('Bimestre 2');
    component.bimestreDosSeleccion();
    expect(tramite31601Store.setComboBimestresTwo).toHaveBeenCalledWith(
      'Bimestre 2'
    );

    component.regimenForm.get('comboBimestresThree')?.setValue('Bimestre 3');
    component.bimestreTresSeleccion();
    expect(tramite31601Store.setComboBimestresThree).toHaveBeenCalledWith(
      'Bimestre 3'
    );
  });

  it('should open modal and initialize form', () => {
    component.abrirModal();
    expect(component.modal).toBe('show');
    expect(component.agregarForm).toBeDefined();
  });
});
