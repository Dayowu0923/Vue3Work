<template>
  <div class="main-header" style="height: 50px" v-if="$route.name !== 'login'">
    <!-- Logo Header -->
    <div class="logo-header" data-background-color="blue">
      <a href="login" class="logo"> 臺中清潔車車輛管理 </a>
      <button
        class="navbar-toggler sidenav-toggler ml-auto"
        type="button"
        data-toggle="collapse"
        data-target="collapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon">
          <i class="fas fa-bars"></i>
        </span>
      </button>
      <div class="nav-toggle">
        <button class="btn btn-toggle toggle-sidebar">
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </div>
    <!-- End Logo Header -->

    <!-- Navbar Header -->
    <nav class="navbar navbar-header navbar-expand-lg">
      <div class="container-fluid">
        <div class="w-100 text-right">
          <a href="#" @click="getInfor" class="btn btn-primary2 btn-round mr-2"
            ><i class="fas fa-home"></i><span> 回首頁</span></a
          >
          <a href="#" @click="logout" class="btn btn-primary2 btn-round"
            ><i class="fas fa-sign-in-alt"></i><span> 登出</span></a
          >
        </div>
      </div>
    </nav>
    <!-- End Navbar -->
  </div>

  <!-- Sidebar -->
  <div class="sidebar" v-if="$route.name !== 'login'">
    <div class="sidebar-wrapper scrollbar scrollbar-inner">
      <div class="sidebar-content">
        <div class="user">
          <div class="float-left mr-1 ml-1">
            <i class="fas fa-user-circle text-dark fa-2x"></i>
          </div>
          <div class="info">
            <a
              data-toggle="collapse"
              href="#collapseExample"
              aria-expanded="true"
            >
              <span> 系統維護工程師 </span><br /><span class="user-level"
                >(清潔隊)</span
              >
              <span class="caret"></span>
            </a>
            <div class="clearfix mb-1"></div>
            <div class="collapse show bulletin" id="collapseExample"></div>
          </div>
        </div>

        <ul class="nav nav-primary">
          <li class="nav-item">
            <a href="/home">
              <i class="fas fa-tachometer-alt"></i>
              <p>首頁</p></a
            >
          </li>

          <li class="nav-item" v-for="(item, index) in mainFilter" :key="index">
            <a data-toggle="collapse" :href="'#' + item.menuPath">
              <i :class="item.menuIcon"></i>
              <p>{{ item.menu }}</p>
              <span class="caret"></span>
            </a>
            <div
              :class="{ collapse: true, show: item.menuId === getActMenu }"
              :id="item.menuPath"
            >
              <ul class="nav nav-collapse">
                <li
                  v-for="(itemsub, index) in subFilter(item.menuId)"
                  :key="index"
                  :class="{ active: itemsub.menuPath === this.$route.name }"
                >
                  <router-link :to="'/' + itemsub.menuPath">{{
                    itemsub.menu
                  }}</router-link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>

  <router-view />
</template>

<style></style>

<script>
export default {
  data() {
    return {
      main: [],
      sub: [],
    };
  },
  methods: {
    logout() {
      this.$swal
        .fire({
          text: "您確定是否登出嗎",
          icon: "question",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "確定",
          cancelButtonText: "取消",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$store.commit("UserChkNone");
            this.$router.push({ name: "login" });
          }
        });
    },
  },
  computed: {
    mainFilter() {
      return this.$store.state.mainPer == "" ? "" : this.$store.state.mainPer;
    },
    subFilter() {
      return (id) => {
        let arr = this.$store.state.subPer;
        if (arr.length != 0) {
          arr = arr.filter((item) => item.menuLastId === id);
        }
        return arr;
      };
    },
    getActMenu() {
      let result = this.$store.state.subPer.find(
        (item) => item.menuPath === this.$route.name
      );
      return result === undefined ? "" : result.menuLastId;
    },
  },
  mounted() {},
};
</script>
