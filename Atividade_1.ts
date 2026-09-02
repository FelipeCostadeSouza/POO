class Personagem{
    nome: string;
    pontos_vida: number;

    constructor(nome: string, pontos_vida: number){
        this.nome = nome
        this.pontos_vida = pontos_vida
    }


    ataque(alvo: Personagem, dano: number): void {
        alvo.pontos_vida-=dano;
        if(alvo.pontos_vida<0){
            alvo.pontos_vida=0;
        }
        console.log("%s recebeu %d de dano! PV restante: %d\n", alvo.nome, dano, alvo.pontos_vida);
    }
}
const heroi = new Personagem("Aragorn", 100)
const Orphan_of_Kos = new Personagem("Kos", 350)
console.log("Personagem criado: %s com %d PV.\n\n", heroi.nome, heroi.pontos_vida);

Orphan_of_Kos.ataque(heroi, 30)
Orphan_of_Kos.ataque(heroi, 80)
