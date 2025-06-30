import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CertificadosLicenciasPermisosService } from '../../services/certificados-licencias-permisos.service';
import { Tramite260303Store } from '../../../../estados/tramites/260303/tramite260303.store';
import { Tramite260303Query } from '../../../../estados/queries/260303/tramite260303.query';
import { of, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { EstadoCatalogResponse } from '../../models/certificados-licencias-permisos.model';
import { ScianDatos, MercanciasDatos, ConfiguracionColumna } from '@libs/shared/data-access-user/src';
import { ConsultaioState } from '@ng-mf/data-access-user';
import { TemplateRef } from '@angular/core';

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let mockModalService: jest.Mocked<BsModalService>;
  let mockCertificadosService: jest.Mocked<CertificadosLicenciasPermisosService>;
  let mockStore: jest.Mocked<Tramite260303Store>;
  let mockQuery: jest.Mocked<Tramite260303Query>;
  let formBuilder: FormBuilder;

  // Datos de prueba
  const mockEstadoCatalog: EstadoCatalogResponse = {
    code: 200,
    message: 'OK',
    data: [
      { id: 1, clave: 'EST1', descripcion: 'Estado 1' },
      { id: 2, clave: 'EST2', descripcion: 'Estado 2' }
    ]
  };

  const mockScianDatos: ScianDatos[] = [
    { clave: 'SCN1', descripcion: 'Descripción SCIAN 1' },
    { clave: 'SCN2', descripcion: 'Descripción SCIAN 2' }
  ];

  const mockMercanciasDatos: MercanciasDatos[] = [
    {
  clasificacion: "Medicamento controlado",
  especificar: "Analgésico",
  dci: "Paracetamol",
  denominacion: "Paracetamol 500mg",
  numero: "123456",
  fraccion: "3004.90.99",
  descripcionDeLa: "Medicamento en tabletas para dolor y fiebre",
  tipoDeProducto: "Farmacéutico",
  formaFarmaceutica: "Tabletas",
  umt: "Caja",
  umc: "Tableta",
  numeroCas: "103-90-2",
  cantidad: "1000",
  kg: "25",
  paisDeDestino: "México",
  paisDeOrigen: "India",
  paisDeProcedencia: "India",
  uso: "Uso humano",
  detalle: "Indicado para tratamiento del dolor leve a moderado",
  cantidadUmc: "10000",
  dePiezas: "10",
  descripcionDePiezas: "10 cajas de 100 tabletas cada una",
  numeroDeReg: "REG-2025-XYZ",
  presentacion: "Caja con 100 tabletas"
}

  ];

  const mockSolicitudState = {
    denominacionRazon: 'Razón Social',
    codigoPostal: '12345',
    estado: 'EST1',
    municipio: 'Municipio',
    localidad: 'Localidad',
    colonia: 'Colonia',
    calleYNumero: 'Calle 123',
    correoElecronico: 'test@test.com',
    rfc: 'RFC123',
    lada: '52',
    telefono: '1234567890',
    avisoDeFuncionamiento: true,
    licenciaSanitaria: 'LIC123',
    regimenDestinara: 'REG1',
    aduana: 'ADU1',
    losDatosNo: false,
    losDatosYes: true,
    nombreORazon: 'Nombre Razón',
    apellidoPaterno: 'Paterno',
    apellidoMaterno: 'Materno',
    clave: 'CLAVE1',
    descripcion: 'Descripción',
    especificarClasificacionProducto: 'Especificación',
    dci: 'DCI',
    marcaComercialODenominacionDistintiva: 'Marca',
    tipoDeProducto: 'TIPO1',
    fraccionArancelaria: 'FRA1',
    descripcionDeLaFraccion: 'Desc Fracción',
    cantidadUMT: 1,
    UMT: 'UMT1',
    UMC: 'UMC1',
    numeroCas: 'CAS1',
    cantidadDeLotes: 1,
    kgOrPorLote: 'KG1',
    pais: 'PAIS1',
    paisDeProcedencia: 'PROC1',
    detallarUso: 'Detalle Uso',
    cantidadUMC: 1,
    numeroDePiezas: 1,
    descripcionDelNumeroDePiezas: 'Desc Piezas',
    numeroDeRegistro: 'REG1',
    presentacion: 'PRES1'
  };

  const mockConsultaState: ConsultaioState = {
   procedureId: 'KG1',
    parameter: 'KG1',
    department: 'KG1',
    folioTramite: 'KG1',
    tipoDeTramite: 'KG1',
    estadoDeTramite: 'KG1',
    readonly: false,
    create: true,
    update: false,
    consultaioSolicitante: null,
  };

  beforeEach(async () => {
    mockModalService = {
      show: jest.fn().mockReturnValue({ hide: jest.fn() })
    } as unknown as jest.Mocked<BsModalService>;

    mockCertificadosService = {
      getEstadoDatos: jest.fn().mockReturnValue(of(mockEstadoCatalog)),
      getScianDatos: jest.fn().mockReturnValue(of(mockScianDatos)),
      getClaveDatos: jest.fn().mockReturnValue(of(mockEstadoCatalog)),
      getRegimenDatos: jest.fn().mockReturnValue(of(mockEstadoCatalog)),
      getMercanciasDatos: jest.fn().mockReturnValue(of(mockMercanciasDatos)),
      getTipoDeProductoDatos: jest.fn().mockReturnValue(of(mockEstadoCatalog)),
      getPaisDeProcedenciaDatos: jest.fn().mockReturnValue(of(mockEstadoCatalog))
    } as unknown as jest.Mocked<CertificadosLicenciasPermisosService>;

    mockStore = {
      setDenominacionRazon: jest.fn(),
      updateCodigoPostal: jest.fn(),
      updateEstado: jest.fn(),
      updateMunicipio: jest.fn(),
      updateLocalidad: jest.fn(),
      updateColonia: jest.fn(),
      updateCalleYNumero: jest.fn(),
      updateCorreoElecronico: jest.fn(),
      updateRfc: jest.fn(),
      updateLada: jest.fn(),
      updateTelefono: jest.fn(),
      updateAvisoDeFuncionamiento: jest.fn(),
      updateLicenciaSanitaria: jest.fn(),
      updateRegimenDestinara: jest.fn(),
      updateAduana: jest.fn(),
      updateLosDatosNo: jest.fn(),
      updateLosDatosYes: jest.fn(),
      updateNombreORazon: jest.fn(),
      updateApellidoPaterno: jest.fn(),
      updateApellidoMaterno: jest.fn(),
      updateClave: jest.fn(),
      updateDescripcion: jest.fn(),
      updateEspecificarClasificacionProducto: jest.fn(),
      updateDci: jest.fn(),
      updateMarcaComercialODenominacionDistintiva: jest.fn(),
      updateTipoDeProducto: jest.fn(),
      updateFraccionArancelaria: jest.fn(),
      updateDescripcionDeLaFraccion: jest.fn(),
      updateCantidadUMT: jest.fn(),
      updateUMT: jest.fn(),
      updateUMC: jest.fn(),
      updateNumeroCas: jest.fn(),
      updateCantidadDeLotes: jest.fn(),
      updateKgOrPorLote: jest.fn(),
      updatePais: jest.fn(),
      updatePaisDeProcedencia: jest.fn(),
      updateDetallarUso: jest.fn(),
      updateCantidadUMC: jest.fn(),
      updateNumeroDePiezas: jest.fn(),
      updateDescripcionDelNumeroDePiezas: jest.fn(),
      updateNumeroDeRegistro: jest.fn(),
      updatePresentacion: jest.fn()
    } as unknown as jest.Mocked<Tramite260303Store>;

    mockQuery = {
      selectSolicitud$: of(mockSolicitudState)
    } as unknown as jest.Mocked<Tramite260303Query>;

    await TestBed.configureTestingModule({
      imports: [CommonModule, ReactiveFormsModule,DatosDeLaSolicitudComponent],
      declarations: [],
      providers: [
        { provide: BsModalService, useValue: mockModalService },
        { provide: CertificadosLicenciasPermisosService, useValue: mockCertificadosService },
        { provide: Tramite260303Store, useValue: mockStore },
        { provide: Tramite260303Query, useValue: mockQuery },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    component.consultaState = mockConsultaState;
    fixture.detectChanges();
  });

 it('debería crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  describe('Inicialización del componente', () => {
    it('debería inicializar los formularios correctamente', () => {
      expect(component.denominacionForm).toBeDefined();
      expect(component.domicilioDeElstablecimientoForm).toBeDefined();
      expect(component.representanteLegalForm).toBeDefined();
      expect(component.scianForm).toBeDefined();
      expect(component.mercanciasForm).toBeDefined();
    });

    it('debería cargar los datos iniciales del estado', fakeAsync(() => {
      component.ngOnInit();
      tick();
      
      expect(component.denominacionForm.get('denominacionRazon')?.value).toBe('Razón Social');
      expect(component.domicilioDeElstablecimientoForm.get('codigoPostal')?.value).toBe('12345');
      expect(component.representanteLegalForm.get('nombreORazon')?.value).toBe('Nombre Razón');
    }));

    it('debería cargar los catálogos y datos de tablas', fakeAsync(() => {
      component.inicializarTablaYCatalogoDatos();
      tick();
      
      expect(mockCertificadosService.getEstadoDatos).toHaveBeenCalled();
      expect(mockCertificadosService.getScianDatos).toHaveBeenCalled();
      expect(mockCertificadosService.getMercanciasDatos).toHaveBeenCalled();
      
      expect(component.estadoCatalogo.length).toBe(2);
      expect(component.scianTablaDatos.length).toBe(2);
      expect(component.mercanciasTablaDatos.length).toBe(1);
    }));
  });


    it('debería manejar el cambio en el checkbox de aviso de funcionamiento', () => {
      const event = { target: { checked: true } } as unknown as Event;
      
      component.onFuncionamientoCheckboxCambiar(event);
      expect(component.domicilioDeElstablecimientoForm.get('licenciaSanitaria')?.disabled).toBe(true);
      
      const event2 = { target: { checked: false } } as unknown as Event;
      component.onFuncionamientoCheckboxCambiar(event2);
      expect(component.domicilioDeElstablecimientoForm.get('licenciaSanitaria')?.enabled).toBe(true);
    });

    it('debería actualizar el store cuando cambian los valores del formulario', () => {
      const testForm = formBuilder.group({
        testField: ['testValue']
      });
      
      component.setValoresStore(testForm, 'testField', 'setDenominacionRazon');
      expect(mockStore.setDenominacionRazon).toHaveBeenCalledWith('testValue');
    });

    it('debería mostrar/ocultar los colapsables correctamente', () => {
      component.mostrarColapsable('forma');
      expect(component.colapsableObj.formaFarmaceuticaColapsable).toBe(true);
      
      component.mostrarColapsable('PaisDeOrigen');
      expect(component.colapsableObj.paisDeOrigenColapsable).toBe(true);
      
      component.mostrarColapsable('usoEspecifico');
      expect(component.colapsableObj.usoEspecificoColapsable).toBe(true);
      
      component.mostrarColapsable('otro');
      expect(component.colapsableObj.formaFarmaceuticaColapsable).toBe(false);
      expect(component.colapsableObj.paisDeOrigenColapsable).toBe(false);
      expect(component.colapsableObj.usoEspecificoColapsable).toBe(false);
    });

    it('debería deshabilitar formularios cuando readonly es true', () => {
      component.consultaState = {
        procedureId: '',
        parameter: '',
        department: '',
        folioTramite: '',
        tipoDeTramite: '',
        estadoDeTramite: '',
        readonly: true,
        create: false,
        update: false,
        consultaioSolicitante: null
      };
      component.deshabilitarFormularios();
      
      expect(component.denominacionForm.disabled).toBe(true);
      expect(component.domicilioDeElstablecimientoForm.disabled).toBe(true);
      expect(component.representanteLegalForm.disabled).toBe(true);
      expect(component.scianForm.disabled).toBe(true);
      expect(component.mercanciasForm.disabled).toBe(true);
    });

  

  describe('Configuración de tablas', () => {
    it('debería tener la configuración correcta para la tabla SCIAN', () => {
      expect(component.configuracionTabla.length).toBe(2);
      expect(component.configuracionTabla[0].encabezado).toBe('Clave S.C.I.A.N');
      expect(component.configuracionTabla[1].encabezado).toBe('Descripción del S.C.I.A.N');
      
      const scianItem = { clave: 'TEST', descripcion: 'Test Desc' };
      expect(component.configuracionTabla[0].clave(scianItem)).toBe('TEST');
      expect(component.configuracionTabla[1].clave(scianItem)).toBe('Test Desc');
    });

    it('debería tener la configuración correcta para la tabla de mercancías', () => {
      expect(component.configuracionMercancias.length).toBe(24);
      expect(component.configuracionMercancias[0].encabezado).toBe('Clasificación del producto');
      expect(component.configuracionMercancias[23].encabezado).toBe('Presentación');
      
      const mercanciaItem = mockMercanciasDatos[0];
      expect(component.configuracionMercancias[0].clave(mercanciaItem)).toBe("Medicamento controlado");
      expect(component.configuracionMercancias[23].clave(mercanciaItem)).toBe("Caja con 100 tabletas");
    });
  });
});
 describe('Cobertura de utilidades y ramas', () => {
  it('deepCopy debe clonar objetos correctamente', () => {
    const obj = { a: 1, b: { c: 2 } };
    const copia = DatosDeLaSolicitudComponent.deepCopy(obj);
    expect(copia).toEqual(obj);
    expect(copia).not.toBe(obj);
    expect(copia.b).not.toBe(obj.b);
  });



  
});
