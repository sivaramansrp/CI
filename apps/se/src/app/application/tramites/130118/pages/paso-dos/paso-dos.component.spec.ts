import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoDosComponent } from './paso-dos.component';
import { AlertComponent, AnexarDocumentosComponent, SolicitanteComponent, TEXTOS, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PasoDosComponent        
      ],
      imports: [
        HttpClientModule,
        WizardComponent,
        SolicitanteComponent,
        TituloComponent,
        AlertComponent,
        AnexarDocumentosComponent,
        ToastrModule.forRoot()
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have TEXTOS defined', () => {
    expect(component.TEXTOS).toBe(TEXTOS);
  });
});