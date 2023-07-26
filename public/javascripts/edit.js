const editarReceitaForm = document.getElementById('editarReceitaForm');

const ingredienteInput = document.getElementById('ingredienteInput');
const unidadeInput = document.getElementById('unidadeInput');
const listaIngredientes = document.getElementById('listaIngredientes');

let ingredientesReceita = [];

const carregaIngredientes = async () => {
  let response = await fetch('/admin/listaIngredientesJSON');
  let ingredientes = await response.json();
  console.log(ingredientes);
  ingredientes.forEach((ingrediente) => {
    $('#ingredienteInput').append(new Option(ingrediente.nome, ingrediente.id));
    $('#ingredienteInput').selectpicker('refresh');
  });
};

const carregaUnidades = async () => {
  let response = await fetch('/admin/listaUnidadesJSON');
  let unidades = await response.json();
  unidades.forEach((unidade) => {
    $('#unidadeInput').append(new Option(unidade.nome, unidade.id));
    $('#unidadeInput').selectpicker('refresh');
  });
};

const adicionarIngrediente = () => {
  ingredientesReceita.push({
    ingredienteId: ingredienteInput.value,
    quantidade: document.getElementById('quantidade').value,
    unidadeId: unidadeInput.value,
  });
  listaIngredientes.innerHTML += `<li class="list-group-item">${$(
    '#ingredienteInput :selected'
  ).text()} ${document.getElementById('quantidade').value} ${$(
    '#unidadeInput :selected'
  ).text()}</li>`;
};

editarReceitaForm.onsubmit = async (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const descricao = document.getElementById('descricao').value;
  const instrucao = document.getElementById('instrucao').value;

  const id = document.getElementById('id').value;

  let response = await fetch(`/editarReceita/${id}}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      nome: nome,
      descricao: descricao,
      instrucao: instrucao,
      ingredientes: ingredientesReceita,
    }),
  });

  let result = await response.json();

  if (result) {
    alert('Sucesso');
    window.location.href = '/minhasReceitas';
  } else {
    alert('Falha');
  }
};

carregaIngredientes();
carregaUnidades();
