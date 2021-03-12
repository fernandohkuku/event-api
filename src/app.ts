
import express, {Application} from 'express';
import cors from 'cors'
import bodyParser  from 'body-parser'
import queryParser from 'express-query-int'
import { errorHandler, notFound } from './handlers';
import * as router from './routes'



export default class Server{

    public app:Application;
    public port:string;
    private api_url = {
        user:'/api/user',
        event:'/api/event'
    }

    constructor(
        port:number
    ){
        this.port  = process.env.PORT||'3700';
        this.app = express();
        this.bodyParser();
        this.routes();
        this.handlers();
        this.cors()

    }

    static init(port:number){
        return new Server(port)
    }

    routes(){
        this.app.use(this.api_url.user, router.user_route);
        this.app.use(this.api_url.event, router.event_route);
    }

    cors(){
        this.app.use(cors())
    }

    bodyParser(){
        this.app.use(bodyParser.json());
    }

    queryInt(){
        this.app.use(queryParser());
    }

    handlers(){
        this.app.use(notFound)
        this.app.use(errorHandler)
    }

    
    start(
        callback:Function
    ) {
        this.app.listen(this.port, ()=> console.log(`started on port locahost:${this.port}`));
    }



}
