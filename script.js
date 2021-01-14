let submitBtns

document.addEventListener('DOMContentLoaded', (event) => {
    submitBtns = document.querySelectorAll('.submit-btn')
    submitBtns.forEach(btn => btn.addEventListener('click', addTask))
});



function addTask(e) {
    e.preventDefault()
    const quadrantDiv = e.target.parentNode
    const input = quadrantDiv.querySelector('input')
    if (input.value === '' ) {
        return;
    }
    const li = document.createElement('li')
    li.textContent = input.value

    input.value = ''
    
    const parentList = quadrantDiv.querySelector('ul')
    parentList.appendChild(li)
}

