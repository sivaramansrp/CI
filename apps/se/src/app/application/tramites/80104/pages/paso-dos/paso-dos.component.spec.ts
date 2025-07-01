import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent } from '@ng-mf/data-access-user';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PasoDosComponent } from './paso-dos.component';
import { TituloComponent } from '@ng-mf/data-access-user';
import { ToastrModule } from 'ngx-toastr';
import { Component } from '@angular/core';
import { of } from 'rxjs';
@Component({
  selector: 'anexar-documentos',
  template: ''
})

class MockAnexarDocumentosComponent {
  cargaArchivosEvento = {
    pipe: () => ({ subscribe: () => {} })
  };
}

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasoDosComponent, MockAnexarDocumentosComponent],
      imports: [ TituloComponent, AlertComponent, HttpClientTestingModule,ToastrModule.forRoot()  ],
      providers: [
        { provide: 'ToastConfig', useValue: {} }
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear', () => {
    expect(component).toBeTruthy();
  });
});
