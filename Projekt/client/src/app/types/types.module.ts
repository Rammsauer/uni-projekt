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

import { typeRoutes } from './routes';
import { TypeDetailComponent } from './type-detail/type-detail.component';
import { TypeResolver } from './type-detail/type.resolver';
import { TypeFieldComponent } from './type-field/type-field.component';
import { TypesListComponent } from './types-list/types-list.component';
import { TypesResolver } from './types-list/types.resolver';
import { TypesPageComponent } from './types-page/types-page.component';
import { TypesService } from './types.service';
import { TranslateModule } from '@ngx-translate/core';
import { AddTypeComponent } from './add-type/add-type.component';
import { ConfirmDialogModule } from '../confirm-dialog/confirm-dialog.module';
import { SearchModule } from '../search/search.module';
import { SelectTypeComponent } from './select-type/select-type.component';

@NgModule({
    declarations: [
        TypesPageComponent,
        TypesListComponent,
        TypeDetailComponent,
        TypeFieldComponent,
        AddTypeComponent,
        SelectTypeComponent
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
        ConfirmDialogModule,
        SearchModule,
        MatToolbarModule,
        TranslateModule
    ],
    providers: [TypesService, TypesResolver, TypeResolver]
})
export class TypesModule {}
