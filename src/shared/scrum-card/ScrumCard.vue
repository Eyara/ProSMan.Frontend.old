<template>
  <div class="scrum-block">
    <div class="scrum-card" v-for="card in cards" :key="card.id">
      <div class="scrum-header">
        <div>{{card.name}}</div>
        <div>
          <md-icon class="scrum-icon">web</md-icon>
        </div>
      </div>
      <div @click="emitClick(card)" class="scrum-main">
        <md-icon class="scrum-icon scrum-main-icon">web</md-icon>
      </div>
      <div class="scrum-actions-panel">
        <div>
          <md-icon class="scrum-icon">web</md-icon>
        </div>
        <div class="scrum-actions">
          <div @click="emitEdit(card)">
            <md-icon class="scrum-icon">edit</md-icon>
          </div>
          <div @click="emitDelete(card.id)">
            <md-icon class="scrum-icon">delete</md-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "scrum-card",

  data() {
    return {};
  },

  props: {
    cards: Array
  },

  methods: {
    emitClick(card) {
      this.$emit("click", card);
    },

    emitEdit(card) {
      this.$emit("edit", card);
    },

    emitDelete(id) {
      this.$emit("delete", id);
    }
  }
};
</script>

<style lang="scss" scoped>
.scrum-block {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.scrum-card {
  display: flex;
  flex-direction: column;
  height: 320px;
  width: 240px;
  background-color: #3a9ad9;
  border-radius: 5px;
  margin-right: 15px;
  margin-bottom: 15px;
  cursor: pointer;
}

.scrum-header {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  padding: 0 18px;
  color: white;
  font-size: 18px;

  div {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.scrum-main {
  display: flex;
  flex: 1;
}

.scrum-actions-panel {
  display: flex;
  padding: 0 18px;
  margin-bottom: 15px;
  justify-content: space-between;
}

.scrum-icon {
  color: white !important;
}

.scrum-main-icon {
  font-size: 100px !important;
}

.scrum-actions {
  display: flex;
}

.scrum-actions > div > .scrum-icon {
  padding: 18px;
  background-color: rgba(256, 256, 256, 0.2);
  border-radius: 50%;
  margin-left: 5px;
}

.scrum-actions-panel > div > .scrum-icon {
  padding: 18px;
}

@media (max-width: 740px) {
  .scrum-card {
    height: 180px;
    width: 120px;
    margin-right: 5px;
    margin-bottom: 5px;
  }

  .scrum-header {
    margin-top: 5px;
    font-size: 12px;
    padding: 0 12px;

    div {
      max-width: 75px;
    }
  }

  .scrum-icon {
    height: 8px;
    width: 8px;
    font-size: 18px !important;
  }

  .scrum-main-icon {
    font-size: 50px !important;
  }

  .scrum-actions-panel {
    padding: 0 12px;
  }

  .scrum-actions > div > .scrum-icon {
    padding: 12px;
  }

  .scrum-actions-panel > div > .scrum-icon {
    padding: 12px;
  }
}
</style>
