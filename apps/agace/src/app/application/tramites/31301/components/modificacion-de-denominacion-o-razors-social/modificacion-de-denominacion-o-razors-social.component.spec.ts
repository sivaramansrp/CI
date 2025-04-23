import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { ModificacionDeDenominacionORazorsSocialComponent } from './modificacion-de-denominacion-o-razors-social.component';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud31301Store } from '../../estados/solicitud31301.store';
import { Solicitud31301Query } from '../../estados/solicitud31301.query';
import { ModificacionDenominacionRazonSocial } from '../../models/solicitud.model';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@libs/shared/data-access-user/src';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ModificacionDeDenominacionORazorsSocialComponent', () => {
  let component: ModificacionDeDenominacionORazorsSocialComponent;
  let fixture: ComponentFixture<ModificacionDeDenominacionORazorsSocialComponent>;
  let solicitudServiceMock: jest.Mocked<SolicitudService>;
  let solicitud31301StoreMock: jest.Mocked<Solicitud31301Store>;
  let solicitud31301QueryMock: jest.Mocked<Solicitud31301Query>;

  const mockInitialResponse: ModificacionDenominacionRazonSocial = {
    razonSocialAnterior: 'Old Name',
    razonSocialActual: 'New Name',
  };

  beforeEach(async () => {
    solicitudServiceMock = {
      conseguirModificacionDenominacionRazonSocial: jest.fn().mockReturnValue(of(mockInitialResponse)),
      conseguirRecibirNotificaciones: jest.fn(),
      conseguirNombreInstitucionCatalogo: jest.fn(),
      conseguirDatosPorGarantia: jest.fn(),
    } as unknown as jest.Mocked<SolicitudService>;

    solicitud31301StoreMock = {
      actualizarRazonSocialActual: jest.fn(),
      actualizarRazonSocialAnterior: jest.fn(),
    } as unknown as jest.Mocked<Solicitud31301Store>;

    solicitud31301QueryMock = {
      selectSolicitud$: of(mockInitialResponse),
    } as unknown as jest.Mocked<Solicitud31301Query>;

    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ModificacionDeDenominacionORazorsSocialComponent,
        CommonModule,
        TituloComponent,
        HttpClientTestingModule
      ],
      declarations: [],
      providers: [
        { provide: SolicitudService, useValue: solicitudServiceMock },
        { provide: Solicitud31301Store, useValue: solicitud31301StoreMock },
        { provide: Solicitud31301Query, useValue: solicitud31301QueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModificacionDeDenominacionORazorsSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // triggers ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    expect(component.registroPolizaEndosoForm.value).toEqual({
      razonSocialAnterior: 'Old Name',
      razonSocialActual: 'New Name',
    });
  });

  it('should call conseguirModificacionDenominacionRazonSocial on initialization', () => {
    expect(solicitudServiceMock.conseguirModificacionDenominacionRazonSocial).toHaveBeenCalled();
  });

  it('should update the store with the response from conseguirModificacionDenominacionRazonSocial', () => {
    const mockNewResponse: ModificacionDenominacionRazonSocial = {
      razonSocialAnterior: 'Previous Name',
      razonSocialActual: 'Updated Name',
    };
    solicitudServiceMock.conseguirModificacionDenominacionRazonSocial.mockReturnValue(of(mockNewResponse));

    component.conseguirModificacionDenominacionRazonSocial();

    expect(solicitud31301StoreMock.actualizarRazonSocialActual).toHaveBeenCalledWith('Updated Name');
    expect(solicitud31301StoreMock.actualizarRazonSocialAnterior).toHaveBeenCalledWith('Previous Name');
  });

  it('should unsubscribe from observables on destroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');

    component.ngOnDestroy();

    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
