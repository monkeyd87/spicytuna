

let isloading = false
let next = ''
const modal = document.querySelector('.modal')
const exit =  document.querySelector('.close')


exit.addEventListener('click',e=>{
    modal.style.display = 'none'
})
const handleScoll=()=>{
    if(window.innerHeight + window.scrollY >= document.documentElement.scrollHeight -1 && !isloading){
        getdata()
    }
}
window.addEventListener('scroll',handleScoll)
const getdata = async()=>{
    if(isloading) return
    try{
        isloading = true
        
        const res = await fetch('https://www.reddit.com/r/juicyasians.json?after='+next)
        console.log(next)

        const json = await res.json()
        console.log(json)
        const {after} = json.data
        
        next = after
        const data =  json.data.children
        // console.log(data)
        const posts  =  data.filter(item=>item.data.post_hint == 'image')
        console.log(posts)

        for(let post of posts){
            createCard(post)
        }

    }catch(err){
        console.log(err)
    }
    isloading = false
}   

function createCard(post){
    const container =  document.querySelector('.content')

    const card = document.createElement('div')
    card.setAttribute('class','card')

    const image = document.createElement('img')
    image.classList.add('img-card')
    image.setAttribute('data-url',post.data.url)
    image.setAttribute('data-author',post.data.author)
    image.src = post.data.thumbnail

    const cardContent = document.createElement('div')
    cardContent.setAttribute('class','card-content')

    


    // cardContent.append(image)
    card.appendChild(image)


    container.appendChild(card)
    
}
window.addEventListener('click',event=>{
    const {target} = event
    console.log(target)
    if(target.classList[0] == 'img-card'){
        modal.style.display = 'block'
        console.log(target.dataset.url)
        modal.querySelector('img').src = target.dataset.url
       modal.querySelector('h2').innerText = target.dataset.author
        modal.querySelector('h2').parentElement.href = `https://www.reddit.com/u/${target.dataset.author}`
    }
    if(event.target == modal){
        modal.style.display = 'none'
    }
})

getdata()