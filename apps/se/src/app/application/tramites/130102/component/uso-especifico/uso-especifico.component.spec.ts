import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsoEspicificoComponent } from './uso-especifico.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CatalogoSelectComponent } from '@libs/shared/data-access-user/src/tramites/components/catalogo-select/catalogo-select.component';
import { TableComponent } from 'libs/shared/data-access-user/src/tramites/components/table/table.component';
import { TituloComponent } from "libs/shared/data-access-user/src/tramites/components/titulo/titulo.component";
import { CommonModule } from '@angular/common';
import { FormularioRegistroService } from '../../services/octava-temporal.service';
import { Tramite130102Store } from '../../../../estados/tramites/tramite130102.store';
import { Tramite130102Query } from '../../../../estados/queries/tramite130102.query';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { Subject } from 'rxjs';

describe('UsoEspicificoComponent', () => {
  let component: UsoEspicificoComponent;
  let fixture: ComponentFixture<UsoEspicificoComponent>;

  const mockFormRegistroService = {
    registrarFormulario: jest.fn()
  };

  const mockStore = {
    setFraccionArancelariaProsec: jest.fn(),
    setDescripcion: jest.fn()
  };

  const solicitudMockState = {
    fraccionArancelariaProsec: '01039101'
  };

  const consultaioSubject = new Subject<any>();
  const tramiteQuerySubject = new Subject<any>();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UsoEspicificoComponent,
        ReactiveFormsModule,
        CatalogoSelectComponent,
        TableComponent,
        TituloComponent,
        CommonModule
      ],
      providers: [
        FormBuilder,
        { provide: Tramite130102Store, useValue: mockStore },
        {
          provide: Tramite130102Query,
          useValue: {
            selectSolicitud$: tramiteQuerySubject.asObservable()
          }
        },
        {
          provide: ConsultaioQuery,
          useValue: {
            selectConsultaioState$: consultaioSubject.asObservable()
          }
        },
        { provide: FormularioRegistroService, useValue: mockFormRegistroService }
      ]
    }).compileComponents();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    fixture = TestBed.createComponent(UsoEspicificoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should call setValoresStore and store value', () => {
    consultaioSubject.next({ readonly: false });
    tramiteQuerySubject.next(solicitudMockState);

    fixture = TestBed.createComponent(UsoEspicificoComponent);
    component = fixture.componentInstance;
    component.ngOnInit();

    component.usoEspicificoForm.get('fraccionArancelariaProsec')?.setValue('01039101');
    component.setValoresStore(component.usoEspicificoForm, 'fraccionArancelariaProsec', 'setFraccionArancelariaProsec');
    expect(mockStore.setFraccionArancelariaProsec).toHaveBeenCalledWith('01039101');
  });


  it('should validate no leading spaces', () => {
    const controlWithSpace = { value: '  Leading' } as any;
    const controlValid = { value: 'Valid' } as any;

    expect(UsoEspicificoComponent['noLeadingSpacesValidator'](controlWithSpace)).toEqual({ leadingSpaces: true });
    expect(UsoEspicificoComponent['noLeadingSpacesValidator'](controlValid)).toBeNull();
  });

  it('should unsubscribe on destroy', () => {
    fixture = TestBed.createComponent(UsoEspicificoComponent);
    component = fixture.componentInstance;
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
 
  });
});