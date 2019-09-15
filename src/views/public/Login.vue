<template>
    <div class="columns is-centered">
        <div class="column">
            <section class="section">
                <div class="card">
                    <div class="card-header">
                        <p class="card-header-title">Login</p>
                    </div>
                    <div class="card-content">
                        <div class="content">

                            <form @submit.prevent="login">

                            <div class="field">
                                <label class="label" id="ordor-login-emailAddress-label">Email address</label>
                                <div class="control">
                                    <input v-model="loginData.emailAddress" class="input"
                                           aria-describedby="ordor-login-emailAddress-label" type="email"
                                           aria-label="Email address">
                                </div>
                            </div>

                            <div class="field">
                                <label class="label" id="ordor-login-password-label">Password</label>
                                <div class="control">
                                    <input v-model="loginData.password" class="input"
                                           aria-describedby="ordor-login-password-label" type="password"
                                           aria-label="Password">
                                </div>
                            </div>

                            <input type="submit" class="button is-success" value="Login"/>

                            </form>

                        </div>
                    </div>
                    <div class="card-footer">
                        <p class="card-footer-item">
                            Not having a venue yet? Create one&nbsp;<router-link :to="{name: 'Register'}">here
                        </router-link>
                            .
                        </p>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>

    import axios from 'axios';

    export default {
        name: "Login",
        data() {
            return {
                loginData: {
                    emailAddress: undefined,
                    password: undefined
                }
            }
        },
        methods: {
            async login() {
                const feedback = await axios.post("/backoffice/login", this.loginData);

                console.log(feedback);

                if (feedback.data.successful) {
                    this.$notify({
                        title: "Logged-in successfully",
                        text: feedback.data.message,
                        type: "success"
                    })

                    this.$cookies.set('token', feedback.data.data.token)

                    const venueData = await axios.get(`/venues`, {params: {token: feedback.data.data.token}})
                    const userData = await axios.get(`/venues/${venueData.data._id}/users`, {params: {token: feedback.data.data.token}})
                    console.log("VENUE DATA", venueData)
                    console.log("USER DATA", userData)

                    await this.$store.dispatch("loadVenue", venueData.data)
                    await this.$store.dispatch("loadUser", userData.data)

                    this.$router.push("/backoffice")
                } else {
                    this.$notify({
                        title: "Login failed",
                        text: feedback.data.message,
                        type: "error"
                    })


                    if (this.$cookies.isKey('token')) {
                        this.$cookies.remove('token')
                    }
                }
            }
        }
    }
</script>

<style scoped>

</style>
