import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoDosComponent } from './paso-dos.component';
import { AlertComponent, AnexarDocumentosComponent, TablaDinamicaComponent, TituloComponent } from '@ng-mf/data-access-user';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoDosComponent],
      imports: [TituloComponent, HttpClientTestingModule, AlertComponent, TablaDinamicaComponent, AnexarDocumentosComponent, ToastrModule.forRoot()]
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