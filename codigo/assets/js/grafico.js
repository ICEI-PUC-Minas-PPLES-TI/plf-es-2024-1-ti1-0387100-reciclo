import { getResiduos } from "../../service/residuos-service.js";

// Função assíncrona para obter os resíduos
const fetchResiduos = async () => {
   return await getResiduos();
}

// Função para contar os tipos de resíduos
const countResiduos = (residuos) => {
    return residuos.reduce((acc, cur) => {
        if (!acc[cur.residuesTypeId]) {
            acc[cur.residuesTypeId] = 0;
        }
        acc[cur.residuesTypeId] += 1;
        return acc;
    }, {});
}

// Chamada da função assíncrona e contagem dos resíduos
(async () => {
    try {
        const residuos = await fetchResiduos();
        const contagemResiduos = countResiduos(residuos);

        const labels = Object.keys(contagemResiduos);
        const data = Object.values(contagemResiduos);

                const ctx = document.getElementById('myPieChart').getContext('2d');
                const myPieChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: labels,
                        datasets: [{
                            data: data,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: true,
                                text: 'Distribuição dos Tipos de Resíduos'
                            }
                        }
                    }
                });
            } catch (error) {
                console.error(error);
            }
})();

// Montagem do gŕafico

    function createPieChart (data) {
    const categorias = Array.from(new Set(data.map(item => item.categoria)));
    const valoresPorCategoria = categorias.map(categoria => {
    const valorTotal = data.filter(item => item.categoria === categoria)
                            .reduce((acc, curr) => acc + curr.valor, 0);
    return valorTotal;
        });

    const ctx = document.getElementById('divPieChart');
    const divPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
    labels: categorias,
        datasets: [{
        data: valoresPorCategoria,
        backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
        }]
    },
    options: {
        responsive: false,
        maintainAspectRatio: false
    }
    });            
}
