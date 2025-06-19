import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoTresComponent } from './paso-tres.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;
  let routerMock: any;
  let toastrServiceMock: any;

  beforeEach(async () => {
    // Mock Router
    routerMock = { navigate: jest.fn() };

    // Mock ToastrService
    toastrServiceMock = {
      success: jest.fn(),
      error: jest.fn(),
      warning: jest.fn(),
      info: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [PasoTresComponent], // If it's standalone component
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ToastrService, useValue: toastrServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to acuse page if obtieneFirma is called with a valid firma', () => {
    component.obtieneFirma('firmaValida');
    expect(routerMock.navigate).toHaveBeenCalledWith(['servicios-extraordinarios/acuse']);
  });

  it('should not navigate if obtieneFirma is called with an empty firma', () => {
    component.obtieneFirma('');
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});
