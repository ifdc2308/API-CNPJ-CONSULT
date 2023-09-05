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
        <input type="text" id="cnpjInput" placeholder="Digite o CNPJ" required>
        <button type="button" id="consultarCNPJ">Consultar CNPJ</button>

        <!-- Campos para preencher automaticamente a partir da consulta de CNPJ -->
        <label for="nomeEmpresa">Nome:</label>
        <input type="text" id="nomeEmpresa" placeholder="Nome da Empresa" required>
        <label for="nomeFantasia">Nome Fantasia:</label>
        <input type="text" id="nomeFantasia" placeholder="Nome Fantasia" required>
        <label for="logradouro">Logradouro:</label>
        <input type="text" id="logradouro" placeholder="Logradouro" required>
        <label for="numero">Número:</label>
        <input type="text" id="numero" placeholder="Número" required>
        <label for="complemento">Complemento:</label>
        <input type="text" id="complemento" placeholder="Complemento">
        <label for="municipio">Município:</label>
        <input type="text" id="municipio" placeholder="Município" required>
        <label for="bairro">Bairro:</label>
        <input type="text" id="bairro" placeholder="Bairro" required>
        <label for="uf">UF:</label>
        <input type="text" id="uf" placeholder="UF" required>
        <label for="cep">CEP:</label>
        <input type="text" id="cep" placeholder="CEP" required>
        <label for="emailEmpresa">E-mail:</label>
        <input type="email" id="emailEmpresa" placeholder="E-mail" required>
        <label for="telefoneEmpresa">Telefone:</label>
        <input type="text" id="telefoneEmpresa" placeholder="Telefone" required>

        <h2>TIPO DE CURSO</h2>
        <select id="tipoCurso" required>
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
        <input type="text" id="razaoSocial" placeholder="Razão Social" required>
        <label for="cnpjNF">CNPJ:</label>
        <input type="text" id="cnpjNF" placeholder="CNPJ" required>
        <label for="responsavelNF">Nome do responsável pela NF:</label>
        <input type="text" id="responsavelNF" placeholder="Nome do Responsável pela NF" required>
        <label for="telefoneNF">Telefone:</label>
        <input type="text" id="telefoneNF" placeholder="Telefone" required>
        <label for="emailNF">E-mail:</label>
        <input type="email" id="emailNF" placeholder="E-mail" required>

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
                <input type="text" name="nomeParticipante" placeholder="Nome do Participante" required>
                <label for="cpfParticipante">CPF:</label>
                <input type="text" name="cpfParticipante" placeholder="CPF" required>
                <label for="emailParticipante">E-MAIL:</label>
                <input type="email" name="emailParticipante" placeholder="E-MAIL" required>
                <label for="crcParticipante">CRC:</label>
                <input type="text" name="crcParticipante" placeholder="CRC" required>
                <label for="telefoneParticipante">TELEFONE:</label>
                <input type="text" name="telefoneParticipante" placeholder="TELEFONE" required>
                <label for="whatsappParticipante">WHATSAPP:</label>
                <input type="text" name="whatsappParticipante" placeholder="WHATSAPP" required>
            `;

            participanteDiv.innerHTML = participanteFields;
            document.getElementById('participantes').appendChild(participanteDiv);
        }

        document.getElementById('addParticipante').addEventListener('click', addParticipante);

        document.getElementById('fichaInscricaoForm').addEventListener('submit', function (event) {
            event.preventDefault();
            const data = {
                empresa: {
                    cnpj: document.getElementById('cnpjInput').value,
                    nome: document.getElementById('nomeEmpresa').value,
                    nomeFantasia: document.getElementById('nomeFantasia').value,
                    logradouro: document.getElementById('logradouro').value,
                    numero: document.getElementById('numero').value,
                    complemento: document.getElementById('complemento').value,
                    municipio: document.getElementById('municipio').value,
                    bairro: document.getElementById('bairro').value,
                    uf: document.getElementById('uf').value,
                    cep: document.getElementById('cep').value,
                    email: document.getElementById('emailEmpresa').value,
                    telefone: document.getElementById('telefoneEmpresa').value,
                },
                tipoCurso: document.getElementById('tipoCurso').value,
                inscritos: [],
                dadosNF: {
                    razaoSocial: document.getElementById('razaoSocial').value,
                    cnpj: document.getElementById('cnpjNF').value,
                    responsavelNF: document.getElementById('responsavelNF').value,
                    telefoneNF: document.getElementById('telefoneNF').value,
                    emailNF: document.getElementById('emailNF').value,
                },
            };

            // Obtenha os dados dos participantes adicionados dinamicamente
            const participanteDivs = document.querySelectorAll('.participante');
            participanteDivs.forEach(participanteDiv => {
                const nomeParticipante = participanteDiv.querySelector('input[name="nomeParticipante"]').value;
                const cpfParticipante = participanteDiv.querySelector('input[name="cpfParticipante"]').value;
                const emailParticipante = participanteDiv.querySelector('input[name="emailParticipante"]').value;
                const crcParticipante = participanteDiv.querySelector('input[name="crcParticipante"]').value;
                const telefoneParticipante = participanteDiv.querySelector('input[name="telefoneParticipante"]').value;
                const whatsappParticipante = participanteDiv.querySelector('input[name="whatsappParticipante"]').value;

                data.inscritos.push({
                    nome: nomeParticipante,
                    cpf: cpfParticipante,
                    email: emailParticipante,
                    crc: crcParticipante,
                    telefone: telefoneParticipante,
                    whatsapp: whatsappParticipante,
                });
            });

            // Crie um arquivo de texto com os dados do formulário e faça o download
            const txtData = JSON.stringify(data, null, 2);
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(txtData));
            element.setAttribute('download', 'ficha_inscricao.txt');
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);

            // Limpe o formulário após o envio
            document.getElementById('fichaInscricaoForm').reset();
        });

        document.getElementById('consultarCNPJ').addEventListener('click', function () {
            const cnpj = document.getElementById('cnpjInput').value;
            const script = document.createElement('script');
            script.src = `https://receitaws.com.br/v1/cnpj/${cnpj}?callback=handleResponse`;
            document.body.appendChild(script);
        });

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
