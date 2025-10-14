import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { CertificadoOrigenComponent } from './certificado-origen.component';
import { Tramite110217Store } from '../../../../estados/tramites/tramite110217.store';
import { Tramite110217Query } from '../../../../estados/queries/tramite110217.query';
import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { PeruCertificadoService } from '../../../110205/services/peru-certificado.service';
import { SeccionLibQuery } from '@libs/shared/data-access-user/src';

describe('CertificadoOrigenComponent', () => {
  let component: CertificadoOrigenComponent;
  let fixture: ComponentFixture<CertificadoOrigenComponent>;
  let tramite110217StoreMock: any;
  let tramite110217QueryMock: any;
  let consultaioQueryMock: any;
  let peruCertificadoServiceMock: any;
  let seccionLibQueryMock: any;

  beforeEach(async () => {
    tramite110217StoreMock = {
      setFormCertificadoOrigen: jest.fn(),
      setFormValida: jest.fn(),
    };

    tramite110217QueryMock = {
      selectSolicitud$: of({
        observaciones: 'Test observaciones',
        mercancia: []
      }),
      select: jest.fn().mockReturnValue(of({}))
    };

    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false })
    };

    peruCertificadoServiceMock = {
      obtenerEstados: jest.fn().mockReturnValue(of({ datos: [] })),
      obtenerMunicipios: jest.fn().mockReturnValue(of({ datos: [] })),
      obtenerMercancias: jest.fn().mockReturnValue(of({ datos: [] })),
    };

    seccionLibQueryMock = {
      select: jest.fn().mockReturnValue(of({}))
    };

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        CommonModule,
        CertificadoOrigenComponent
      ],
      providers: [
        provideHttpClient(),
        ToastrService,
        provideToastr({
          positionClass: 'toast-top-right',
        }),
        FormBuilder,
        { provide: Tramite110217Store, useValue: tramite110217StoreMock },
        { provide: Tramite110217Query, useValue: tramite110217QueryMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
        { provide: PeruCertificadoService, useValue: peruCertificadoServiceMock },
        { provide: SeccionLibQuery, useValue: seccionLibQueryMock }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CertificadoOrigenComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component properties', () => {
    expect(component.estado).toEqual([]);
    expect(component['destroyNotifier$']).toBeDefined();
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
    const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
