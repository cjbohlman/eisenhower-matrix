
document.addEventListener('DOMContentLoaded', (event) => {
    const submitBtns = document.querySelectorAll('.submit-btn')
    submitBtns.forEach(btn => btn.addEventListener('click', addTask))
    
    const hideInfoButton = document.querySelector('.info-btn')
    hideInfoButton.addEventListener('click' , toggleInfo)
});

function toggleInfo(e) {
    e.preventDefault()
    const button = e.target
    const downArrow = '\u02C5' //&#709;
    const upArrow = '\u02C4' //&#708;
    const info = document.querySelector('.info')
    if (button.textContent == upArrow) {
        // hide content
        button.textContent = downArrow
        info.classList.remove('disappear')
    
    }
    else {
        // show content
        button.textContent = upArrow
        info.classList.add('disappear')
    }
}

function addTask(e) {
    e.preventDefault()
    const quadrantDiv = e.target.parentNode.parentNode
    const input = quadrantDiv.querySelector('input')
    if (input.value === ''  || input.value.length > 255) {
        return;
    }
    
    const li = document.createElement('li')
    const div = document.createElement('div')
    // div.style.display='inline'

    const p = document.createElement('p')
    p.textContent = input.value
    p.style.display = 'inline'
    p.style.width = '90%'

    const btnCheck = document.createElement('span')
    btnCheck.innerHTML = '<button class="chk-btn" id="check">✓</button>'
    btnCheck.addEventListener('click', (e) => {
        console.log(e.target)
        e.target.parentNode.parentNode.parentNode.querySelector('p').classList.toggle('item-done')
    })

    const btnDelete = document.createElement('span')
    btnDelete.innerHTML = '<button class="del-btn" id="delete">✖</button>'
    btnDelete.addEventListener('click', (e) => {
        e.target.parentNode.parentNode.parentNode.style.display = 'none'
    })

    div.appendChild(p)
    div.appendChild(btnCheck)
    div.appendChild(btnDelete)
    div.classList.add('item')
    li.appendChild(div)

    input.value = ''
    
    const parentList = quadrantDiv.querySelector('ul')
    parentList.appendChild(li)
}

