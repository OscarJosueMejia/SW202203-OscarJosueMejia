export interface IValidationSchemaItem {
    param: string;
    type:any; 
    error:string; 
    required?:boolean;
    regex?:RegExp; 
    customValidate?: (value:any) => boolean;  
};


export const validateInput = (objectToValidate: any, validationSchema: IValidationSchemaItem[]
    ) => {
    const errors: {param:string, error:string, errorType: "INCORRECT_TYPE"|"REGEX_UNMATCH"|"IS_REQUIRED"|"CUSTOM_VALIDATE_FAILED"}[] = [];
    validationSchema.forEach(object => {
        if (objectToValidate[object.param]) {

            //Validar el tipo de dato.
            if ( typeof objectToValidate[object.param] !== object.type ) {
                errors.push({
                    param: object.param, 
                    error: object.error, 
                    errorType: "INCORRECT_TYPE"
                });
            }

            //En caso de que se envíe una expresión regular
            if ( object.regex && !object.regex.test(objectToValidate[object.param]) ) {
                errors.push({
                    param: object.param, 
                    error: object.error, 
                    errorType: "REGEX_UNMATCH"
                });
            }

            if (
                object.customValidate && 
                (typeof object.customValidate === "function" 
                && !object.customValidate(objectToValidate[object.param]))) {
                errors.push({
                    param: object.param, 
                    error: object.error, 
                    errorType: "CUSTOM_VALIDATE_FAILED"
                });
            }

        }else{
            if (object.required) {
                errors.push({
                    param: object.param, 
                    error: object.error,
                    errorType: "IS_REQUIRED"
                });
            }
        }
    });

    return errors;
}

export const commonValidator: {[key:string]: IValidationSchemaItem} = {
    email: {
        param: '',
        type:'string',
        error:'Formato de Correo Incorrecto',
        required: false,
        regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/  
    }
}