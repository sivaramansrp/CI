import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OperacionesDeComercioExteriorComponent } from './operaciones-de-comercio-exterior.component';
import { CommonModule } from '@angular/common';
import { CatalogoSelectComponent, SharedModule, TablaDinamicaComponent, TituloComponent } from '@ng-mf/data-access-user';  // Import shared modules if needed
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { ReactiveFormsModule } from '@angular/forms';

describe('OperacionesDeComercioExteriorComponent', () => {
  let component: OperacionesDeComercioExteriorComponent;
  let fixture: ComponentFixture<OperacionesDeComercioExteriorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, SharedModule,HttpClientTestingModule,TablaDinamicaComponent,CatalogoSelectComponent,AlertComponent,TituloComponent,ReactiveFormsModule,OperacionesDeComercioExteriorComponent],  // Import necessary modules here
      declarations: [],  // Declare the component in the declarations array
    }).compileComponents();

    fixture = TestBed.createComponent(OperacionesDeComercioExteriorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
