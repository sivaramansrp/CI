import { TestBed } from '@angular/core/testing';
import { RegistroExportadorAutorizadoComponent } from './registro-exportador-autorizado.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ExportadorAutorizadoService } from "@ng-mf/data-access-user";
import { Tramite110102Store } from '../../estados/store/tramite110102.store';
import { Tramite110102Query } from '../../estados/queries/tramite110102.query';
import { of } from 'rxjs';

describe('RegistroExportadorAutorizadoComponent', () => {
  let component: RegistroExportadorAutorizadoComponent;
  let mockService: any;
  let mockStore: any;
  let mockQuery: any;

  beforeEach(async () => {
    mockService = {
      getExportadorAutorizado: jest.fn().mockReturnValue(of([{ label: 'A', value: 1 }])),
      getExportadorAutorizadoJPN: jest.fn().mockReturnValue(of([{ label: 'B', value: 2 }]))
    };
    mockStore = { establecerDatos: jest.fn() };
    mockQuery = { selectTramite110102$: of({
      solicitaSeparacionContable: true,
      solicitaExportadorAutorizado: true,
      condicionExportador: 'COND',
      solicitaExportadorAutorizadoJPN: false,
      condicionExportadorJPN: 'CONDJPN'
    }) };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,RegistroExportadorAutorizadoComponent],
      providers: [
        FormBuilder,
        { provide: ExportadorAutorizadoService, useValue: mockService },
        { provide: Tramite110102Store, useValue: mockStore },
        { provide: Tramite110102Query, useValue: mockQuery }
      ]
    }).compileComponents();

    const FIXTURE = TestBed.createComponent(RegistroExportadorAutorizadoComponent);
    component = FIXTURE.componentInstance;
    FIXTURE.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit debe inicializar el formulario y cargar opciones', () => {
    expect(component.registroExportadorForm).toBeDefined();
    expect(mockService.getExportadorAutorizado).toHaveBeenCalled();
    expect(mockService.getExportadorAutorizadoJPN).toHaveBeenCalled();
    expect(component.exportadorOptions).toEqual([{ label: 'A', value: 1 }]);
    expect(component.exportadorOptionsJPN).toEqual([{ label: 'B', value: 2 }]);
    expect(component.showDivExportador).toBe(true);
    expect(component.showDivExportadorJPN).toBe(false);
  });

  it('onSolicitaExportadorAutorizadoChange debe actualizar showDivExportador y llamar setValoresStore', () => {
    const EVENT = { target: { checked: true } } as any;
    const SPY = jest.spyOn(component, 'setValoresStore');
    component.onSolicitaExportadorAutorizadoChange(EVENT);
    expect(component.showDivExportador).toBe(true);
    expect(SPY).toHaveBeenCalledWith(component.registroExportadorForm, 'solicitaExportadorAutorizado');
  });

  it('onSolicitaExportadorAutorizadoJPNChange debe actualizar showDivExportadorJPN y llamar setValoresStore', () => {
    const EVENT = { target: { checked: true } } as any;
    const SPY = jest.spyOn(component, 'setValoresStore');
    component.onSolicitaExportadorAutorizadoJPNChange(EVENT);
    expect(component.showDivExportadorJPN).toBe(true);
    expect(SPY).toHaveBeenCalledWith(component.registroExportadorForm, 'solicitaExportadorAutorizadoJPN');
  });

  it('setValoresStore debe llamar a establecerDatos en el store', () => {
    component.registroExportadorForm.get('condicionExportador')?.setValue('VALOR');
    component.setValoresStore(component.registroExportadorForm, 'condicionExportador');
    expect(mockStore.establecerDatos).toHaveBeenCalledWith({ condicionExportador: 'VALOR' });
  });

  it('getValorsStore debe actualizar el formulario con valores del store', () => {
    component.registroExportadorForm.patchValue({
      solicitaSeparacionContable: false,
      solicitaExportadorAutorizado: false,
      condicionExportador: '',
      solicitaExportadorAutorizadoJPN: false,
      condicionExportadorJPN: ''
    });
    component.getValorsStore();
    expect(component.registroExportadorForm.get('solicitaSeparacionContable')?.value).toBe(true);
    expect(component.registroExportadorForm.get('solicitaExportadorAutorizado')?.value).toBe(true);
    expect(component.registroExportadorForm.get('condicionExportador')?.value).toBe('COND');
    expect(component.registroExportadorForm.get('solicitaExportadorAutorizadoJPN')?.value).toBe(false);
    expect(component.registroExportadorForm.get('condicionExportadorJPN')?.value).toBe('CONDJPN');
  });

  it('ngOnDestroy debe completar el subject destroyed$', () => {
    const SPY_NEXT = jest.spyOn((component as any).destroyed$, 'next');
    const SPY_COMPLETE = jest.spyOn((component as any).destroyed$, 'complete');
    component.ngOnDestroy();
    expect(SPY_NEXT).toHaveBeenCalled();
    expect(SPY_COMPLETE).toHaveBeenCalled();
  });
});