import { TestBed } from '@angular/core/testing';
import { TratadosComponent } from './tratados.component';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { CertificadoTecnicoJaponService } from '@libs/shared/data-access-user/src/core/services/110218/certificadoTecnicoJapon.service';
import { CommonModule } from '@angular/common';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ReactiveFormsModule } from '@angular/forms';

describe('TratadosComponent', () => {
  let component: TratadosComponent;
  let service: CertificadoTecnicoJaponService;

  beforeEach(() => {
    const serviceMock = {
      gettratados: jest.fn().mockReturnValue(of({
        tratadoAcuerdo: 'Acuerdo Test',
        paisBloque: 'Bloque Test',
        paisdeOrigen: 'Origen Test',
        paisDestino: 'Destino Test',
        fechadeExpedicion: '2025-01-01',
        fechadeVencimiento: '2026-01-01'
      }))
    };

    TestBed.configureTestingModule({
      imports: [CommonModule, TituloComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: CertificadoTecnicoJaponService, useValue: serviceMock }
      ]
    });

    service = TestBed.inject(CertificadoTecnicoJaponService);
    component = new TratadosComponent(TestBed.inject(FormBuilder), service);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with disabled controls', () => {
    expect(component.detallesdeltransporte.disabled).toBe(true);
  });

  it('should call obtenerDatosDeTabla on ngOnInit', () => {
    jest.spyOn(component, 'obtenerDatosDeTabla');
    component.ngOnInit();
    expect(component.obtenerDatosDeTabla).toHaveBeenCalled();
  });

  it('should update form values when obtenerDatosDeTabla is called', () => {
    component.obtenerDatosDeTabla();
    expect(component.detallesdeltransporte.value).toEqual({
      tratadoAcuerdo: 'Acuerdo Test',
      paisBloque: 'Bloque Test',
      paisdeOrigen: 'Origen Test',
      paisDestino: 'Destino Test',
      fechadeExpedicion: '2025-01-01',
      fechadeVencimiento: '2026-01-01'
    });
  });
});
