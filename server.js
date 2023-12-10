import dotenv from 'dotenv'
import { OpenIA } from './src/aplication/index.js'
import { Interface } from './src/presenter/index.js';

(async ()=> {

    dotenv.config()


    const IAService = new OpenIA();
    const presenter = new Interface();


    presenter.write(`\n\nOPEN IA INTERFACE\n\n`)

    ListenInteractive(1)
    
    function ListenInteractive(interaction){
        presenter.write(`=== INTERAÇÃO Nº${interaction} ===\n`)
        presenter.write(`Digite uma mensagem: `)
        presenter.listenLine((msg) => {

            presenter.write("ChatGPT : ")

            const content = msg.replace("Digite uma mensagem: ", '')

            IAService.chat(content, {
                onRead: (response) => presenter.write(response),
                onFinish: () => {
                    presenter.write(`\n\n`)
                    ListenInteractive(interaction + 1)
                }
            })
        })

    }
})()



