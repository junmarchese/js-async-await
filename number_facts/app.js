// Part 1

// function to append facts to the page
function addFactToPage(fact) {
    const factsDiv = document.getElementById("number-facts");
    const factData = document.createElement("p");
    factData.textContent = fact;
    factsDiv.appendChild(factData);
}

// Part 1, includes Steps 1 and 2. Function to get a single fact about a number using Axios
async function getNumberFact(number) {
    await axios.get(`http://numbersapi.com/${number}?json`)
        .then(res => addFactToPage(res.data.text))
        .catch(error => console.error("Error fetching number fact:", error));
}

// Part 1 Step 3.  Function to get 4 facts on favorite number.  
async function getMultipleFactsFavNumber(number) {
    const requests = [];
    const uniqueFacts = new Set();

    while (uniqueFacts.size < 4) {
        const request = axios.get(`http://numbersapi.com/${number}?json`);
        requests.push(request);

        await Promise.all(requests)
            .then(responses => {
                responses.forEach(response => {
                    const fact = response.data.text;
                    if (!uniqueFacts.has(fact)) {
                        uniqueFacts.add(fact);
                        addFactToPage(fact);
                }
            });
        })
        .catch(error => console.error("Error fetching multiple facts:", error));
    }
}

getMultipleFactsFavNumber(13);
