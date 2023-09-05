document.getElementById('cnpjForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const cnpj = document.getElementById('cnpjInput').value;
    const url = `https://receitaws.com.br/v1/cnpj/${cnpj}`;
    
    // Cria um elemento iframe
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.width = "100%";
    iframe.height = "400px";

    // Limpa o conteúdo da div 'result'
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    // Adiciona o iframe à div 'result'
    resultDiv.appendChild(iframe);
});