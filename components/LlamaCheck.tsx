'use server'
import  Ollama  from "ollama"


export default async function LlamaCheck({children }: any) {

  const lama =  Ollama
  const model =  (await lama.list()).models[2].name;

  

console.log(model)

  return <span className={ model ? 'text-green-600' : 'text-red-600'}>{children}</span>
}
