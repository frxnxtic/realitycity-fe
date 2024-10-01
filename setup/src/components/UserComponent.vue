<template>
    <div ref="download">
        <header>
            <div class="header-text">
                <h1>Realicity</h1>
                <h2>Reality & Financie</h2>
            </div>
        </header>

        <div class="container">
            <div class="user">
                <div class="header-img">
                    <img :src="user.photo_url" alt="1724682873955" border="0">
                </div>
                <h2>{{ user.first_name }} {{ user.last_name }} </h2>
                <p class="position">{{ user.position }}</p>
                <!-- мне нужно создать 4 кнопки полукругом с разными иконками -->
                <div class="buttons" ref="lol">
                    <button class="btn" @click="downloadPDF"><i class="fas fa-download"></i></button>
                    <a href="https://realicity.sk/" target="_blank"><button class="btn"><i
                                class="fas fa-globe"></i></button></a>
                    <div>
                        <button @click="isPopupVisible = true" class="btn"><i class="fas fa-qrcode"></i></button>
                        <div v-if="isPopupVisible" class="popup">
                            <div class="popup-content">
                                <span class="close" @click="isPopupVisible = false">&times;</span>
                                <h3>Scan QR Code</h3>
                                <qrcode-canvas :value="url"></qrcode-canvas>
                                <p>{{ url }}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button @click="isSharePopupVisible = true" class="btn"><i class="fas fa-share"></i></button>
                        <div v-if="isSharePopupVisible" class="share-popup">
                            <div class="share-popup-content">
                                <span class="close" @click="isSharePopupVisible = false">&times;</span>
                                <h3>Copy link</h3>
                                <textarea>{{ url }}</textarea>
                                <br>
                                <button @click="copyToClipboard"><i class="fas fa-copy"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
                <ul class="custom-list">
                    <li><i class="fas fa-envelope special"></i>{{ user.email }}</li>
                    <li><i class="fas fa-phone special"></i> {{ user.phone }}</li>
                    <li><i class="fas fa-map special" </i> {{ user.address }}</li>
                </ul>
            </div>
            <footer>
                <p>© 2024 Realicity</p>
            </footer>
        </div>
    </div>
</template>

<script>
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import html2pdf from 'html2pdf.js';
import axios from 'axios'
import QRCodeVue, { QrcodeCanvas } from 'qrcode.vue';
import Qrcode from 'qrcode.vue';

export default {
    data() {
        return {
            user: {},
            isPopupVisible: false,
            isSharePopupVisible: false,
            url: window.location.href,
        }
    },

    watch: {
        '$route.params.id': 'fetchUser'
    },

    mounted() {
        this.fetchUser()
    },

    methods: {
        fetchUser() {
            const id = this.$route.params.id;
            axios.get('http://localhost:3000/api/realtors/' + id)
                .then(response => {
                    this.user = response.data
                    console.log(response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        async downloadPDF() {
            const element = this.$refs.download; // Reference to the template content

            // Check if the element is defined
            if (!element || element === this.$refs.lol) {
                alert('Content to print is not available!');
                return;
            }

            const userName = this.user.first_name; // Full name (e.g., "John Doe")
            const userSurname = this.user.last_name; // Extract surname (e.g., "Doe")
            const userInitial = userName.charAt(0).toLowerCase(); // First letter of the name (e.g., "j")

            // Create the PDF filename based on initials and surname
            const pdfFilename = `${userInitial}${userSurname}.pdf`; // Example: "jdoe.pdf"
            const options = {
                margin: 0,
                filename: pdfFilename,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 4, useCORS: true },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
            };

            console.log('Downloading PDF...');
            console.log('Options:', options);
            console.log('Element:', element);

            try {
                // Generate the PDF
                await html2pdf().from(element).set(options).save();
                alert('Your PDF is ready to download!');
            } catch (error) {
                console.error('Error generating PDF:', error);
                alert('Failed to generate PDF. Check the console for errors.');
            }
        },
        copyToClipboard() {
            navigator.clipboard.writeText(this.url).then(() => {
                alert('Link copied to clipboard!');
            }, () => {
                alert('Failed to copy link to clipboard!');
            });
        }
    },
    components: {
        'qrcode-canvas': QrcodeCanvas
    }
}



</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Dancing+Script:wght@400..700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
@import "../assets/main.css";

body {
    width: 100%;
}

.user {
    padding-bottom: 2.5rem;
    width: 100%;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    flex-direction: column;
    background-color: #1a1c23;
}

header {
    width: 100%;
    margin: 0 auto;
    padding: 2em;
    background-image: url("https://blenderartists.org/uploads/default/original/4X/6/9/2/692b2e29c5a043f7e2d510acd750003ad0fe13d2.jpeg");
    background-color: #fff;
    background-blend-mode: multiply;
    background-size: cover;
    color: white;
    padding: 1em;
    align-items: center;
    height: 50vh;
}

.buttons {
    padding: 2em;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4em;
    margin: 0 auto;
}

/* Стили для кнопок */
.btn {
    width: 60px;
    /* Устанавливаем ширину и высоту одинаковыми для создания круга */
    height: 60px;
    border-radius: 50%;
    /* Радиус круга */
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--orange);
    /* Цвет фона */
    color: white;
    /* Цвет иконки */
    border: none;
    font-size: 24px;
    /* Размер иконки */
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn:hover {
    background-color: rgb(135, 108, 83);
    ;
    /* Цвет фона при наведении */
}

.header-img {
    display: flex;
    justify-content: center;
    margin-top: -15em;
}

.header-img img {
    object-fit: cover;
    border-radius: 50%;
    width: 250px;
    height: 300px;
    border-width: 20px;
    border-color: rgba(255, 255, 255, 0.250);

}

header .header-text {
    color: white;
    text-align: center;
    display: block;
    margin: 0;
    height: fit-content;
}



header .header-text h1 {
    font-family: "Dm Serif Display", serif;
    font-size: 6em;
    margin-bottom: -0.8em;
}

header .header-text h2 {
    font-family: "Dancing Script", cursive;
    font-size: 4em;
    color: var(--orange);
    margin-top: 0px;
}

.container {
    font-family: "Inter", sans-serif;
    display: flex;
    justify-content: space-between;
    /* align-items: center; */
    text-align: center;
    margin: 0 auto;
    padding: 0;
    color: white;
    position: relative;
    min-height: 100vh;
}

.container .user h2 {
    font-size: 2.2em;
    margin: 0;
    padding: 0;
    font-weight: 500;
}

.container .user .position {
    font-size: 1.5em;
    margin: 0;
    padding: 0;
    font-weight: 500;
    color: var(--orange);
}


.custom-list {
    list-style: none;
    font-size: large;
}

.custom-list li {
    display: flex;
    align-items: center;
}

.custom-list li .special {
    margin-right: 20px;
    color: var(--orange);
}

footer {
    background-color: var(--orange);
    color: white;
    text-align: center;
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.popup {
    color: black;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

/* Popup content */
.popup-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    position: relative;
}

.share-popup {
    color: black;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

/* Popup content */
.share-popup-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    position: relative;

}

/* Close button */
.close {
    position: absolute;
    top: 10px;
    right: 20px;
    font-size: 30px;
    cursor: pointer;
}
</style>