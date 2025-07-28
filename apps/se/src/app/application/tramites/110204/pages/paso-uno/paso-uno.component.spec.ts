// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Input
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of as observableOf } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

import { PasoUnoComponent } from './paso-uno.component';
import { CertificadosOrigenGridService } from '../../services/certificadosOrigenGrid.service';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { SolicitanteComponent } from '@libs/shared/data-access-user/src';
import { CertificadoOrigenComponent } from '../../components/certificado-origen/certificado-origen.component';
import { DatosCertificadoComponent } from '../../components/datos-certificado/datos-certificado.component';


@Injectable()
class MockCertificadosOrigenGridService {}


describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        HttpClientModule,
        PasoUnoComponent
      ],
      providers: [
        { provide: CertificadosOrigenGridService, useClass: MockCertificadosOrigenGridService },
        ChangeDetectorRef,
        ConsultaioQuery
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
  });



  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', () => {
    component.consultaQuery = {
      selectConsultaioState$: observableOf({ update: {}, readonly: {} })
    };
    component.guardarDatosFormulario = jest.fn();
    component.ngOnInit();
    expect(component.guardarDatosFormulario).toHaveBeenCalled();
  });

  it('should run #guardarDatosFormulario()', () => {
    component.certificadosOrigenGridService = {
      getAcuiculturaData: jest.fn().mockReturnValue(observableOf({})),
      actualizarEstadoFormulario: jest.fn()
    };
    component.guardarDatosFormulario();
    expect(component.certificadosOrigenGridService.getAcuiculturaData).toHaveBeenCalled();
    expect(component.certificadosOrigenGridService.actualizarEstadoFormulario).toHaveBeenCalled();
  });

  it('should run #ngAfterViewInit()', () => {
    component.solicitante = { obtenerTipoPersona: jest.fn() };
    component.cdr = { detectChanges: jest.fn() };
    component.ngAfterViewInit();
    expect(component.solicitante.obtenerTipoPersona).toHaveBeenCalled();
    expect(component.cdr.detectChanges).toHaveBeenCalled();
  });

  it('should run #seleccionaTab()', () => {
    const tab = { id: 'test-tab' };
    component.seleccionaTab(tab);
  });

  it('should run #ngOnDestroy()', () => {
    component.destroyNotifier$ = {
      next: jest.fn(),
      complete: jest.fn()
    };
    component.ngOnDestroy();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.complete).toHaveBeenCalled();
  });
});
