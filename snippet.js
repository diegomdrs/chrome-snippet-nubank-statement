module.exports = () => {

    // Breakpoint iniciando aqui
    const { clear, document } = require('./mock-components')

    // Inicio do snippet

    var ELEMENT_NODE_CODE = 1

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

    var REGEX_PAGO = /(#PGO)/i

    var LISTA_REGEX_CATEGORIA = {
        HOME: [/.*(#Home).*/i],
        SAUDE: [/.*(#Saude).*/i],
        SERVICO: [/.*(#Serviço).*/i],
        TRANSPORTE: [/.*(#Transporte).*/i],
        CONTAS: [/.*(Spotify).*/i, /.*(TIM).*/],
        OUTROS: [/.*/]
    }

    var objSaida = {}

    init()

    function init() {

        clear()

        let listaItem = obterlistaItem()
        let listaItemNaoPago = obterListaItemNaoPago(listaItem)
        let mapCategoriaListaItem = obterMapCategoriaListaItem(listaItemNaoPago)

        objSaida = obterObjSaida(mapCategoriaListaItem)

        let textoSaidaConsole = gerarTextoSaidaConsole(objSaida)

        console.log(textoSaidaConsole)
    }

    function obterObjSaida(mapCategoriaListaItem) {

        return {
            total: obterValorTotal(mapCategoriaListaItem),
            mapCategoriaListaItem: mapCategoriaListaItem
        }
    }

    function gerarTextoSaidaConsole(saida) {

        // foi usado a spread syntax para converter o Map.values() numa lista
        let textoSaida = [...saida.mapCategoriaListaItem.values()].reduce((textoSaidaReduce, listaCategoria) => {

            if (listaCategoria.length)
                textoSaidaReduce = textoSaidaReduce.concat('\n\n' + listaCategoria.map(item => '#Nu ' + item.descricao + ' ' +
                    obterData(item.data) + '\t\t' +
                    item.valor.toString().replace('.', ',')
                ).join('\n'))

            return textoSaidaReduce

        }, '')

        textoSaida = textoSaida.concat('\n\n' + '#Nu Total' + '\t\t' +
            saida.total.toFixed(2).replace('.', ','))

        return textoSaida
    }

    function obterMapCategoriaListaItem(listaItemNaoPago) {

        let mapListaCategoria = new Map()

        Object.keys(LISTA_REGEX_CATEGORIA).reduce((listaAccum, chaveCategoria) => {

            const listaCategoriaRegex = LISTA_REGEX_CATEGORIA[chaveCategoria]
            const listaItemCategoria = obterListaItemCategoria(listaAccum, listaCategoriaRegex)

            if (listaItemCategoria.length)
                mapListaCategoria.set(chaveCategoria, listaItemCategoria)

            // Removendo os itens da categoria atual do restante da lista de itens nao pagos
            listaAccum = listaAccum.filter(itemFilter =>
                listaItemCategoria.every(itemEvery => !isItensIguais(itemFilter, itemEvery)))

            return listaAccum

        }, listaItemNaoPago)

        return mapListaCategoria
    }

    function obterlistaItem() {

        const div = document.getElementsByClassName('charges-list')[0]
        const listDivChild = div.childNodes

        return Array.prototype.filter.call(listDivChild, divChild =>
            divChild.nodeType === ELEMENT_NODE_CODE
        ).map(divChild => {

            const data = divChild.getElementsByClassName('date')[0].textContent
            const descricao = divChild.getElementsByClassName('description')[0].textContent
            const valorSeparadorDecimalVirgula = divChild.getElementsByClassName('amount')[0].textContent
            const valorSeparadorDecimalPonto = obterValorSeparadorDecimalPonto(valorSeparadorDecimalVirgula)

            return {
                data: data,
                descricao: descricao,
                valor: valorSeparadorDecimalPonto
            }
        }).sort(compararDatas)
    }

    function obterValorTotal(mapCategoriaListaItem) {

        return [...mapCategoriaListaItem.values()].reduce((totalListas, listaCategoria) =>
            totalListas = totalListas + listaCategoria.reduce(
                (totalLista, dado) => totalLista = totalLista + dado.valor, 0), 0)
    }

    function obterListaItemNaoPago(listaItem) {

        const listaItemPago = listaItem.filter(item => item.descricao.match(REGEX_PAGO) && item.valor > 0)
        const listaPagamentoRecebido = listaItem.filter(pagamento => pagamento.valor < 0)

        listaItemPagoComCorrespondentePagRecebido =
            obterListaItemPagoComCorrespondentePagRecebido(listaPagamentoRecebido, listaItemPago)
        listaPagRecebidoComCorrespondenteItemPago =
            obterListaPagRecebidoComCorrespondenteItemPago(listaPagamentoRecebido, listaItemPago)

        listaItem = removerItemPagoComCorrespondentePagRecebido(listaItem,
            listaItemPagoComCorrespondentePagRecebido)
        listaItem = removerPagRecebidoComCorrepondenteItemPago(listaItem,
            listaPagRecebidoComCorrespondenteItemPago)

        return listaItem
    }

    function obterListaItemPagoComCorrespondentePagRecebido(listaPagamentoRecebido, listaItemPago) {

        const listaPagamentoRecebidoCopia = listaPagamentoRecebido.slice()

        return listaItemPago.reduce((listaRetorno, itemPago) => {

            const indexItemPagoCorrespondentePagRecebido = listaPagamentoRecebidoCopia.findIndex(pagRecebido =>
                Math.abs(pagRecebido.valor) === itemPago.valor
            )

            if (indexItemPagoCorrespondentePagRecebido > -1) {
                listaPagamentoRecebidoCopia.splice(indexItemPagoCorrespondentePagRecebido, 1)
                listaRetorno.push(itemPago)
            }

            return listaRetorno
        }, [])
    }

    function obterListaPagRecebidoComCorrespondenteItemPago(listaPagamentoRecebido, listaItemPago) {

        const listaItemPagoCopia = listaItemPago.slice()

        return listaPagamentoRecebido.reduce((listaRetorno, pagRecebido) => {

            const indexPagRecebidoComCorrespondenteItemPago = listaItemPagoCopia.findIndex(itemPago =>
                itemPago.valor === Math.abs(pagRecebido.valor)
            )

            if (indexPagRecebidoComCorrespondenteItemPago > -1) {
                listaItemPagoCopia.splice(indexPagRecebidoComCorrespondenteItemPago, 1)
                listaRetorno.push(pagRecebido)
            }

            return listaRetorno
        }, [])
    }

    // Remover itens #PGO
    function removerItemPagoComCorrespondentePagRecebido(listaItem,
        listaItemPagoComCorrespondentePagRecebido) {
        return listaItem.filter(item =>
            listaItemPagoComCorrespondentePagRecebido.every(
                itemPago => !isItensIguais(itemPago, item)))
    }

    // Remover os pagamentos recebidos com correspondentes #PGO
    function removerPagRecebidoComCorrepondenteItemPago(listaItem,
        listaPagRecebidoComCorrespondenteItemPago) {
        return listaItem.filter(item =>
            listaPagRecebidoComCorrespondenteItemPago.every(
                pagRecebido => !isItensIguais(pagRecebido, item)))
    }

    function isItensIguais(itemA, itemB) {
        return itemA.data === itemB.data &&
            itemA.descricao === itemB.descricao &&
            itemA.valor === itemB.valor
    }

    function compararDatas(itemA, itemB) {
        return itemA.data > itemB.data ? -1 : itemA.data < itemB.data ? 1 : 0
    }

    function obterListaItemCategoria(listaItemPago, listaCategoriaRegex) {
        return listaItemPago.filter(item =>
            listaCategoriaRegex.some(regex => item.descricao.match(regex))
        )
    }

    function obterData(data) {

        if (data) {
            const re = new RegExp(Object.keys(LISTA_MESES).join('|'), 'gi')

            return data.replace(re, matched =>
                LISTA_MESES[matched.toUpperCase()]
            ).replace(/\s+/gi, '/')
        } else
            return ''
    }

    function obterValorSeparadorDecimalPonto(valorSeparadorDecimalVirgula) {
        return parseFloat(valorSeparadorDecimalVirgula.replace(/[,.]/g, function (x) {
            return x == ',' ? '.' : ''
        }))
    }

    // Fim do snippet

    return objSaida
}
