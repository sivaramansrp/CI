import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent, AnexarDocumentosComponent } from '@ng-mf/data-access-user';
import { PasoDosComponent } from './paso-dos.component';
import { TituloComponent } from '@ng-mf/data-access-user';
import { provideToastr } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoDosComponent],
      imports: [TituloComponent, AlertComponent, AnexarDocumentosComponent, HttpClientModule],
      providers: [
        provideToastr({
          positionClass: 'toast-top-right',
        })
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
