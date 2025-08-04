document.getElementById('navbar').innerHTML = 
    `
         <nav class="flex justify-between items-center text-lg mx-24">
            <div class="w-1/4 text-left text-3xl md:text-5xl lg:text-7xl font-bold text-white">&lt;/&gt;</div>
            <div class="w-1/2 hidden lg:block">
                <ul class="hidden md:flex gap-8 text-base justify-center items-center text-white">
                    <li>Home</li>
                    <li>Portfolio</li>
                    <li>Service</li>
                    <li>Team</li>
                </ul>
            </div>
            <div class="w-1/4 text-right hidden md:block">
                <button
                    class="w-32 border border-white text-white rounded-full p-1">Register</button>
            </div>
        </nav>
    `;
