
document.querySelectorAll('nav a').forEach((link) => {
  link.addEventListener('click', (event) => {
    
    document.querySelectorAll('aside .container > div').forEach((div) => {
      div.classList.add('hidden');
    });
    

    
    const section = document.querySelector(`aside .container > .${event.target.dataset.section}`);
    if (section) {
      section.classList.remove('hidden');
    }
  });
});

document.querySelectorAll('aside a').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();

    
    document.querySelectorAll('main div').forEach((div) => {
      div.classList.add('hidden');
    });

    
    const section = document.querySelector(`main .${event.target.textContent}`);
    if (section) {
      section.classList.remove('hidden');
    }
    if(event.target.textContent === "Early-albums" || event.target.textContent === "Later-albums" || event.target.textContent === "Last-albums"){
      fetch(`http://localhost:5500/${event.target.textContent.replace(' ', '-')}`, {
        method: 'POST',
       
      })
      .then( res => console.log(res))
      .then(data =>{          
        
        const h1 = document.createElement('h1');
        h1.textContent = data; 
        section.appendChild(h1);
      
      });
    
    }

  });
});

