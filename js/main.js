const container = document.querySelector('.container');

let countBlock = 4;

// Функция для сохранения данных в localStorage
function saveToLocalStorage() {
  const data = {
    inputs: [],
    spans: [],
    totalSumm: totalSumm
  };
  
  // Сохраняем значения всех инпутов
  const inputs = document.querySelectorAll('input[type="number"]');
  inputs.forEach(input => {
    data.inputs.push(input.value);
  });
  
  // Сохраняем значения всех span'ов
  const spans = document.querySelectorAll('.block span');
  spans.forEach(span => {
    data.spans.push(span.textContent);
  });
  
  localStorage.setItem('calculatorData', JSON.stringify(data));
}

// Функция для загрузки данных из localStorage
function loadFromLocalStorage() {
  const savedData = localStorage.getItem('calculatorData');
  if (savedData) {
    const data = JSON.parse(savedData);
    
    // Восстанавливаем значения инпутов
    const inputs = document.querySelectorAll('input[type="number"]');
    inputs.forEach((input, index) => {
      if (data.inputs[index] !== undefined) {
        input.value = data.inputs[index];
      }
    });
    
    // Восстанавливаем значения span'ов
    const spans = document.querySelectorAll('.block span');
    spans.forEach((span, index) => {
      if (data.spans[index] !== undefined) {
        span.textContent = data.spans[index];
      }
    });
    
    // Восстанавливаем общую сумму
    if (data.totalSumm !== undefined) {
      totalSumm = data.totalSumm;
      updateTotal();
    }
  }
}

window.addEventListener('load', () => {
  for (let i = 0; i < countBlock; i++) {
    container.innerHTML = container.innerHTML += `
      <div class="block" id="block-${i + 1}">
        <div>Блок за <input type="number" value=0> р.</div>
        <div class="buttons">
          <button onClick="minus(${i + 1})">-</button>
          <span>0р.</span>
          <button onClick="plus(${i + 1})">+</button>
        </div>
      </div>
    `;
  }
  container.innerHTML = container.innerHTML += `<div class="total">0р.</div>`;
  
  // Загружаем сохраненные данные после создания элементов
  loadFromLocalStorage();
  
  // Добавляем слушатели событий для автоматического сохранения при изменении инпутов
  const inputs = document.querySelectorAll('input[type="number"]');
  inputs.forEach(input => {
    input.addEventListener('input', saveToLocalStorage);
  });
});

const spans = document.querySelectorAll('span');
let totalSumm = 0;

function plus(blockNumber){
  const block = document.getElementById(`block-` + blockNumber);
  block.querySelector('span').textContent = parseInt(block.querySelector('span').textContent) + parseInt(block.querySelector('input').value) + 'р.';
  totalSumm += parseInt(block.querySelector('input').value);
  updateTotal();
  saveToLocalStorage(); // Сохраняем после изменения
}

function minus(blockNumber){
  const block = document.getElementById(`block-` + blockNumber);
  block.querySelector('span').textContent = parseInt(block.querySelector('span').textContent) - parseInt(block.querySelector('input').value) + 'р.';
  totalSumm -= parseInt(block.querySelector('input').value);
  updateTotal();
  saveToLocalStorage(); // Сохраняем после изменения
}

function updateTotal(){
  document.querySelector('.total').textContent = totalSumm + 'р.';
}