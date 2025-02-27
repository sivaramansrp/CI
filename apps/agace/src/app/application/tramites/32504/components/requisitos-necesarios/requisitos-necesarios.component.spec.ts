import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent } from '@ng-mf/data-access-user';
import { RequisitosNecesariosComponent } from './requisitos-necesarios.component';
import { TEXTO_REQUISITOS } from '@ng-mf/data-access-user';
import { TituloComponent } from '@ng-mf/data-access-user';

describe('RequisitosNecesariosComponent', () => {
  let component: RequisitosNecesariosComponent;
  let fixture: ComponentFixture<RequisitosNecesariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TituloComponent,
        AlertComponent,
        RequisitosNecesariosComponent // Import the standalone component here
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RequisitosNecesariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have textConfig defined', () => {
    expect(component.textConfig).toBe(TEXTO_REQUISITOS);
  });
});