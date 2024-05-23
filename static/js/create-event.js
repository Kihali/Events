document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.querySelector('.submit-btn');
    const physicalBtn = document.querySelector('#physical-btn');
    const virtualBtn = document.querySelector('#virtual-btn');

    let isPhysical = false;
    let isVirtual = false;

    // physicalBtn.addEventListener('click', () => {
    //     isPhysical = true;
    //     isVirtual = false;

    //     physicalBtn.classList.remove('sec-btn');
    //     physicalBtn.classList.add('pry-btn')

    //     // Reset the other button's style
    //     virtualBtn.classList.remove('pry-btn');
    //     virtualBtn.classList.add('sec-btn');
    // });

    // virtualBtn.addEventListener('click', () => {
    //     isVirtual = true;
    //     isPhysical = false;

    //     virtualBtn.classList.remove('sec-btn');
    //     virtualBtn.classList.add('pry-btn')

    //     // Reset the other button's style
    //     physicalBtn.classList.remove('pry-btn');
    //     physicalBtn.classList.add('sec-btn');
    // });

    submitBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        const form = document.querySelector('#create-event-form');
        const formData = new FormData(form);

        if (isPhysical) {
            formData.append('location', document.querySelector('#location-input').value);
        } else {
            formData.append('location', '');
        }

        if (isVirtual) {
            formData.append('link', document.querySelector('#link-input').value);
        } else {
            formData.append('link', '');
        }

        try {
            const response = await fetch('http://localhost:8000/api/events/create-event', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });

            const data = await response.json();
            console.log(data);
            // Handle the response data as needed

        } catch (err) {
            console.error('Error creating event:', err);
        }
    });
});