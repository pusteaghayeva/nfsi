const input = document.getElementById('auctionInput');
const hiddenInput = document.getElementById('auctionValue');
const dropdown = document.getElementById('dropdownList');
const options = dropdown.querySelectorAll('div');

let currentFocus = -1;

input.addEventListener('click', (e) => {
    dropdown.style.display = 'block';
    e.stopPropagation();
});

input.addEventListener('input', () => {
    const filter = input.value.toLowerCase();
    currentFocus = -1;
    options.forEach(option => {
        const text = option.textContent.toLowerCase();
        option.style.display = text.includes(filter) ? 'block' : 'none';
    });
});

options.forEach((option, index) => {
    option.addEventListener('mousedown', (e) => {
        input.value = option.textContent;
        hiddenInput.value = option.getAttribute('data-value');
        dropdown.style.display = 'none';
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown-wrapper')) {
        dropdown.style.display = 'none';
    }
});

input.addEventListener('keydown', (e) => {
    const visibleOptions = Array.from(options).filter(option => option.style.display !== 'none');

    if (e.key === 'ArrowDown') {
        currentFocus = (currentFocus + 1) % visibleOptions.length;
        updateActiveOption(visibleOptions);
    } else if (e.key === 'ArrowUp') {
        currentFocus = (currentFocus - 1 + visibleOptions.length) % visibleOptions.length;
        updateActiveOption(visibleOptions);
    } else if (e.key === 'Enter') {
        if (visibleOptions[currentFocus]) {
            visibleOptions[currentFocus].dispatchEvent(new MouseEvent('mousedown'));
            e.preventDefault();
        }
    }
});

function updateActiveOption(visibleOptions) {
    visibleOptions.forEach((opt, idx) => {
        opt.style.backgroundColor = (idx === currentFocus) ? '#eee' : '#fff';
    });
}

// Mekana gore