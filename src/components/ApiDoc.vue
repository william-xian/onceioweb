<template>
  <div>
    <Collapse v-model="target">
        <Panel name="g.group" v-for="g in apis">
	    {{g.prefix}} - {{g.brief}}
            <p slot="content">

		<Collapse v-model="target" v-for="a in g.subapi">
       		 <Panel name="a.api">
		     {{a.methods[0]}} - {{g.prefix}}{{a.api}} -- {{a.brief}}
       		     <p slot="content">
			{{a}}
		    </p>
       		 </Panel>
	    	</Collapse>
            </p>
        </Panel>
    </Collapse>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ApiDoc',
  props: ['url','target'],
  data() {
	return {apis:{},model:{}}
  },
  mounted() {
	var self = this;
	axios.get(this.url).then(function(resp) {
		self.model = resp.data.model;
		delete resp.data['model'];
		self.apis= resp.data;	
	});	
  }
 
}
</script>

