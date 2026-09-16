interface AtualizavelPorTurno {
  novoTurno(): void;
}

interface inventario {
    
}


class Personagem implements AtualizavelPorTurno{
    public nome: string;
    private VidaMax: number;
    private VidaAtual: number;
    private nivel: number;
    private experiencia: number;
    private arma_equip: ;
    private Invent: ;
    
    constructor (nome: string, VidaMax: number, Nivel: number, experiencia: number, arma_equip: , Invent: ) {
        this.nome = nome
        this.VidaMax = VidaMax
        this.VidaAtual = this.VidaMax
        this.nivel = Nivel
        this.experiencia = experiencia
        this.arma_equip = arma_equip
        this.Invent = Invent
    }
    atacar(inimigo: Personagem){
        
    }
    tomardano(){
        
    }
    recebercura(){
        
    }
    tavivo(){
        
    }
    ganharexperiencia(){
        
    }
    subirdenivel(){
        
    }
    adicionaritem(){
        
    }
}
interface Arma{
    cd: Cooldown
    atacar(): number
    dano: number
}

class Espada implements Arma{
    constructor(
        private cd : Cooldown,
        private dano: number,
        private 
    ) {}
    
    atacar():number {
        if(){
            return 0;
        }
    }
}
class Arco implements Arma{
    constructor(
        private cd : Cooldown,
        private dano: number,
        private numFlechasMax: number, 
        private numFlechasAtual: number
    ) {
        this.numFlechasAtual = this.numFlechasMax
    }
    atacar():number {
        if(){
            return 0;
        }
    }
    
    
    RecarregarFlecha(){
        
    }
}
class Varinha implements Arma{
    private mana: number;
    
    RecuperarMana(){
        
    }
    
    atacar():number {
        if(){
            return 0;
        }
    }
}
class Cooldown{
    
}
interface Efeito extends AtualizavelPorTurno{
    duracao: number;
}
class Veneno implements efeito{
    constructor(){
        
    }
}

class Recuperacao implements efeito{
    constructor(){
        
    }
}
