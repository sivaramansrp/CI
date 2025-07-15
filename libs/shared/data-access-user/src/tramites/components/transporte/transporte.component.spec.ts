import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransporteComponent } from './transporte.component';
import { provideHttpClient } from '@angular/common/http';

describe('InputCheckComponent', () => {
    let component: TransporteComponent;
    let fixture: ComponentFixture<TransporteComponent>;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [TransporteComponent],
        providers: [provideHttpClient()]
    })
    .compileComponents();
    
        fixture = TestBed.createComponent(TransporteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});