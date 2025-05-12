import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { AlertComponent, CatalogoSelectComponent, InputRadioComponent, TableComponent, TituloComponent } from '@ng-mf/data-access-user';
import { DonacionesExtranjerasService } from '../../services/donaciones-extranjeras/donaciones-extranjeras.service';
import { RegistroDeDonacionComponent } from './registro-de-donacion.component';
import { DatosDonanteExtranjeroComponent } from '../datos-donante-extranjero/datos-donante-extranjero.component';

describe('RegistroDeDonacionComponent', () => {
  let component: RegistroDeDonacionComponent;
  let fixture: ComponentFixture<RegistroDeDonacionComponent>;
  let donacionesExtranjerasService: jest.Mocked<DonacionesExtranjerasService>;

  beforeEach(async () => {
    const SPY = {
      getAduana: jest.fn().mockReturnValue(of({ data: [] })),
      getDestinoDonacion: jest.fn().mockReturnValue(of({ data: [] })),
      getTipoDeMercancia: jest.fn().mockReturnValue(of({ data: [] })),
      getUnidadMedida: jest.fn().mockReturnValue(of({ data: [] })),
      getUmt: jest.fn().mockReturnValue(of({ data: [] })),
      getProcedenciaOtro: jest.fn().mockReturnValue(of({ data: [] })),
      getCondicionMercancia: jest.fn().mockReturnValue(of({ data: [] })),
      getPaisOrigenMedicamento: jest.fn().mockReturnValue(of({ data: [] })),
      getPaisProcedenciaMedicamento: jest.fn().mockReturnValue(of({ data: [] })),
      getManifiestos: jest.fn().mockReturnValue(of({ data: [] })),
      getBasicoRequerimientos: jest.fn().mockReturnValue(of({ data: [] })),
    };

    await TestBed.configureTestingModule({
      declarations: [
        RegistroDeDonacionComponent,
        DatosDonanteExtranjeroComponent
      ],
      imports: [
        ReactiveFormsModule, 
        TituloComponent, 
        CatalogoSelectComponent, 
        AlertComponent, 
        TableComponent,
        InputRadioComponent
      ],
      providers: [{ provide: DonacionesExtranjerasService, useValue: SPY }]
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroDeDonacionComponent);
    component = fixture.componentInstance;
    donacionesExtranjerasService = TestBed.inject(DonacionesExtranjerasService) as jest.Mocked<DonacionesExtranjerasService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show or hide collapsible panel', () => {
    component.panels = [{ label: 'Panel 1', isCollapsed: true }, { label: 'Panel 2', isCollapsed: true }];
    component.mostrar_colapsable(1);
    expect(component.panels[1].isCollapsed).toBeFalsy();
    expect(component.panels[0].isCollapsed).toBeTruthy();
  });

  it('should open modal', () => {
    component.abrirDialogoMercancias();
    expect(component.modal).toBe('show');
  });

  it('should close modal', () => {
    jest.spyOn(component.closeModal.nativeElement, 'click');
    component.cerrarModal();
    expect(component.closeModal.nativeElement.click).toHaveBeenCalled();
  });

  it('should add mercancias and close modal', () => {
    jest.spyOn(component, 'cerrarModal');
    component.agregarMercanciasForm.setValue({
      datosMercancia: {
        numeroConsecutivo: '1',
        destinoDonacion: 'test',
        posibleFraccion: '',
        descripcionFraccion: '',
        justificacionMerca: 'test',
        descripcionMercanciaOtro: 'test',
        tipoDeMercancia: 'test',
        cantidadUMC: '1',
        cantidadUMT: '1',
        unidadMedida: 'test',
        UMT: 'test',
        paisProcedenciaOtro: 'test',
        condicionMercanciaA: 'test'
      },
      datosCofepris: {
        ingredienteActivo: 'test',
        tipoMedicamento: 'test',
        presentacionFarma: 'test',
        paisOrigenMedicamento: 'test',
        paisProcedenciaMedicamento: 'test'
      }
    });
    component.agregarMercancias();
    expect(component.getMercanciaTableData.mercanciaTable.tableBody.length).toBe(1);
    expect(component.cerrarModal).toHaveBeenCalled();
  });

  it('should handle file change', () => {
    const EVENT = { target: { files: [{ name: 'test-file.txt' }] } };
    component.onCambioDeArchivo(EVENT as unknown as Event);
    expect(component.archivoMedicamentos?.name).toBe('test-file.txt');
    expect(component.etiquetaDeArchivo).toBe('test-file.txt');
  });

  it('should remove selected file', () => {
    component.archivoMedicamentos = new File([], 'test-file.txt');
    component.eliminacionMedicamento();
    expect(component.archivoMedicamentos).toBeNull();
    expect(component.etiquetaDeArchivo).toBe(component.TEXTOS.ETIQUETA_DE_ARCHIVO);
  });

  it('should activate file selection', () => {
    const INPUT = document.createElement('input');
    INPUT.id = 'archivoMedicamentos';
    document.body.appendChild(INPUT);
    jest.spyOn(INPUT, 'click');
    component.activarSeleccionArchivo();
    expect(INPUT.click).toHaveBeenCalled();
    document.body.removeChild(INPUT);
  });
});