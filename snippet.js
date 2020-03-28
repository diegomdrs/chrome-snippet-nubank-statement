var ELEMENT_NODE_CODE = 1
var REGEX_PAGO = /(#PGO)/i

var LISTA_MESES = {
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

var LISTA_CATEGORIA = {
    REGEX_HOME: /.*(#Home).*/i,
    REGEX_SAUDE: /.*(#Saude).*/i,
    REGEX_CARRO: /.*(#Combustivel).*/i,
    REGEX_TRANSPORTE: /.*(#Transporte).*/i,
    REGEX_CONTAS: [/.*(Spotify).*/i, /.*(TIM).*/],
    REGEX_RESTO: /.*/
}

init()

function init() {

    clear()

    var listaSaida = ''
    var listaDado = obterListaDado()
    var listaItemNaoPago = obterListaItemNaoPago(listaDado)

    Object.values(LISTA_CATEGORIA).reduce(function (listaAccum, categoria) {

        var lista = obterListaCategoria(listaAccum,
            Array.isArray(categoria) ? categoria : [categoria])

        listaAccum = listaAccum.filter(function (itemFilter) {
            return lista.every(function (itemEvery) {
                return !isItensIguais(itemFilter, itemEvery)
            })
        })

        if (lista.length)
            listaSaida = listaSaida.concat('\n\n' + gerarListaSaidaConsole(lista))

        return listaAccum

    }, listaItemNaoPago)

    listaSaida = listaSaida.concat('\n\n\n' + gerarListaSaidaConsole(
        [
            { descricao: 'Total', valor: obterValorTotal(listaItemNaoPago) }
        ]
    ))

    // copiarParaClipboard(listaSaida)
    console.log(listaSaida)
}

function obterValorTotal(listaDado) {

    return listaDado.reduce(function (accum, dado) {
        return accum = accum + dado.valor
    }, 0)
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
    }).sort(compararDatas)
}

function obterListaItemNaoPago(listaDado) {

    return listaDado

    // var listaPago = listaDado.filter(function (dado) {
    //     return dado.descricao.match(REGEX_PAGO)
    // })

    // return listaDado
    //     .filter(function (itemFilter) {
    //         return listaPago.every(function (itemEvery) {
    //             return !isItensIguais(itemFilter, itemEvery)
    //         })
    //     })
    // .filter(function (dado) {
    //     return dado.valor > 0
    // })
}

function isItensIguais(itemA, itemB) {
    return itemA.data === itemB.data &&
        itemA.descricao === itemB.descricao &&
        itemA.valor === itemB.valor
}

function gerarListaSaidaConsole(listaItem) {

    return listaItem.map(function (item) {
        return '#Nu ' + item.descricao + ' ' +
            obterData(item.data) + '\t\t' +
            item.valor.toString().replace('.', ',')
    }).join('\n')
}

function compararDatas(itemA, itemB) {
    return itemA.data > itemB.data ? -1 : itemA.data < itemB.data ? 1 : 0
}

function obterListaCategoria(listaItemPago, listaCategoriaRegex) {
    return listaItemPago.filter(function (item) {
        return listaCategoriaRegex.some(function (regex) {
            return item.descricao.match(regex)
        })
    })
}

function obterData(data) {

    if (data) {
        var re = new RegExp(Object.keys(LISTA_MESES).join("|"), "gi");

        return data.replace(re, function (matched) {
            return LISTA_MESES[matched.toUpperCase()]
        }).replace(/\s+/gi, '/')
    } else 
        return ''
}

function copiarParaClipboard(listaSaida) {

    var textArea = document.createElement("textarea");
    document.body.appendChild(textArea);

    textArea.value = listaSaida;
    textArea.select();

    document.execCommand("copy");
    document.body.removeChild(textArea);
}
