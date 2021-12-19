document.addEventListener('DOMContentLoaded', (event) => {
    var modal = document.getElementById('myModal')

    loadLocalStorage()

    const submitBtns = document.querySelectorAll('.submit-btn')
    submitBtns.forEach(btn => btn.addEventListener('click', addTaskFromInput))

    const taskInputs = document.querySelectorAll('.task-input')
    taskInputs.forEach(input => input.addEventListener('keypress', (e) => {
        if (e.keyCode == 13) 
            addTaskFromInput(e)
    }))

    const settingsButton = document.querySelector('.settings-btn')
    settingsButton.addEventListener('click', () => openSettings(modal))

    const closeButton = document.querySelector('.close')
    closeButton.addEventListener('click', () => closeSettings(modal))

    const importBtn = document.querySelector('.import')
    importBtn.addEventListener('click', importData)

    const exportBtn = document.querySelector('.export')
    exportBtn.addEventListener('click', () => exportData(modal))

    const importInput = document.getElementById('fileid')
    importInput.addEventListener('change', () => populateImportData())

    const darkThemeSlider = document.getElementById('dark-slider')
    darkThemeSlider.addEventListener('click', () => {
        if (document.body.classList.contains("dark-theme")) {
            document.body.classList.remove("dark-theme");
            window.localStorage.setItem("stg_darkmode", false);
        } else {
            document.body.classList.add("dark-theme");
            window.localStorage.setItem("stg_darkmode", true);
        }

    })

    const doSquare = document.querySelector('.do')
    const decideSquare = document.querySelector('.decide')
    const delegateSquare = document.querySelector('.delegate')
    const deleteSquare = document.querySelector('.delete')

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    } 
});

function openSettings(modal) {
    modal.style.display = "block";
}

function closeSettings(modal) {
    modal.style.display = "none"
}

function importData() {
    document.getElementById('fileid').click();
}

function exportData(modal) {
    const file = new Blob(
        [JSON.stringify(
            {"do":window.localStorage.getItem('do'),
            "decide":window.localStorage.getItem('decide'),
            "delegate":window.localStorage.getItem('delegate'),
            "delete":window.localStorage.getItem('delete')}
        ),], 
        { type: 'application/json' }
      );
      const fileURL = URL.createObjectURL(file);
          // create the link 
    const linkElement = document.createElement("a");

    // add the file url
    linkElement.setAttribute('href', fileURL);

    // add the download attribute with name suggestion
    linkElement.setAttribute('download', 'eisenhower-matrix.json')

    // add it to the DOM
    modal.appendChild(linkElement);
    linkElement.click()
}

function populateImportData() {
    document.getElementById('fileid').files[0].text().then(text => {
        const items = JSON.parse(text) 
        const squares = ["do", "decide", "delegate", "delete"]
        squares.forEach(element => {
            const tasksArr = JSON.parse(items[element])
            const square = document.querySelector('.'+element)
            tasksArr.forEach(newTask => {
                addTask(square, newTask, true)
            })
        })
    });

}

function loadLocalStorage() {
    if (localStorage.getItem("stg_darkmode") == "true") {
        document.body.classList.add("dark-theme");
    }

    const squares = ['do', 'decide', 'delegate', 'delete']
    squares.forEach(item => {
        if (localStorage.getItem(item)) {
            const square = document.querySelector('.'+item)
            const arr = JSON.parse(window.localStorage.getItem(item))
            arr.forEach(task => {
                addTask(square, task)
            })       
        }
    })

}

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

function addTaskFromInput(e) {
    e.preventDefault()
    const square = e.target.parentNode.parentNode
    addTask(square, square.querySelector('input').value, true)
    square.querySelector('input').value = ''
}



function addTask(square, task, fromInput = false ) {
    const item = square.dataset.list
    if (fromInput) {
        if (task === ''  || task.length > 255) {
            return;
        }
    
        // add value to local storage
        if(!localStorage.getItem(item)) {
            const newArr = [task]
            window.localStorage.setItem(item, JSON.stringify(newArr));
          } else {
            const newArr = JSON.parse(window.localStorage.getItem(item))
            newArr.push(task)
            window.localStorage.setItem(item, JSON.stringify(newArr));
        }
    }

    const li = document.createElement('li')
    const div = document.createElement('div')
    // div.style.display='inline'

    const p = document.createElement('p')
    p.textContent = task
    p.style.display = 'inline'
    p.style.width = '90%'

    if (task.substring(0, 3) === '<s>') {
        p.textContent = task.substring(3)
        p.classList.add('item-done')
    }

    const btnCheck = document.createElement('span')
    btnCheck.innerHTML = '<button class="chk-btn" id="check">&#10003;</button>'
    btnCheck.addEventListener('click', (e) => {
        const newTask = e.target.parentNode.parentNode.parentNode.querySelector('p').textContent
        if (!e.target.parentNode.parentNode.parentNode.querySelector('p').classList.contains('item-done')) {
            // add strikethrough to local storage
            const newArr = JSON.parse(window.localStorage.getItem(item))
            const index = newArr.indexOf(newTask)
            newArr[index] = "<s>" + newArr[index]
            window.localStorage.setItem(item, JSON.stringify(newArr));
        } else {
             // remove strikethrough to local storage
             const newArr = JSON.parse(window.localStorage.getItem(item))
             const index = newArr.indexOf("<s>"+newTask)
             newArr[index] = newArr[index].substring(3)
             window.localStorage.setItem(item, JSON.stringify(newArr));
        }
        e.target.parentNode.parentNode.parentNode.querySelector('p').classList.toggle('item-done')
    })

    const btnDelete = document.createElement('span')
    btnDelete.innerHTML = '<button class="del-btn" id="delete">✖</button>'
    btnDelete.addEventListener('click', (e) => {
        // remove from local storage
        const newArr = JSON.parse(window.localStorage.getItem(item))
        newArr.splice(newArr.indexOf(task), 1)
        window.localStorage.setItem(item, JSON.stringify(newArr));
        e.target.parentNode.parentNode.parentNode.style.display = 'none'
    })

    div.appendChild(p)
    div.appendChild(btnCheck)
    div.appendChild(btnDelete)
    div.classList.add('item')
    li.appendChild(div)
        
    const parentList = square.querySelector('ul')
    parentList.appendChild(li)
}

