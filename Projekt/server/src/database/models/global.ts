import { Cache } from '../../util/cache';
import { GlobalField } from '../../api/models/global';
import { DatabaseController } from '../controller';
import { ApiError, ErrorNumber } from '../../types';

/**
 * Database model class for global field objects
 * @author Maurice
 */
export class GlobalFieldModel {
    /** global field cache 1h */
    private static readonly cache = new Cache<GlobalField>({
        stdTTL: 3600,
        checkperiod: 600
    });

    /** current instance of DatabaseController */
    private static database: DatabaseController;

    /**
     * Initialize the user model class
     * @param database current instance of DatabaseController
     */
    static initialize(database: DatabaseController) {
        if (GlobalFieldModel.database) {
            throw new Error('Already initialized TypeModel');
        }
        GlobalFieldModel.database = database;
    }

    private static mapField(field: any): GlobalField {
        field.required = field.required.readUInt8() === 1;
        field.unique = field.unique.readUInt8() === 1;
        return field as GlobalField;
    }

    static async get(companyId: number): Promise<GlobalField[]> {
        return (await GlobalFieldModel.database.GLOBAL.GET_COMPANY.execute([ companyId ])).map(GlobalFieldModel.mapField);
    }

    static async create(field: GlobalField) {
        // TODO check if company exists
        await GlobalFieldModel.database.beginTransaction(async function(connection) {
            const params = [ field.companyId, field.name, field.type, field.required, field.unique ];
            const id = (await GlobalFieldModel.database.GLOBAL.CREATE.executeConnection(connection, params)).insertId;
            field.id = id;

            await GlobalFieldModel.database.GLOBAL_TABLE.ADD_COLUMN.executeConnection(connection, field);
        });

        await GlobalFieldModel.cache.set(field.id.toString(), field);

        return field;
    }

    static async update(id: number, field: GlobalField) {
        const fields = await GlobalFieldModel.database.GLOBAL.GET_ID.execute([ id ]);
        if (fields.length === 0) {
            throw ApiError.NOT_FOUND(ErrorNumber.GLOBAL_FIELD_NOT_FOUND, id);
        }

        const old: GlobalField = GlobalFieldModel.mapField(fields.pop());

        field.id = id;
        field.companyId = old.companyId;

        await GlobalFieldModel.database.beginTransaction(async function(connection) {
            let update = old.name !== field.name;

            if (old.type !== field.type || old.required !== field.required) {
                await GlobalFieldModel.database.GLOBAL_TABLE.MODIFY_COLUMN.executeConnection(connection, field);
                update = true;
            }

            if (old.unique && !field.unique) {
                await GlobalFieldModel.database.GLOBAL_TABLE.DROP_UNIQUE_INDEX.executeConnection(connection, field);
                update = true;
            } else if (!old.unique && field.unique) {
                await GlobalFieldModel.database.GLOBAL_TABLE.ADD_UNIQUE_INDEX.executeConnection(connection, field);
                update = true;
            }

            if (update) {
                const params = [ field.name, field.type, field.required, field.unique, old.id ];
                await GlobalFieldModel.database.GLOBAL.UPDATE.executeConnection(connection, params);
            }
        });

        await GlobalFieldModel.cache.set(field.id.toString(), field);

        return field;
    }

    static async delete(companyId: number, id: number) {
        await GlobalFieldModel.database.beginTransaction(async function(connection) {
            if ((await GlobalFieldModel.database.GLOBAL.DELETE.executeConnection(connection, [ id ])).affectedRows === 0) {
                throw ApiError.NOT_FOUND(ErrorNumber.GLOBAL_FIELD_NOT_FOUND, id);
            }

            await GlobalFieldModel.database.GLOBAL_TABLE.DROP_COLUMN.executeConnection(connection, { companyId, id } as GlobalField);
        });

        await GlobalFieldModel.cache.del(id.toString());
    }
}