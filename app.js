const app = Vue.createApp({
    data(){
        return {        
            firstName: 'Krishna',
            lastName: 'Vishwakarma',
            username: 'krishna_vishwakarma',
            password: 'kejknmm_mndbhf',
            gender: "male",
            dob: "15/12/1995",
            location: 'MP, India',
            email: "brad.gibson@example.com",
            phone: "011-962-7516",
            picture: "https://randomuser.me/api/portraits/men/75.jpg"            
        }
    },
    methods: {
        async getNewUser(){
            const response = await fetch('https://randomuser.me/api/');
            // console.log(response);
            if(response && response.status){
                const data = await response.json();
                // console.log(data);
                const user = data.results[0];
                this.firstName = user?.name?.first;
                this.lastName = user?.name?.last;
                this.username = user?.login?.username;
                this.password = user?.login?.password;
                this.gender = user?.gender;
                const date = new Date(user?.dob?.date);
                this.dob = `${date.getDate()}/${(date.getMonth()+1)}/${date.getFullYear()}`;
                this.location = user?.location?.city + ", " + user?.location?.state;
                this.email = user?.email;
                this.phone = user?.phone;
                this.picture = user?.picture?.large;
            }else{
                alert('Something went wrong!');
            }
        }          
    }
})

app.component('Sidebar', {    
    template: `
        <aside class="sidebar">
            <div style="padding: 30px;">
                <img :src="picture" class="userPicture" :class="gender" />
                <h2 class="fullname" style="margin-top: 30px;">{{firstName}} {{lastName}}</h2>
                <h5 style="color: #929299;">{{ username }}</h5>
            </div>
            <ul>
                <li>
                    <span class="d-inline-block" style="margin-right: 10px;">
                        <i :class="gender === 'male' ? 'fa fa-mars' : 'fa fa-venus'"></i>
                    </span>
                    <span style="text-transform: capitalize;">{{gender}}</span>
                </li>
                <li>
                    <span class="d-inline-block" style="margin-right: 10px;">
                        <i class="fa fa-birthday-cake"></i>
                    </span>
                    <span>{{dob}}</span>
                </li>
                <li :title="location">
                    <span class="d-inline-block" style="margin-right: 10px;">
                        <i class="fa fa-map-marker"></i>
                    </span>
                    <span>{{location}}</span>
                </li>
                <li :title="email">
                    <span class="d-inline-block" style="margin-right: 10px;">
                        <i class="fa fa-envelope-o"></i>
                    </span>
                    <span>{{email}}</span>
                </li>
                <li>
                    <span class="d-inline-block" style="margin-right: 10px;">
                        <i class="fa fa-phone"></i>
                    </span>
                    <span>{{phone}}</span>
                </li>
            </ul>
            <button type="button" style="margin-left: 30px;margin-top: 30px;" @click="fetchRandomUser">Get Random User</button>
        </aside>
    `,
    props: ['firstName', 'lastName', 'username', 'password', 'gender', 'dob', 'location', 'email', 'phone', 'picture'],
    methods: {
        fetchRandomUser(){
            this.$emit('created')
        }
    }
});

app.component('MainContainer', {
    props: ['firstName','username', 'password'],
    template: `
        <main class="mainContainer">
            <h1 style="margin-bottom: 25px;">Hello, {{firstName}}! Welcome to Vue.JS World!</h1>
            <div class="d-flex flex-column" style="justify-content: center;align-items: center;">
                <img src="./assets/logo.svg" width="100" style="margin-bottom: 12px;" />
                <span class="d-flex" style="font-size: 24px;font-weight:300;">Vue.JS</span>
            </div>
            <form>
                <div class="group">                            
                    <label for="username">Username</label>
                    <input id="username" placeholder="Username" type="text" class="input" v-model="username">
                </div>
                <div class="group">
                    
                    <label for="password">Password</label>
                    <input id="password" placeholder="Password" :type="show ? 'text' : 'password'" class="input" 
                    v-model="password">
                    <span class="password-protection" @click="togglePassword">
                        <i class="fa" :class="show ? 'fa-eye' : 'fa-eye-slash' "></i>
                    </span>
                </div>
                <button type="submit" class="form-button"> I'M READY TO LEARN </button>
            </form>
        </main>    
    `,
    data(){
        return{           
            show: false
        }
    },

    methods: {
        togglePassword(){
            this.show = !this.show;
        }
    }
})

app.mount('#app');