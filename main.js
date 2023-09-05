        const editedData = []; // Array para armazenar os dados editados

        function handleResponse(data) {
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = '';

            // Crie uma tabela HTML
            const table = document.createElement('table');

            // Loop através dos campos do JSON e adiciona-os à tabela
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const row = document.createElement('tr');
                    const cell1 = document.createElement('td');
                    const cell2 = document.createElement('td');

                    // Crie uma caixa de texto editável para o valor
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = data[key];
                    cell1.textContent = key;
                    cell2.appendChild(input);

                    row.appendChild(cell1);
                    row.appendChild(cell2);
                    table.appendChild(row);

                    // Adicione os dados originais e o campo de entrada à estrutura de dados
                    editedData.push({ key, value: data[key], input });
                }
            }

            // Adicione uma linha com um botão de download em formato TXT
            const downloadRow = document.createElement('tr');
            const downloadCell = document.createElement('td');
            downloadCell.colSpan = 2;

            const downloadButton = document.getElementById('downloadButton');
            downloadButton.textContent = 'Download';
            downloadButton.style.display = 'block';
            downloadButton.addEventListener('click', function () {
                downloadTxtFile(editedData, 'dados.txt');
            });

            downloadCell.appendChild(downloadButton);
            downloadRow.appendChild(downloadCell);
            table.appendChild(downloadRow);

            // Adicione a tabela à div 'result'
            resultDiv.appendChild(table);
        }

        function downloadTxtFile(data, filename) {
            const txtData = data.map(item => `${item.key}: ${item.input.value}`).join('\n');
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(txtData));
            element.setAttribute('download', filename);
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        }

        document.getElementById('cnpjForm').addEventListener('submit', function (event) {
            event.preventDefault();

            const cnpj = document.getElementById('cnpjInput').value;
            const script = document.createElement('script');
            script.src = `https://receitaws.com.br/v1/cnpj/${cnpj}?callback=handleResponse`;
            document.body.appendChild(script);
        });
