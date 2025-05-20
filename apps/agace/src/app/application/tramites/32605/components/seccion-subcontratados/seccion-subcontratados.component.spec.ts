import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { SeccionSubcontratadosComponent } from './seccion-subcontratados.component';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud32605Store } from '../../estados/solicitud32605.store';
import { Solicitud32605Query } from '../../estados/solicitud32605.query';
import {
  Catalogo,
  CatalogoSelectComponent,
  TituloComponent,
} from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SeccionSubcontratadosComponent', () => {
  let component: SeccionSubcontratadosComponent;
  let fixture: ComponentFixture<SeccionSubcontratadosComponent>;
  let solicitudServiceMock: any;
  let solicitud32605StoreMock: any;
  let solicitud32605QueryMock: any;

  beforeEach(async () => {
    solicitudServiceMock = {
      conseguirSolicitudCatologoSelectLista: jest.fn().mockReturnValue(of({})),
      conseguirSeccionSubcontratados: jest.fn().mockReturnValue(
        of({
          subcontrataRFC: 'RFC123',
          subcontrataRazonSocial: 'Test Company',
        })
      ),
    };

    solicitud32605StoreMock = {
      actualizarSubcontrataRFCBusqueda: jest.fn(),
      actualizarSubcontrataRFC: jest.fn(),
      actualizarSubcontrataRazonSocial: jest.fn(),
      actualizarSubcontrataEmpleados: jest.fn(),
      actualizarSubcontrataBimestre: jest.fn(),
    };

    solicitud32605QueryMock = {
      selectSolicitud$: of({
        subcontrataRFCBusqueda: 'RFC123',
        subcontrataRFC: 'RFC123',
        subcontrataRazonSocial: 'Test Company',
        subcontrataEmpleados: '10',
        subcontrataBimestre: '1',
      }),
    };

    await TestBed.configureTestingModule({
      imports: [
        SeccionSubcontratadosComponent,
        CommonModule,
        ReactiveFormsModule,
        CatalogoSelectComponent,
        TituloComponent,
        HttpClientTestingModule,
      ],
      declarations: [],
      providers: [
        FormBuilder,
        { provide: SolicitudService, useValue: solicitudServiceMock },
        { provide: Solicitud32605Store, useValue: solicitud32605StoreMock },
        { provide: Solicitud32605Query, useValue: solicitud32605QueryMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SeccionSubcontratadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    expect(component.subcontratadosForm).toBeDefined();
    expect(
      component.subcontratadosForm.controls['subcontrataRFCBusqueda']
    ).toBeDefined();
  });

  it('should patch form values from state on ngOnInit', () => {
    expect(component.subcontratadosForm.value).toEqual({
      subcontrataRFCBusqueda: 'RFC123',
      subcontrataEmpleados: '10',
      subcontrataBimestre: '1',
    });
  });

  it('should update store on actualizarSubcontrataRFCBusqueda', () => {
    const event = { target: { value: 'RFC456' } } as unknown as Event;
    component.actualizarSubcontrataRFCBusqueda(event);
    expect(
      solicitud32605StoreMock.actualizarSubcontrataRFCBusqueda
    ).toHaveBeenCalledWith('RFC456');
  });

  it('should update store on actualizarSubcontrataRFC', () => {
    const event = { target: { value: 'RFC789' } } as unknown as Event;
    component.actualizarSubcontrataRFC(event);
    expect(
      solicitud32605StoreMock.actualizarSubcontrataRFC
    ).toHaveBeenCalledWith('RFC789');
  });

  it('should update store on actualizarSubcontrataRazonSocial', () => {
    const event = { target: { value: 'New Company' } } as unknown as Event;
    component.actualizarSubcontrataRazonSocial(event);
    expect(
      solicitud32605StoreMock.actualizarSubcontrataRazonSocial
    ).toHaveBeenCalledWith('New Company');
  });

  it('should update store on actualizarSubcontrataEmpleados', () => {
    const event = { target: { value: '20' } } as unknown as Event;
    component.actualizarSubcontrataEmpleados(event);
    expect(
      solicitud32605StoreMock.actualizarSubcontrataEmpleados
    ).toHaveBeenCalledWith('20');
  });

  it('should update store on actualizarSubcontrataBimestre', () => {
    solicitud32605StoreMock.actualizarSubcontrataBimestre(2);
    expect(
      solicitud32605StoreMock.actualizarSubcontrataBimestre
    ).toHaveBeenCalledWith(2);
  });

  it('should emit data on cerrarModal', () => {
    jest.spyOn(component.seccionSubcontratados, 'emit');
    component.subcontratadosForm.setValue({
      subcontrataRFCBusqueda: 'RFC123',
      subcontrataRFC: 'RFC123',
      subcontrataRazonSocial: 'Test Company',
      subcontrataEmpleados: '10',
      subcontrataBimestre: '1',
    });
    component.cerrarModal();
    expect(component.seccionSubcontratados.emit).toHaveBeenCalledWith({
      denominacion: 'Test Company',
      RFC: 'RFC123',
      numeroDeEmpleados: '10',
      bimestre: '1',
    });
  });

  it('should complete destroy$ on ngOnDestroy', () => {
    const destroySpy = jest.spyOn(component['destroy$'], 'next');
    const completeSpy = jest.spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
});
