function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    //me promete q vai acessar e 'então' quando voltar executa uma non function e me traz a res
    //1 then- retorna 1 promise

    //buscou estados
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        //os transformou em json
        .then(res => res.json())
        //rodou está função abaixo
        .then(states => {
            //para cada um dos estados (pega um estado por vez)
            for (const state of states) {
                //escreve o valor de cada state no option
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()

//pega o event 'eventListener sempre q tem mudanças ..
function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    //pega o input hidden
    const stateInput = document.querySelector("input[name=state]")

    //onde o evento foi executado 'document.querySelector("select[name=uf]")'
    //console.log(event.target)
    const ufValue=event.target.value

    //pega o numero selecionado e pega o texto dele texto logo abaixo e colocar em stateInput
    const indexOfSelectedState=event.target.selectedIndex
    stateInput.value=event.target.options[indexOfSelectedState].text

    const url= `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`


    //buscou cidades
    fetch(url)
        //os transformou em json
        .then(res => res.json())
        //rodou está função abaixo
        .then(cities => {
            //para cada um dos estados (pega um estado por vez)
            for (const city of cities) {
                //escreve o valor de cada state no option
                citySelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`
            }
            //habilita escolha no option
            citySelect.disabled=false;
        })

}

//escuta alterações de uf, sempre q altera, carregará as novas cidades
document.querySelector("select[name=uf]")
    //escuta evento quando mudar algo
    .addEventListener("change", getCities)


