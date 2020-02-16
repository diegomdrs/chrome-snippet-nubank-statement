var ELEMENT_NODE_CODE = 1
var REGEX_HOME = /.*(#Home).*/i
var REGEX_SAUDE = /.*(#Saude).*/i
var REGEX_CONTAS = [
    /.*(Spotify).*/i,
    /.*(TIM).*/
]

init()

function init() {

    clear()

    var listaDado = obterListaDado()
    var listaItemPago = obterListaItemPago(listaDado)

    var listaItemHome = obterListaCategoria(listaItemPago, REGEX_HOME)
    var listaItemSaude = obterListaCategoria(listaItemPago, REGEX_SAUDE)
    var listaItemContas = obterListaContas(listaItemPago)

    console.log(gerarListaSaidaConsole(listaItemHome))
    console.log(gerarListaSaidaConsole(listaItemContas))
    console.log(gerarListaSaidaConsole(listaItemSaude))
}

function obterListaDado() {

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
            valor: parseFloat(valor.replace(',', '.'))
        }
    })
        .sort(compararDatas)
        .sort(function (divChildA) {

            var regex = /.*(Spotify).*/i

            return divChildA.descricao.match(regex) ? -1 : !divChildA.descricao.match(regex) ? 1 : 0
        })
}

function obterListaItemPago(listaDado) {

    var regex = /(#PGO)/i

    var listaPagos = listaDado.filter(function (dado) {
        return dado.descricao.match(regex)
    });

    return listaDado
        .filter(function (dadoFilter) {
            return listaPagos.every(function (dadoSome) {
                return !(dadoFilter.data === dadoSome.data &&
                    dadoFilter.descricao === dadoSome.descricao &&
                    dadoFilter.valor === dadoSome.valor)
            })
        })
        .filter(function (dado) {
            return dado.valor > 0
        })
}

function gerarListaSaidaConsole(listaDado) {

    return listaDado.map(function (dado) {
        return '#Nu ' + dado.descricao + ' ' +
            obterData(dado.data) + '\t\t' +
            dado.valor.toString().replace('.', ',')
    }).join('\n')
}

function compararDatas(itemA, itemB) {
    return itemA.data > itemB.data ? -1 : itemA.data < itemB.data ? 1 : 0
}

function obterListaCategoria(listaItemPago, regex) {
    return listaItemPago.filter(function (item) {
        return item.descricao.match(regex)
    })
}

function obterListaContas(listaItemPago) {
    return listaItemPago.filter(function (item) {
        return REGEX_CONTAS.some(function (regex) {
            return item.descricao.match(regex)
        })
    })
}

function obterData(dado) {

    var listaMeses = {
        JAN: '01',
        FEV: '02',
        MAR: '03',
        ABR: '04',
        MAI: '05',
        JUN: '06',
        JUL: '07',
        AGO: '08',
        SET: '09',
        OUT: '10',
        NOV: '11',
        DEZ: '12'
    }

    var re = new RegExp(Object.keys(listaMeses).join("|"), "gi");

    return dado.replace(re, function (matched) {
        return listaMeses[matched];
    }).replace(/\s+/g, '/');
}
