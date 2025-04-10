import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { PasotresComponent } from './paso-tres.component';
import { ServiciosPantallaService } from '@libs/shared/data-access-user/src/core/services/31601/servicios-pantalla.service';
import { TramiteCofeprisStore } from '../../../../estados/tramite.store';

describe('PasotresComponent', () => {
  let component: PasotresComponent;
  let fixture: ComponentFixture<PasotresComponent>;
  let mockRouter: jest.Mocked<Router>;
  let mockServiciosPantallaService: jest.Mocked<ServiciosPantallaService>;
  let mockTramiteCofeprisStore: jest.Mocked<TramiteCofeprisStore>;

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn(),
    } as unknown as jest.Mocked<Router>;

    mockServiciosPantallaService = {
      obtenerTramite: jest.fn(),
    } as unknown as jest.Mocked<ServiciosPantallaService>;

    mockTramiteCofeprisStore = {
      establecerTramite: jest.fn(),
    } as unknown as jest.Mocked<TramiteCofeprisStore>;

    await TestBed.configureTestingModule({
      declarations: [PasotresComponent],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ServiciosPantallaService, useValue: mockServiciosPantallaService },
        { provide: TramiteCofeprisStore, useValue: mockTramiteCofeprisStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasotresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call obtenerTramite if firma is empty', () => {
    component.obtieneFirma('');

    expect(mockServiciosPantallaService.obtenerTramite).not.toHaveBeenCalled();
    expect(mockTramiteCofeprisStore.establecerTramite).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });

  it('should handle error from obtenerTramite gracefully', () => {
    mockServiciosPantallaService.obtenerTramite.mockReturnValue(throwError(() => new Error('Error fetching tramite')));

    component.obtieneFirma('valid-firma');

    expect(mockServiciosPantallaService.obtenerTramite).toHaveBeenCalledWith(19);
    expect(mockTramiteCofeprisStore.establecerTramite).not.toHaveBeenCalled();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});