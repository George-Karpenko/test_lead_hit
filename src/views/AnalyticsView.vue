<template>
  <b-container>
    <b-row>
      <b-col>
        <BaseH1>Аналитика</BaseH1>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <BaseChart
          title="Аналитика по визитам"
          :data="data"
          x="date"
          y="visits"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import BaseH1 from "@/components/BaseH1.vue";
import BaseChart from "@/components/BaseChart.vue";
import analytics from "@/resources/analytics";

export default {
  name: "HelloWorld",
  components: {
    BaseChart,
    BaseH1,
  },
  data() {
    return {
      data: analytics,
    };
  },
};
</script>
