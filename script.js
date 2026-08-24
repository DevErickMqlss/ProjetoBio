document.querySelector('.formulario-contato').addEventListener('submit', async function(event) {
  // Impede o recarregamento padrão da página
  event.preventDefault();

  const form = this;
  const btnSubmit = form.querySelector('button[type="submit"]');
  
  // Procura ou cria o contêiner de mensagem de feedback
  let feedback = form.querySelector('.mensagem-feedback');
  if (!feedback) {
    feedback = document.createElement('div');
    feedback.className = 'mensagem-feedback';
    form.appendChild(feedback);
  }

  //Captura os dados dos campos (nome, email, mensagem)
  const formData = new FormData(form);
  const dados = Object.fromEntries(formData.entries());

  // Altera o estado do botão para carregamento
  btnSubmit.disabled = true;
  const textoOriginalBtn = btnSubmit.innerText;
  btnSubmit.innerText = 'Enviando...';
  feedback.innerText = '';
  feedback.style.marginTop = '10px';

  try {
    // Simula a requisição HTTP (delay de 2 segundos)
    const resposta = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const sucesso = true; // Altere para 'false' para testar o cenário de erro

        if (sucesso) {
          resolve({ status: 200, message: 'Mensagem enviada com sucesso!' });
        } else {
          reject(new Error('Ocorreu um erro ao enviar. Tente novamente.'));
        }
      }, 2000);
    });

    // Exibe mensagem de sucesso e limpa os campos
    feedback.style.color = 'orange'; // Verde
    feedback.innerText = resposta.message;
    form.reset();

  } catch (erro) {
    // Exibe mensagem de erro
    feedback.style.color = '#c62828'; // Vermelho
    feedback.innerText = erro.message;

  } finally {
    // Reativa o botão de envio
    btnSubmit.disabled = false;
    btnSubmit.innerText = textoOriginalBtn;
  }
});

 //Anima as imagens da sessão portifólio
const imagens = [
  'assets/portifolio1.png',
  'assets/portifolio2.png',
];

let indiceAtual = 0;
const imgElemento = document.getElementById('imagemDestaque');

// Função que realiza a troca das imagens com transição
function alternarImagem() {
  // Inicia o efeito de esvanecer (fade out)
  imgElemento.classList.add('fade');

  // Aguarda 500ms (tempo do CSS transition) para trocar o SRC da imagem
  setTimeout(() => {
    indiceAtual = (indiceAtual + 1) % imagens.length;
    imgElemento.src = imagens[indiceAtual];
    
    // Remove a classe de fade para reaparecer a nova imagem (fade in)
    imgElemento.classList.remove('fade');
  }, 500);
}

// Alterna a imagem a cada 3 segundos
setInterval(alternarImagem, 3000);