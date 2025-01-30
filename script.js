const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.content');

// tabs.forEach(tab => {
//   tab.addEventListener('click', () => {
//     tabs.forEach(t => t.classList.remove('active'));
//     contents.forEach(c => c.classList.remove('active'));

//     tab.classList.add('active');
//     document.getElementById(tab.dataset.tab).classList.add('active');
//   });
// });

const textArea = document.getElementById("text1");

textArea.addEventListener("mouseenter", () => {
  textArea.classList.add("active");
});

textArea.addEventListener("mouseleave", () => {
  textArea.classList.remove("active");
});

const textArea2 = document.getElementById("text2");

textArea2.addEventListener("mouseenter", () => {
  textArea2.classList.add("active");
});

textArea2.addEventListener("mouseleave", () => {
  textArea2.classList.remove("active");
});


// Porównywarka Tekstów
document.getElementById('compare-button').addEventListener('click', () => {

  N_GRAM_SIZE = 3;  //zmieniasz se ile kolejnych slow powtarzajacych ma szukac

  const text1 = document.getElementById('text1').value.trim();
  const text2 = document.getElementById('text2').value.trim();
  const resultDiv = document.getElementById('compare-result');

  if (!text1 || !text2) {
    resultDiv.textContent = 'Oba pola muszą być wypełnione.';
    resultDiv.style.color = 'orange';
    return;
  }

  const powtorzoneFrazy = [];
  
  // Funkcja do generowania n-gramów (ciągów dwóch słów)
  function generateNGrams(text, n = N_GRAM_SIZE) {
    const words = text.split(/\s+/); // Rozdziel na słowa
    const nGrams = [];
    for (let i = 0; i <= words.length - n; i++) {
      nGrams.push(words.slice(i, i + n).join(' ')); // Połącz n kolejnych słów
    }
    return nGrams;
  }

  // Generuj pary słów (2-gramy)
  const nGrams1 = generateNGrams(text1, N_GRAM_SIZE);
  const nGrams2 = generateNGrams(text2, N_GRAM_SIZE);
  

  // Sprawdź powtarzające się n-gramy
  nGrams1.forEach(phrase => {
    if (nGrams2.includes(phrase) && !powtorzoneFrazy.includes(phrase)) {
      powtorzoneFrazy.push(phrase);
    }
  });

  // Podświetlanie powtarzających się n-gramów
  let highlightedText1 = text1;
  let highlightedText2 = text2;
  
  powtorzoneFrazy.forEach(phrase => {
    const regex = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    highlightedText1 = highlightedText1.replace(regex, `<mark>${phrase}</mark>`);
    highlightedText2 = highlightedText2.replace(regex, `<mark>${phrase}</mark>`);
  });

  // Wyświetl wynik
  resultDiv.innerHTML = `
    <p><strong>Tekst 1:</strong></p>
    <p>${highlightedText1}</p>
    <p><strong>Tekst 2:</strong></p>
    <p>${highlightedText2}</p>
  `;
  resultDiv.style.color = 'black';
});


// Wyszukiwanie w Tekście
document.getElementById('patternInput').addEventListener('input', () => {
  const text = document.getElementById('textInput').value;
  const pattern = document.getElementById('patternInput').value;
  const resultDiv = document.getElementById('search-result');
  const countDiv = document.getElementById('search-count');

  if (!pattern) {
    resultDiv.innerHTML = '<p>Proszę wprowadzić wzorzec do wyszukania!</p>';
    countDiv.innerText = 'Znaleziono wyników: 0';
    return;
  }

  const regex = new RegExp(pattern, 'gi');
  const matches = text.match(regex) || [];
  const highlightedText = text.replace(regex, match => `<mark>${match}</mark>`);

  resultDiv.innerHTML = `<p>${highlightedText}</p>`;
  countDiv.innerText = `Znaleziono wyników: ${matches.length}`;
});
