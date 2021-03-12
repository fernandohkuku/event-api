
import express, {Application} from 'express';
import cors from 'cors'
import bodyParser  from 'body-parser'
import * as router from './routes'
import { errorHandler, notFound } from './handlers';



export default class Server{

    public app:Application;
    public port:string;
    private api_url = {
        user:'/api/user'
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
        this.app.use(this.api_url.user, router.user_route)
    }

    cors(){
        this.app.use(cors())
    }

    bodyParser(){
        this.app.use(bodyParser.json());
    }

    handlers(){
        this.app.use(notFound)
        this.app.use(errorHandler)
    }

    
    start(
        callback:Function
    ) {
        this.app.listen(this.port, ()=> console.log(`started on port 3700`));
    }



}
