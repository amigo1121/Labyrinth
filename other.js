const instr = document.getElementById('instruct')
const icon = document.getElementById('icon')
const i = document.getElementById('infomation')
const information = document.getElementById('info')
icon.addEventListener('mouseenter',showInstr)
icon.addEventListener('mouseleave', hideInstr)
function showInstr(){
    instr.hidden = false;
}
function hideInstr(){
    instr.hidden = true;
}
i.addEventListener('mouseenter',showIn)
i.addEventListener('mouseleave', hideIn)
function showIn(){
    information.hidden = false;
}
function hideIn(){
    information.hidden = true;
}
