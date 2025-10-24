import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComercializadoraImportadoraComponent } from './comercializadora-importadora.component';


import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { EmpresasComercializadorasService } from '../../services/empresas-comercializadoras.service';
import { Solicitud32604Store } from '../../estados/solicitud32604.store';
import { Solicitud32604Query } from '../../estados/solicitud32604.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of } from 'rxjs';

describe('ComercializadoraImportadoraComponent', () => {
  let component: ComercializadoraImportadoraComponent;
  let fixture: ComponentFixture<ComercializadoraImportadoraComponent>;
  let empresasComercializadorasServiceMock: any;
  let solicitud32604StoreMock: any;
  let solicitud32604QueryMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
      empresasComercializadorasServiceMock = {
        conseguirOpcionDeRadio: jest.fn(() => of({ requisitos: [] }))
      };
    solicitud32604StoreMock = {};
      solicitud32604QueryMock = {
        selectSolicitud$: of({ transportistasLista: [] })
    };
    consultaioQueryMock = {};

    await TestBed.configureTestingModule({
      imports: [ComercializadoraImportadoraComponent, HttpClientTestingModule],
      providers: [
        FormBuilder,
        { provide: EmpresasComercializadorasService, useValue: empresasComercializadorasServiceMock },
        { provide: Solicitud32604Store, useValue: solicitud32604StoreMock },
        { provide: Solicitud32604Query, useValue: solicitud32604QueryMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ComercializadoraImportadoraComponent);
    component = fixture.componentInstance;
      component.transportistasLista = [];
      const tablaDinamica = fixture.debugElement.children.find(
        el => el.componentInstance && el.componentInstance.paginatedDatos !== undefined
      );
      if (tablaDinamica) {
        tablaDinamica.componentInstance.datos = [];
      }
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize modalidadForm on ngOnInit', () => {
    component.ngOnInit();
    expect(component.modalidadForm).toBeDefined();
  });

  it('should clean up subscriptions on ngOnDestroy', () => {
    const destroySpy = jest.spyOn((component as any)['destroy$'], 'next');
    const completeSpy = jest.spyOn((component as any)['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
