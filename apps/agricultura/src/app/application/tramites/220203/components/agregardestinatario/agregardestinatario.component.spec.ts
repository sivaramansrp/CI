import { AgregardestinatarioComponent } from './agregardestinatario.component';
import { FormBuilder } from '@angular/forms';

describe('AgregardestinatarioComponent', () => {
  let component: AgregardestinatarioComponent;

  beforeEach(() => {
    component = new AgregardestinatarioComponent(
      new FormBuilder(),
      {} as any, // tercerosrelacionadosService
      {} as any, // router
      { updateTercerosRelacionado: jest.fn() } as any, // certificadoZoosanitarioServices
      {} as any, // certificadoZoosanitarioQuery
      {} as any, // route
    );

    component.ngOnInit();
  });

  it('should not call service if form is invalid', () => {
    // Make form invalid by clearing a required field
    component.destinatarioForm.patchValue({
      nombre: '', // required field left empty
      tipoMercancia: '', // also required
      razonSocial: 'Empresa',
      pais: '',
    });

    component.onGuardarDestinatario();

    expect(component.destinatarioForm.valid).toBe(false);
    // Expect the service NOT to be called
    expect(component['certificadoZoosanitarioServices'].updateTercerosRelacionado).not.toHaveBeenCalled();
  });
});
