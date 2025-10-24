import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EmpresaComponent } from './empresa.component';
import { FormBuilder } from '@angular/forms';
import { EmpresasComercializadorasService } from '../../services/empresas-comercializadoras.service';
import { Solicitud32604Store } from '../../estados/solicitud32604.store';
import { Solicitud32604Query } from '../../estados/solicitud32604.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of } from 'rxjs';

describe('EmpresaComponent', () => {
  let component: EmpresaComponent;
  let fixture: ComponentFixture<EmpresaComponent>;
  let empresasComercializadorasServiceMock: any;
  let solicitud32604StoreMock: any;
  let solicitud32604QueryMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    empresasComercializadorasServiceMock = {
  conseguirOpcionDeRadio: jest.fn(() => of({ requisitos: { radioOptions: [] } })),
      getContenedores: jest.fn(() => of({ data: [] })),
      getNationalidad: jest.fn(() => of({ data: [] })),
      getTipPersona: jest.fn(() => of([])),
    };
    solicitud32604StoreMock = {};
    solicitud32604QueryMock = {
      selectSolicitud$: of({})
    };
    consultaioQueryMock = {};

    await TestBed.configureTestingModule({
      imports: [EmpresaComponent, HttpClientTestingModule],
      providers: [
        FormBuilder,
        { provide: EmpresasComercializadorasService, useValue: empresasComercializadorasServiceMock },
        { provide: Solicitud32604Store, useValue: solicitud32604StoreMock },
        { provide: Solicitud32604Query, useValue: solicitud32604QueryMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EmpresaComponent);
    component = fixture.componentInstance;
      component.empresaForm = (component as any).fb.group({
        caracterDe: [''],
        rfcBusqueda: [''],
        instalacionesPrincipales: [''],
        registroFederalContribuyentes: [''],
        tipoPersona: [''],
        nacionalidad: [''],
        nombreCompleto: ['']
      });

      component.contenedores = { catalogos: [], labelNombre: '', primerOpcion: '' };
      component.sinoOpcion = { radioOptions: [], isRequired: false };
      component.tipoPersona = { catalogos: [], labelNombre: '', primerOpcion: '' };
      component.nacionalidad = { catalogos: [], labelNombre: '', primerOpcion: '' };
      component.miembroAModificar = null;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn((component as any)['destroy$'], 'next');
    const completeSpy = jest.spyOn((component as any)['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
