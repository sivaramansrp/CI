import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuConsultaTramiteComponent } from './menu-consulta-tramite.component';
import { ConsultaTramiteComponent } from '@libs/shared/data-access-user/src';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

describe('ConsultaTramiteComponent', () => {
  let component: MenuConsultaTramiteComponent;
  let fixture: ComponentFixture<MenuConsultaTramiteComponent>;

  beforeEach(async () => {
    
    await TestBed.configureTestingModule({
      declarations: [  ],
      imports: [CommonModule, ConsultaTramiteComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuConsultaTramiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
