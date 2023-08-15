class CaixaDaLanchonete {
  constructor() {
    this.cardapio = {
      'cafe': 3.00,
      'chantily': 1.50,
      'suco': 6.20,
      'sanduiche': 6.50,
      'queijo': 2.00,
      'salgado': 7.25,
      'combo1': 9.50,
      'combo2': 7.50,
    };

    this.pagamento = {
      'dinheiro': 0.95, // 5% de desconto
      'debito': 1.00,   // valor original
      'credito': 1.03,  // 3% de acréscimo
    };
  }

  calcularValorDaCompra(metodoDePagamento, itens) {
    const carrinho = {};
    let total = 0;
    let mensagemErro = null;

    for (const item of itens) {
      const [codigo, quantidade] = item.split(',');

      if (quantidade <= 0) {
        mensagemErro = 'Quantidade inválida!'; // quantidade zero ou negativa
        break;
      }

      if (!this.cardapio[codigo]) {
        mensagemErro = 'Item inválido!'; // código não existe no cardápio
        break;
      }

      carrinho[codigo] = quantidade;
      total += this.cardapio[codigo] * quantidade;
    }

    if (('chantily' in carrinho) && !('cafe' in carrinho)) {
      return 'Item extra não pode ser pedido sem o principal'; // pedido com chantily e sem café
    }
    if (('queijo' in carrinho) && !('sanduiche' in carrinho)) {
      return 'Item extra não pode ser pedido sem o principal'; // pedido com queijo e sem sanduíche
    }

    if (itens.length === 0) {
      return 'Não há itens no carrinho de compra!'; // pedido sem nenhum item
    }

    if (mensagemErro) {
      return mensagemErro;
    }

    if (!this.pagamento[metodoDePagamento]) {
      return 'Forma de pagamento inválida!'; // forma de pagamento não aceita
    }

    total *= this.pagamento[metodoDePagamento];

    return `R$ ${total.toFixed(2).replace('.', ',')}`;
  }
}

export { CaixaDaLanchonete };
