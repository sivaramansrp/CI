import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoTresComponent } from './paso-tres.component';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { provideToastr, ToastrService } from 'ngx-toastr';

describe('PasoTresComponent', () => {
  let component: PasoTresComponent;
  let fixture: ComponentFixture<PasoTresComponent>;
  let mockRouter: any;

  beforeEach(async () => {
    mockRouter = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [CommonModule,PasoTresComponent],
      declarations: [],
      providers: [
        { provide: Router, useValue: mockRouter },
       ToastrService,
        provideToastr({
          positionClass: 'toast-top-right',}),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to acuse page when firma is provided', () => {
    const firma = 'firma-valida';
    component.obtieneFirma(firma);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['servicios-extraordinarios/acuse']);
  });

  it('should not navigate if firma is empty', () => {
    component.obtieneFirma('');
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});
