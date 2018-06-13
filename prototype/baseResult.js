export class BaseResult{
    constructor(obj){
        if(obj){
            this.code = obj.code;
            this.description = obj.description;
            this.result = obj.result;
        }
    }
}