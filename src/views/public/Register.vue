<template>
    <div class="columns is-centered">
        <div class="column">
            <div class="card">
                <div class="card-header">
                    <p class="card-header-title">Register</p>
                </div>
                <div class="card-content">
                    <div class="content">

                        <form @submit.prevent="register">

                        <div class="field">
                            <label class="label" id="ordor-register-venueName-label">Venue name</label>
                            <div class="control">
                                <input v-model="registrationData.venueName" class="input"
                                       aria-describedby="ordor-register-venueName-label" type="text"
                                       aria-label="Venue name">
                            </div>
                        </div>

                        <div class="field ">
                            <label class="label" id="ordor-register-name-label">Name</label>
                            <div class="field-body is-horizontal">
                                <div class="field">
                                    <p class="control">
                                        <input aria-label="ordor-register-name-label" class="input" type="text"
                                               placeholder="First name" v-model="registrationData.userName.firstName"/>
                                    </p>
                                </div>
                                <div class="field">
                                    <p class="control">
                                        <input aria-label="ordor-register-name-label" class="input" type="text"
                                               placeholder="Last name" v-model="registrationData.userName.lastName">
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="field">
                            <label class="label" id="ordor-register-emailAddress-label">Email address</label>
                            <div class="control">
                                <input v-model="registrationData.emailAddress" class="input"
                                       aria-describedby="ordor-register-emailAddress-label" type="email"
                                       aria-label="Email address">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label" id="ordor-register-password-label">Password</label>
                            <div class="control">
                                <input v-model="registrationData.password" class="input"
                                       aria-describedby="ordor-register-password-label" type="password"
                                       aria-label="Password">
                            </div>
                        </div>

                        <div class="field">
                            <label class="label" id="ordor-register-confirmPassword-label">Confirm password</label>
                            <div class="control">
                                <input v-model="registrationData.confirmPassword" class="input"
                                       aria-describedby="ordor-register-confirmPassword-label" type="password"
                                       aria-label="Confirm Password">
                            </div>
                        </div>

                        <input type="submit" class="button is-success" value="Register"/>

                        </form>

                    </div>
                </div>
                <div class="card-footer">
                    <p class="card-footer-item">
                        Click&nbsp;<router-link :to="{name: 'Login'}">here</router-link>&nbsp; to login.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import axios from "axios"

    export default {
        name: "Register",
        data() {
            return {
                registrationData: {
                    userName: {
                        firstName: undefined,
                        lastName: undefined
                    },
                    venueName: undefined,
                    emailAddress: undefined,
                    password: undefined,
                    confirmPassword: undefined
                }
            }
        },
        methods: {
            async register() {
                const feedback = await axios.post("/register", this.registrationData)

                console.log("Feedback", feedback)

                console.log(this);

                if (feedback.data.successful) {
                    this.$notify({
                        title: "Registered",
                        text: feedback.data.message,
                        type: "success"
                    })

                    this.$router.push("/login")
                } else {
                    this.$notify({
                        title: "Registration failed",
                        text: feedback.data.message,
                        type: "error"
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>
