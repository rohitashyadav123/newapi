const API_KEY="43dfe9fe7c4940608457ec376c9a136a";

const url ="https://newsapi.org/v2/everything?q=";


window.addEventListener('load',()=>fetchNews("India"));

function reload(){
    window.location.reload();
}
async function fetchNews(query)
{
    const res=await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data= await res.json();
    // console.log(data);
    bindData(data.articles);
}
function bindData(articles)
{
    const cardscontainer=document.getElementById('cards-container');
    const newscardtemplate=document.getElementById('tamplate-news-card');

    cardscontainer.innerHTML='';

    articles.forEach(article=>{
        if(!article.urlToImage)return;
        const cardClone=newscardtemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardscontainer.appendChild(cardClone);
    });
}



function fillDataInCard(cardClone,article)
{
    const newsImg=cardClone.querySelector('#news-img');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#news-source');
    const newsDesc=cardClone.querySelector('#news-desc');

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;
   
    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });

    newsSource.innerHTML=`${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
        
    });
}
let curSelectedNav=null;
function onNavItemClick(id)
{
    fetchNews(id);
    const navItem=document.getElementById(id);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=navItem;
    curSelectedNav.classList.add('active');
}
const searchButton=document.getElementById('search-button');
const searchText=document.getElementById('search-text');

searchButton.addEventListener('click',()=>{
    const query=searchText.value;
    if(!query)return;
    fetchNews(query);
    curSelectedNav?.classList.remove('active');
    curSelectedNav=null;
});