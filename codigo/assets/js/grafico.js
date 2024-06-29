import {ResidueService} from '../../service/residuos-service.js';
import { tipoResiduos } from "./utils/tipo-residuos.js";

tipoResiduos
const residueService = new ResidueService();

const selectTypeChart = document.getElementById("typeChart");

let myPieChart = null; // Variável global para armazenar o objeto Chart

// Função assíncrona para obter os resíduos
const fetchResiduos = async () => {
    return await residueService.getResiduos();
}

// Função para contar os tipos de resíduos
const countResiduos = (residuos, type) => {
    return residuos.reduce((acc, cur) => {
        if (!acc[cur.residuesTypesId]) {
            acc[cur.residuesTypesId] = 0;
        }
        if (type == 0) {
            acc[cur.residuesTypesId] += 1;
        } else {
            acc[cur.residuesTypesId] += cur.quantity;
        }
        return acc;
    }, {});
}

// Função para renderizar o gráfico de pizza
const renderPieChart = async (type = 0) => {
    try {
        const residuos = await fetchResiduos();
        const filteredResidues = residuos.filter(residuo => residuo.collectorId === getUserId());
        const contagemResiduos = countResiduos(filteredResidues, type);

        const labels = Object.keys(contagemResiduos).map(key => tipoResiduos[key]);
        const data = Object.values(contagemResiduos);
        
        const ctx = document.getElementById('myPieChart').getContext('2d');

        if (myPieChart) {
            myPieChart.destroy(); // Destrói o gráfico anterior, se existir
        }

        myPieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: [
                        'rgba(174, 223, 156, 0.4)',
                        'rgba(223, 156, 156, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',           
                    ],
                    borderColor: [
                        'rgba(174, 223, 156, 1)',
                        'rgba(223, 156, 156, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)' 
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'Quantidade de resíduos coletados por tipo'
                    }
                }
            }
        });
    } catch (error) {
        console.error("Erro ao renderizar o gráfico:", error);
    }
}

// Event listener para mudanças no tipo de gráfico
selectTypeChart.addEventListener('change', (event) => {
    const typeChart = parseInt(event.target.value); // Converte para número inteiro
    renderPieChart(typeChart);
});

function getUserId(){
    return localStorage.getItem("id");
}


// Chamada inicial para renderizar o gráfico
renderPieChart();
