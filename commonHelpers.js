import{S as p,a as h,i as E}from"./assets/vendor-5adf70b8.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function r(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(t){if(t.ep)return;t.ep=!0;const a=r(t);fetch(t.href,a)}})();let i,l=1;const m="41856148-e541297002e84807a45dae6d1",L=document.getElementById("search-form"),g=document.getElementById("search-input"),c=document.getElementById("gallery"),d=document.getElementById("load-more-button");L.addEventListener("submit",function(e){e.preventDefault();const o=g.value.trim();x(),l=1,y(o,m)});d.addEventListener("click",function(){l++;const e=g.value.trim();y(e,m)});document.addEventListener("DOMContentLoaded",function(){I()});c.addEventListener("click",function(e){e.target.tagName==="IMG"&&i&&b(e.target)});c.addEventListener("mouseenter",function(e){e.target.tagName==="IMG"&&(e.target.style.transform="scale(1.1)",document.body.style.cursor="pointer")});c.addEventListener("mouseleave",function(e){e.target.tagName==="IMG"&&(e.target.style.transform="scale(1)",document.body.style.cursor="auto")});function I(){i=new p(".gallery a",{captionsData:"alt",captionDelay:250,widthRatio:.9,heightRatio:.9,scaleImageToRatio:!0}),document.addEventListener("keydown",function(e){e.key==="Escape"&&i&&i.visible&&i.close()})}function b(e){const o=document.querySelectorAll(".gallery img"),r=Array.from(o).map(t=>({src:t.src,title:t.alt})),n=Array.from(o).indexOf(e);i.open({elements:r,startIndex:n})}async function y(e,o){const r=`https://pixabay.com/api/?key=${o}&q=${e}&image_type=photo&orientation=horizontal&safesearch=true&page=${l}&per_page=40`;v();try{const t=(await h.get(r)).data;u(),t.hits.length===0?w():(M(t.hits),B())}catch(n){console.error("Error fetching data:",n),u(),C("An error occurred while fetching data. Please try again.")}}function v(){if(!document.querySelector(".loading-indicator")){const o=document.createElement("div");o.className="loading-indicator",o.innerText="Loading...",document.body.appendChild(o)}}function u(){const e=document.querySelector(".loading-indicator");e&&e.remove()}function x(){for(;c.firstChild;)c.removeChild(c.firstChild)}function w(){const e=document.createElement("div");e.className="toast-container";const o=document.createElement("span");o.className="decorative-icon",o.innerHTML="&#9737;";const r=document.createElement("p");r.innerText="Sorry, there are no images matching your search query. Please, try again!";const n=document.createElement("span");n.className="close-button",n.innerHTML="&times;",e.appendChild(o),e.appendChild(r),e.appendChild(n),document.body.appendChild(e),n.addEventListener("click",()=>{e.remove()}),f()}function C(e){E.error({title:"Error",message:e,position:"topRight",timeout:5e3}),f()}function M(e){const o=document.createDocumentFragment();e.forEach(r=>{const n=document.createElement("a");n.href=r.webformatURL;const t=document.createElement("img");t.src=r.webformatURL,t.alt=r.tags,n.style.width="calc((100% - 32px) / 3)",n.style.height="auto",t.style.width="100%",t.style.height="100%",n.style.marginBottom="16px",n.style.display="block",n.appendChild(t),o.appendChild(n)}),c.appendChild(o),i&&i.refresh()}function B(){d.style.display="block"}function f(){d.style.display="none"}const N=document.querySelectorAll(".gallery img");N.forEach(e=>{e.style.width="calc((100% - 32px) / 3)",e.style.height="auto",e.style.marginBottom="16px"});const S=document.querySelectorAll(".gallery a");S.forEach(e=>{e.style.width="calc((100% - 32px) / 3)",e.style.height="auto",e.style.marginBottom="16px"});
//# sourceMappingURL=commonHelpers.js.map