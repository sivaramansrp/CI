import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpresasSubfabricanteComponent } from './empresas-subfabricante.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('EmpresasSubfabricanteComponent', () => {
  let component: EmpresasSubfabricanteComponent;
  let fixture: ComponentFixture<EmpresasSubfabricanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresasSubfabricanteComponent, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(EmpresasSubfabricanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
