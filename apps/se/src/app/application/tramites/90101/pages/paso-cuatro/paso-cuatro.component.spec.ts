import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoCuatroComponent } from './paso-cuatro.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { InjectionToken, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PasoCuatroComponent', () => {
  let component: PasoCuatroComponent;
  let fixture: ComponentFixture<PasoCuatroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoCuatroComponent],
      imports: [ToastrModule.forRoot()],
      providers: [
        ToastrService,
        { provide: new InjectionToken('ToastConfig'), useValue: {} }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add this to allow any custom elements
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PasoCuatroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add more tests here as needed
});