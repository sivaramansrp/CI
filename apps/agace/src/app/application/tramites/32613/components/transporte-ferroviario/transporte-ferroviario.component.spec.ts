import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransporteFerroviarioComponent } from './transporte-ferroviario.component';
import { Tramite32613Store } from '../../../../estados/tramites/tramite32613.store';
import { Tramite32613Query } from '../../../../estados/queries/tramite32613.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

describe('TransporteFerroviarioComponent', () => {
  let component: TransporteFerroviarioComponent;
  let fixture: ComponentFixture<TransporteFerroviarioComponent>;
  let storeMock: Partial<Tramite32613Store>;
  let queryMock: Partial<Tramite32613Query>;
  let consultaQueryMock: Partial<ConsultaioQuery>;
  
  beforeEach(async () => {
    storeMock = {
      setDynamicFieldValue: jest.fn()
    };

    queryMock = {
      selectRubroTransporteFerrovario$: of({})
    };

    consultaQueryMock = {
      selectConsultaioState$: of({
        readonly: false,
        update: false,
        procedureId: '',
        parameter: '',
        department: '',
        folioTramite: '',
        someOtherField1: null,
        someOtherField2: null,
        someOtherField3: null,
        tipoDeTramite: '',
        estadoDeTramite: '',
        create: false,
        consultaioSolicitante: null
      })
    };
    
    await TestBed.configureTestingModule({
      imports: [TransporteFerroviarioComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Tramite32613Store, useValue: storeMock },
        { provide: Tramite32613Query, useValue: queryMock },
        { provide: ConsultaioQuery, useValue: consultaQueryMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TransporteFerroviarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

    it('should add correoTelefono group', () => {
    const lengthBefore = component.correosTelefonicos.length;
    component.addCorreoTelefonoGroup();
    expect(component.correosTelefonicos.length).toBe(lengthBefore + 1);
  });

    it('should update store on text value change', () => {
    const event = { target: { value: 'test@example.com' } } as any;
    component.textValorCambio(event, 'correoTextInput');
    expect(storeMock.setDynamicFieldValue).toHaveBeenCalledWith('correoTextInput', 'test@example.com');
  });

    it('should disable senaleRadioInput when senaleSiSuSolicitud is 1', () => {
    component.rubroTransporteFerrovariostate = { senaleSiSuSolicitud: 1 };
    component.initializeForm();
    component.asignarValorCondicional();
    expect(component.transporteFerroviarioForm.get('senaleRadioInput')?.disabled).toBe(true);
  });

    it('should enable senaleRadioInput when senaleSiSuSolicitud is 2', () => {
    component.rubroTransporteFerrovariostate = { senaleSiSuSolicitud: 2 };
    component.initializeForm();
    component.asignarValorCondicional();
    expect(component.transporteFerroviarioForm.get('senaleRadioInput')?.enabled).toBe(true);
  });

    it('should update store and UI based on establecerCambioDeValorUno', () => {
    component.establecerCambioDeValorUno({ campo: 'indiqueSiCuentaCarga', valor: 'Si' });
    expect(component.mostrarAlertaUno).toBe(true);
    expect(storeMock.setDynamicFieldValue).toHaveBeenCalledWith('indiqueSiCuentaCarga', 'Si');
  });

    it('should return validation error when no correoTelefonicos are filled', () => {
    component.correosTelefonicos.clear();
    component.addCorreoTelefonoGroup();
    const errors = component.correosTelefonicos.errors;
    expect(errors?.['atLeastOneRequired']).toBe(true);
  });

    it('should populate templateMap after view init', async () => {
      await component.ngAfterViewInit();
      expect(component.templateMap['customSection1']).toBeDefined();
    });

  it('should complete destroyNotifier$ on ngOnDestroy', () => {
      const completeSpy = jest.spyOn(
        (component as any).destroyNotifier$,
        'complete'
      );
      const nextSpy = jest.spyOn((component as any).destroyNotifier$, 'next');
      component.ngOnDestroy();
      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });

    it('should update store when radioValorCambio is called', () => {
      component.radioValorCambio(1, 'senaleSiSuSolicitud');
      expect(storeMock.setDynamicFieldValue).toHaveBeenCalledWith('senaleSiSuSolicitud', 1);
    });

    it('should update store with correosTelefonicos array when text input in array changes', () => {
      const fb = TestBed.inject(FormBuilder);
      component.transporteFerroviarioForm.setControl(
        'correosTelefonicos',
        fb.array([
          fb.group({ correoLada: '', correoTelefono: '' }),
          fb.group({ correoLada: '', correoTelefono: '' }),
          fb.group({ correoLada: '', correoTelefono: '' }),
          fb.group({ correoLada: '', correoTelefono: '' }),
        ])
      );

      const input = document.createElement('input');
      input.value = '8888';
      const event = new Event('input');
      Object.defineProperty(event, 'target', { writable: false, value: input });

      component.textValorCambio(event, 'correoTelefono', 0);

      expect(storeMock.setDynamicFieldValue).toHaveBeenCalledWith('correosTelefonicos', [
        { correoLada: '', correoTelefono: '8888' },
        { correoLada: '', correoTelefono: '' },
        { correoLada: '', correoTelefono: '' },
        { correoLada: '', correoTelefono: '' },
      ]);
    });

    it('should call validacionesService.isValid in esValido()', () => {
      const campo = 'correoTextInput';
      const spy = jest.spyOn(component['validacionesService'], 'isValid').mockReturnValue(true);
      const result = component.esValido(campo);
      expect(spy).toHaveBeenCalledWith(component.transporteFerroviarioForm, campo);
      expect(result).toBe(true);
    });

    it('should set mostrarTemplate3Alerta to true and update store when unidadesArrendadas has value', () => {
      component.customTemplate3Events({ campo: 'unidadesArrendadas', valor: '3' });
      expect(component.mostrarTemplate3Alerta).toBe(true);
      expect(storeMock.setDynamicFieldValue).toHaveBeenCalledWith('unidadesArrendadas', '3');
    });

    it('should call store.setDynamicFieldValue in emitirCambioValor()', () => {
      const data = { campo: 'clasificacionInformacion', valor: 2 };
      component.emitirCambioValor(data);
      expect(storeMock.setDynamicFieldValue).toHaveBeenCalledWith('clasificacionInformacion', 2);
    });

    it('should disable unidadesPropias and unidadesArrendadas in customTemplate3Form if readonly is true', () => {
      component.consultaState = { readonly: true, update: false } as any;
      component.template3Array = [
        { formControlName: 'unidadesPropias', required: true },
        { formControlName: 'unidadesArrendadas', required: false }
      ];
      component.initializeCustomTemplate3Form();

      expect(component.customTemplate3Form.get('unidadesPropias')?.disabled).toBe(true);
      expect(component.customTemplate3Form.get('unidadesArrendadas')?.disabled).toBe(true);
    });

    it('should patch correosTelefonicos from rubroTransporteFerrovariostate if array exists', () => {
      component.rubroTransporteFerrovariostate = {
        correosTelefonicos: [
          { correoLada: '01', correoTelefono: '1234' },
          { correoLada: '02', correoTelefono: '5678' }
        ]
      };

      component.initializeForm();
      component.addCorreoTelefonoGroup();
      component.addCorreoTelefonoGroup();

      component.asignarValorCondicional();

      const values = component.correosTelefonicos.getRawValue();
      expect(values[0]).toEqual({ correoLada: '01', correoTelefono: '1234' });
      expect(values[1]).toEqual({ correoLada: '02', correoTelefono: '5678' });
    });

});
