import{S as f}from"./assets/vendor-870f0eb5.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const s of a.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function r(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(t){if(t.ep)return;t.ep=!0;const a=r(t);fetch(t.href,a)}})();let i,l=1;const m="41856148-e541297002e84807a45dae6d1",h=document.getElementById("search-form"),y=document.getElementById("search-input"),c=document.getElementById("gallery"),d=document.getElementById("load-more-button");h.addEventListener("submit",function(e){e.preventDefault();const o=y.value.trim();I(),l=1,g(o,m)});d.addEventListener("click",function(){l++;const e=y.value.trim();g(e,m)});document.addEventListener("DOMContentLoaded",function(){p()});c.addEventListener("click",function(e){e.target.tagName==="IMG"&&i&&E(e.target)});c.addEventListener("mouseenter",function(e){e.target.tagName==="IMG"&&(e.target.style.transform="scale(1.1)",document.body.style.cursor="pointer")});c.addEventListener("mouseleave",function(e){e.target.tagName==="IMG"&&(e.target.style.transform="scale(1)",document.body.style.cursor="auto")});function p(){i=new f(".gallery a",{captionsData:"alt",captionDelay:250,widthRatio:.9,heightRatio:.9,scaleImageToRatio:!0}),document.addEventListener("keydown",function(e){e.key==="Escape"&&i&&i.visible&&i.close()})}function E(e){const o=document.querySelectorAll(".gallery img"),r=Array.from(o).map(t=>({src:t.src,title:t.alt})),n=Array.from(o).indexOf(e);i.open({elements:r,startIndex:n})}async function g(e,o){const r=`https://pixabay.com/api/?key=${o}&q=${e}&image_type=photo&orientation=horizontal&safesearch=true&page=${l}&per_page=40`;L();try{const n=await fetch(r).then(t=>t.json());u(),n.hits.length===0?b():(v(n.hits),x())}catch(n){console.error("Error fetching data:",n),u(),displayErrorMessage("An error occurred while fetching data. Please try again.")}}function L(){if(!document.querySelector(".loading-indicator")){const o=document.createElement("div");o.className="loading-indicator",o.innerText="Loading...",document.body.appendChild(o)}}function u(){const e=document.querySelector(".loading-indicator");e&&e.remove()}function I(){for(;c.firstChild;)c.removeChild(c.firstChild)}function b(){const e=document.createElement("div");e.className="toast-container";const o=document.createElement("span");o.className="decorative-icon",o.innerHTML="&#9737;";const r=document.createElement("p");r.innerText="Sorry, there are no images matching your search query. Please, try again!";const n=document.createElement("span");n.className="close-button",n.innerHTML="&times;",e.appendChild(o),e.appendChild(r),e.appendChild(n),document.body.appendChild(e),n.addEventListener("click",()=>{e.remove()}),w()}function v(e){const o=document.createDocumentFragment();e.forEach(r=>{const n=document.createElement("a");n.href=r.webformatURL;const t=document.createElement("img");t.src=r.webformatURL,t.alt=r.tags,n.style.width="calc((100% - 32px) / 3)",n.style.height="auto",t.style.width="100%",t.style.height="100%",n.style.marginBottom="16px",n.style.display="block",n.appendChild(t),o.appendChild(n)}),c.appendChild(o),i&&i.refresh()}function x(){d.style.display="block"}function w(){d.style.display="none"}const C=document.querySelectorAll(".gallery img");C.forEach(e=>{e.style.width="calc((100% - 32px) / 3)",e.style.height="auto",e.style.marginBottom="16px"});const M=document.querySelectorAll(".gallery a");M.forEach(e=>{e.style.width="calc((100% - 32px) / 3)",e.style.height="auto",e.style.marginBottom="16px"});
//# sourceMappingURL=commonHelpers.js.map
