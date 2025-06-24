import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoDosComponent } from './paso-dos.component';
import { provideHttpClient } from '@angular/common/http';
import { AlertComponent, CatalogosService, TituloComponent } from '@ng-mf/data-access-user';
import { provideToastr, ToastrService } from 'ngx-toastr';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-anexar-documentos',
  template: ''
})
class MockAnexarDocumentosComponent {
  @Input() documentosSeleccionados: any;
  @Input() catalogoDocumentos: any;
}

describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasoDosComponent, TituloComponent, AlertComponent],
      declarations: [ MockAnexarDocumentosComponent],
      providers: [
        CatalogosService,
        provideHttpClient(),
        ToastrService,
        provideToastr({
          positionClass: 'toast-top-right',
        }),
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
