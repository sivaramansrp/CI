import { CambioDenominacionRazonSocialComponent } from './cambio-denominacion-razon-social.component';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

describe('CambioDenominacionRazonSocialComponent', () => {
  let component: CambioDenominacionRazonSocialComponent;
  let tramiteStoreMock: any;
  let tramiteQueryMock: any;

  beforeEach(() => {
    tramiteStoreMock = {
      setFolioAcuse: jest.fn()
    };
    tramiteQueryMock = {
      selectSolicitud$: of({
        rfcVucem: 'RFCVUCEM',
        razonSocialVucem: 'RAZONVUCEM',
        rfcIdc: 'RFCIDC',
        razonSocialIdc: 'RAZONIDC',
        folioAcuse: 'FOLIO123'
      })
    };
    component = new CambioDenominacionRazonSocialComponent(
      new FormBuilder(),
      tramiteStoreMock,
      tramiteQueryMock
    );
    component.avisoState = {
      rfcVucem: 'RFCVUCEM',
      razonSocialVucem: 'RAZONVUCEM',
      rfcIdc: 'RFCIDC',
      razonSocialIdc: 'RAZONIDC',
      folioAcuse: 'FOLIO123'
    } as any;
  });

  it('should initialize form with values on inicializarFormulario', () => {
    component.inicializarFormulario();
    expect(component.avisoCambioRazonSocialForm).toBeDefined();
    expect(component.avisoCambioRazonSocialForm.get('rfcVucem')?.value).toBe('RFCVUCEM');
    expect(component.avisoCambioRazonSocialForm.get('folioAcuse')?.value).toBe('FOLIO123');
  });

  it('should call setFolioAcuse on validarFolioAcuse', () => {
    component.inicializarFormulario();
    component.avisoCambioRazonSocialForm.get('folioAcuse')?.setValue('FOLIO999');
    component.validarFolioAcuse();
    expect(tramiteStoreMock.setFolioAcuse).toHaveBeenCalledWith('FOLIO999');
  });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
    const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
    component.ngOnDestroy();
    expect(completeSpy).toHaveBeenCalled();
  });
});
