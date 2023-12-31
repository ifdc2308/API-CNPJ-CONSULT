<!DOCTYPE html>
<html>

<head>
    <title>Ficha de Inscrição 2023</title>
    <style>
        body {
            width: 60vw;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        table, th, td {
            border: 1px solid black;
        }

        th, td {
            padding: 10px;
            text-align: left;
        }
    </style>
</head>

<body>
    <h1>FICHA DE INSCRIÇÃO 2023</h1>
    <form id="fichaInscricaoForm">
        <h2>DADOS DA EMPRESA</h2>
        <label for="cnpjInput">CNPJ:</label>
        <input type="text" id="cnpjInput" name="empresa.cnpj" placeholder="Digite o CNPJ" required>
        <button type="button" id="consultarCNPJ">Consultar CNPJ</button>

        <!-- Campos para preencher automaticamente a partir da consulta de CNPJ -->
        <label for="nomeEmpresa">Nome:</label>
        <input type="text" id="nomeEmpresa" name="empresa.nome" placeholder="Nome da Empresa" required>
        <label for="nomeFantasia">Nome Fantasia:</label>
        <input type="text" id="nomeFantasia" name="empresa.nomeFantasia" placeholder="Nome Fantasia" required>
        <label for="logradouro">Logradouro:</label>
        <input type="text" id="logradouro" name="empresa.logradouro" placeholder="Logradouro" required>
        <label for="numero">Número:</label>
        <input type="text" id="numero" name="empresa.numero" placeholder="Número" required>
        <label for="complemento">Complemento:</label>
        <input type="text" id="complemento" name="empresa.complemento" placeholder="Complemento">
        <label for="municipio">Município:</label>
        <input type="text" id="municipio" name="empresa.municipio" placeholder="Município" required>
        <label for="bairro">Bairro:</label>
        <input type="text" id="bairro" name="empresa.bairro" placeholder="Bairro" required>
        <label for="uf">UF:</label>
        <input type="text" id="uf" name="empresa.uf" placeholder="UF" required>
        <label for="cep">CEP:</label>
        <input type="text" id="cep" name="empresa.cep" placeholder="CEP" required>
        <label for="emailEmpresa">E-mail:</label>
        <input type="email" id="emailEmpresa" name="empresa.email" placeholder="E-mail" required>
        <label for="telefoneEmpresa">Telefone:</label>
        <input type="text" id="telefoneEmpresa" name="empresa.telefone" placeholder="Telefone" required>

        <h2>TIPO DE CURSO</h2>
        <select id="tipoCurso" name="tipoCurso" required>
            <option value="Curso A">Curso A</option>
            <option value="Curso B">Curso B</option>
            <option value="Curso C">Curso C</option>
        </select>

        <h2>PARTICIPANTES</h2>
        <div id="participantes">
            <!-- Espaço para adicionar participantes dinamicamente -->
        </div>

        <button type="button" id="addParticipante">Adicionar Participante</button>

        <h2>DADOS PARA NOTA FISCAL</h2>
        <label for="razaoSocial">Razão Social que deve constar na NF:</label>
        <input type="text" id="razaoSocial" name="dadosNF.razaoSocial" placeholder="Razão Social" required>
        <label for="cnpjNF">CNPJ:</label>
        <input type="text" id="cnpjNF" name="dadosNF.cnpj" placeholder="CNPJ" required>
        <label for="responsavelNF">Nome do responsável pela NF:</label>
        <input type="text" id="responsavelNF" name="dadosNF.responsavelNF" placeholder="Nome do Responsável pela NF" required>
        <label for="telefoneNF">Telefone:</label>
        <input type="text" id="telefoneNF" name="dadosNF.telefoneNF" placeholder="Telefone" required>
        <label for="emailNF">E-mail:</label>
        <input type="email" id="emailNF" name="dadosNF.emailNF" placeholder="E-mail" required>

        <button type="submit">Enviar</button>
    </form>

    <button type="button" id="downloadButton" style="display: none;">Download</button>

    <script>
        const participantes = [];

        function addParticipante() {
            const participanteDiv = document.createElement('div');
            participanteDiv.className = 'participante';

            const participanteFields = `
                <h2>PARTICIPANTE</h2>
                <label for="nomeParticipante">Nome do Participante:</label>
                <input type="text" name="inscritos[][nome]" placeholder="Nome do Participante" required>
                <label for="cpfParticipante">CPF:</label>
                <input type="text" name="inscritos[][cpf]" placeholder="CPF" required>
                <label for="emailParticipante">E-MAIL:</label>
                <input type="email" name="inscritos[][email]" placeholder="E-MAIL" required>
                <label for="crcParticipante">CRC:</label>
                <input type="text" name="inscritos[][crc]" placeholder="CRC" required>
                <label for="telefoneParticipante">TELEFONE:</label>
                <input type="text" name="inscritos[][telefone]" placeholder="TELEFONE" required>
                <label for="whatsappParticipante">WHATSAPP:</label>
                <input type="text" name="inscritos[][whatsapp]" placeholder="WHATSAPP" required>
            `;

            participanteDiv.innerHTML = participanteFields;
            document.getElementById('participantes').appendChild(participanteDiv);
        }

        document.getElementById('addParticipante').addEventListener('click', addParticipante);

        document.getElementById('fichaInscricaoForm').addEventListener('submit', async function (event) {
            event.preventDefault();
            const formData = new FormData(document.getElementById('fichaInscricaoForm'));
            const data = {};

            formData.forEach((value, key) => {
                if (key.includes('[]')) {
                    key = key.replace('[]', '');
                    if (!data[key]) data[key] = [];
                    data[key].push(value);
                } else {
                    data[key] = value;
                }
            });

            // Faça a solicitação POST para a API da Sheets Monkey
            await enviarParaAPI(data);

            // Limpe o formulário após o envio
            document.getElementById('fichaInscricaoForm').reset();

            alert('Inscrições enviadas!');
        });

        document.getElementById('consultarCNPJ').addEventListener('click', function () {
            const cnpj = document.getElementById('cnpjInput').value;
            const script = document.createElement('script');
            script.src = `https://receitaws.com.br/v1/cnpj/${cnpj}?callback=handleResponse`;
            document.body.appendChild(script);
        });

        async function enviarParaAPI(data) {
            const apiUrl = 'https://api.sheetmonkey.io/form/bVAfZidHLq8FZjJTxaEuar'; // Substitua pela URL correta da API da Sheets Monkey

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                console.log('Enviado com sucesso:', data);
            } else {
                console.error('Erro ao enviar:', response.statusText);
            }
        }

        function handleResponse(data) {
            document.getElementById('nomeEmpresa').value = data.nome;
            document.getElementById('nomeFantasia').value = data.fantasia;
            document.getElementById('logradouro').value = data.logradouro;
            document.getElementById('numero').value = data.numero;
            document.getElementById('complemento').value = data.complemento;
            document.getElementById('municipio').value = data.municipio;
            document.getElementById('bairro').value = data.bairro;
            document.getElementById('uf').value = data.uf;
            document.getElementById('cep').value = data.cep;
            document.getElementById('emailEmpresa').value = data.email;
            document.getElementById('telefoneEmpresa').value = data.telefone;

            // Preencha os campos da nota fiscal com os dados da empresa
            document.getElementById('razaoSocial').value = data.nome;
            document.getElementById('cnpjNF').value = document.getElementById('cnpjInput').value;
            document.getElementById('responsavelNF').value = '';
            document.getElementById('telefoneNF').value = data.telefone;
            document.getElementById('emailNF').value = data.email;
        }
    </script>
</body>

</html>
