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

async function run() {
    await prisma.coin.createMany({ data: coins })
}

run()