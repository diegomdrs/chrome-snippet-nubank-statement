clear()

var ELEMENT_NODE_CODE = 1

var listaDado = gerarListaDado()
var listaItemPago = listarItemPago(listaDado);

console.log(gerarListaSaidaConsole(listaItemPago))

function gerarListaDado() {

    var div = document.getElementsByClassName("charges-list")[0];
    var listDivChild = div.childNodes;

    return Array.prototype.filter.call(listDivChild, function (divChild) {

        return divChild.nodeType === ELEMENT_NODE_CODE;
    }).map(function (divChild) {

        var data = divChild.getElementsByClassName('time')[0].innerText
        var descricaoNode = divChild.getElementsByClassName('description')[0]
        var descricao = descricaoNode.innerText
        var valor = divChild.getElementsByClassName('amount')[0].innerText

        return {
            data: data,
            descricao: descricao,
            valor: parseFloat(valor.replace(',','.'))
        }
    })
    .sort(function(divChildA,divChildB){
        
        return divChildA.data > divChildB.data ? -1 : divChildA.data < divChildB.data ? 1 : 0
    })
    .sort(function(divChildA){
        
        var regex = /^(#Home)/i
        
        return divChildA.descricao.match(regex) ? -1 : !divChildA.descricao.match(regex) ? 1 : 0
    })
}

function listarItemPago(listaDado) {
 
    var regex = /(PGO)/i // /(#PGO)/i  
 
    var listaPagos = listaDado.filter(function (dado) {
        return dado.descricao.match(regex)
    });

    return listaDado
    .filter(function (dadoFilter) {
        return listaPagos.every(function(dadoSome){
            return !(dadoFilter.data === dadoSome.data &&
                dadoFilter.descricao === dadoSome.descricao &&
                     dadoFilter.valor === dadoSome.valor)
        })
    })
    .filter(function(dado){
        return dado.valor > 0 
    })
}
    
function gerarListaSaidaConsole(listaDado) {

    return listaDado.map(function (dado) {
        return '#Nu ' + dado.descricao + '\t' + dado.data + '\t' + dado.valor.toString().replace('.',',')
    }).join('\n')
}
