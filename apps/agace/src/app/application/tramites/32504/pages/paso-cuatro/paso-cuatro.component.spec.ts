import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoCuatroComponent } from './paso-cuatro.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
describe('PasoCuatroComponent', () => {
  let component: PasoCuatroComponent;
  let fixture: ComponentFixture<PasoCuatroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasoCuatroComponent, ToastrModule.forRoot(), HttpClientModule],
      providers: [ToastrService],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoCuatroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
