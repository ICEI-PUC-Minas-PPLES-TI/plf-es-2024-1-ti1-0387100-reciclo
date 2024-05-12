window.onload = function() {
};

function handleAcceptCollect() {
    let elementPedidoColeta = document.getElementById("pedido-coleta");
    elementPedidoColeta.className = "d-none";

    let elementCodigoColeta = document.getElementById("codigo-coleta");
    elementCodigoColeta.className = "d-flex"
}

function handleRejectCollect() {
    let elementCardStatus = document.getElementById("card-status");
    elementCardStatus.className = "d-none";
}