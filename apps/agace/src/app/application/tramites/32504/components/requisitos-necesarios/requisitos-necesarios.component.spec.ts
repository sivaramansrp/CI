import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent } from '@ng-mf/data-access-user';
import { RequisitosNecesariosComponent } from './requisitos-necesarios.component';
import { TEXTO_REQUISITOS } from '../../constants/aviso.enum';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

describe('RequisitosNecesariosComponent', () => {
  let component: RequisitosNecesariosComponent;
  let fixture: ComponentFixture<RequisitosNecesariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TituloComponent,
        AlertComponent,
        RequisitosNecesariosComponent,
        HttpClientModule,
        ToastrModule.forRoot()
      ],
      providers: [
        ToastrService
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