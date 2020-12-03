<template>
    <div class="hi">
        <div class="about">
            <h1>What is 4am about?</h1>
            <h2>Let me explain!</h2>
        </div>
        <div class="description">
            <p>Those thoughts you have at 4am, after the fatigue of 1 am
                the rush of 2am, and exhiliration of 3am. All of those
                thoughts come crashing to you. So many feelings mix, and 
                they create a color unknown to eyes, only felt by the soul.
            </p>
   "         <h3>"Happiness is not an ideal of reason, but of imagination." -Kant</h3>
        </div>
    </div>
    
</template>

<script>
export default {
    name: "Hi",
    
}
</script>
<style scoped>
*{
    margin: 0;
    padding: 0;
}
.hi {
    display: flex;
    flex-direction: column;
    background-color: rgb(213, 236, 212, .6);
    border-radius: 30px 70px;
    padding: 20px;
    margin:30px 0px 30px 0px;
}

.about {
    display: flex;
    flex-direction: column;
    margin-top: 60px;
    padding: 0 30px 30px 30px;
    
}
.about h1 {
    font-size: 50px;

}

.about h2 {
    text-align: left;
    font-size: 30px;
    margin-top: 20px;
}

.description {
    font-size: 15px;
    padding: 0 30px 30px 30px;
}
.description h3 {
    text-align: center;
    padding: 30px;
    font-size: 20px;
}


</style>
