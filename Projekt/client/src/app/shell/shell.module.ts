import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatProgressBarModule,
    MatToolbarModule,
    MatMenuModule
} from '@angular/material';
import { RouterModule } from '@angular/router';

import { NavigationGroupComponent } from './navigation/navigation-group/navigation-group.component';
import { NavigationComponent } from './navigation/navigation.component';
import { NavigationService } from './navigation/navigation.service';
import { SidenavControlButtonComponent } from './navigation/sidenav-control-button/sidenav-control-button.component';
import { RouterLoadingIndicatorComponent } from './router-loading-indicator/router-loading-indicator.component';
import { AuthModule } from './auth/auth.module';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { CompanyStoreModule } from '../company/_company-store/company-store.module';
import { CompanySelectorComponent } from './company-selector/company-selector.component';
import { PermissionModule } from '../permission/permission.module';
import { TranslateModule } from '@ngx-translate/core';

/**
 * App-Shell Module to contain eveything loaded on initial pageload
 */
@NgModule({
    declarations: [
        NavigationComponent,
        RouterLoadingIndicatorComponent,
        SidenavControlButtonComponent,
        NavigationGroupComponent,
        LanguageSelectorComponent,
        CompanySelectorComponent
    ],
    imports: [
        CommonModule,
        AuthModule,
        PermissionModule.forChild(), // Needed to hide the company selector if necessary
        CompanyStoreModule.forChild(), // Needed for company name display
        PermissionModule.forChild(),
        TranslateModule.forChild(),
        RouterModule.forChild([{ path: 'auth', loadChildren: './login/login.module#LoginModule' }]),
        MatProgressBarModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        FlexLayoutModule,
        MatListModule
    ],
    providers: [NavigationService]
})
export class ShellModule {}
