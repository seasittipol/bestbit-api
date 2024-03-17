const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const coins = [
    { symbol: 'BTCUSDT', name: 'Bitcoin', iconImage: 'https://cryptocurrencyliveprices.com/img/btc-bitcoin.png' },
    { symbol: 'ETHUSDT', name: 'Ethereum', iconImage: 'https://cryptocurrencyliveprices.com/img/eth-ethereum.png' },
    { symbol: 'BNBUSDT', name: 'BNB', iconImage: 'https://cryptocurrencyliveprices.com/img/bnb-binance-coin.png' },
    { symbol: 'SOLUSDT', name: 'Solana', iconImage: 'https://cryptocurrencyliveprices.com/img/sol-solana.png' },
    { symbol: 'XRPUSDT', name: 'Ripper', iconImage: 'https://cryptocurrencyliveprices.com/img/xrp-xrp.png' },
    { symbol: 'ADAUSDT', name: 'Cardano', iconImage: 'https://cryptocurrencyliveprices.com/img/ada-cardano.png' },
    { symbol: 'AVAXUSDT', name: 'Avalanche', iconImage: 'https://cryptocurrencyliveprices.com/img/avax-avalanche.png' },
    { symbol: 'LINKUSDT', name: 'ChianLink', iconImage: 'https://cryptocurrencyliveprices.com/img/link-chainlink.png' },
    { symbol: 'DOGEUSDT', name: 'Dogecoin', iconImage: 'https://cryptocurrencyliveprices.com/img/doge-dogecoin.png' },
    { symbol: 'TRXUSDT', name: 'TRON', iconImage: 'https://cryptocurrencyliveprices.com/img/trx-tron.png' },
    { symbol: 'DOTUSDT', name: 'Polkadot', iconImage: 'https://cryptocurrencyliveprices.com/img/dot-polkadot.png' },
    { symbol: 'MATICUSDT', name: 'Polygon', iconImage: 'https://cryptocurrencyliveprices.com/img/matic-polygon.png' },
]

// const transactions = [
//     { amount: 1000, price: 50000.55, status: 'BUY', userId: 20, coinId: 42 },
//     { amount: 900, price: 54545.55, status: 'BUY', userId: 21, coinId: 43 },
//     { amount: 800, price: 50000.55, status: 'BUY', userId: 20, coinId: 42 },
//     { amount: 700, price: 50000.55, status: 'BUY', userId: 22, coinId: 44 },
// ]

async function run() {
    await prisma.coin.createMany({ data: coins })
    // await prisma.transaction.createMany({ data: transactions })
}


run()