import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Item } from '../../models/item.interface';
import { ConfirmDialogService } from '../../shared/confirm-dialog/confirm-dialog.service';
import { ItemService } from '../_item-store/item.service';
import { Field } from 'src/app/models/field.interface';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { FieldType } from 'src/app/models/field-type.enum';
import { CustomValidators } from 'src/app/shared/custom-validators';
import { ItemFormControl } from '../item-form-control';

/**
 * Displays and allows editing of the fields of an Item
 */
@Component({
    selector: 'app-item-details',
    templateUrl: './item-details.component.html',
    styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit, OnDestroy {
    /** Item to display */
    itemId: number;
    typeId: number;

    /** If the item should be editable right now (should be changed via editFields()) */
    edit: boolean;
    itemSub: Subscription;

    form: FormGroup = new FormGroup({});
    controls: { [key: string]: ItemFormControl } = {};

    constructor(
        private acitvatedRoute: ActivatedRoute,
        private confirmService: ConfirmDialogService,
        private itemService: ItemService,
        private location: Location
    ) {}

    ngOnInit() {
        // Look out for route parameter change
        this.acitvatedRoute.params.subscribe(params => {
            this.changeItem(params['typeId'], params['id']);
        });
    }

    ngOnDestroy(): void {
        if (this.itemSub) {
            this.itemSub.unsubscribe();
        }
    }

    /**
     * Create form controls for each field and stores them in {@link ItemDetailsComponent.controls}
     * @param fields Fields for which controls are needed for
     */
    createFormConrols(fields: Field[]) {
        this.controls = {};
        fields.forEach(field => {
            this.controls[field.name] = ItemFormControl.fromField(field);
            this.controls[field.name].disable();
        });
        this.form = new FormGroup(this.controls);
    }

    /** To itearte over all item fields */
    get formControlKey() {
        return Object.keys(this.controls);
    }

    /** Stop watching old item if there is one and get the specified one */
    private changeItem(typeId, itemId) {
        if (this.itemSub) {
            this.itemSub.unsubscribe();
        }
        // TODO check if the old item is dirty
        this.itemSub = this.itemService.getItem(typeId, itemId).subscribe(item => {
            if (!this.edit) {
                this.itemId = itemId;
                this.typeId = typeId;
                this.createFormConrols(item.fields);
            }
        });
    }

    /** Send a request to the backend to delete the displayed item. Navigates back on success. */
    delete() {
        this.confirmService.open('items.confirm.delete', true).subscribe(() => {
            this.itemService.deleteItem(this.typeId, this.itemId).subscribe(res => {
                this.location.back();
            });
        });
    }

    /** Sets the fields editable or not. Resets the Item if edit is set to false */
    editFields(edit = true) {
        this.edit = edit;
        if (!edit) {
            Object.keys(this.controls).forEach(key => {
                this.controls[key].disable();
            });
            this.changeItem(this.typeId, this.itemId);
        } else {
            Object.keys(this.controls).forEach(key => {
                this.controls[key].enable();
            });
        }
    }

    /** Sends a request to update the item */
    submit() {
        const fields = Object.keys(this.controls).map(key => {
            const ctrl = this.controls[key];
            return { id: (ctrl as any).id as number, value: ctrl.value };
        });
        this.itemService.updateItem(this.typeId, this.itemId, fields).subscribe(res => {
            this.editFields(false);
        });
    }

    /** Navigate back */
    back() {
        this.location.back();
    }
}
