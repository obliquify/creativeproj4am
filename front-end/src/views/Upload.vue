<template>
  <div class="upload">
    <h1>Upload!</h1>
    <div class="heading">
      <div class="square">1</div>
      <h2>Deposit item :)</h2>
    </div>
    <div class="add">
      <div class="form">
        <h1>Give A Name</h1>
        <input v-model="title" placeholder="Name" />
        <p></p>
        <input type="file" name="photo" @change="fileChanged" />
        <button class="uploadie" @click="upload">Upload</button>
      </div>

      <div class="upload" v-if="addItem">
        <h2>{{addItem.title}}</h2>
        <h4>{{addItem.description}}</h4>
        <img :src="addItem.path" />
      </div>
    </div>

    <div class="descrip">
      <h1>Description</h1>
      <textarea v-model="description" placeholder="Start typing here..."></textarea>
    </div>

    <div class="heading">
      <div class="square">2</div>
      <h2>Edit/Delete an Item</h2>
    </div>

    <div class="edit">
      <div class="form">
        <input v-model="findTitle" placeholder="Search" />
        <div class="suggestions" v-if="suggestions.length > 0">
          <div
            class="suggestion"
            v-for="s in suggestions"
            :key="s.id"
            @click="selectItem(s)"
          >{{s.title}}</div>
        </div>
      </div>

      <div class="upload" v-if="findItem">
        <input class="title" v-model="findItem.title" />
        <input class="descrip" v-model="findItem.description" />
        <p></p>
        <img :src="findItem.path" />
      </div>

      <div class="actions" v-if="findItem">
        <button @click="deleteItem(findItem)">Delete</button>
        <button @click="editItem(findItem)">Edit</button>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
export default {
  name: "Upload",

  data() {
    return {
      title: "",
      file: null,
      addItem: null,
      items: [],
      findTitle: "",
      findItem: null,
      description: "",
    };
  },

  computed: {
    suggestions() {
      let items = this.items.filter((item) =>
        item.title.toLowerCase().startsWith(this.findTitle.toLowerCase())
      );
      return items.sort((a, b) => a.title > b.title);
    },
  },

  created() {
    this.getItems();
  },

  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];
    },

    async upload() {
      try {
        const formData = new FormData();
        formData.append("photo", this.file, this.file.name);
        let r1 = await axios.post("/api/photos", formData);
       
        let r2 = await axios.post("/api/items", {
          title: this.title,
          description: this.description,
          path: r1.data.path,
        });
        this.addItem = r2.data;
      } catch (error) {
        console.log(error);
      }
    },

    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },

    async deleteItem(item) {
      try {
        await axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    async editItem(item) {
      try {
        await axios.put("/api/items/" + item._id, {
          title: this.findItem.title,
          description: this.findItem.description,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>



<style scoped>
.upload {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
  width: auto;
  /* background-color: #FFEDE1; */
  align-items: stretch;
  align-content: center;

}

.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.square {
  width: 30px;
  height: 30px;
  background: #c3dac3;
  color: #fff;
  text-align: center;
}

/* Form */
input,
textarea,
select,
button {
  font-family: "Montserrat", sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

.form-descrip {
  margin: 0px;
}

/* Uploaded images */
.upload {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

/* Suggestions */
.suggestions {
  width: 200px;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #c3dac3;
  color: #fff;
}

.uploadie
{
  background-color: #c3dac3;
}

.descrip {
  margin-top: 40px;
}
</style>