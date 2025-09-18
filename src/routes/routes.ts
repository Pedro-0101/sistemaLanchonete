/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../controllers/user.controller';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "ResposeStatusDto": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"active":{"dataType":"boolean","required":true},"name":{"dataType":"string","required":true},"id":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ContactNumberResponseDto": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"createdAt":{"dataType":"datetime"},"status":{"ref":"ResposeStatusDto","required":true},"number":{"dataType":"double","required":true},"ddd":{"dataType":"double","required":true},"id":{"dataType":"double","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseAddressDto": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "country": {"dataType":"string","required":true},
            "state": {"dataType":"string","required":true},
            "city": {"dataType":"string","required":true},
            "cep": {"dataType":"string","required":true},
            "neighborhood": {"dataType":"string","required":true},
            "street": {"dataType":"string","required":true},
            "number": {"dataType":"double","required":true},
            "addicional": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseUserDto": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"createdAt":{"dataType":"datetime"},"userType":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["CLIENT"]},{"dataType":"enum","enums":["OWNER"]}],"required":true},"status":{"ref":"ResposeStatusDto","required":true},"address":{"ref":"ResponseAddressDto","required":true},"contactNumber":{"ref":"ContactNumberResponseDto","required":true},"email":{"dataType":"string","required":true},"name":{"dataType":"string","required":true},"id":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateContactNumberDto": {
        "dataType": "refObject",
        "properties": {
            "ddd": {"dataType":"double","required":true},
            "number": {"dataType":"double","required":true},
            "status_id": {"dataType":"double","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateAddressDto": {
        "dataType": "refObject",
        "properties": {
            "country": {"dataType":"string","required":true},
            "state": {"dataType":"string","required":true},
            "city": {"dataType":"string","required":true},
            "cep": {"dataType":"string","required":true},
            "neighborhood": {"dataType":"string","required":true},
            "street": {"dataType":"string","required":true},
            "number": {"dataType":"double","required":true},
            "addicional": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateUserDto": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "email": {"dataType":"string","required":true},
            "contactNumber": {"ref":"CreateContactNumberDto","required":true},
            "address": {"ref":"CreateAddressDto","required":true},
            "status_id": {"dataType":"double","required":true},
            "userType": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["CLIENT"]},{"dataType":"enum","enums":["OWNER"]}],"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"ignore","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsUserController_list: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/users',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.list)),

            async function UserController_list(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_list, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'list',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_getById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/users/:id',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getById)),

            async function UserController_getById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getById, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'getById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_create: Record<string, TsoaRoute.ParameterSchema> = {
                input: {"in":"body","name":"input","required":true,"ref":"CreateUserDto"},
        };
        app.post('/users',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.create)),

            async function UserController_create(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_create, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'create',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
