import OpenAI from "openai";

export class OpenIA {

    #connection;

    constructor(){
        this.#connection = new OpenAI();
    }

    async chatSync(messages, { onRead, onFinish: onEnd }) {
        try{
            
            const stream = await this.#connection.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: messages }],
                stream: true,
            })
        
            for await (const chunk of stream) {
                onRead(chunk.choices[0].delta.content || "")
            }

            onEnd(true)
        }catch(e){
            console.error(e)
        }
    }
}