<template>
  <transition name="transition-fade" mode="out-in">
    <article v-if="['unknown', 'not_authorized'].includes(user.status)" key="user-not-connected">
      <button @click="logIn" class="vk-btn vk-btn_center">Log In</button>
    </article>
    <article v-else-if="user.status === 'connected'" key="user-connected" class="vk-container">
      <section class="vk-section vk-section_center">
        <img v-if="user.photo" :src="user.photo" alt="User Photo" class="vk-photo vk-section-item">
        <p v-if="user.first_name || user.last_name" class="vk-section-item">{{ user.first_name }} {{ user.last_name }}</p>
        <p class="vk-section-item">Friends Count: {{ user.friendsCount }}</p>
        <button @click="logOut" class="vk-btn vk-section-item">Log Out</button>
      </section>
      <section class="vk-section">
        <form class="vk-form vk-section-item">
          <label for="vk-input" class="vk-label">Search For Friends</label>
          <input id="vk-input" ref="input" type="text" v-model="searchInput" class="vk-input"/>
          <button @click.prevent="searchFriends" class="vk-btn">Search</button>
        </form>
        <p v-if="showError" class="vk-error vk-section-item">Type a name</p>
        <ul v-if="showFriends && friends.length > 0" class="vk-list vk-section-item">
          <li v-for="friend in friends" :key="`friend-${friend.id}`" class="vk-list__item">
            {{ friend.first_name }} {{ friend.last_name }}
          </li>
        </ul>
        <p v-else-if="showFriends" class="vk-section-item">No friends were found</p>
      </section>
    </article>
  </transition>
</template>

<script>
  const API_V = '5.89'

  export default {
    name: "VkApp",
    data() {
      return {
        showError: false,
        showFriends: false,
        searchInput: '',
        user: {
          id: '',
          status: '',
          first_name: '',
          last_name: '',
          photo: '',
          friendsCount: 0
        },
        friends: []
      }
    },
    watch: {
      searchInput(val) {
        if (this.showError) {
          this.showError = val.length === 0
        }
      }
    },
    created() {
      this.getLoginStatus()
    },
    methods: {
      getLoginStatus() {
        VK.Auth.getLoginStatus((res) => {
          this.user.status = res.status
          if (res.session) {
            this.user.id = res.session.mid
            this.getUserInfo()
          }
        })
      },
      logIn() {
        VK.Auth.login((res) => {
          if (res.session) {
            this.user.id = res.session.mid
            this.getUserInfo()
          }
        }, 2)
      },
      logOut() {
        VK.Auth.logout((res) => {
          this.user.status = res.status
          this.user.id = ''
          this.user.first_name = ''
          this.user.last_name = ''
          this.user.photo = ''
          this.user.friendsCount = 0
          this.user.friends = []
          this.showFriends = false
          this.showError = false
        })
      },
      getUserInfo() {
        VK.Api.call('users.get', {user_ids: this.user.id, fields: 'first_name,last_name,photo_200,counters', v: API_V}, (res) => {
          if (res.response && res.response[0]) {
            this.user.first_name = res.response[0].first_name
            this.user.last_name = res.response[0].last_name
            this.user.photo = res.response[0].photo_200
            this.user.friendsCount = res.response[0].counters.friends
            this.user.status = 'connected'
          }
        });
      },
      searchFriends() {
        if (!this.searchInput) {
          this.$refs.input.focus()
          this.showError = true
          this.showFriends = false
        } else {
          VK.Api.call('friends.search', {user_ids: this.user.id, q: this.searchInput, v: API_V}, (res) => {
            if (res.response) {
              this.friends = res.response.items
              this.showFriends = true
            }
          });
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
@import "src/scss/vars.scss";
@import "src/scss/mixins.scss";

$form-height: 40px;

.vk-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: $padding-md;
  padding: $padding-md $padding-md 60px;
  margin: 0 auto;

  @media (min-width: $breakpoint-desktop) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.vk-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &_center {
    align-items: center;
  }

  .vk-section-item {
    + .vk-section-item {
      margin-top: $padding-md;
    }
  }
}

.vk-photo {
  width: 200px;
  height: 200px;
  background-color: $color-grey-light;
  border-radius: 50%;
}

.vk-btn {
  height: $form-height;
  font-size: $font-size-base;
  color: $color-red;
  text-transform: uppercase;
  background-color: transparent;
  border: 1px solid $color-red;
  cursor: pointer;
  padding: $padding-sm $padding-md;

  &:hover {
    animation: glow 2s linear;
  }

  &_center {
    display: block;
    margin: 0 auto;
  }
}

.vk-form {
  width: 100%;

  @media (min-width: $breakpoint-desktop) {
    width: auto;
  }

  .vk-label {
    display: block;
    text-transform: uppercase;
    margin-bottom: $padding-sm;
  }

  .vk-input {
    width: 100%;
    height: $form-height;
    font-family: $font-family;
    font-size: $font-size-base;
    -webkit-appearance: none;
    border: 1px solid $color-red;
    padding: 0 $padding-sm;

    @media (min-width: $breakpoint-desktop) {
      width: 300px;
    }

    + .vk-btn {
      width: 100%;
      margin-top: $padding-md;

      @media (min-width: $breakpoint-desktop) {
        width: auto;
        margin-top: 0;
        margin-left: $padding-md;
      }
    }
  }
}

.vk-error {
  color: $color-red;
}

.vk-list {
  list-style: none;

  .vk-list__item {
    position: relative;
    padding-left: $padding-md;

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(0, -50%);
      width: 10px;
      height: 10px;
      background-color: $color-red;
      border-radius: 50%;
    }

    + .vk-list__item {
      margin-top: $padding-sm;
    }
  }
}
</style>