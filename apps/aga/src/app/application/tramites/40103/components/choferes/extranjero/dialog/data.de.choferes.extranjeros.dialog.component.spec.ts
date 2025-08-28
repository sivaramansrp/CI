import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DatosDeChoferesExtranjerosDialogComponent } from './data.de.choferes.extranjeros.dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('DatosDeChoferesExtranjerosDialogComponent', () => {
	let component: DatosDeChoferesExtranjerosDialogComponent;
	let fixture: ComponentFixture<DatosDeChoferesExtranjerosDialogComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
	imports: [DatosDeChoferesExtranjerosDialogComponent, HttpClientTestingModule],
			declarations: [],
			schemas: [NO_ERRORS_SCHEMA]
		}).compileComponents();

		fixture = TestBed.createComponent(DatosDeChoferesExtranjerosDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});
});
