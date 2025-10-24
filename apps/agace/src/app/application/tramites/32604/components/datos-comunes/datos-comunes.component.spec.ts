import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DatosComunesComponent } from './datos-comunes.component';


import { FormBuilder } from '@angular/forms';
import { EmpresasComercializadorasService } from '../../services/empresas-comercializadoras.service';
import { Solicitud32604Store } from '../../estados/solicitud32604.store';
import { Solicitud32604Query } from '../../estados/solicitud32604.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of } from 'rxjs';

describe('DatosComunesComponent', () => {
  let component: DatosComunesComponent;
  let fixture: ComponentFixture<DatosComunesComponent>;
  let empresasComercializadorasServiceMock: any;
  let solicitud32604StoreMock: any;
  let solicitud32604QueryMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    empresasComercializadorasServiceMock = {};
    solicitud32604StoreMock = {
      actualizarActualmente1: jest.fn(),
      actualizarActualmente2: jest.fn(),
      nacionalidades: [],
      actualizarDomiciliosDatos: jest.fn(),
      actualizarListaSeccionSociosIC: jest.fn(),
      actualizarNumeroDeEmpleadosLista: jest.fn(),
    };
    solicitud32604QueryMock = {
      selectSolicitud$: of({
        domiciliosDatos: [],
        listaSeccionSociosIC: [],
        numeroDeEmpleadosLista: [],
        catseleccionados: [],
        servicio: []
      })
    };
    consultaioQueryMock = {};

      await TestBed.configureTestingModule({
        imports: [DatosComunesComponent, HttpClientTestingModule],
        providers: [
          FormBuilder,
          { provide: EmpresasComercializadorasService, useValue: empresasComercializadorasServiceMock },
          { provide: Solicitud32604Store, useValue: solicitud32604StoreMock },
          { provide: Solicitud32604Query, useValue: solicitud32604QueryMock },
          { provide: ConsultaioQuery, useValue: consultaioQueryMock }
        ],
        schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosComunesComponent);
    component = fixture.componentInstance;
    component.domiciliosDatos = [];
    component.listaSeccionSociosIC = [];
    component.numeroDeEmpleadosLista = [];
    component.seleccionarDomiciliosDatos = [];
    component.seleccionarListaSeccionSociosIC = [];
    component.seleccionarNumeroDeEmpleadosLista = [];
    component.inventariosDatos = [];
    component.seleccionarInventarios = [];
    component.datosComunesForm = (component as any).fb.group({
      catseleccionados: [],
      servicio: [],
      190: [''],
      191: [''],
      199: [''],
      200: [''],
      244: [''],
      201: [''],
      246: [''],
      247: ['']
    });
    component.sectorProductivo = { catalogos: [], labelNombre: '', primerOpcion: '', required: false };
    component.servicio = { catalogos: [], labelNombre: '', primerOpcion: '', required: false };
    component.sinoOpcion = { radioOptions: [], isRequired: false };
    component.esFormularioSoloLectura = false;
    component.desplegablesInteractuados = false;
  component.datosComunesForm.get('catseleccionados')?.setValue([]);
  component.datosComunesForm.get('servicio')?.setValue([]);
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
