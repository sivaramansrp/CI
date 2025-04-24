import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoDosComponent } from './paso-dos.component';
import { ToastrService, TOAST_CONFIG } from 'ngx-toastr'; // Adjust import based on your library

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoDosComponent], // Declare the component
      providers: [
        { provide: TOAST_CONFIG, useValue: {} }, // Provide a mock ToastConfig
        { provide: ToastrService, useValue: { success: jest.fn(), error: jest.fn() } }, // Mock ToastrService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});