import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodospasosComponent } from './todos-pasos.component';
import {WizardComponent,BtnContinuarComponent,SolicitanteComponent} from '@libs/shared/data-access-user/src';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('TodospasosComponent', () => {
  let component: TodospasosComponent;
  let fixture: ComponentFixture<TodospasosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WizardComponent,BtnContinuarComponent,HttpClientTestingModule,SolicitanteComponent],
      declarations: [TodospasosComponent,PasoUnoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TodospasosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
