import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoDosComponent } from './paso-dos.component';
import { AlertComponent, AnexarDocumentosComponent, TituloComponent } from '@ng-mf/data-access-user';
import { ToastrService } from 'ngx-toastr/toastr/toastr.service';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoDosComponent],
      imports: [TituloComponent, AlertComponent,
        AnexarDocumentosComponent,ToastrModule.forRoot(),HttpClientModule],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
