import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ConfirmDialogModule } from '../shared/confirm-dialog/confirm-dialog.module';
import { DefaultPageModule } from '../shared/default-page/default-page.module';
import { TypeSelectorModule } from '../shared/type-selector/type-selector.module';
import { AddTypeComponent } from './add-type/add-type.component';
import { typeRoutes } from './routes';
import { TypeDetailComponent } from './type-detail/type-detail.component';
import { TypeFieldComponent } from './type-field/type-field.component';
import { TypesListComponent } from './types-list/types-list.component';
import { TypesResolver } from './types-list/types.resolver';
import { TypeStoreModule } from './_type-store/type-store.module';
import { NavigateBackModule } from '../shared/navigate-back/navigate-back.module';

@NgModule({
    declarations: [
        TypesListComponent,
        TypeDetailComponent,
        TypeFieldComponent,
        AddTypeComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(typeRoutes),
        MatListModule,
        MatCardModule,
        FlexLayoutModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule,
        MatInputModule,
        MatMenuModule,
        FormsModule,
        TypeStoreModule,
        NavigateBackModule,
        ConfirmDialogModule,
        DefaultPageModule,
        TypeSelectorModule,
        MatToolbarModule,
        TranslateModule
    ],
    providers: [TypesResolver]
})
export class TypesModule {}
