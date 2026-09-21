interface AtualizavelPorTurno {
    novoTurno(): void;
}

class Jogo {
    private Turnos: AtualizavelPorTurno[] = [];
    private TurnoAtual: number = 1;

    registrarObjeto(objeto: AtualizavelPorTurno): void {
        this.Turnos.push(objeto);
    }

    removerObjeto(objeto: AtualizavelPorTurno): void {
        this.Turnos = this.Turnos.filter(o => o !== objeto);
    }

    passarTurno(): void {
        console.log(`\n=================== TURNO ${++this.TurnoAtual} ===================`);
        for (const i of this.Turnos) {
            i.novoTurno();
        }
    }
}

class Item {
    constructor(
        public nome: string,
        public valor: number
    ) {}
}

class Inventario {
    private itens: Item[] = [];

    adicionaritem(item: Item): void {
        this.itens.push(item);
    }

    removeritem(item: Item): void {
        this.itens = this.itens.filter(i => i !== item);
    }

    mostrarInventario(): void {
        console.log("--- Inventário ---");
        if (this.itens.length == 0) {
            console.log("inventário vazio");
            return;
        }
        for (const i of this.itens) {
            console.log(`- ${i.nome} (Valor: ${i.valor})`);
        }
    }
}

interface Arma extends AtualizavelPorTurno {
    nome: string;
    atacar(): number;
}

class Personagem implements AtualizavelPorTurno {
    private VidaAtual: number;
    private Invent: Inventario;
    private nivel: number = 1;
    private experiencia: number = 0;
    private QuantSubirNiv: number = 20;

    constructor(
        public nome: string,
        private VidaMax: number,
        private arma_equip: Arma
    ) {
        this.VidaAtual = this.VidaMax;
        this.Invent = new Inventario();
    }

    EquiparArma(NovaArma: Arma): void {
        this.arma_equip = NovaArma;
        console.log(`${this.nome} equipou a arma ${NovaArma.nome}.`);
    }

    atacar(inimigo: Personagem): void {
        console.log(`${this.nome} tenta atacar ${inimigo.nome}...`);
        const dano = this.arma_equip.atacar();
        if (dano > 0) {
            inimigo.tomardano(dano);
            this.ganharexperiencia(10);
        }
    }

    tomardano(dano: number): void {
        if (!this.tavivo()) {
            console.log(`${this.nome} está morto`);
            return;
        }
        this.VidaAtual -= dano;
        if (this.VidaAtual <= 0) {
            this.VidaAtual = 0;
        }
        console.log(`${this.nome} tomou ${dano} de dano. Vida: ${this.VidaAtual}/${this.VidaMax}`);
    }

    recebercura(cura: number): void {
        this.VidaAtual += cura;
        if (this.VidaAtual >= this.VidaMax) {
            this.VidaAtual = this.VidaMax;
        }
        console.log(`${this.nome} foi curado. Vida: ${this.VidaAtual}/${this.VidaMax}`);
    }

    tavivo(): boolean {
        return this.VidaAtual > 0;
    }

    ganharexperiencia(exp: number): void {
        this.experiencia += exp;
        console.log(`${this.nome} ganhou ${exp} de EXP.`);
        if (this.experiencia >= this.QuantSubirNiv) {
            exp = this.experiencia - this.QuantSubirNiv;
            this.subirdenivel(exp);
        }
    }

    subirdenivel(exp: number): void {
        this.nivel++;
        this.experiencia = exp;
        this.QuantSubirNiv += 10;
        this.VidaMax += 10;
        this.VidaAtual = this.VidaMax;
        console.log(`>>> ${this.nome} SUBIU PARA O NÍVEL ${this.nivel}! Vida Máxima aumentada para ${this.VidaMax}. <<<`);
    }

    adicionaritem(item: Item): void {
        this.Invent.adicionaritem(item);
    }

    listarinventario(): void {
        console.log(`Inventário de ${this.nome}:`);
        this.Invent.mostrarInventario();
    }

    novoTurno(): void {
        this.arma_equip.novoTurno();
    }

    getArma(): Arma {
        return this.arma_equip;
    }
}

class Cooldown implements AtualizavelPorTurno {
    private cd = 0;

    constructor(private duracao: number) {}

    EstaDisponivel(): boolean {
        return this.cd == 0;
    }

    NaoPodeAtacar(): void {
        this.cd = this.duracao;
    }

    novoTurno(): void {
        if (this.cd > 0) {
            this.cd--;
        }
    }
}

class Espada implements Arma {
    private cooldown: Cooldown;

    constructor(
        public nome: string,
        public dano: number
    ) {
        this.cooldown = new Cooldown(1);
    }

    atacar(): number {
        if (!this.cooldown.EstaDisponivel()) {
            console.log(`${this.nome} está em cooldown!`);
            return 0;
        }
        this.cooldown.NaoPodeAtacar();
        return this.dano;
    }

    novoTurno(): void {
        this.cooldown.novoTurno();
    }
}

class Arco implements Arma {
    private cooldown: Cooldown;
    private numFlechasAtual: number;

    constructor(
        public nome: string,
        private dano: number,
        private numFlechasMax: number
    ) {
        this.numFlechasAtual = this.numFlechasMax;
        this.cooldown = new Cooldown(1);
    }

    atacar(): number {
        if (!this.cooldown.EstaDisponivel()) {
            console.log(`${this.nome} está em cooldown!`);
            return 0;
        }
        if (this.numFlechasAtual === 0) {
            console.log(`${this.nome} está sem flechas!`);
            return 0;
        }
        this.numFlechasAtual--;
        this.cooldown.NaoPodeAtacar();
        console.log(`[ARMA] ${this.nome} disparou. Flechas restantes: ${this.numFlechasAtual}/${this.numFlechasMax}`);
        return this.dano;
    }

    RecarregarFlecha(): void {
        if (this.numFlechasAtual < this.numFlechasMax) {
            this.numFlechasAtual++;
            console.log(`[ARMA] ${this.nome} recarregado: ${this.numFlechasAtual}/${this.numFlechasMax} flechas.`);
        }
    }

    novoTurno(): void {
        this.cooldown.novoTurno();
    }
}

class Varinha implements Arma {
    private cooldown: Cooldown;
    private mana: number;

    constructor(
        public nome: string,
        private dano: number,
        private manaMaxima: number,
        private custo: number
    ) {
        this.mana = this.manaMaxima;
        this.cooldown = new Cooldown(1);
    }

    atacar(): number {
        if (!this.cooldown.EstaDisponivel()) {
            console.log(`${this.nome} está em cooldown!`);
            return 0;
        }
        if (this.mana < this.custo) {
            console.log(`${this.nome} não tem mana suficiente (${this.mana}/${this.custo})!`);
            return 0;
        }
        this.mana -= this.custo;
        this.cooldown.NaoPodeAtacar();
        console.log(`[ARMA] ${this.nome} lançou feitiço. Mana restante: ${this.mana}/${this.manaMaxima}`);
        return this.dano;
    }

    RegenerarMana(Quantidade: number): void {
        this.mana += Quantidade;
        if (this.mana > this.manaMaxima) {
            this.mana = this.manaMaxima;
        }
        console.log(`[ARMA] ${this.nome} regenerou ${Quantidade} de mana. Total: ${this.mana}/${this.manaMaxima}`);
    }

    novoTurno(): void {
        this.cooldown.novoTurno();
    }
}

interface Efeito extends AtualizavelPorTurno {
    duracao: number;
    novoTurno(): void;
}

class Veneno implements Efeito {
    constructor(
        public duracao: number,
        private dano: number,
        private alvo: Personagem
    ) {}

    estaAtivo(): boolean {
        return this.duracao > 0;
    }

    novoTurno(): void {
        if (this.estaAtivo()) {
            console.log(`[EFEITO] Veneno ativo em ${this.alvo.nome}.`);
            this.alvo.tomardano(this.dano);
            this.duracao--;
        }
    }
}

class Regeneracao implements Efeito {
    constructor(
        public duracao: number,
        private cura: number,
        private alvo: Personagem
    ) {}

    estaAtivo(): boolean {
        return this.duracao > 0;
    }

    novoTurno(): void {
        if (this.estaAtivo()) {
            console.log(`[EFEITO] Regeneração ativa em ${this.alvo.nome}.`);
            this.alvo.recebercura(this.cura);
            this.duracao--;
        }
    }
}


const meuJogo = new Jogo();

const espadaAmaldicoada = new Espada("Grass Sword", 15);
const ArcoPequeno = new Arco("Arco", 12, 2); 
const ArmadeFogo = new Varinha("Pistola", 20, 30, 15); 

const heroi = new Personagem("Finn", 50, espadaAmaldicoada);
const Agiota = new Personagem("Lich", 60, ArmadeFogo);

const arqueiro = new Personagem("Zagreus", 40, ArcoPequeno);

meuJogo.registrarObjeto(heroi);
meuJogo.registrarObjeto(Agiota);
meuJogo.registrarObjeto(arqueiro);

console.log("\n--- INVENTÁRIO E ITENS ---");
const pocaoVida = new Item("Poção de Cura", 50);
const cartaocredito = new Item("Rubi", 100);

heroi.adicionaritem(pocaoVida);
heroi.adicionaritem(cartaocredito);
heroi.listarinventario();

const veneninho = new Veneno(2, 5, Agiota);
const regenzinho = new Regeneracao(2, 8, heroi);

meuJogo.registrarObjeto(veneninho);
meuJogo.registrarObjeto(regenzinho);
console.log("\n--- INÍCIO DO COMBATE ---");

heroi.atacar(Agiota);

Agiota.atacar(heroi);

arqueiro.atacar(Agiota);

heroi.atacar(Agiota);

meuJogo.passarTurno();

console.log("\n--- COMBATE - TURNO 2 ---");

arqueiro.atacar(Agiota);

arqueiro.atacar(Agiota);

(arqueiro.getArma() as Arco).RecarregarFlecha();

Agiota.atacar(heroi);

Agiota.atacar(heroi);

(Agiota.getArma() as Varinha).RegenerarMana(20);

meuJogo.passarTurno();

console.log("\n--- EVOLUÇÃO E NÍVEL ---");

heroi.atacar(Agiota); 
