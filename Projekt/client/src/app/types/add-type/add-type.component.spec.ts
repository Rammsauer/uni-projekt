import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeComponent } from './add-type.component';
import { TypesModule } from '../types.module';
import { TranslateTestingModule } from 'ngx-translate-testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TypeStoreModule } from '../_type-store/type-store.module';
import { MatSnackBarModule } from '@angular/material';

describe('AddTypeComponent', () => {
    let component: AddTypeComponent;
    let fixture: ComponentFixture<AddTypeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                TypesModule,
                NoopAnimationsModule,
                TypeStoreModule,
                MatSnackBarModule,
                TranslateTestingModule.withTranslations({}),
                HttpClientTestingModule,
                RouterTestingModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AddTypeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
