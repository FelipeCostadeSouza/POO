interface AtualizavelPorTurno {
    novoTurno(): void;
}


interface Habilidades extends AtualizavelPorTurno {
    nome: string;
    alvomagia(usuario: Personagem, alvos: Personagem[]): number;
    custo: number;
}

class BolaDeFogo implements Habilidades {
    private cooldown: Cooldown;
    private dano: number = 40;
    public custo: number = 20;

    constructor(
        public nome: string,
        
    ) {
        this.cooldown = new Cooldown(2);
    }
    alvomagia(usuario: Personagem, alvos: Personagem[]): number {
        if (!this.cooldown.EstaDisponivel()) {
            console.log(`${this.nome} está em cooldown!`);
            return 0;
        }
        if (usuario.Manazinha() < this.custo) {
            console.log(` ${usuario.nome} não tem mana suficiente para usar ${this.nome}!`);
            return 0;
        }
        const alvo = alvos[0];
        if (!alvo) {
            console.log(`Nenhum alvo selecionado para ${this.nome}!`);
            return 0;
        }
        usuario.gastarMana(this.custo);
        this.cooldown.NaoPodeAtacar();
        
        console.log(`${usuario.nome} lança ${this.nome} em ${alvo.nome}!`);
        alvo.tomardano(this.dano);
        return 1;
    }
    novoTurno(): void {
        this.cooldown.novoTurno();
    }
}

class Cura implements Habilidades {
    private cooldown: Cooldown;
    private cura: number = 30;
    public custo: number = 15;

    constructor(
        public nome: string,
        
    ) {
        this.cooldown = new Cooldown(1);
    }
    alvomagia(usuario: Personagem, alvos: Personagem[]): number {
        if (!this.cooldown.EstaDisponivel()) {
            console.log(`${this.nome} está em cooldown!`);
            return 0;
        }
        if (usuario.Manazinha() < this.custo) {
            console.log(` ${usuario.nome} não tem mana suficiente para usar ${this.nome}!`);
            return 0;
        }
        const alvo = alvos[0];
        if (!alvo) {
            console.log(`Nenhum alvo selecionado para ${this.nome}!`);
            return 0;
        }
        usuario.gastarMana(this.custo);
        this.cooldown.NaoPodeAtacar();
        
        console.log(`${usuario.nome} lança ${this.nome} em ${alvo.nome}!`);
        alvo.recebercura(this.cura);
        return 1;
    }
    novoTurno(): void {
        this.cooldown.novoTurno();
    }
}

class GolpePoderoso implements Habilidades {
    private cooldown: Cooldown;
    private dano: number = 60;
    public custo: number = 0;

    constructor(
        public nome: string,
        
    ) {
        this.cooldown = new Cooldown(3);
    }
    alvomagia(usuario: Personagem, alvos: Personagem[]): number {
        if (!this.cooldown.EstaDisponivel()) {
            console.log(`${this.nome} está em cooldown!`);
            return 0;
        }
        if (usuario.Manazinha() < this.custo) {
            console.log(` ${usuario.nome} não tem mana suficiente para usar ${this.nome}!`);
            return 0;
        }
        const alvo = alvos[0];
        if (!alvo) {
            console.log(`Nenhum alvo selecionado para ${this.nome}!`);
            return 0;
        }
        usuario.gastarMana(this.custo);
        this.cooldown.NaoPodeAtacar();
        
        console.log(`${usuario.nome} lança ${this.nome} em ${alvo.nome}!`);
        alvo.tomardano(this.dano);
        return 1;
    }
    novoTurno(): void {
        this.cooldown.novoTurno();
    }
}

class Explosao implements Habilidades {
    private cooldown: Cooldown;
    private dano: number = 20;
    public custo: number = 25;

    constructor(
        public nome: string,
        
    ) {
        this.cooldown = new Cooldown(3);
    }
    alvomagia(usuario: Personagem, alvos: Personagem[]): number {
        if (!this.cooldown.EstaDisponivel()) {
            console.log(`${this.nome} está em cooldown!`);
            return 0;
        }
        if (usuario.Manazinha() < this.custo) {
            console.log(` ${usuario.nome} não tem mana suficiente para usar ${this.nome}!`);
            return 0;
        }
        if (alvos.length == 0) {
            console.log(`Nenhum alvo selecionado para ${this.nome}!`);
            return 0;
        }
        usuario.gastarMana(this.custo);
        this.cooldown.NaoPodeAtacar();
        for(const alvo of alvos){
            console.log(`${usuario.nome} lança ${this.nome} em ${alvo.nome}!`);
            alvo.tomardano(this.dano);
            return 1;
        }
    }
    novoTurno(): void {
        this.cooldown.novoTurno();
    }
}

class LarpAttack implements Habilidades {
    private cooldown: Cooldown;
    private dano: number = 67;
    public custo: number = 6+7;

    constructor(
        public nome: string,
    ) {
        this.cooldown = new Cooldown(5);
    }
    alvomagia(usuario: Personagem, alvos: Personagem[]): number {
        if (!this.cooldown.EstaDisponivel()) {
            console.log(`${this.nome} está em cooldown!`);
            return 0;
        }
        if (usuario.Manazinha() < this.custo) {
            console.log(` ${usuario.nome} não tem mana suficiente para usar ${this.nome}!`);
            return 0;
        }
        const alvo = alvos[0];
        if (!alvo) {
            console.log(`Nenhum alvo selecionado para ${this.nome}!`);
            return 0;
        }
        usuario.gastarMana(this.custo);
        this.cooldown.NaoPodeAtacar();
        
        console.log(`${usuario.nome} lança ${this.nome} em ${alvo.nome}!`);
        alvo.tomardano(this.dano);
        const veneninho = new Veneno(2, 5, alvo);
        
        if (jogo) {
            jogo.registrarObjeto(veneninho);
            console.log(`[EFEITO] ${alvo.nome} foi envenenado!`);
        }
        return 1;
    }
    novoTurno(): void {
        this.cooldown.novoTurno();
    }
    
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
    private ManaAtual: number;
    private Invent: Inventario;
    private nivel: number = 1;
    private experiencia: number = 0;
    private QuantSubirNiv: number = 20;
    private Magias: Habilidades[] = [];
    
    constructor(
        public nome: string,
        private VidaMax: number,
        private arma_equip: Arma,
        private ManaMax: number
    ) {
        this.VidaAtual = this.VidaMax;
        this.Invent = new Inventario();
        this.ManaAtual = this.ManaMax;
    }

    EquiparArma(NovaArma: Arma): void {
        this.arma_equip = NovaArma;
        console.log(`${this.nome} equipou a arma ${NovaArma.nome}.`);
    }
    
    AdicionarMagia(Magia: Habilidades): void {
        this.Magias.push(Magia);
        console.log(`${this.nome} equipou a arma ${Magia.nome}.`);
    }

    atacar(inimigo: Personagem): void {
        console.log(`${this.nome} tenta atacar ${inimigo.nome}...`);
        const dano = this.arma_equip.atacar();
        if (dano > 0) {
            inimigo.tomardano(dano);
            this.ganharexperiencia(10);
        }
    }
    
    gastarMana(Gasto: number): void {
        this.ManaAtual-=Gasto;
        if(this.ManaAtual < 0){
            this.ManaAtual = 0;
        }
    }
    
    usarHabilidade(i: number, alvos: Personagem[]): void {
        const magia = this.Magias[i];
        if (!magia) {
            console.log(`${this.nome} não possui uma habilidade nesse slot!`);
            return;
        }
        magia.alvomagia(this, alvos);
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

    Manazinha(): number{
        return this.ManaAtual;
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
        for (const magia of this.Magias) {
            magia.novoTurno();
        }
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

const jogo = new Jogo();

const bastao = new Espada("Bastão de Madeira", 25);
const tenis = new Varinha("Tênis Adidas", 15, 30, 10);
const LetsLarp = new Arco("JustThisOnce", 20, 2);

const bolaDeFogo = new BolaDeFogo("Bola de Fogo");
const curaMagica = new Cura("Cura Celestial");
const larpAttack = new LarpAttack("Ataque Larp");

const tralaTheo = new Personagem("TralaTheo", 100, tenis, 50);
const ricardoSahur = new Personagem("Ricardo_Sahur", 120, bastao, 20);

tralaTheo.AdicionarMagia(bolaDeFogo);
tralaTheo.AdicionarMagia(curaMagica);

ricardoSahur.AdicionarMagia(larpAttack);

const porcaoVida = new Item("Pção de Vida", 50);
const anelMagico = new Item("Anel de Mana", 150);

tralaTheo.adicionaritem(porcaoVida);
tralaTheo.adicionaritem(anelMagico);
tralaTheo.listarinventario();

jogo.registrarObjeto(tralaTheo);
jogo.registrarObjeto(ricardoSahur);

const venenoNoRicardo = new Veneno(2, 5, ricardoSahur);
const regenNoTheo = new Regeneracao(2, 10, tralaTheo);

jogo.registrarObjeto(venenoNoRicardo);
jogo.registrarObjeto(regenNoTheo);

console.log("\n=================== INÍCIO DO COMBATE ===================");

console.log("\n--- Ações do Turno 1 ---");

tralaTheo.atacar(ricardoSahur);

ricardoSahur.atacar(tralaTheo);

ricardoSahur.usarHabilidade(0, [tralaTheo]);

jogo.passarTurno();


console.log("\n--- Ações do Turno 2 ---");

ricardoSahur.usarHabilidade(0, [tralaTheo]);

tralaTheo.usarHabilidade(0, [ricardoSahur]);

console.log("\n[Troca de Arma]");
ricardoSahur.EquiparArma(LetsLarp);
ricardoSahur.atacar(tralaTheo); 

jogo.passarTurno();

console.log("\n--- Ações do Turno 3 ---");

ricardoSahur.atacar(tralaTheo); 

ricardoSahur.atacar(tralaTheo); 

LetsLarp.RecarregarFlecha();

tralaTheo.usarHabilidade(1, [tralaTheo]);

tenis.RegenerarMana(20);

jogo.passarTurno();

console.log("\n--- Ações do Turno 4 ---");

tralaTheo.atacar(ricardoSahur);
tralaTheo.atacar(ricardoSahur);
