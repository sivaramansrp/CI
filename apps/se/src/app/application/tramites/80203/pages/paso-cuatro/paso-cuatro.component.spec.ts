import { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { FirmaElectronicaComponent } from '@ng-mf/data-access-user';

import { ToastrModule } from 'ngx-toastr';

import { PasoCuatroComponent } from './paso-cuatro.component';



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