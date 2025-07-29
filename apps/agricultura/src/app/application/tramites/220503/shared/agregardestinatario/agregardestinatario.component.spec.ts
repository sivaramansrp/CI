// agregardestinatario.component.spec.ts
import { FormBuilder } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { TercerosrelacionadosService } from '../../../../shared/components/services/tercerosrelacionados/tercerosrelacionados.service';
import { AgregardestinatarioComponent } from './agregardestinatario.component';
import { Solocitud220503Service } from '../../services/service220503.service';
import { Solicitud220503Query } from '../../estados/tramites220503.query';

describe('AgregardestinatarioComponent', () => {
  let component: AgregardestinatarioComponent;
  let tercerosService: Partial<TercerosrelacionadosService>;
  let importacionService: Partial<Solocitud220503Service>;
  let acuiculturaQuery: Partial<Solicitud220503Query>;

  beforeEach(() => {
    // Mock services
    tercerosService = {
      obtenerSelectorList: jest.fn().mockReturnValue(of([]))
    };

    importacionService = {
      updateTercerosRelacionado: jest.fn()
    };

    const seleccionarTerceros$ = new Subject<any>();
    acuiculturaQuery = {
      seletedTerceros$: seleccionarTerceros$.asObservable()
    };

    component = new AgregardestinatarioComponent(
      new FormBuilder(),
      tercerosService as TercerosrelacionadosService,
      {} as any, // Router not used directly in tested methods
      importacionService as Solocitud220503Service,
      acuiculturaQuery as Solicitud220503Query,
      {} as any // ActivatedRoute not used here
    );

    component.ngOnInit(); // Initialize form
  });

  it('should create form with default values and validators', () => {
    expect(component.destinatarioForm).toBeDefined();
    expect(component.destinatarioForm.controls['tipoMercancia'].value).toBe('yes');
    expect(component.destinatarioForm.controls['nombre'].valid).toBe(false);
    expect(component.destinatarioForm.controls['razonSocial'].valid).toBe(false);
  });

  it('should load catalogs on ngAfterViewInit', () => {
    component.ngAfterViewInit();
    expect(tercerosService.obtenerSelectorList).toHaveBeenCalledTimes(4);
    expect(component.pairsCatalog).toEqual([]);
    expect(component.estadoCatalog).toEqual([]);
    expect(component.municipioCatalog).toEqual([]);
    expect(component.coloniaCatalog).toEqual([]);
  });

  it('should require razonSocial when tipoMercancia is "yes"', () => {
    component.destinatarioForm.patchValue({ tipoMercancia: 'yes' });
    component.enCambioValorRadio();
    const ctrl = component.destinatarioForm.get('razonSocial');
    ctrl?.setValue('');
    expect(ctrl?.valid).toBe(false);
    ctrl?.setValue('Some Social Reason');
    expect(ctrl?.valid).toBe(true);
  });

  it('should clear validators from razonSocial when tipoMercancia is "no"', () => {
    component.destinatarioForm.patchValue({ tipoMercancia: 'no' });
    component.enCambioValorRadio();
    const ctrl = component.destinatarioForm.get('razonSocial');
    ctrl?.setValue('');
    expect(ctrl?.valid).toBe(true);
  });

  it('should emit cerrar event on onCancelarDestinatario', () => {
    const spyCerrar = jest.spyOn(component.cerrar, 'emit');
    component.onCancelarDestinatario();
    expect(spyCerrar).toHaveBeenCalled();
  });

  it('should call update service and emit cerrar when form is valid onGuardarDestinatario', () => {
    component.destinatarioForm.patchValue({
      tipoMercancia: 'yes',
      nombre: 'Juan',
      primerApellido: 'Perez',
      razonSocial: 'Empresa SA',
      pais: '1',
      codigoPostal: '12345',
      estado: '01',
      calle: 'Calle 1',
      numeroExterior: '123'
    }); // minimal valid data

    const spyUpdate = jest.spyOn(importacionService, 'updateTercerosRelacionado');
    const spyCerrar = jest.spyOn(component.cerrar, 'emit');

    component.onGuardarDestinatario();

    expect(spyUpdate).toHaveBeenCalled();
    expect(spyCerrar).toHaveBeenCalled();
  });

  it('should mark form as touched if form invalid on onGuardarDestinatario', () => {
    component.destinatarioForm.patchValue({
      tipoMercancia: 'yes',
      nombre: '',
      primerApellido: '',
      razonSocial: '',
      pais: '',
      codigoPostal: '',
      estado: '',
      calle: '',
      numeroExterior: ''
    }); // invalid form

    const markAllAsTouchedSpy = jest.spyOn(component.destinatarioForm, 'markAllAsTouched');
    component.onGuardarDestinatario();
    expect(markAllAsTouchedSpy).toHaveBeenCalled();
  });
});
