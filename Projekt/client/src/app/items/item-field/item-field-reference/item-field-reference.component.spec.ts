import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule, MatInputModule, MatSnackBarModule, MatTooltipModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateTestingModule } from 'ngx-translate-testing';

import { ItemFormControl } from '../../item-form-control';
import { ItemFieldReferenceComponent } from './item-field-reference.component';
import { ItemFieldReferenceService } from './item-field-reference.service';

describe('ItemFieldLinkComponent', () => {
    let component: ItemFieldReferenceComponent;
    let fixture: ComponentFixture<ItemFieldReferenceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ItemFieldReferenceComponent],
            imports: [
                MatInputModule,
                ReactiveFormsModule,
                FlexLayoutModule,
                NoopAnimationsModule,
                MatIconModule,
                RouterTestingModule,
                MatSnackBarModule,
                MatIconModule,
                MatTooltipModule,
                TranslateTestingModule.withTranslations({})
            ],
            providers: [ItemFieldReferenceService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ItemFieldReferenceComponent);
        component = fixture.componentInstance;
        component.control = ItemFormControl.fromField({
            id: 0,
            name: 'test',
            required: false,
            unique: false,
            displayValue: '',
            type: 'boolean',
            value: ''
        });
        component.form = new FormGroup({
            test: component.control
        });
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
