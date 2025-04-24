import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoTresComponent } from './paso-tres.component';
import { ToastrService, TOAST_CONFIG } from 'ngx-toastr'; // Adjust import based on your library

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoTresComponent], // Declare the component
      providers: [
        { provide: TOAST_CONFIG, useValue: {} }, // Provide a mock ToastConfig
        { provide: ToastrService, useValue: { success: jest.fn(), error: jest.fn() } }, // Mock ToastrService
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