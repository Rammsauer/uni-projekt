import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';

import { TypeNamePipe } from './type-name.pipe';
import { TypesResolver } from './types.resolver';
import { TypesService } from './types.service';

@NgModule({
    declarations: [TypeNamePipe],
    imports: [CommonModule],
    exports: [TypeNamePipe]
})
export class TypeStoreModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: TypeStoreModule,
            providers: [TypesService, TypesResolver]
        };
    }
    static forChild(): ModuleWithProviders {
        return {
            ngModule: TypeStoreModule,
            providers: []
        };
    }
}
