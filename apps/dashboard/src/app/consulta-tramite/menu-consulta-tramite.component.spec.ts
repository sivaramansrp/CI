import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuConsultaTramiteComponent } from './menu-consulta-tramite.component';

describe('ConsultaTramiteComponent', () => {
  let component: MenuConsultaTramiteComponent;
  let fixture: ComponentFixture<MenuConsultaTramiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuConsultaTramiteComponent ]
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
