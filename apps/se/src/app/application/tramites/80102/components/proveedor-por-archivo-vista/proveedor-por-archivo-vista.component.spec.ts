import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProveedorPorArchivoVistaComponent } from './proveedor-por-archivo-vista.component';
import { Location } from '@angular/common';
import { ToastrService, TOAST_CONFIG } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

describe('ProveedorPorArchivoVistaComponent', () => {
  let component: ProveedorPorArchivoVistaComponent;
  let fixture: ComponentFixture<ProveedorPorArchivoVistaComponent>;
  let mockLocation: any;
  let mockToastrService: any;

  beforeEach(async () => {
    // Create mocks for dependencies
    mockLocation = { back: jest.fn() };
    mockToastrService = { success: jest.fn(), error: jest.fn() };

    // Configure TestBed
    await TestBed.configureTestingModule({
      imports: [HttpClientModule,ProveedorPorArchivoVistaComponent],
      declarations: [],
      providers: [
        { provide: Location, useValue: mockLocation },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: TOAST_CONFIG, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProveedorPorArchivoVistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call Location.back when regrssarAnnexoI is called', () => {
    component.regrsarAnnexoI();
    expect(mockLocation.back).toHaveBeenCalled();
  });
});