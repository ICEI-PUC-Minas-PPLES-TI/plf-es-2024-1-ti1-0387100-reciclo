import { getResiduos } from "../../service/residuos-service.js";

// Função assíncrona para obter os resíduos
const fetchResiduos = async () => {
   return await getResiduos();
}

// Função para contar os tipos de resíduos
const countResiduos = (residuos) => {
    return residuos.reduce((acc, cur) => {
        if (!acc[cur.residuesTypesId]) {
            acc[cur.residuesTypesId] = 0;
        }
        acc[cur.residuesTypesId] += 1;
        return acc;
    }, {});
}

// Chamada da função assíncrona e contagem dos resíduos
const tipoResiduoLabels = {
    1: 'Vidro',
    2: 'Plástico',
    3: 'Papel',
    4: 'Metal',
};

(async () => {
    try {
        const residuos = await fetchResiduos();
        const contagemResiduos = countResiduos(residuos);
        console.log(contagemResiduos);

        const labels = Object.keys(contagemResiduos).map(key => tipoResiduoLabels[key]);
        const data = Object.values(contagemResiduos);
        
                const ctx = document.getElementById('myPieChart').getContext('2d');
                const myPieChart = new Chart(ctx, {
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
                console.error(error);
        }
})();
