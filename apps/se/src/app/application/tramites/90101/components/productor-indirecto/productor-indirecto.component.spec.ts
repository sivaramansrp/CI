import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductorIndirectoComponent } from './productor-indirecto.component';
import { ProsecService } from '../../services/prosec.service';
import { TablaDinamicaComponent } from '@ng-mf/data-access-user';


describe('ProductorIndirectoComponent', () => {
  let component: ProductorIndirectoComponent;
  let fixture: ComponentFixture<ProductorIndirectoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductorIndirectoComponent],
      imports: [HttpClientTestingModule, TablaDinamicaComponent],
      providers: [FormBuilder, ProsecService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductorIndirectoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize productorIndirecto form group', () => {
    expect(component.productorIndirecto).toBeDefined();
  });
});
