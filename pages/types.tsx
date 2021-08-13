export interface CryptoMonnaie {
    name: string; // XRP
    valueInitial: number; // 100€
    changeOnBuy: number; // 1 XRP valais 0.76
}

export interface Monnaie {
    name: string;
    change: number;
}

export interface Person {
    name: string;
    investment: CryptoMonnaie[];
}