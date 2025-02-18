const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    tab.classList.add('active');
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});

// Porównywarka Tekstów
document.getElementById('compare-button').addEventListener('click', () => {

  ILOSC_WYRAZOW_W_CIAGU = 2;  //zmieniasz se ile kolejnych slow powtarzajacych ma szukac

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
  function generujCiagiWyrazow(text, n = ILOSC_WYRAZOW_W_CIAGU) {
    const slowa = text.split(/\s+/); // Rozdziel na słowa
    const ciagi = [];
    for (let i = 0; i <= slowa.length - n; i++) {
      ciagi.push(slowa.slice(i, i + n).join(' ').toLowerCase()); 
    }
    return ciagi;
  }

  // Generuj pary słów (2-gramy)
  const ciagiWyrazow1 = generujCiagiWyrazow(text1, ILOSC_WYRAZOW_W_CIAGU);
  const ciagiWyrazow2 = generujCiagiWyrazow(text2, ILOSC_WYRAZOW_W_CIAGU);
  

  // Sprawdź powtarzające się n-gramy
  for (const fraza of ciagiWyrazow1) {
    if (ciagiWyrazow2.includes(fraza) && !powtorzoneFrazy.includes(fraza)) {
      powtorzoneFrazy.push(fraza);
    }
  }
    
  // Podświetlanie powtarzających się n-gramów
  let highlightedText1 = text1;
  let highlightedText2 = text2;
  
  powtorzoneFrazy.forEach(fraza => {
    const regex = new RegExp(fraza, 'gi');
    highlightedText1 = highlightedText1.replace(regex, `<mark>${fraza}</mark>`);
    highlightedText2 = highlightedText2.replace(regex, `<mark>${fraza}</mark>`);
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
