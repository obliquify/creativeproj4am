<template>
  <div class="thought">
    <div class="addThought">
      <form v-on:submit="addThought">
        <div class="form-group">
          <label>Enter Your Name :)</label>
          <input v-model="name" type="text" class="form-control" placeholder="月亮" />
          <label for="exampleFormControlTextarea1">Formulate Comment</label>
          <textarea
            v-model="thought"
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="10"
            placeholder="Type here..."
          ></textarea>
          <input type="submit" class="btn" />
        </div>
      </form>
    </div>

    <div class="displayThoughts">
      <h1>Thought Stream</h1>
      <div v-for="thought in thoughts" :key="thought._id">
        <h2 class="name">{{thought.name}}</h2>
        <p class="thought">{{thought.thought}}</p>
        <h3 class="date">{{thought.date}}</h3>
        <button class="remove" @click="deleteThought(thought)">Remove</button>
        
        <hr>
      </div>
    </div>
    <div class="clr"></div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Thought",

  data() {
    return {
      name: "",
      thought: "",
      thoughts: [],
      findThought: null,
    };
  },

  created() {
    this.getThoughts();
  },

  methods: {
    async addThought(e) {
      e.preventDefault();
      //   let newThought = {
      //       name: this.thought.name,
      //       thought: this.thought.thought,
      //   };
      //   this.thought.push(newThought);
      // alert(this.name + "  " + this.thought);
      try {
        const res = await axios.post("/api/thoughts", {
          name: this.name,
          thought: this.thought,
        });

        const data = res.data;
        console.log(data);
        this.getThoughts();
      } catch (e) {
        console.log(e);
      }
    },

    async getThoughts() {
      try {
        let res = await axios.get("/api/thoughts");
        this.thoughts = res.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteThought(thought) {
      console.log("delete thought");
      try {
        await axios.delete("/api/thoughts/" + thought._id);
        this.findThought = null;
        this.getThoughts();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.thought {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}
.btn {
  margin-top: 30px;
  padding: 10px;
}
.addThought {
  background-color: rgb(195, 218, 195, 0.5);
  padding: 30px;
  margin-top: 60px;
  margin-bottom: 60px;
  width: 300px;
  border-radius: 50px;
}

.form-group label {
  font-size: 30px;
  padding: 0 20px 20px 20px;
}

.displayThoughts {
  display: flex;
  flex-direction: column;
  margin: 60px 0px 60px 100px;
  padding: 0px 40px 40px 40px;
  background-color: rgba(210, 203, 203, 0.5);
  border-radius: 30px 70px;
}

.displayThoughts h1 {
  font-size: 30px;
  padding: 30px 0px 30px 0px;
}
.displayThoughts .name {
  font-size: 20px;
}

.displayThoughts .thought {
  padding-bottom: 20px;
  font-family: Arial, Helvetica, sans-serif;
}

.displayThoughts .date {
  font-size: 15px;
  font-style: italic;
  padding-bottom: 20px;
  /* border: 7px solid red; */
}

.remove {
  padding: 5px;
  margin-bottom: 15px;
  font-size: 12px;
  border-radius: 10px;
}

clr {
  clear: both;
}
</style>