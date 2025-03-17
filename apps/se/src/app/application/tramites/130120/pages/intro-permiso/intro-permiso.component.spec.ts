import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IntroPermisoComponent } from './intro-permiso.component';
import { SolicitanteService } from '@libs/shared/data-access-user/src';

describe('IntroPermisoComponent', () => {
  let component: IntroPermisoComponent;
  let fixture: ComponentFixture<IntroPermisoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IntroPermisoComponent,
        HttpClientTestingModule
      ],
      providers: [
        SolicitanteService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntroPermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});