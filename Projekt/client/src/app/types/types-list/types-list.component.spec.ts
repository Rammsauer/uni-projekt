import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesListComponent } from './types-list.component';
import { TypesModule } from '../types.module';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TypesListComponent', () => {
    let component: TypesListComponent;
    let fixture: ComponentFixture<TypesListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [TypesModule, RouterTestingModule, HttpClientTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TypesListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});