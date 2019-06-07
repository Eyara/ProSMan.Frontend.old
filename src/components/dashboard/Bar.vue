<script>
import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins
export default {
  extends: Bar,
  name: "bar",
  mixins: [reactiveProp],
  props: ["chartData", "options"],
  methods: {
    update() {
      this.$data._chart.update();
    }
  },
  mounted() {
    this.renderChart(this.chartData, this.options);
  }
};
</script>