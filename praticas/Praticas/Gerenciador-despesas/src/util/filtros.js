// Retorna apenas as despesas da categoria selecionada.
// A opção 'Todas' mantém todas as despesas.
export function filtrarPorCategoria(despesas, categoria) {
  return despesas.filter(
    (despesa) => categoria === 'Todas' || despesa.categoria === categoria
  );
}
