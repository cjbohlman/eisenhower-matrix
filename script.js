
document.addEventListener('DOMContentLoaded', (event) => {
    const submitBtns = document.querySelectorAll('.submit-btn')
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
    const div = document.createElement('div')
    div.style.display='inline'

    const p = document.createElement('p')
    p.textContent = input.value
    p.style.display = 'inline'

    const btnCheck = document.createElement('span')
    btnCheck.innerHTML = '<button id="check">✓</button>'
    btnCheck.addEventListener('click', (e) => {
        e.target.parentNode.parentNode.querySelector('p').classList.toggle('item-done')
    })

    const btnDelete = document.createElement('span')
    btnDelete.innerHTML = '<button id="delete">✖</button>'
    btnDelete.addEventListener('click', (e) => {
        console.log(e.target.parentNode.parentNode)
        e.target.parentNode.parentNode.parentNode.style.display = 'none'
    })

    div.appendChild(p)
    div.appendChild(btnCheck)
    div.appendChild(btnDelete)
    li.appendChild(div)

    input.value = ''
    
    const parentList = quadrantDiv.querySelector('ul')
    parentList.appendChild(li)
}

