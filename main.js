        function handleResponse(data) {
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = '';

            // Crie uma tabela HTML
            const table = document.createElement('table');
            table.border = '1';

            // Loop através dos campos do JSON e adiciona-os à tabela
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const row = document.createElement('tr');
                    const cell1 = document.createElement('td');
                    const cell2 = document.createElement('td');
                    cell1.textContent = key;
                    cell2.textContent = data[key];
                    row.appendChild(cell1);
                    row.appendChild(cell2);
                    table.appendChild(row);
                }
            }

            // Adiciona a tabela à div 'result'
            resultDiv.appendChild(table);
        }

        document.getElementById('cnpjForm').addEventListener('submit', function (event) {
            event.preventDefault();

            const cnpj = document.getElementById('cnpjInput').value;
            const script = document.createElement('script');
            script.src = `https://receitaws.com.br/v1/cnpj/${cnpj}?callback=handleResponse`;
            document.body.appendChild(script);
        });
