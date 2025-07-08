import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregardestinatarioComponent } from './agregardestinatario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CatalogoSelectComponent, InputRadioComponent, TituloComponent } from '@libs/shared/data-access-user/src';

describe('AgregardestinatarioComponent', () => {
  let component: AgregardestinatarioComponent;
  let fixture: ComponentFixture<AgregardestinatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregardestinatarioComponent,CommonModule, TituloComponent,
          InputRadioComponent,CatalogoSelectComponent,
          ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AgregardestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
