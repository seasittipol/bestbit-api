const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const coins = [
    { symbol: 'BTCUSDT', name: 'Bitcoin' },
    { symbol: 'ETHUSDT', name: 'Ethereum' },
    { symbol: 'BNBUSDT', name: 'BNB' },
    { symbol: 'SOLUSDT', name: 'Solana' },
    { symbol: 'XRPUSDT', name: 'Ripper' },
    { symbol: 'ADAUSDT', name: 'Cardano' },
    { symbol: 'AVAXUSDT', name: 'Avalanche' },
    { symbol: 'LINKUSDT', name: 'ChianLink' },
    { symbol: 'DOGEUSDT', name: 'Dogecoin' },
    { symbol: 'TRXUSDT', name: 'TRON' },
    { symbol: 'DOTUSDT', name: 'Polkadot' },
    { symbol: 'MATICUSDT', name: 'Polygon' },
]

const transactions = [
    { amount: 1000, price: 50000.55, status: 'BUY', userId: 20, coinId: 42 },
    { amount: 900, price: 54545.55, status: 'BUY', userId: 21, coinId: 43 },
    { amount: 800, price: 50000.55, status: 'BUY', userId: 20, coinId: 42 },
    { amount: 700, price: 50000.55, status: 'BUY', userId: 22, coinId: 44 },
]

async function run() {
    await prisma.coin.createMany({ data: coins })
    await prisma.transaction.createMany({ data: transactions })
}


run()