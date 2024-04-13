<template>
  <b-container>
    <b-row>
      <b-col>
        <BaseH1>LeadHit</BaseH1>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-form @submit.prevent="onSubmit()">
          <b-form-group
            id="input-group-1"
            label="Id сайта:"
            label-for="input-site-id"
          >
            <b-form-input
              id="input-site-id"
              v-model="form.siteId.value"
              type="text"
              placeholder="id сайта"
              @focus="setFocusInputSiteId(true)"
              @blur="setFocusInputSiteId(false)"
              :state="state"
              required
            ></b-form-input>
            <b-form-invalid-feedback v-if="form.siteId.errors">
              <ul>
                <li v-for="error in form.siteId.errors" :key="error">
                  {{ error }}
                </li>
              </ul>
            </b-form-invalid-feedback>
          </b-form-group>
          <b-button type="submit" variant="primary" :disabled="buttonDisabled">
            Войти
          </b-button>
        </b-form>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";

import BaseH1 from "@/components/BaseH1.vue";

export default {
  name: "AuthorizationView",
  components: {
    BaseH1,
  },
  data() {
    return {
      form: {
        siteId: {
          value: "",
          isFocus: null,
          errors: [],
        },
      },
    };
  },
  watch: {
    "form.siteId.value": function (siteId) {
      this.form.siteId.errors = [];
      if (siteId.length !== 24) {
        this.form.siteId.errors.push("id сайта должен содержать 24 символа");
      }
    },
  },
  computed: {
    state() {
      if (
        this.form.siteId.isFocus === null ||
        (this.form.siteId.isFocus === true && this.form.siteId.errors.length)
      ) {
        return null;
      }
      if (
        this.form.siteId.isFocus === true &&
        !this.form.siteId.errors.length
      ) {
        return true;
      }
      return Boolean(!this.form.siteId.errors.length);
    },
    buttonDisabled() {
      return Boolean(this.form.siteId.errors.length);
    },
  },
  methods: {
    ...mapActions("user", ["login"]),
    async onSubmit() {
      const errorSever = await this.login(this.form.siteId.value);
      if (errorSever) {
        this.form.siteId.errors.push(errorSever);
      } else {
        this.$router.push({ name: "analytics" });
      }
    },
    setFocusInputSiteId(isFocus) {
      this.form.siteId.isFocus = isFocus;
    },
  },
};
</script>
