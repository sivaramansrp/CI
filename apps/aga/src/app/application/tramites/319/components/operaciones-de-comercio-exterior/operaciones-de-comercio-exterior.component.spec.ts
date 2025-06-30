import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { CatalogoSelectComponent, SharedModule, TablaDinamicaComponent, TituloComponent } from '@ng-mf/data-access-user';  // Import shared modules if needed
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { ReactiveFormsModule } from '@angular/forms';
import { OperacionesDeComercioExterioComponent } from './operaciones-de-comercio-exterior.component';

describe('OperacionesDeComercioExteriorComponent', () => {
  let component: OperacionesDeComercioExterioComponent;
  let fixture: ComponentFixture<OperacionesDeComercioExterioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, SharedModule,HttpClientTestingModule,TablaDinamicaComponent,CatalogoSelectComponent,AlertComponent,TituloComponent,ReactiveFormsModule,OperacionesDeComercioExterioComponent],  
      declarations: [],  // Declare the component in the declarations array
    }).compileComponents();

    fixture = TestBed.createComponent(OperacionesDeComercioExterioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
