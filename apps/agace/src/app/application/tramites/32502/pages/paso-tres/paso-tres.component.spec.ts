import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ServiciosExtraordinariosService } from '@ng-mf/data-access-user';
import { TramiteStore } from 'apps/aga/src/app/application/estados/tramite.store';
import { PasoTresComponent } from './paso-tres.component';
import { AnexarRequisitosComponent } from 'apps/agace/src/app/application/tramites/32502/components/anexar-requisitos/anexar-requisitos.component';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;
  let mockRouter: any;
  let mockServiciosExtraordinariosService: any;
  let mockTramiteStore: any;

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn(),
    };

    mockServiciosExtraordinariosService = {
      obtenerTramite: jest.fn(),
    };

    mockTramiteStore = {
      establecerTramite: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [AnexarRequisitosComponent],
      declarations: [PasoTresComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ServiciosExtraordinariosService, useValue: mockServiciosExtraordinariosService },
        { provide: TramiteStore, useValue: mockTramiteStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set tipoPersona on obtenerTipoPersona', () => {
    const tipo = 1;
    component.obtenerTipoPersona(tipo);
    expect(component.tipoPersona).toBe(tipo);
  });

  it('should navigate to acuse on obtieneFirma with valid firma', () => {
    const firma = 'validFirma';
    const tramiteData = { data: 'tramiteData' };

    mockServiciosExtraordinariosService.obtenerTramite.mockReturnValue(of(tramiteData));

    component.obtieneFirma(firma);

    expect(mockServiciosExtraordinariosService.obtenerTramite).toHaveBeenCalledWith(19);
    expect(mockTramiteStore.establecerTramite).toHaveBeenCalledWith(tramiteData.data, firma);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['servicios-extraordinarios/acuse']);
  });

  it('should handle error on obtieneFirma with invalid firma', () => {
    const firma = 'invalidFirma';

    mockServiciosExtraordinariosService.obtenerTramite.mockReturnValue(throwError('error'));

    component.obtieneFirma(firma);

    expect(mockServiciosExtraordinariosService.obtenerTramite).toHaveBeenCalledWith(19);
    expect(mockTramiteStore.establecerTramite).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});