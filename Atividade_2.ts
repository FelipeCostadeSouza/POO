class Arma {
  constructor(
    public nome: string,
    public dano: number,
    public cooldown: number,    //eu tratei cooldown do mesmo jeito que vidamáxima, e cd como vidaatual
    public cd: number = cooldown
  ) {}

  atacar(cooldown: number): number {   
    if (this.cd == cooldown) {   //o ataque é realizado quando cd = cooldown
      if (cooldown == 0) {    //para garantir que cd não fique negativo caso cooldown = 0
        return this.dano;
      }
      this.cd--;
      return this.dano;
    }

    if (this.cd == 0) {    //eu irei diminuir cd até chegar a 0
      this.cd = cooldown;  //quando chegar a 0, no próximo turno ele pode realizar o ataque
      return 0;
    }

    this.cd--;       //faço a contagem regressiva até poder realizar o ataque novamente
    return 0;
  }
}

class Item {
  constructor(
    public nome: string,
    public valor: number
  ) {}
}

class Inventario {
  private itens: Item[] = []

  adicionar(item: Item) {
    this.itens.push(item)
  }

  remover(item: Item) {
    this.itens = this.itens.filter(i => i !== item)
  }

  listar() {
    console.log('Inventário: ')

    for (const item of this.itens) {
      console.log(`- ${item.nome}`)
    }
  }
}

class Personagem {
  private vida: number
  private nivel: number
  private experiencia: number

  private inventario: Inventario // composição

  constructor(
    public nome: string,
    private vidaMaxima: number,
    private arma: Arma = new Arma('faca', 5, 1)
  ) {
    this.vida = vidaMaxima
    this.nivel = 1
    this.experiencia = 0
    this.inventario = new Inventario()
  }

  atacar(inimigo: Personagem) {
    if (!this.arma) {
      return
    }

    const dano = this.arma.atacar(this.arma.cooldown)
    inimigo.receberDano(dano)
    if(dano!=0){
        this.ganharExperiencia(10)
    }
  }

  receberDano(dano: number) {
    const vidaAntes = this.vida
    this.vida -= dano
    if (this.vida < 0) {
      this.vida = 0
    }
    const danoReal = vidaAntes - this.vida

    console.log(`${this.nome} recebeu ${danoReal} de dano.`)
    this.mostrarVida()

    if (!this.estaVivo()) {
      console.log(`${this.nome} foi derrotado`)
    }
  }

  estaVivo() {
    return this.vida > 0
  }

  curar(quantidade: number) {
    this.vida += quantidade

    if (this.vida > this.vidaMaxima) {
      this.vida = this.vidaMaxima
    }

    console.log(`${this.nome} recuperou vida.`)
    this.mostrarVida()
  }

  mostrarVida() {
    console.log(`Vida: ${this.vida}/${this.vidaMaxima}`)
  }


  ganharExperiencia(quantidade: number) {
    
    this.experiencia += quantidade

    console.log(
      `${this.nome} ganhou ${quantidade} XP.` +
      `  XP: ${this.experiencia}`
    )

    if (this.experiencia >= 100) {
      this.subirDeNivel()
    }
  }

  subirDeNivel() {
    this.nivel++
    this.experiencia = 0
    this.vidaMaxima += 20
    this.vida = this.vidaMaxima

    console.log(`${this.nome} subiu para o nível ${this.nivel}`)
  }

  adicionarItem(item: Item) {
    this.inventario.adicionar(item)
  }

  mostrarInventario() {
    this.inventario.listar()
  }
}

const espada = new Arma('Espada', 10, 2)
const guerreiro = new Personagem(
  'Thor', 100
)
const barbaro = new Personagem(
  'Conan', 200, espada
)

guerreiro.adicionarItem(new Item('poção', 100))
guerreiro.mostrarInventario()

guerreiro.atacar(barbaro)
barbaro.atacar(guerreiro)
guerreiro.atacar(barbaro)
guerreiro.atacar(barbaro)
barbaro.atacar(guerreiro)
barbaro.atacar(guerreiro)
barbaro.atacar(guerreiro)
