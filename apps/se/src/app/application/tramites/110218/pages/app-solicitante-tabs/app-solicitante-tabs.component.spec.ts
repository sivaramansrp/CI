import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppSolicitanteTabsComponent } from './app-solicitante-tabs.component';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { CertificadoTecnicoJaponService } from '../../service/certificadoTecnicoJapon.service';
import { of, Subject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppSolicitanteTabsComponent', () => {
  let component: AppSolicitanteTabsComponent;
  let fixture: ComponentFixture<AppSolicitanteTabsComponent>;
  let mockConsultaioQuery: any;
  let mockServicio: any;

  beforeEach(async () => {
    mockConsultaioQuery = {
      selectConsultaioState$: of({ update: false })
    };
    mockServicio = {
      obtenerRegistro: jest.fn().mockReturnValue(of({ id: 1 })),
      actualizarRegistro: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [AppSolicitanteTabsComponent],
      providers: [
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
        { provide: CertificadoTecnicoJaponService, useValue: mockServicio }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(AppSolicitanteTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should set datosRespuestaDisponibles to true if update is false', () => {
    component.ngOnInit();
    expect(component.datosRespuestaDisponibles).toBe(true);
  });

  it('should call obtenerDatosBandejaSolicitudes if update is true', () => {
    mockConsultaioQuery.selectConsultaioState$ = of({ update: true });
    const obtenerDatosSpy = jest.spyOn(component, 'obtenerDatosBandejaSolicitudes');
    component.ngOnInit();
    expect(obtenerDatosSpy).toHaveBeenCalled();
  });

  it('should set datosRespuestaDisponibles to true and call actualizarRegistro if respuesta exists', () => {
    component.datosRespuestaDisponibles = false;
    component.obtenerDatosBandejaSolicitudes();
    expect(component.datosRespuestaDisponibles).toBe(true);
    expect(mockServicio.actualizarRegistro).toHaveBeenCalledWith({ id: 1 });
  });

  it('should update indice when seleccionaTab is called', () => {
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });
});