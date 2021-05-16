if(window.innerWidth<=600)
{
    document.querySelector('.internal1 img').setAttribute('href','./images/bg-mobile-dark.jpg')
    console.log('small background placed width = '+ window.innerWidth)
}
else
{
    console.log('no change')
}
function fc()
{
    setTimeout(()=>{
        document.body.classList.toggle('lmt');
    },200)
}
const formdata=document.querySelector('#formitem')
const inputitem=document.querySelector('#inputtext')
const displayitem=document.querySelector('#listitems')
const filteritem=document.querySelectorAll('.nav-item')
//creating empty item array
let todoitems=[]
//filter item
const getfilteritem=(type)=>{
    let filteritems=[]
    switch(type)
    {
        case 'todo':
            filteritems=todoitems.filter((item)=>!item.isDone)
            break
        case 'completed':
            filteritems=todoitems.filter((item)=>item.isDone)
            break
        default:
            filteritems=todoitems
            break
    }
    displayTask(filteritems)
}
//delete item
const removeitem=(item)=>{
    const removeindex=todoitems.indexOf(item)
    todoitems.splice(removeindex,1) 
}
//function for action buttons
const handelItem=(itemData)=>{
    const items=document.querySelectorAll('.list-group-item')
    items.forEach((item)=>{
        if(item.querySelector('.dc').getAttribute('data-time')==itemData.date)
    //done
    item.querySelector('[data-done]').addEventListener('click',(e)=>{
        e.preventDefault()
        const itemindex=todoitems.indexOf(itemData)
        const currentitem=todoitems[itemindex]
        currentitem.isDone=currentitem.isDone?false:true;
        todoitems.splice(itemindex,1,currentitem)
        localst(todoitems)
        const filtervalue=document.querySelector('#tabvalue').value
        getfilteritem(filtervalue)
    })
    //delete
    item.querySelector('[data-delete]').addEventListener('click',(e)=>{
        e.preventDefault()
            displayitem.removeChild(item)
            removeitem(item)
            localst(todoitems)
            return todoitems.filter((item)=>item!=itemData)
    })
    
})
}
//Dom Maniplation
const displayTask=(todoitems)=>{
    displayitem.innerHTML=''
if(todoitems.length>0)
{
    todoitems.forEach((item)=>{
        displayitem.insertAdjacentHTML('beforeend',
        `
        <li class="list-group-item d-flex justify-content-between align-items-center">
                    <span class="dc" data-time=${item.date}>${item.name}</span>
                    <span>
                        <a href='#' data-delete><i class="fas fa-trash red"></i></a>
                        <a href='#' data-done><i class="fas fa-check green"></i></a>
                     </span>
                </li>
        `
        )
        handelItem(item);
    })
}
else
{
    displayitem.insertAdjacentHTML('beforeend',
    `
    <li class="list-group-item d-flex justify-content-between align-items-center">
                <span class="dc">no record found</span>
            </li>
    `
    )
}
}
//get dat from local storage
const getlocaldata=()=>{
    const todoStorage=localStorage.getItem('todoTask')
    if(todoStorage===undefined|| todoStorage===null)
    {
        todoitems=[]
    }
    else
    {
        todoitems=JSON.parse(todoStorage)
    }
    displayTask(todoitems)
}
//local storage function
const localst=(todoarray)=>{
    localStorage.setItem('todoTask',JSON.stringify(todoarray))
}
//loading dom content adding event listners
document.addEventListener('DOMContentLoaded',()=>{
    formdata.addEventListener('submit',(e)=>{
        e.preventDefault()//when page refresh content remains
        const itemname=inputitem.value.trim()
        if(itemname.length==0)
        {
            alert('Enter Your Task')
        }
        else{
            const itemobj={
                name:itemname,
                isDone:false,
                date:new Date().getTime(),
            }
            todoitems.push(itemobj)//array of objects
            localst(todoitems)           
        }
        getlocaldata()
    })
   //loads local storage data    
    getlocaldata()
//filter tabs mean todo completed
filteritem.forEach((tab)=>{
    tab.addEventListener('click',(e)=>{
        e.preventDefault()
        const tabtype=tab.getAttribute('data-type')
        document.querySelectorAll('.nav-link').forEach((nav)=>{
            nav.classList.remove('active')
        })
        tab.firstElementChild.classList.add('active')
        getfilteritem(tabtype)
        document.querySelector('#tabvalue').value=tabtype    
    })
}) 
//end of filter section
})

