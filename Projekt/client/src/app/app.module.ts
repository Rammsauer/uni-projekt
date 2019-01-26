import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationService } from './shell/navigation/navigation.service';
import { ShellModule } from './shell/shell.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        ShellModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private navigationService: NavigationService, private translate: TranslateService) {
        this.translate.addLangs(['de', 'en']);
        this.translate.onLangChange.subscribe(async () => {
            const translations = await this.translate.get(['nav.inventory', 'nav.types', 'nav.user']).toPromise();

            this.navigationService.navigationModel = [
                {
                    title: translations['nav.inventory'],
                    items: [
                        {
                            label: translations['nav.inventory'],
                            icon: 'view_list',
                            route: ['/items']
                        },
                        {
                            label: translations['nav.types'],
                            icon: 'view_compact',
                            route: ['/types/view']
                        },
                        {
                            label: translations['nav.user'],
                            icon: 'account_circle',
                            route: ['/user', 'view']
                        }
                    ]
                }
            ];
        });

        this.translate.use('de');
    }
}
