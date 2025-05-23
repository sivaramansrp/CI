import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { DatosDelNombreComponent } from './datos-del-nombre.component';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { CatalogoSelectComponent, SolicitanteComponent, TituloComponent } from '@ng-mf/data-access-user';
import { DatosGeneralesComponent } from '../datos-generales/datos-generales.component';
import { DomicilioFiscalComponent } from '../domicilio-fiscal/domicilio-fiscal.component';
import { Tramite630104Store } from '../../estados/tramites/tramite630104.store';
import { Tramite630104Query } from '../../estados/queries/tramite630104.query';
import { EquipoEInstrumentosMusicalesService } from '../../services/equipo-e-instrumentos-musicales.service';

describe('DatosDelNombreComponent', () => {
  let component: DatosDelNombreComponent;
  let fixture: ComponentFixture<DatosDelNombreComponent>;
  let tramite630104StoreMock: Partial<Tramite630104Store>;
  let tramite630104QueryMock: Partial<Tramite630104Query>;
  let equipoEInstrumentosMusicalesServiceMock: Partial<EquipoEInstrumentosMusicalesService>;

  const mockState = {
    esConsultaRep: '1',
    datosRepresentante: '1',
    rfc: 'ABC123456DEF'
  };

  const mockCatalogos =
  [{"descripcion": "Opción 1", "id": "1"}, {"descripcion": "Opción 2", "id": "2"}]

  beforeEach(async () => {
    tramite630104StoreMock = {
      setTramite630104State: jest.fn()
    };

    tramite630104QueryMock = {
      selectTramite630104State$: of(mockState)
    };

    equipoEInstrumentosMusicalesServiceMock = {
      getconsultarPorRFC: jest.fn().mockReturnValue(of(mockCatalogos)),
      getTipoDeRepresentante: jest.fn().mockReturnValue(of(mockCatalogos)),
      getPais: jest.fn().mockReturnValue(of(mockCatalogos))
    };

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        TituloComponent,
        DatosDelNombreComponent
      ],
      declarations: [],
      providers: [
        { provide: Tramite630104Store, useValue: tramite630104StoreMock },
        { provide: Tramite630104Query, useValue: tramite630104QueryMock },
        { provide: EquipoEInstrumentosMusicalesService, useValue: equipoEInstrumentosMusicalesServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .overrideComponent(DatosDelNombreComponent, {
      add: { imports: [TituloComponent] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosDelNombreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('debería inicializar correctamente el componente', () => {
      const getValorStoreSpy = jest.spyOn(component, 'getValorStore');
      const inicializarFormularioSpy = jest.spyOn(component, 'inicializarFormulario');
      const getconsultarPorRFCSpy = jest.spyOn(component, 'getconsultarPorRFC');
      const getTipoDeRepresentanteSpy = jest.spyOn(component, 'getTipoDeRepresentante');
      const getPaisSpy = jest.spyOn(component, 'getPais');
      const cambiarPropietarioSpy = jest.spyOn(component, 'cambiarPropietario');
      const cambiarTipoPropietarioSpy = jest.spyOn(component, 'cambiarTipoPropietario');

      component.ngOnInit();

      expect(getValorStoreSpy).toHaveBeenCalled();
      expect(inicializarFormularioSpy).toHaveBeenCalled();
      expect(getconsultarPorRFCSpy).toHaveBeenCalled();
      expect(getTipoDeRepresentanteSpy).toHaveBeenCalled();
      expect(getPaisSpy).toHaveBeenCalled();
      expect(cambiarPropietarioSpy).toHaveBeenCalled();
      expect(cambiarTipoPropietarioSpy).toHaveBeenCalled();
    });
  });

  describe('inicializarFormulario', () => {
    it('debería inicializar el formulario con valores del estado', () => {
      component.estadoSeleccionado = mockState;
      component.inicializarFormulario();

      expect(component.datisDelNombre.get('esConsultaRep')?.value).toBe(mockState.esConsultaRep);
      expect(component.datisDelNombre.get('datosRepresentante')?.value).toBe(mockState.datosRepresentante);
      expect(component.datisDelNombre.get('rfc')?.value).toBe(mockState.rfc);
    });

    it('debería inicializar el formulario con valores vacíos si no hay estado', () => {
      component.estadoSeleccionado = {};
      component.inicializarFormulario();

      expect(component.datisDelNombre.get('esConsultaRep')?.value).toBe('');
      expect(component.datisDelNombre.get('datosRepresentante')?.value).toBe('');
      expect(component.datisDelNombre.get('rfc')?.value).toBe('');
    });
  });

  describe('getValorStore', () => {
    it('debería asignar estadoSeleccionado desde el query', () => {
      component.getValorStore();
      expect(component.estadoSeleccionado).toEqual(mockState);
    });
  });

  describe('getconsultarPorRFC', () => {
    it('debería obtener y asignar las opciones de consultarPorRFC', () => {
      component.getconsultarPorRFC();
      expect(equipoEInstrumentosMusicalesServiceMock.getconsultarPorRFC).toHaveBeenCalled();
      expect(component.consultarPorRFC).toEqual(mockCatalogos);
    });
  });

  describe('getPais', () => {
    it('debería obtener y actualizar las opciones del campo país en el formulario', () => {
      component.formularioDatosPropietarioDireccion = component.formularioDatosPropietarioDireccion || [];
      component.formularioDatosPropietarioDireccion.push(
        { id: 'pais', opciones: [], mostrar: true, labelNombre: '', campo: '', clase: '', tipoInput: '', desactivado: false }
      );
      component.formularioDatosPropietarioDireccion[0].opciones = [];
      
      component.getPais();
      expect(equipoEInstrumentosMusicalesServiceMock.getPais).toHaveBeenCalled();
    });

    it('debería manejar cuando no se encuentra el campo país', () => {
      component.formularioDatosPropietarioDireccion = component.formularioDatosPropietarioDireccion || [];
      component.formularioDatosPropietarioDireccion.push(
        { id: 'otroCampo', opciones: [], mostrar: true, labelNombre: '', campo: '', clase: '', tipoInput: '', desactivado: false }
      );
      component.getPais();
      expect(equipoEInstrumentosMusicalesServiceMock.getPais).toHaveBeenCalled();
    });

    it('no debería actualizar opciones si el servicio devuelve un arreglo vacío', () => {
      equipoEInstrumentosMusicalesServiceMock.getPais = jest.fn().mockReturnValue(of([]));
      component.formularioDatosPropietarioDireccion = component.formularioDatosPropietarioDireccion || [];
      component.formularioDatosPropietarioDireccion.push(
        { id: 'pais', opciones: [], mostrar: true, labelNombre: '', campo: '', clase: '', tipoInput: '', desactivado: false }
      );
      component.getPais();
      expect(equipoEInstrumentosMusicalesServiceMock.getPais).toHaveBeenCalled();
    });
  });

  describe('getTipoDeRepresentante', () => {
    it('debería obtener y asignar las opciones de tipo de representante', () => {
      component.getTipoDeRepresentante();
      expect(equipoEInstrumentosMusicalesServiceMock.getTipoDeRepresentante).toHaveBeenCalled();
      expect(component.tipoDeRepresentanteOpciones).toEqual(mockCatalogos);
    });

    it('debería manejar una respuesta vacía del servicio', () => {
      equipoEInstrumentosMusicalesServiceMock.getTipoDeRepresentante = jest.fn().mockReturnValue(of([]));
      component.getTipoDeRepresentante();
      expect(component.tipoDeRepresentanteOpciones).toEqual([]);
    });

    it('no debería actualizar opciones si el servicio lanza un error', () => {
      equipoEInstrumentosMusicalesServiceMock.getTipoDeRepresentante = jest.fn().mockReturnValue(of(new Error('Error del servicio')));
      component.getTipoDeRepresentante();
    });
  });

  describe('cambiarPropietario', () => {
    it('debería mostrar tipo de propietario si esConsultaRep es 2', () => {
      component.datisDelNombre.get('esConsultaRep')?.setValue('2');
      component.cambiarPropietario();
      expect(component.mostrarTipoPropietario).toBe(true);
      expect(component.mostrarSolicitante).toBe(false);
    });

    it('debería mostrar solicitante si esConsultaRep es 1', () => {
      component.datisDelNombre.get('esConsultaRep')?.setValue('1');
      component.cambiarPropietario();
      expect(component.mostrarSolicitante).toBe(true);
    });
  });

  describe('cambiarTipoPropietario', () => {
    beforeEach(() => {
      component.formularioDatosPropietarioNombre = [
        { id: 'td_curp_representantev', mostrar: false, labelNombre: '', campo: '', clase: '', tipoInput: '', desactivado: false },
        { id: 'nombre', mostrar: false, labelNombre: '', campo: '', clase: '', tipoInput: '', desactivado: false },
        { id: 'apellidoPaterno', mostrar: false, labelNombre: '', campo: '', clase: '', tipoInput: '', desactivado: false },
        { id: 'apellidoMaterno', mostrar: false, labelNombre: '', campo: '', clase: '', tipoInput: '', desactivado: false }
      ];
    });

    it('debería mostrar los campos si datosRepresentante es 1', () => {
      component.datisDelNombre.get('datosRepresentante')?.setValue('1');
      component.cambiarTipoPropietario();
      component.formularioDatosPropietarioNombre.forEach(campo => {
        expect(campo.mostrar).toBe(true);
      });
      expect(component.mostrarFormularioPersonaExtranjera).toBe('1');
    });

    it('no debería mostrar los campos si datosRepresentante no es 1', () => {
      component.datisDelNombre.get('datosRepresentante')?.setValue('2');
      component.cambiarTipoPropietario();
      component.formularioDatosPropietarioNombre.forEach(campo => {
        expect(campo.mostrar).toBe(false);
      });
      expect(component.mostrarFormularioPersonaExtranjera).toBe('2');
    });
  });

  describe('establecerCambioDeValor', () => {
    it('debería establecer el estado con el id si el valor es un objeto', () => {
      const event = { campo: 'campoPrueba', valor: { id: '123' } };
      component.establecerCambioDeValor(event);
      expect(tramite630104StoreMock.setTramite630104State).toHaveBeenCalledWith('campoPrueba', '123');
    });

    it('debería establecer el estado con el valor directo si no es un objeto', () => {
      const event = { campo: 'campoPrueba', valor: 'valor simple' };
      component.establecerCambioDeValor(event);
      expect(tramite630104StoreMock.setTramite630104State).toHaveBeenCalledWith('campoPrueba', 'valor simple');
    });

    it('debería actualizar consultarPorRFCOpcionseleccionada según el valor del formulario', () => {
      component.datisDelNombre.addControl('consultarPorRFC', component.datisDelNombre.get('esConsultaRep')!);
      component.datisDelNombre.get('consultarPorRFC')?.setValue('1');
      component.establecerCambioDeValor({ campo: 'otroCampo', valor: 'otroValor' });
      expect(component.consultarPorRFCOpcionseleccionada).toBe('1');
    });
  });

  describe('continuar', () => {
    it('debería establecer consultarPorRFCOpcionseleccionada como verdadero si esConsultaRep es 1', () => {
      component.datisDelNombre.get('esConsultaRep')?.setValue('1');
      component.continuar();
      expect(component.consultarPorRFCOpcionseleccionada).toBe(true);
    });

    it('debería establecer consultarPorRFCOpcionseleccionada como falso si esConsultaRep es 2', () => {
      component.datisDelNombre.get('esConsultaRep')?.setValue('2');
      component.continuar();
      expect(component.consultarPorRFCOpcionseleccionada).toBe(false);
    });

    it('no debería cambiar consultarPorRFCOpcionseleccionada si esConsultaRep es otro valor', () => {
      component.consultarPorRFCOpcionseleccionada = true;
      component.datisDelNombre.get('esConsultaRep')?.setValue('3');
      component.continuar();
      expect(component.consultarPorRFCOpcionseleccionada).toBe(true);
    });
  });

  describe('ngOnDestroy', () => {
    it('debería completar el subject destroyed$', () => {
      const nextSpy = jest.spyOn(component['destroyed$'], 'next');
      const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
      component.ngOnDestroy();
      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });
});
