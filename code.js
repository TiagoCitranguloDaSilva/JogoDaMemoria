

const qtdeCol = 4
const qtdeLin = 4
const mesa = document.getElementById('containerCartas')
const blurDiv = document.getElementById("blur")
const closeButton = document.getElementById("close")


let simbolosNaoUsados = []
let cartasViradas = 0

for(let c = 1; c <= (qtdeCol * qtdeLin / 2); c++){
    simbolosNaoUsados.push(c)
    simbolosNaoUsados.push(c)
}


for (let c = 0; c < qtdeCol; c++) {
    
    for(let d = 0; d < qtdeLin; d++){

        criarCarta()

    }
    
}

comecarJogo()

function criarCarta(){

    let carta = document.createElement("div") 
    carta.classList.add("carta")
    carta.classList.add("escondida")
    
    let frente = document.createElement("div")
    frente.classList.add("frente")

    let p = document.createElement("p")
    p.innerText = aleatorizar()

    frente.appendChild(p)
    
    let atras = document.createElement("div")
    atras.classList.add("atras")
    
    carta.appendChild(frente)
    carta.appendChild(atras)

    mesa.appendChild(carta)
    
    
}

function aleatorizar(){
    let valor = Math.floor(Math.random() * simbolosNaoUsados.length)


    let simbolo = simbolosNaoUsados[valor]

    simbolosNaoUsados.splice(valor, 1)

    return simbolo;
}

function transformar(elemento){

    elemento.classList.add("clicked")

    blurDiv.style.display = "block"

    closeButton.style.display = "flex"

}

function closePopUp(){
    document.querySelector('.clicked').classList.remove("clicked")

    blurDiv.style.display = "none"

    closeButton.style.display = "none"
}

function comecarJogo(){

    setTimeout(() => {
        document.querySelectorAll('.carta:not(.correta)').forEach(carta => {
            carta.classList.toggle('animacaoViraCarta')
        })
        
    }, 1000);

    setTimeout(() => {
        document.querySelectorAll('.carta:not(.correta)').forEach(carta => {
            carta.classList.toggle('animacaoViraCarta')
            carta.addEventListener("click", function (){
                cartaClicada(this)
            })
        })
        
    }, 3000);

}

function cartaClicada(elemento){
    if(!elemento.classList.contains('animacaoViraCarta') && cartasViradas < 2){
        elemento.classList.toggle('animacaoViraCarta')
        cartasViradas++
    }
    
    if(cartasViradas == 2){
        setTimeout(() => {
            let cartas = document.querySelectorAll(".animacaoViraCarta:not(.correta)")
            console.log(cartas)
            if(cartas[0].innerText == cartas[1].innerText){
                cartas.forEach(carta => {
                    carta.classList.add("correta")
                });
                if(document.querySelectorAll(".carta:not(.correta)").length == 0){
                    setTimeout(() => {
                        alert("Você ganhou!")
                    }, 1000);
                }   
            }else{
                
                cartas.forEach(carta => {
                    carta.classList.toggle('animacaoViraCarta')  
                });
            }
            setTimeout(() => {
                cartasViradas = 0
            }, 500);
        }, 1500);
    }


     

    
}

