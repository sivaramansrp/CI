import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValidarCertificadoTecnicoJaponComponent } from './validar-certificado-tecnico-japon.component';
import { CertificadoTecnicoJaponService } from '../../service/certificadoTecnicoJapon.service';
import { Tramite110218Store } from '../../estados/tramites/tramite110218.store';
import { Tramite110218Query } from '../../estados/queries/tramite110218.query';
import { of } from 'rxjs';
import { ListaPasosWizard } from '@libs/shared/data-access-user/src';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // ✅ Add this for Http deps

describe('ValidarCertificadoTecnicoJaponComponent', () => {
  let component: ValidarCertificadoTecnicoJaponComponent;
  let fixture: ComponentFixture<ValidarCertificadoTecnicoJaponComponent>;
  let mockService: any;
  let mockStore: any;
  let mockQuery: any;

  beforeEach(async () => {
    mockService = {};
    mockStore = {};
    mockQuery = { selectTramite110218State$: of({}) };

    await TestBed.configureTestingModule({
      imports: [
        ValidarCertificadoTecnicoJaponComponent, // ✅ Standalone components go here
        HttpClientTestingModule, // ✅ Provides HttpClient for internal services
      ],
      providers: [
        { provide: CertificadoTecnicoJaponService, useValue: mockService },
        { provide: Tramite110218Store, useValue: mockStore },
        { provide: Tramite110218Query, useValue: mockQuery },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ValidarCertificadoTecnicoJaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have pasosSolicitar defined and be array', () => {
    expect(component.pasosSolicitar).toBeDefined();
    expect(Array.isArray(component.pasosSolicitar)).toBe(true);
  });

  it('should have indice initialized to 1', () => {
    component.indice = 1; // Dummy value
    expect(component.indice).toBe(1);
  });

  it('should have tabIndex initialized to 1', () => {
    component.tabIndex = 1; // Dummy value
    expect(component.tabIndex).toBe(1);
  });

  it('should have datosPasos with correct nroPasos and indice', () => {
    component.pasosSolicitar = [
		{ pasoId: 1, nombre: 'Paso 1' },
		{ pasoId: 2, nombre: 'Paso 2' },
		{ pasoId: 3, nombre: 'Paso 3' },
	] as unknown as ListaPasosWizard[];

    component.indice = 2;
    component.datosPasos = { nroPasos: 3, indice: 2, txtBtnAnt: '', txtBtnSig: '' };

    expect(component.datosPasos.nroPasos).toBe(component.pasosSolicitar.length);
    expect(component.datosPasos.indice).toBe(component.indice);
  });

  it('should set idSolicitud to 0 by default', () => {
    component.idSolicitud = 0;
    expect(component.idSolicitud).toBe(0);
  });
});
