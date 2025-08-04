const xhr = new XMLHttpRequest();

const submitBtn = document.getElementById('submit-btn');
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const formData = new FormData(contactForm);
    const data = {};
    for (const [key, value] of formData){
        data[key] = value;
    }
    strData = `Name: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}\n\n ${data.desc}`;
    xhr.open('POST', '/php/contact.php', true);
    xhr.onload = ()=>{
        if (xhr.status === 200) {
            contactForm.reset();
            submitBtn.classList.replace('bg-sky-400', 'bg-green-600');
            submitBtn.textContent = 'Thanku!';
            // window.open(`https://wa.me/9220775711?text=${encodeURIComponent(strData)}`, '_blank');
        } else {
            console.error(xhr.status);
        }
    };
    xhr.send(formData);
});