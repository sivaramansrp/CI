import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoTresComponent } from './paso-tres.component';
import { ToastrService, TOAST_CONFIG } from 'ngx-toastr';
import { provideHttpClient } from '@angular/common/http';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;

  // Mock ToastrService
  const mockToastrService = {
    success: jest.fn(),
    error: jest.fn(),
    info: jest.fn(),
    warning: jest.fn(),
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasoTresComponent],
       providers: [
              { provide: ToastrService, useValue: mockToastrService },
              { provide: TOAST_CONFIG, useValue: {} }, 
              provideHttpClient()// Provide a mock configuration
            ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});