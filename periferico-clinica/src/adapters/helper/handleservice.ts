// src/adapters/helper/handleservice.ts



export const handleServiceCall = async <
TParams  extends unknown[] = [],
TResponse = unknown
>({serviceFunction, errorMessage, params}: {
    serviceFunction: ( ...params: TParams) =>Promise<{data?: TResponse}>;
    errorMessage: string;
    params: TParams;
}): Promise<TResponse> => {

    try{
        const responseData = await serviceFunction(...params);
        return responseData?.data as TResponse;
    }catch(error){
        throw new Error(error instanceof Error ? error.message : errorMessage);
    }
}


