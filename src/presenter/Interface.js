import readline from 'readline'

export class Interface {

    #readline = null

    constructor(){
        this.#readline = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }

    listenLine(cb){
        this.#readline.once("line", (line) => {
           cb(line)
        });
    }

    write(message){
        this.#readline.write(message)
    }

    

}