const symptoms = [
    'itching', 'skin_rash', 'nodal_skin_eruptions', 'continuous_sneezing',
    'shivering', 'chills', 'joint_pain', 'stomach_pain', 'acidity',
    // Add the rest of the symptoms here
];

let selectedSymptoms = [];

document.addEventListener('DOMContentLoaded', function () {
    const symptomInput = document.getElementById('symptom');
    const addButton = document.getElementById('add');
    const predictButton = document.getElementById('predict');
    const symptomsList = document.getElementById('symptoms');
    const resultContainer = document.getElementById('result');

    // Autocomplete for symptom input
    $(symptomInput).autocomplete({
        source: symptoms
    });

    // Add symptom to the list
    addButton.addEventListener('click', function () {
        const symptom = symptomInput.value.trim();
        if (symptom) {
            selectedSymptoms.push(symptom);
            const listItem = document.createElement('li');
            listItem.textContent = symptom;
            symptomsList.appendChild(listItem);
            symptomInput.value = '';
        }
    });

    // Predict disease based on symptoms
    predictButton.addEventListener('click', function () {
        fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedSymptoms)
        })
        .then(response => response.json())
        .then(data => {
            resultContainer.innerHTML = '';
            data.forEach(item => {
                const diseaseInfo = `
                    <p>
                        <strong>Disease:</strong> ${item.disease}<br>
                        <strong>Probability:</strong> ${item.probability}<br>
                        <strong>Description:</strong> ${item.description}<br>
                        <strong>Precautions:</strong> ${item.precautions.join(', ')}
                    </p>
                `;
                resultContainer.insertAdjacentHTML('beforeend', diseaseInfo);
            });
        });
    });
});
