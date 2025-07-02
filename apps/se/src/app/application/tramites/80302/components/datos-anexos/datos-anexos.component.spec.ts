import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosAnexosComponent } from './datos-anexos.component';
import { SolicitudService } from '../../service/solicitud.service';
import { of, throwError } from 'rxjs';
import { Anexo } from '../../estados/models/plantas-consulta.model';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DatosAnexosComponent', () => {
  let component: DatosAnexosComponent;
  let fixture: ComponentFixture<DatosAnexosComponent>;
  let mockSolicitudService: jest.Mocked<SolicitudService>;
  let toastrService: jest.Mocked<ToastrService>;

  const dummyAnexos: Anexo[] = [
    {
      tipoFraccion: 'Exportación',
      fraccionArancelariaExportacion: '1234.56.78',
      fraccionArancelariaImportacion: '8765.43.21',
      descripcion: 'Descripción de prueba',
      valoresAnteriores: 'Valor 1',
    },
  ];

  beforeEach(async () => {
    mockSolicitudService = {
      obtenerAnexo: jest.fn(),
    } as unknown as jest.Mocked<SolicitudService>;

    toastrService = {
      error: jest.fn(),
    } as unknown as jest.Mocked<ToastrService>;

    await TestBed.configureTestingModule({
      imports: [DatosAnexosComponent, HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [
        { provide: SolicitudService, useValue: mockSolicitudService },
        { provide: ToastrService, useValue: toastrService },
        {
          provide: '_HttpClient',
          useValue: {} // Mock implementation of _HttpClient
        }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosAnexosComponent);
    component = fixture.componentInstance;
    
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call obtenerAnexo and populate datosAnexo and datosImportacion', () => {
    mockSolicitudService.obtenerAnexo.mockReturnValue(of(dummyAnexos));
    
    fixture.detectChanges(); // triggers ngOnInit, which calls obteneComplimentaria

    expect(mockSolicitudService.obtenerAnexo).toHaveBeenCalled();
    expect(component.datosAnexo).toEqual(dummyAnexos);
    expect(component.datosImportacion).toEqual(dummyAnexos);
  });

  it('should handle error when obtenerAnexo fails', () => {
    mockSolicitudService.obtenerAnexo.mockReturnValue(throwError(() => new Error('Error')));
    
    fixture.detectChanges(); // triggers ngOnInit, which calls obteneComplimentaria

    expect(mockSolicitudService.obtenerAnexo).toHaveBeenCalled();
    expect(toastrService.error).toHaveBeenCalledWith('Error al cargar los anexos');
  });

  it('should clean up subscriptions on destroy', () => {
    const spy = jest.spyOn(component['destroyNotifier$'], 'next');
    const spyComplete = jest.spyOn(component['destroyNotifier$'], 'complete');

    component.ngOnDestroy();

    expect(spy).toHaveBeenCalled();
    expect(spyComplete).toHaveBeenCalled();
  });
});
