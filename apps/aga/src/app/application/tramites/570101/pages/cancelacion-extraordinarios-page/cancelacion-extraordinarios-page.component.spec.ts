import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CancelacionExtraordinariosPageComponent } from './cancelacion-extraordinarios-page.component';
import { BtnContinuarComponent, SolicitanteComponent, SolicitanteService, WizardComponent } from '@ng-mf/data-access-user';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { ElementRef } from '@angular/core';
import { Modal } from 'bootstrap';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AccionBoton } from '@ng-mf/data-access-user';

jest.mock('bootstrap', () => ({
  Modal: jest.fn().mockImplementation(() => ({
    show: jest.fn(),
    hide: jest.fn(),
  })),
}));

describe('CancelacionExtraordinariosPageComponent', () => {
  let componente: CancelacionExtraordinariosPageComponent;
  let fixture: ComponentFixture<CancelacionExtraordinariosPageComponent>;
  let mockWizardComponent: jest.Mocked<WizardComponent>;
  let mockPasoUnoComponent: jest.Mocked<PasoUnoComponent>;
  let mockModalInstance: jest.Mocked<Modal>;

  beforeEach(async () => {
    // Configurar mocks
    mockWizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn(),
    } as any;

    mockPasoUnoComponent = {
      isFormValid: jest.fn(),
    } as any;

    mockModalInstance = {
      show: jest.fn(),
      hide: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      declarations: [CancelacionExtraordinariosPageComponent, PasoUnoComponent, PasoDosComponent],
      imports: [WizardComponent, BtnContinuarComponent, SolicitanteComponent, HttpClientTestingModule],
      providers: [SolicitanteService]
    }).compileComponents();

    fixture = TestBed.createComponent(CancelacionExtraordinariosPageComponent);
    componente = fixture.componentInstance;

    // Asignar mocks a las propiedades del componente
    componente.wizardComponent = mockWizardComponent;
    componente.pasoUnoComponent = mockPasoUnoComponent;
    
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Creación del Componente', () => {
    it('debería crear el componente correctamente', () => {
      expect(componente).toBeTruthy();
    });

    it('debería inicializar con valores por defecto', () => {
      expect(componente.indice).toBe(1);
      expect(componente.valorIndicePendiente).toBeNull();
      expect(componente.pantallasPasos).toBeDefined();
      expect(componente.datosPasos).toBeDefined();
    });

    it('debería tener configuración correcta en datosPasos', () => {
      expect(componente.datosPasos.indice).toBe(1);
      expect(componente.datosPasos.txtBtnAnt).toBe('Anterior');
      expect(componente.datosPasos.txtBtnSig).toBe('Guardar y firmar');
      expect(componente.datosPasos.nroPasos).toBe(componente.pantallasPasos.length);
    });
  });

  describe('Método getValorIndice()', () => {
    let accionBotonMock: AccionBoton;

    beforeEach(() => {
      accionBotonMock = {
        valor: 2,
        accion: 'cont'
      };
    });

    it('debería almacenar el valor pendiente cuando se llama', () => {
      mockPasoUnoComponent.isFormValid.mockReturnValue(true);
      
      componente.getValorIndice(accionBotonMock);
      
      expect(componente.valorIndicePendiente).toEqual(accionBotonMock);
    });

    it('debería llamar abrirModal() cuando el formulario es válido', () => {
      mockPasoUnoComponent.isFormValid.mockReturnValue(true);
      const spyAbrirModal = jest.spyOn(componente, 'abrirModal');
      
      componente.getValorIndice(accionBotonMock);
      
      expect(mockPasoUnoComponent.isFormValid).toHaveBeenCalled();
      expect(spyAbrirModal).toHaveBeenCalled();
    });

    it('debería mostrar modal de confirmación cuando el formulario es inválido', () => {
      mockPasoUnoComponent.isFormValid.mockReturnValue(false);
      const mockElementoModal = { nativeElement: document.createElement('div') } as ElementRef;
      componente.modalConfirmar = mockElementoModal;
      (Modal as unknown as jest.Mock).mockImplementation(() => mockModalInstance);
      
      componente.getValorIndice(accionBotonMock);
      
      expect(mockPasoUnoComponent.isFormValid).toHaveBeenCalled();
      expect(Modal).toHaveBeenCalledWith(mockElementoModal.nativeElement);
      expect(mockModalInstance.show).toHaveBeenCalled();
    });

    it('no debería abrir el modal principal cuando el formulario es inválido', () => {
      mockPasoUnoComponent.isFormValid.mockReturnValue(false);
      const spyAbrirModal = jest.spyOn(componente, 'abrirModal');
      
      componente.getValorIndice(accionBotonMock);
      
      expect(spyAbrirModal).not.toHaveBeenCalled();
    });
  });

  describe('Método abrirModal()', () => {
    it('debería crear y mostrar el modal cuando el elemento existe', () => {
      const mockElementoModal = { nativeElement: document.createElement('div') } as ElementRef;
      componente.modalConfirmarCancelarSolicitud = mockElementoModal;
      (Modal as unknown as jest.Mock).mockImplementation(() => mockModalInstance);
      
      componente.abrirModal();
      
      expect(Modal).toHaveBeenCalledWith(mockElementoModal.nativeElement);
      expect(mockModalInstance.show).toHaveBeenCalled();
      expect(componente.modalInstance).toBe(mockModalInstance);
    });

    it('no debería crear modal cuando el elemento no existe', () => {
      componente.modalConfirmarCancelarSolicitud = null as any;
      
      componente.abrirModal();
      
      expect(Modal).not.toHaveBeenCalled();
      expect(mockModalInstance.show).not.toHaveBeenCalled();
    });

    it('no debería lanzar error cuando el elemento es undefined', () => {
      componente.modalConfirmarCancelarSolicitud = undefined as any;
      
      expect(() => componente.abrirModal()).not.toThrow();
    });
  });

  describe('Método abrirModalSi()', () => {
    beforeEach(() => {
      componente.modalInstance = mockModalInstance;
      componente.valorIndicePendiente = {
        valor: 2,
        accion: 'cont'
      };
    });

    it('debería ocultar el modal cuando existe', () => {
      componente.abrirModalSi();
      
      expect(mockModalInstance.hide).toHaveBeenCalled();
    });

    it('debería actualizar el índice con valor válido', () => {
      const valorEsperado = 2;
      componente.valorIndicePendiente = {
        valor: valorEsperado,
        accion: 'cont'
      };
      
      componente.abrirModalSi();
      
      expect(componente.indice).toBe(valorEsperado);
    });

    it('debería llamar siguiente() cuando la acción es "cont"', () => {
      componente.valorIndicePendiente = {
        valor: 2,
        accion: 'cont'
      };
      
      componente.abrirModalSi();
      
      expect(mockWizardComponent.siguiente).toHaveBeenCalled();
      expect(mockWizardComponent.atras).not.toHaveBeenCalled();
    });

    it('debería llamar atras() cuando la acción no es "cont"', () => {
      componente.valorIndicePendiente = {
        valor: 1,
        accion: 'prev'
      };
      
      componente.abrirModalSi();
      
      expect(mockWizardComponent.atras).toHaveBeenCalled();
      expect(mockWizardComponent.siguiente).not.toHaveBeenCalled();
    });

    it('no debería actualizar índice con valores fuera de rango', () => {
      const indiceOriginal = componente.indice;
      const valoresInvalidos = [0, 3, 4, -1, 10];
      
      valoresInvalidos.forEach(valor => {
        componente.indice = indiceOriginal;
        componente.valorIndicePendiente = {
          valor: valor,
          accion: 'cont'
        };
        
        componente.abrirModalSi();
        
        expect(componente.indice).toBe(indiceOriginal);
        expect(mockWizardComponent.siguiente).not.toHaveBeenCalled();
      });
    });

    it('no debería ejecutar navegación cuando valorIndicePendiente es null', () => {
      componente.valorIndicePendiente = null;
      
      componente.abrirModalSi();
      
      expect(mockWizardComponent.siguiente).not.toHaveBeenCalled();
      expect(mockWizardComponent.atras).not.toHaveBeenCalled();
    });

    it('no debería ejecutar navegación cuando wizardComponent es null', () => {
      componente.wizardComponent = null as any;
      
      componente.abrirModalSi();
      
      expect(mockWizardComponent.siguiente).not.toHaveBeenCalled();
      expect(mockWizardComponent.atras).not.toHaveBeenCalled();
    });

    it('debería manejar modalInstance null sin errores', () => {
      componente.modalInstance = null as any;
      
      expect(() => componente.abrirModalSi()).not.toThrow();
    });
  });

  describe('Pruebas de Valores Límite', () => {
    it('debería manejar correctamente valores límite en abrirModalSi()', () => {
      const casosPrueba = [
        { valor: 0, deberiaActualizar: false, descripcion: 'cero - fuera de rango' },
        { valor: 1, deberiaActualizar: true, descripcion: 'uno - límite inferior válido' },
        { valor: 2, deberiaActualizar: true, descripcion: 'dos - límite superior válido' },
        { valor: 3, deberiaActualizar: false, descripcion: 'tres - fuera de rango superior' }
      ];

      casosPrueba.forEach(({ valor, deberiaActualizar, descripcion }) => {
        const indiceOriginal = 1;
        componente.indice = indiceOriginal;
        componente.modalInstance = mockModalInstance;
        componente.valorIndicePendiente = { valor, accion: 'cont' };
        
        componente.abrirModalSi();
        
        if (deberiaActualizar) {
          expect(componente.indice).toBe(valor);
        } else {
          expect(componente.indice).toBe(indiceOriginal);
        }
      });
    });
  });

  describe('Flujos de Integración', () => {
    it('debería completar flujo exitoso: formulario válido -> modal -> confirmación -> navegación', () => {
      const accionBoton: AccionBoton = { valor: 2, accion: 'cont' };
      mockPasoUnoComponent.isFormValid.mockReturnValue(true);
      const mockElementoModal = { nativeElement: document.createElement('div') } as ElementRef;
      componente.modalConfirmarCancelarSolicitud = mockElementoModal;
      (Modal as unknown as jest.Mock).mockImplementation(() => mockModalInstance);
      
      // Paso 1: Ejecutar acción inicial
      componente.getValorIndice(accionBoton);
      expect(componente.valorIndicePendiente).toEqual(accionBoton);
      expect(Modal).toHaveBeenCalledWith(mockElementoModal.nativeElement);
      expect(mockModalInstance.show).toHaveBeenCalled();
      
      // Paso 2: Confirmar acción
      componente.abrirModalSi();
      expect(mockModalInstance.hide).toHaveBeenCalled();
      expect(componente.indice).toBe(2);
      expect(mockWizardComponent.siguiente).toHaveBeenCalled();
    });

    it('debería manejar flujo de formulario inválido: formulario inválido -> modal de advertencia', () => {
      const accionBoton: AccionBoton = { valor: 2, accion: 'cont' };
      mockPasoUnoComponent.isFormValid.mockReturnValue(false);
      const mockElementoModal = { nativeElement: document.createElement('div') } as ElementRef;
      componente.modalConfirmar = mockElementoModal;
      (Modal as unknown as jest.Mock).mockImplementation(() => mockModalInstance);
      
      componente.getValorIndice(accionBoton);
      
      expect(componente.valorIndicePendiente).toEqual(accionBoton);
      expect(Modal).toHaveBeenCalledWith(mockElementoModal.nativeElement);
      expect(mockModalInstance.show).toHaveBeenCalled();
    });
  });

  describe('Manejo de Errores', () => {
    it('debería manejar error en creación de Modal', () => {
      (Modal as unknown as jest.Mock).mockImplementationOnce(() => {
        throw new Error('Error al crear modal');
      });
      const mockElementoModal = { nativeElement: document.createElement('div') } as ElementRef;
      componente.modalConfirmarCancelarSolicitud = mockElementoModal;
      
      expect(() => componente.abrirModal()).toThrow('Error al crear modal');
    });

    it('debería manejar pasoUnoComponent undefined en getValorIndice', () => {
      componente.pasoUnoComponent = undefined as any;
      const accionBoton: AccionBoton = { valor: 2, accion: 'cont' };
      
      expect(() => componente.getValorIndice(accionBoton)).toThrow();
    });
  });

  describe('Gestión de Estado', () => {
    it('debería mantener estado consistente durante múltiples operaciones', () => {
      // Estado inicial
      expect(componente.indice).toBe(1);
      expect(componente.valorIndicePendiente).toBeNull();
      
      // Primera operación
      const primeraAccion: AccionBoton = { valor: 1, accion: 'cont' };
      mockPasoUnoComponent.isFormValid.mockReturnValue(true);
      componente.getValorIndice(primeraAccion);
      expect(componente.valorIndicePendiente).toEqual(primeraAccion);
      
      // Segunda operación debería sobrescribir
      const segundaAccion: AccionBoton = { valor: 2, accion: 'prev' };
      componente.getValorIndice(segundaAccion);
      expect(componente.valorIndicePendiente).toEqual(segundaAccion);
    });

    it('debería actualizar datosPasos consistentemente con el índice', () => {
      expect(componente.datosPasos.indice).toBe(componente.indice);
      expect(componente.datosPasos.nroPasos).toBe(componente.pantallasPasos.length);
    });
  });
});
