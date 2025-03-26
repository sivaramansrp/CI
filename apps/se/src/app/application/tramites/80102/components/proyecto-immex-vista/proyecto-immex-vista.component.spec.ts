import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProyectoImmexVistaComponent } from './proyecto-immex-vista.component';
import { ProyectoImmexEncabezado } from '../../../../shared/models/nuevo-programa-industrial.model';

describe('ProyectoImmexVistaComponent', () => {
  let component: ProyectoImmexVistaComponent;
  let fixture: ComponentFixture<ProyectoImmexVistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProyectoImmexVistaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProyectoImmexVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default proyectoImmexDatos', () => {
    expect(component.proyectoImmexDatos).toEqual({
      fraccionArancelaria: '',
      anexoDos: 'NO SENSIBLE',
      tipo: 'EXPORTACCION',
      umt: 'KILOGRAM',
      descripcion: '',
      tipoDeDocumente: '',
      fechaDeFirma: '',
      fechaDeVigencia: '',
      rfcTaxId: 0,
      razonSocial: ''
    });
  });

  it('should have default documentoCatalogDatos', () => {
    expect(component.documentoCatalogDatos).toEqual([
      {
        id: 0,
        descripcion: 'Cantrado De Maqula'
      }
    ]);
  });

  it('should update proyectoImmexTablaLista on obtenerProyectoTablaDevolverLaLlamada', () => {
    const MOCK_DATA: ProyectoImmexEncabezado[] = [
    ];
    component.obtenerProyectoTablaDevolverLaLlamada(MOCK_DATA);
    expect(component.proyectoImmexTablaLista).toEqual(MOCK_DATA);
  });
});
