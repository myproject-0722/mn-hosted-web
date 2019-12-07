<template>
	<div v-html="apply">
        {{apply}}
    </div>
</template>
 
<script>
export default {
    name:"applyText",
    data(){
        return {
            apply:''
         }
    },
   	mounted(){
         this.apply = this.$route.query.htmls;
       	 this.$nextTick(()=> {
               document.forms [0].submit()
       	 })
    }
}
</script>
 
<style>
</style>