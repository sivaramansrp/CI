import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';
import { PasoCuatroComponent } from './paso-cuatro.component';
import { ToastrModule } from 'ngx-toastr';

describe('PasoCuatroComponent', () => {
  let component: PasoCuatroComponent;
  let fixture: ComponentFixture<PasoCuatroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoCuatroComponent],
      imports: [FirmaElectronicaComponent, ToastrModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoCuatroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});