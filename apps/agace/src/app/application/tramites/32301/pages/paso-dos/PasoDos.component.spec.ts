import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoDosComponent } from './PasoDos.component';
import { AlertComponent, TEXTOS, TituloComponent, SharedModule, WizardComponent } from "@ng-mf/data-access-user";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AnexarDocumentosComponent } from '@ng-mf/data-access-user';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
describe('PasoDosComponent', () => {
  let component: PasoDosComponent;
  let fixture: ComponentFixture<PasoDosComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PasoDosComponent, CommonModule, ReactiveFormsModule, AnexarDocumentosComponent, TituloComponent, AlertComponent,  RouterModule,
                    FormsModule,
                    HttpClientModule,
                    WizardComponent,
                    SharedModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
