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

var listaItemPagoComCorrespondentePagRecebido, listaPagRecebidoComCorrespondenteItemPago = []

init()

function init() {

    clear()

    var listaSaida = ''
    var listaItem = obterlistaItem()
    var listaItemNaoPago = obterListaItemNaoPago(listaItem)

    Object.values(LISTA_CATEGORIA).reduce((listaAccum, categoria) => {

        const lista = obterListaCategoria(listaAccum,
            Array.isArray(categoria) ? categoria : [categoria])

        listaAccum = listaAccum.filter(itemFilter =>
            lista.every(itemEvery => !isItensIguais(itemFilter, itemEvery)))

        if (lista.length)
            listaSaida = listaSaida.concat('\n\n' + gerarListaSaidaConsole(lista))

        return listaAccum

    }, listaItemNaoPago)

    // Adicionar Total
    listaSaida = listaSaida.concat('\n\n' + gerarListaSaidaConsole(
        [{ descricao: 'Total', valor: obterValorTotal(listaItemNaoPago) }]
    ))

    copiarParaClipboard(listaSaida)
    console.log(listaSaida)
}

function obterValorTotal(listaItem) {
    return listaItem.reduce((accum, dado) => accum = accum + dado.valor, 0)
}

function obterlistaItem() {

    var div = document.getElementsByClassName("charges-list")[0];
    var listDivChild = div.childNodes;

    return Array.prototype.filter.call(listDivChild, divChild =>
        divChild.nodeType === ELEMENT_NODE_CODE
    ).map(divChild => {

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

function obterListaItemNaoPago(listaItem) {

    var listaItemPago = listaItem.filter(item => item.descricao.match(REGEX_PAGO))
    var listaPagamentoRecebido = listaItem.filter(pagamento => pagamento.valor < 0)

    listaItemPagoComCorrespondentePagRecebido =
        obterListaItemPagoComCorrespondentePagRecebido(listaPagamentoRecebido, listaItemPago)
    listaPagRecebidoComCorrespondenteItemPago =
        obterListaPagRecebidoComCorrespondenteItemPago(listaPagamentoRecebido, listaItemPago)

    listaItem = removerItemPagoComCorrespondentePagRecebido(listaItem)
    listaItem = removerPagRecebidoComCorrepondenteItemPago(listaItem)

    return listaItem
}

function obterListaItemPagoComCorrespondentePagRecebido(listaPagamentoRecebido, listaItemPago) {
    return listaItemPago.filter(itemPago => listaPagamentoRecebido.some(pagRecebido => Math.abs(pagRecebido.valor) === itemPago.valor))
}

function obterListaPagRecebidoComCorrespondenteItemPago(listaPagamentoRecebido, listaItemPago) {
    return listaPagamentoRecebido.reduce((listaAccum, pagRecebido) => {

        if (listaItemPago.some(itemPago => Math.abs(pagRecebido.valor) === itemPago.valor)
            && !listaAccum.some(item => item.valor === pagRecebido.valor))
            listaAccum.push(pagRecebido)

        return listaAccum
    }, [])
}

// Remover itens #PGO
function removerItemPagoComCorrespondentePagRecebido(listaItem) {
    return listaItem.filter(item =>
        listaItemPagoComCorrespondentePagRecebido.every(
            itemPago => !isItensIguais(itemPago, item)))
}

// Remover os pagamentos recebidos com correspondentes #PGO
function removerPagRecebidoComCorrepondenteItemPago(listaItem) {

    return listaItem.reduce((listaAccum, item) => {

        var index = listaPagRecebidoComCorrespondenteItemPago.indexOf(item)

        if (index >= 0)
            listaPagRecebidoComCorrespondenteItemPago.splice(index, 1)
        else
            listaAccum.push(item)

        return listaAccum
    }, [])
}

function isItensIguais(itemA, itemB) {
    return itemA.data === itemB.data &&
        itemA.descricao === itemB.descricao &&
        itemA.valor === itemB.valor
}

function gerarListaSaidaConsole(listaItem) {

    return listaItem.map(item => '#Nu ' + item.descricao + ' ' +
        obterData(item.data) + '\t\t' +
        item.valor.toString().replace('.', ',')
    ).join('\n')
}

function compararDatas(itemA, itemB) {
    return itemA.data > itemB.data ? -1 : itemA.data < itemB.data ? 1 : 0
}

function obterListaCategoria(listaItemPago, listaCategoriaRegex) {
    return listaItemPago.filter(item =>
        listaCategoriaRegex.some(regex => item.descricao.match(regex))
    )
}

function obterData(data) {

    if (data) {
        const re = new RegExp(Object.keys(LISTA_MESES).join("|"), "gi")

        return data.replace(re, matched =>
            LISTA_MESES[matched.toUpperCase()]
        ).replace(/\s+/gi, '/')
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
