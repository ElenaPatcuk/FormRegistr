let login = document.querySelector('#login')
let form = document.querySelector('#myForm')
let name = document.querySelector('#name')
let lstname = document.querySelector('#lstname')
let email = document.querySelector('#email')
let password = document.querySelector('#password')
let password2 = document.querySelector('#password2')
let date = document.querySelector('#date')
let errors = document.querySelectorAll('.error')

flags = [false, false, false, false, false, false]

function txtCnt (txt, clRem, clAd, fl, index, p, i){
    p.textContent = txt
    i.classList.remove(clRem)
    i.classList.add(clAd)
    flags[index]=fl
}

// блокируем кнопку
login.disabled = true

// проверка на пустоту поля
function zero(i, p, index){
    if (i.value.trim()===''){ 
        txtCnt('No Content!', 'done', 'errorI', 'false', index, p, i)
    }else{
        txtCnt('', 'errorI', 'done', 'true', index, p, i)
    }
}

// запрет ввода цифр для ИФ и ограничения по кол-ву символов
function noInput(n){
    const reg = /[^А-Яа-яЁё\- *]/g
    if(n.value.match(reg)){
        n.value = n.value.replace(reg,'')
    }
    if(n.value.length>50){
        n.value = n.value.slice(0,50)
    }
}

name.addEventListener('input', ()=>{
    noInput(name)
    zero(name, errors[0], 0)})
lstname.addEventListener('input', ()=>{
    noInput(lstname)
    zero(lstname, errors[1], 1)})

// проверка EMAIL
function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

email.addEventListener('change', ()=>{
    if(!validateEmail(email.value)){
        txtCnt('Enter your email correctly!', 'done', 'errorI', 'false', 2, errors[2], email)
    }
    else{
        txtCnt('', 'errorI', 'done', 'true', 2, errors[2], email)
    }
})

// проверка PASSWORD
password.addEventListener('input', ()=>{
    const lower = /[a-z]/g
    const upper = /[A-Z]/g
    const numbers = /[0-9]/g

    if(!password.value.match(lower)){
        txtCnt('Missing lowercase characters!', 'done', 'errorI', 'false', 3, errors[3], password)
    }else if(!password.value.match(upper)){
        txtCnt('Missing capital characters!', 'done', 'errorI', 'false', 3, errors[3], password)
    }else if(!password.value.match(numbers)){
        txtCnt('Add numbers to your password!', 'done', 'errorI', 'false', 3, errors[3], password)
    }else if(password.value.length < 8){
        txtCnt('Password less than 8 characters!', 'done', 'errorI', 'false', 3, errors[3], password)
    }else{
        txtCnt('', 'errorI', 'done', 'true', 3, errors[3], password)
    }
})

// подтверждение пароля
password2.addEventListener('change', ()=>{
    if(password.value===password2.value){
        txtCnt('', 'errorI', 'done', 'true', 4, errors[4], password2)
    }else{
        txtCnt('Passwords do not match!', 'done', 'errorI', 'false', 4, errors[4], password2)
    }
})

// проверка даты
function ageUser(date) {
    return ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.2 * 1000)) | 0;
}

date.addEventListener('change', ()=>{
    let age = ageUser(date.value)
    if(age<18){
        txtCnt('You are under 18!', 'done', 'errorI', 'false', 5, errors[5], date)
    }else{
        txtCnt('', 'errorI', 'done', 'true', 5, errors[5], date)
    }
    
})

// проверка по флагам для блокировки или разблокировки кнопки
form.addEventListener('change',function(){
    if(flags.includes(false)){
        login.disabled = true
    }else{
        login.disabled = false
    } 
})