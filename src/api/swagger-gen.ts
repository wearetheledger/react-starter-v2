import request, {
    SuperAgentStatic,
    SuperAgentRequest,
    Response
} from "superagent";

export type RequestHeaders = {
    [header: string]: string;
}
export type RequestHeadersHandler = (headers: RequestHeaders) => RequestHeaders;

export type ConfigureAgentHandler = (agent: SuperAgentStatic) => SuperAgentStatic;

export type ConfigureRequestHandler = (agent: SuperAgentRequest) => SuperAgentRequest;

export type CallbackHandler = (err: any, res ? : request.Response) => void;

export type CarDto = {
    'key': string;
    'make': string;
    'model': string;
    'color': string;
    'owner': string;
};

export type NotFoundException = {};

export type InvokeResult = {};

export type Logger = {
    log: (line: string) => any
};

export interface ResponseWithBody < T > extends Response {
    body: T;
}

export interface CommonRequestOptions {
    $queryParameters ? : {
        [param: string]: any
    };
    $domain ? : string;
    $path ? : string | ((path: string) => string);
}

/**
 * The Chainservice API
 * @class ChainService
 * @param {(string)} [domainOrOptions] - The project domain.
 */
export class ChainService {

    private domain: string = "";
    private errorHandlers: CallbackHandler[] = [];
    private requestHeadersHandler ? : RequestHeadersHandler;
    private configureAgentHandler ? : ConfigureAgentHandler;
    private configureRequestHandler ? : ConfigureRequestHandler;

    constructor(domain ? : string, private logger ? : Logger) {
        if (domain) {
            this.domain = domain;
        }
    }

    getDomain() {
        return this.domain;
    }

    addErrorHandler(handler: CallbackHandler) {
        this.errorHandlers.push(handler);
    }

    setRequestHeadersHandler(handler: RequestHeadersHandler) {
        this.requestHeadersHandler = handler;
    }

    setConfigureAgentHandler(handler: ConfigureAgentHandler) {
        this.configureAgentHandler = handler;
    }

    setConfigureRequestHandler(handler: ConfigureRequestHandler) {
        this.configureRequestHandler = handler;
    }

    private request(method: string, url: string, body: any, headers: RequestHeaders, queryParameters: any, form: any, reject: CallbackHandler, resolve: CallbackHandler) {
        if (this.logger) {
            this.logger.log(`Call ${method} ${url}`);
        }

        const agent = this.configureAgentHandler ?
            this.configureAgentHandler(request) :
            request;

        let req = agent(method, url);
        if (this.configureRequestHandler) {
            req = this.configureRequestHandler(req);
        }

        req = req.query(queryParameters);

        if (body) {
            req.send(body);

            if (typeof(body) === 'object' && !(body.constructor.name === 'Buffer')) {
                headers['Content-Type'] = 'application/json';
            }
        }

        if (Object.keys(form).length > 0) {
            req.type('form');
            req.send(form);
        }

        if (this.requestHeadersHandler) {
            headers = this.requestHeadersHandler({
                ...headers
            });
        }

        Object.keys(headers).forEach(key => {
            req.set(key, headers[key]);
        });

        req.end((error, response) => {
            if (error || !response.ok) {
                reject(error);
                this.errorHandlers.forEach(handler => handler(error));
            } else {
                resolve(response);
            }
        });
    }

    pingURL(parameters: {} & CommonRequestOptions): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        if (parameters.$queryParameters !== undefined && parameters.$queryParameters !== null) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            }
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * ping
     * @method
     * @name ChainService#ping
     */
    ping(parameters: {
        $queryParameters ? : any,
        $domain ? : string,
        $path ? : string | ((path: string) => string)
    }): Promise < ResponseWithBody < object >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getCarsURL(parameters: {} & CommonRequestOptions): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/cars';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        if (parameters.$queryParameters !== undefined && parameters.$queryParameters !== null) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            }
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Get all cars
     * @method
     * @name ChainService#getCars
     */
    getCars(parameters: {
        $queryParameters ? : any,
        $domain ? : string,
        $path ? : string | ((path: string) => string)
    }): Promise < ResponseWithBody < Array < CarDto >>> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/cars';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postCarsURL(parameters: {
        'carDto': CarDto,
    } & CommonRequestOptions): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/cars';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        if (parameters.$queryParameters !== undefined && parameters.$queryParameters !== null) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            }
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Create new car
     * @method
     * @name ChainService#postCars
     * @param {} carDto - The Chainservice API
     */
    postCars(parameters: {
        'carDto': CarDto,
        $queryParameters ? : any,
        $domain ? : string,
        $path ? : string | ((path: string) => string)
    }): Promise < ResponseWithBody < InvokeResult >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/cars';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';

            if (parameters['carDto'] !== undefined) {
                body = parameters['carDto'];
            }

            if (parameters['carDto'] === undefined) {
                reject(new Error('Missing required  parameter: carDto'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    getCarsByIdURL(parameters: {
        'id': string,
    } & CommonRequestOptions): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/cars/{id}';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        path = path.replace('{id}', `${parameters['id']}`);

        if (parameters.$queryParameters !== undefined && parameters.$queryParameters !== null) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            }
        }

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Get a car by id
     * @method
     * @name ChainService#getCarsById
     * @param {string} id - The Chainservice API
     */
    getCarsById(parameters: {
        'id': string,
        $queryParameters ? : any,
        $domain ? : string,
        $path ? : string | ((path: string) => string)
    }): Promise < ResponseWithBody < CarDto >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/cars/{id}';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'application/json';

            path = path.replace('{id}', `${parameters['id']}`);

            if (parameters['id'] === undefined) {
                reject(new Error('Missing required  parameter: id'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            this.request('GET', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

    postCarsUploadURL(parameters: {
        'file': {},
    } & CommonRequestOptions): string {
        let queryParameters: any = {};
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/cars/upload';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        if (parameters.$queryParameters !== undefined && parameters.$queryParameters !== null) {
            queryParameters = {
                ...queryParameters,
                ...parameters.$queryParameters
            }
        }

        queryParameters = {};

        let keys = Object.keys(queryParameters);
        return domain + path + (keys.length > 0 ? '?' + (keys.map(key => key + '=' + encodeURIComponent(queryParameters[key])).join('&')) : '');
    }

    /**
     * Create new car
     * @method
     * @name ChainService#postCarsUpload
     * @param {file} file - List of cats
     */
    postCarsUpload(parameters: {
        'file': {},
        $queryParameters ? : any,
        $domain ? : string,
        $path ? : string | ((path: string) => string)
    }): Promise < ResponseWithBody < object >> {
        const domain = parameters.$domain ? parameters.$domain : this.domain;
        let path = '/cars/upload';
        if (parameters.$path) {
            path = (typeof(parameters.$path) === 'function') ? parameters.$path(path) : parameters.$path;
        }

        let body: any;
        let queryParameters: any = {};
        let headers: any = {};
        let form: any = {};
        return new Promise((resolve, reject) => {
            headers['Accept'] = 'application/json';
            headers['Content-Type'] = 'multipart/form-data';

            if (parameters['file'] !== undefined) {
                form['file'] = parameters['file'];
            }

            if (parameters['file'] === undefined) {
                reject(new Error('Missing required  parameter: file'));
                return;
            }

            if (parameters.$queryParameters) {
                Object.keys(parameters.$queryParameters).forEach(function(parameterName) {
                    queryParameters[parameterName] = parameters.$queryParameters[parameterName];
                });
            }

            form = queryParameters;
            queryParameters = {};

            this.request('POST', domain + path, body, headers, queryParameters, form, reject, resolve);
        });
    }

}

export default ChainService;