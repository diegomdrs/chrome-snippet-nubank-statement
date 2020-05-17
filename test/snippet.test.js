const snippet = require('../snippet')
const mockComponents = require('../mock-components');

const jsdom = require("jsdom")
const { JSDOM } = jsdom

jest.mock('../mock-components');

describe('test gerais', () => {

    beforeEach(() => {

        // Sem spy
        mockComponents.clear.mockImplementation(() => '')
        // mockComponents.clear.mockReturnValue('')

        // Com spy
        // const clearSpy = jest.spyOn(mockComponents, 'clear').mockImplementation(() => '')
        // const clearSpy = jest.spyOn(mockComponents, 'clear').mockReturnValue('')
    });

    it('teste jun', () => {

        const listaItem = [
            { data: '01 MAI', descricao: 'Foolura 7/12', valor: '56,25' },
            { data: '01 MAI', descricao: '2 Tênis 3/3', valor: '122,99' },
            { data: '01 MAI', descricao: '4 Camisetas 3/4', valor: '49,90' },
            { data: '02 MAI', descricao: '#Almoço', valor: '25,39' },
            { data: '04 MAI', descricao: '#Janta', valor: '32,00' },
            { data: '11 MAI', descricao: '#AppTransporte', valor: '5,31' },
            { data: '11 MAI', descricao: 'Foogle', valor: '29,99' },
            { data: '11 MAI', descricao: '#AppTransporte', valor: '5,06' },
            { data: '11 MAI', descricao: 'Couver', valor: '10,00' },
            { data: '12 MAI', descricao: 'Bar Foo #PGO', valor: '200,00' },
            { data: '12 MAI', descricao: 'Pagamento recebido', valor: '-200,00' },
            { data: '13 MAI', descricao: '#Saude Bar #PGO', valor: '123,50' },
            { data: '14 MAI', descricao: 'Pagamento recebido', valor: '-123,50' },
            { data: '15 MAI', descricao: 'Sfoorify', valor: '16,90' },
            { data: '16 MAI', descricao: '#Saude', valor: '72,00' },
            { data: '16 MAI', descricao: 'Bermuda', valor: '63,99' },
            { data: '16 MAI', descricao: 'Foogle Babbel', valor: '79,90' },
            { data: '16 MAI', descricao: 'Paralelepipedo', valor: '1.500,00' },
            { data: '17 MAI', descricao: '#Almoço', valor: '22,89' }
        ]

        mockComponents.document = obterDocument(listaItem)

        const objSaida = snippet()

        expect(objSaida.total.toFixed(2)).toEqual("2092.57");
    })

    xit('teste mai', () => {

        const listaItem = [
            { data: '01 abr', descricao: '4 Camisetas 2/4', valor: '49.9' },
            { data: '01 abr', descricao: 'Foolura 6/12', valor: '56.25' },
            { data: '01 abr', descricao: '2 Tênis 2/3', valor: '122.99' },
            { data: '04 abr', descricao: 'Bar Foo #PGO', valor: '300' },
            { data: '04 abr', descricao: '#Janta #PGO', valor: '32.5' },
            { data: '04 abr', descricao: 'Baterias #PGO 1/5', valor: '65.98' },
            { data: '06 abr', descricao: 'Desconto Antecipação Baterias #PGO', valor: '-1.74' },
            { data: '06 abr', descricao: 'Pagamento recebido', valor: '-300' },
            { data: '06 abr', descricao: 'Pagamento recebido', valor: '-329.9' },
            { data: '06 abr', descricao: 'Baterias #PGO 2/5', valor: '65.98' },
            { data: '06 abr', descricao: 'Baterias #PGO 4/5', valor: '65.98' },
            { data: '06 abr', descricao: 'Baterias #PGO 3/5', valor: '65.98' },
            { data: '06 abr', descricao: 'Couver', valor: '10' },
            { data: '06 abr', descricao: 'Baterias #PGO 5/5', valor: '65.98' },
            { data: '07 abr', descricao: '#Janta #PGO', valor: '31.89' },
            { data: '10 abr', descricao: '#Janta #PGO', valor: '35.5' },
            { data: '11 abr', descricao: 'Foogle', valor: '29.99' },
            { data: '11 abr', descricao: 'Foo Wars', valor: '25' },
            { data: '13 abr', descricao: 'Pagamento recebido', valor: '-31.89' },
            { data: '13 abr', descricao: 'Pagamento recebido', valor: '-35.5' },
            { data: '13 abr', descricao: 'Pagamento recebido', valor: '-32.5' },
            { data: '14 abr', descricao: 'Pagamento recebido', valor: '-200' },
            { data: '14 abr', descricao: '#Almoço #PGO', valor: '22.4' },
            { data: '14 abr', descricao: 'Bar Foo #PGO', valor: '200' },
            { data: '15 abr', descricao: 'Divisórias Parede', valor: '708.66' },
            { data: '15 abr', descricao: 'Sfoorify', valor: '16.9' },
            { data: '15 abr', descricao: 'Pagamento recebido', valor: '-22.4' },
            { data: '16 abr', descricao: '#Janta #PGO', valor: '31' },
            { data: '20 abr', descricao: 'Pagamento recebido', valor: '-25.39' },
            { data: '20 abr', descricao: 'Pagamento recebido', valor: '-268.66' },
            { data: '20 abr', descricao: '#Janta #PGO', valor: '36' },
            { data: '20 abr', descricao: 'Pagamento recebido', valor: '-25.39' },
            { data: '20 abr', descricao: '#Almoço #PGO', valor: '25.39' },
            { data: '20 abr', descricao: '#Almoço #PGO', valor: '25.39' },
            { data: '20 abr', descricao: 'Pagamento recebido', valor: '-36' },
            { data: '20 abr', descricao: 'Pagamento recebido', valor: '-31' },
            { data: '21 abr', descricao: '#Home Purificador #PGO', valor: '109.9' },
            { data: '22 abr', descricao: '#Janta #PGO', valor: '74.8' },
            { data: '22 abr', descricao: 'Pagamento recebido', valor: '-109.9' },
            { data: '23 abr', descricao: 'Pagamento recebido', valor: '-74.8' },
            { data: '24 abr', descricao: 'Bar Foo #PGO', valor: '203.98' },
            { data: '24 abr', descricao: 'FOOIM', valor: '55' },
            { data: '27 abr', descricao: 'Pagamento recebido', valor: '-25.39' },
            { data: '27 abr', descricao: '#AppTransporte #PGO', valor: '05.06' },
            { data: '27 abr', descricao: 'Pagamento recebido', valor: '-203.98' },
            { data: '27 abr', descricao: '#AppTransporte #PGO', valor: '5.4' },
            { data: '27 abr', descricao: '#Almoço #PGO', valor: '25.39' },
            { data: '28 abr', descricao: 'Pagamento recebido', valor: '-5.4' },
            { data: '28 abr', descricao: 'Pagamento recebido', valor: '-203.98' },
            { data: '29 abr', descricao: 'Bar Foo #PGO', valor: '203.98' },
            { data: '29 abr', descricao: 'Pagamento recebido', valor: '-5.06' },
            { data: '29 abr', descricao: '#Almoço', valor: '23.99' }
        ]

        mockComponents.document = obterDocument(listaItem)

        const objSaida = snippet()

        expect(objSaida.total.toFixed(2)).toEqual("828.28");
    })

    xit('teste abr', () => {

        const listaItem = [
            { data: "31 Mar", descricao: "#AppTransporte", valor: 11.06 },
            { data: "31 Mar", descricao: "#AppTransporte", valor: 8.27 },
            { data: "31 Mar", descricao: "#Janta", valor: 24.44 },
            { data: "30 Mar", descricao: "Pagamento recebido", valor: -3.98 },
            { data: "30 Mar", descricao: "#Almoço", valor: 22.4 },
            { data: "30 Mar", descricao: "Pagamento recebido", valor: -42 },
            { data: "30 Mar", descricao: "Pagamento recebido", valor: -5.02 },
            { data: "26 Mar", descricao: "Pagamento recebido", valor: -34.9 },
            { data: "26 Mar", descricao: "#Janta #PGO", valor: 42 },
            { data: "26 Mar", descricao: "Pagamento recebido", valor: -17.4 },
            { data: "25 Mar", descricao: "#Almoço", valor: 23.9 },
            { data: "24 Mar", descricao: "#Almoço", valor: 25.99 },
            { data: "24 Mar", descricao: "#Janta", valor: 33.39 },
            { data: "24 Mar", descricao: "Bar Foo #PGO", valor: 300 },
            { data: "24 Mar", descricao: "Pagamento recebido", valor: -300 },
            { data: "23 Mar", descricao: "#Janta #PGO", valor: 34.9 },
            { data: "23 Mar", descricao: "#Almoço #PGO", valor: 17.4 },
            { data: "23 Mar", descricao: "Crédito de Games #PGO", valor: -79.9 },
            { data: "21 Mar", descricao: "Estorno de Foollow Solucoes de Mob", valor: -20 },
            { data: "21 Mar", descricao: "Estorno de Foollow Solucoes de Mob", valor: -1 },
            { data: "20 Mar", descricao: "Games #PGO", valor: 79.9 },
            { data: "19 Mar", descricao: "#Janta", valor: 25.65 },
            { data: "19 Mar", descricao: "Foontrol", valor: 30 },
            { data: "16 Mar", descricao: "Sfoorify", valor: 16.9 },
            { data: "16 Mar", descricao: "#Home Torneira Banheiro #PGO", valor: 150 },
            { data: "16 Mar", descricao: "Pagamento recebido", valor: -150 },
            { data: "16 Mar", descricao: "Pagamento recebido", valor: -10 },
            { data: "16 Mar", descricao: "Recarga FOOIM", valor: 52 },
            { data: "14 Mar", descricao: "#AppTransporte", valor: 6.99 },
            { data: "14 Mar", descricao: "#AppTransporte", valor: 24.73 },
            { data: "14 Mar", descricao: "#Janta", valor: 41 },
            { data: "13 Mar", descricao: "#AppTransporte", valor: 17.57 },
            { data: "13 Mar", descricao: "#Almoço", valor: 24.64 },
            { data: "11 Mar", descricao: "#Janta", valor: 37.7 },
            { data: "11 Mar", descricao: "Foogle", valor: 29.99 },
            { data: "11 Mar", descricao: "Pagamento recebido", valor: -123 },
            { data: "09 Mar", descricao: "#Almoço", valor: 25.99 },
            { data: "09 Mar", descricao: "#Saude", valor: 32.39 },
            { data: "07 Mar", descricao: "#AppTransporte #PGO", valor: 5.02 },
            { data: "06 Mar", descricao: "4 Camisetas 1/4", valor: 49.9 },
            { data: "06 Mar", descricao: "#AppTransporte #PGO", valor: 3.98 },
            { data: "04 Mar", descricao: "#Almoço", valor: 32.35 },
            { data: "04 Mar", descricao: "2 Tênis 1/3", valor: 123 },
            { data: "02 Mar", descricao: "#AppTransporte", valor: 6 },
            { data: "02 Mar", descricao: "#Almoço", valor: 20.9 },
            { data: "02 Mar", descricao: "#AppTransporte", valor: 38.54 },
            { data: "01 Mar", descricao: "Foolura 5/12", valor: 56.25 }
        ]

        mockComponents.document = obterDocument(listaItem)

        const objSaida = snippet()

        expect(objSaida.total.toFixed(2)).toEqual("687.94");
    })

    function obterDocument(listaItem) {

        const document = new JSDOM().window.document

        var divChargeList = document.createElement('div')
        divChargeList.setAttribute('class', 'charges-list')
        document.body.appendChild(divChargeList)

        for (const item of listaItem) {

            const divCharge = document.createElement('div')
            divCharge.setAttribute('class', 'charge')
            divChargeList.appendChild(divCharge)

            // time
            const divTime = document.createElement('div')
            divTime.setAttribute('class', 'time')
            divCharge.appendChild(divTime)

            const divCell = document.createElement('div')
            divCell.setAttribute('class', 'cell')
            divTime.appendChild(divCell)

            const spanDate = document.createElement('span')
            spanDate.setAttribute('class', 'date')
            spanDate.textContent = item.data
            divCell.appendChild(spanDate)

            // charge-data
            const divChargeData = document.createElement('div')
            divChargeData.setAttribute('class', 'charge-data')
            divCharge.appendChild(divChargeData)

            const divDescription = document.createElement('div')
            divDescription.setAttribute('class', 'description')
            divDescription.textContent = item.descricao
            const em = document.createElement('em')
            em.textContent = '3/3'
            divDescription.appendChild(em)
            divChargeData.appendChild(divDescription)

            const divAmount = document.createElement('div')
            divAmount.setAttribute('class', 'amount')
            divAmount.textContent = item.valor
            divChargeData.appendChild(divAmount)
        }

        return document
    }
})