const openModal = (idModal) => {
    const divModal = document.querySelector(idModal)
    divModal.style.display = "flex";
}

const closeModal = (idModal) => {
    const divModal = document.querySelector(idModal)
    divModal.style.display = "none";s
}

const handleModalClose = (event) => {
    if(event.target.className === "modal"){
        event.target.style.display = "none"
    }
}

const fetchData = async () => {
    try{
        const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=LH07N0TNNG27SA5W`)
        const data = await response.json();
        return data;
    } catch(error){
        alert(error)
    }
}

const handleAddTicker = (event) => {
    event.preventDefault() 
    const ticker = event.target.ticker.value;
    const data = fetchData()
    let price;
   
        price = data["Global Quote"]["05. price"];
        if(price){
            const newTicker = `<div class="ticker">
            <button class="btn-close--ticker" onclick="removeTicker(event)">x</button>
            <h2>${ticker}</h2>
            <p>${price}</p>
            <button class='btn-update--ticker' onclick="updateTicker(event)">Update </button>`;
            addTickersCloseEvent()
            const tickerList = document.querySelector('#tickers-list');
            tickerList.innerHTML += newTicker 
        }else{
            alert(`Ticker ${ticker} não encontrado!`)
        }
}

const handleTickerMouseEnter = (event) => {
    const ticker = event.target;
    const btnClose = ticker.querySelector('.btn-close--ticker');
    btnClose.style.display = 'block';
}

const handleTickerMouseLeave = (event) => {
    const ticker = event.target;
    const btnClose = ticker.querySelector('.btn-close--ticker');
    btnClose.style.display = 'none';
}

const removeTicker = (event) => {
    const btnClose = event.target;
    const ticker = btnClose.closest('.ticker');
    ticker.remove();
}

const modal = document.querySelector(".modal");
modal.addEventListener("click", handleModalClose);

const addTickersCloseEvent = (event) => {
    const ticker = document.querySelectorAll('.ticker');
    ticker.forEach((ticker) => {
        ticker.addEventListener('mouseenter', handleTickerMouseEnter);
        ticker.addEventListener('mouseleave', handleTickerMouseEnter);
    })
}

const updateTicker = (event) => {
    const data = fetchData();
    const ticker = event.target.ticker.value;
    const btnClose = event.target;
    const  ticker = btnClose.closest('.ticker');
    let price = data["Global Quote"]["05. price"];
    ticker.querySelector('p').innerHTML = price;
}

console.log(fetchData())

addTickersCloseEvent()