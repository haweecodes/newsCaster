<template>
  <v-app>
    <v-navigation-drawer clipped fixed v-model="drawer" app dark >
               <v-list>
                 <v-list-tile @click="callAll">
                <v-list-tile-action>
                      <v-icon>language</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>All</v-list-tile-title>
                    </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="callCategory('sports')">
                <v-list-tile-action>
                      <v-icon>directions_bike</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Sports</v-list-tile-title>
                    </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="callCategory('technology')">
                <v-list-tile-action>
                      <v-icon>computer</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>Technology</v-list-tile-title>
                    </v-list-tile-content>
            </v-list-tile>
          </v-list>>
      </v-navigation-drawer>
      <v-toolbar app fixed clipped-left dark>
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <v-toolbar-title>NewsCaster</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
           <v-spacer></v-spacer>
           <v-layout>
             <v-flex xs12>
            <v-text-field label="Search News" :rules="searchRules" append-icon="search" v-model="search" placeholder="Press Enter To Search" @keyup.enter="searchEntered(search)"></v-text-field>
             </v-flex>
           </v-layout>
            <!-- <v-menu>
           <v-btn icon slot="activator">
              <v-icon>language</v-icon>
            </v-btn>

        <v-list>
          <v-list-tile v-for="(item, i) in country" :key=i>
            <v-list-tile-content>asdsad</v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu> -->        
        </v-toolbar-items>
      </v-toolbar>

      <v-content>
      <v-container fluid grid-list-xs grid-list-sm grid-list-lg grid-list-md align-center>
        <v-layout v-if="isSearch">
          <v-flex xs12>
              <label for="">Searched for <i>{{search}}</i></label>
          </v-flex>
        </v-layout>
        <v-layout row wrap v-if="searched === false">
          <v-flex xs12 lg4 v-for="(item, i) in articles" :key=i >
             <v-card class="fullHeight">
              <v-card-media
                :src="item.urlToImage"
                height="200px"
              ></v-card-media>

              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0" ><a :href="item.url" class="headlineDecoration">{{item.title}}</a> </h3>
                  <div>{{item.description}} - {{item.source.name}}</div>
                </div>
              </v-card-title>
                  <v-card-actions text-align="right">
                <v-spacer></v-spacer>
                <v-btn flat color="orange" @click="item.url">View</v-btn>
                <v-btn flat color="orange">Share</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
        <v-layout v-else row wrap>
            <v-flex xs4></v-flex>
            <v-flex xs4 class="progress">
              <v-progress-circular
                :size="100"
                :width="7"
                color="purple"
                indeterminate
              ></v-progress-circular>
            </v-flex>
        </v-layout>
      </v-container>
      </v-content>

  </v-app>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      articles: [],
      country: [],
      search: "",
      searched: false,
      drawer: true,
      isSearch: false,
      searchRules: [
          v => !!v || 'Search cannot be empty'
      ]
    };
  },
  beforeCreate() {
    let vue = this;
    this.$store.dispatch("getNews").then(function(response) {
      vue.articles = response.articles;
      vue.articles.forEach(element => {
        if (element.urlToImage === null) {
          element.urlToImage =
            "https://vignette.wikia.nocookie.net/simpsons/images/6/60/No_Image_Available.png/revision/20170219125728";
        }
      });
    });
  },
  methods: {
    searchEntered(keyword) {
      
      let vue = this;
      

      if (keyword === "") {
        return this.searchRules = 'Search cannot be empty'
      } else {
        this.searched = true;
             this.isSearch = true;
        this.$store.dispatch("getAllNews", keyword).then(function(response) {
          vue.articles = response.articles;
          vue.articles.forEach(element => {
            if (element.urlToImage === null) {
              element.urlToImage =
                "https://vignette.wikia.nocookie.net/simpsons/images/6/60/No_Image_Available.png/revision/20170219125728";
            }
          });
          vue.searched = false;
        });
      }
    },
    callCategory(keyword) {
      this.search = "";
      this.isSearch = false;
      let vue = this;
      this.searched = true;
      this.$store.dispatch("getCategory", keyword).then(function(response) {
        vue.articles = response.articles;
        vue.articles.forEach(element => {
          if (element.urlToImage === null) {
            element.urlToImage =
              "https://vignette.wikia.nocookie.net/simpsons/images/6/60/No_Image_Available.png/revision/20170219125728";
          }
        });
        vue.searched = false;
      });
    },
    callAll() {
      this.search = "";
      this.isSearch = false;
      let vue = this;
      this.$store.dispatch("getNews").then(function(response) {
        vue.articles = response.articles;
        vue.articles.forEach(element => {
          if (element.urlToImage === null) {
            element.urlToImage =
              "https://vignette.wikia.nocookie.net/simpsons/images/6/60/No_Image_Available.png/revision/20170219125728";
          }
        });
      });
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.toolbarIcon {
}
.headlineDecoration {
  text-decoration: none;
  color: black;
}
.headlineDecoration:hover {
  color: rgb(255, 0, 55);
}
.progress {
  text-align: center;
}
.fullHeight {
  height: 100% !important;
}
</style>
