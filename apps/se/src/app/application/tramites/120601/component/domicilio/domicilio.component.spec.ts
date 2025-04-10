import { FormBuilder } from '@angular/forms';
import { TestBed } from '@angular/core/testing';

import { DomicilioComponent } from './domicilio.component';
import { FormulariosService } from '@ng-mf/data-access-user';
import { SolicitanteService } from '@ng-mf/data-access-user';
import { of } from 'rxjs';

describe('DomicilioComponent', () => {
  let component: DomicilioComponent;
  let formServices: Partial<FormulariosService>;
  let solicitanteServicio: Partial<SolicitanteService>;

  beforeEach(async () => {
    formServices = {
      obtenerNombresCamposForm: jest.fn().mockReturnValue([]),
      agregarValorCampoDesactivado: jest.fn(),
    };

    solicitanteServicio = {
      getDatosGenerales: jest.fn().mockReturnValue(of({ data: JSON.stringify({ domicilioFiscal: {} }) })),
    };

    await TestBed.configureTestingModule({
      providers: [
        FormBuilder,
        { provide: FormulariosService, useValue: formServices },
        { provide: SolicitanteService, useValue: solicitanteServicio },
      ],
    }).compileComponents();

    component = new DomicilioComponent(
      TestBed.inject(SolicitanteService),
      TestBed.inject(FormulariosService)
    );
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
